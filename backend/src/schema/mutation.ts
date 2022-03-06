import { Prisma } from "@prisma/client"
import { UserInputError } from "apollo-server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { arg, extendType, nonNull, inputObjectType, objectType } from "nexus"

// export const CreatePostError = objectType({
//     name: "CreatePostError",
//     definition(t) {
//         t.field("createPostError", {})
//     }
// })

export const CreateUserOutput = objectType({
    name: "CreateUserOutput",
    definition(t) {
        t.field("token", {
            type: "String",
        }),
            t.field("createUserError", {
                type: "CreateUserError",
            })
    },
})

export const CreateUserInputs = inputObjectType({
    name: "CreateUserInputs",
    definition(t) {
        t.nonNull.string("name"),
            t.nonNull.string("handle"),
            t.nonNull.string("email"),
            t.nonNull.string("password")
    },
})

export const CreatePostInputs = inputObjectType({
    name: "CreatePostInputs",
    definition(t) {
        t.nonNull.string("body")
    },
})

export const LoginUserInputs = inputObjectType({
    name: "LoginUserInputs",
    definition(t) {
        t.nonNull.string("email"), t.nonNull.string("password")
    },
})

export const Mutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createPost", {
            type: "CreatePostOutput",
            args: {
                inputs: nonNull(
                    arg({
                        type: "CreatePostInputs",
                    })
                ),
            },
            resolve: async (parent, args, context) => {
                const { body } = args.inputs
                if (!context.user?.id) return null

                try {
                    const post = await context.prisma.post.create({
                        data: {
                            body,
                            authorId: context.user.id,
                        },
                    })
                    return {
                        post,
                        createPostError: null,
                    }
                } catch (error) {
                    return null
                }
            },
        })
        t.field("createUser", {
            type: "CreateUserOutput",
            args: {
                inputs: nonNull(
                    arg({
                        type: "CreateUserInputs",
                    })
                ),
            },
            resolve: async (parent, args, context) => {
                const { email, name, handle, password } = args.inputs

                if ((email || name || handle || password) === "") {
                    return {
                        token: null,
                        createUserError: {
                            field: "invalidInputs",
                            message: "Please enter valid inputs",
                        },
                    }
                    // throw new UserInputError("Please enter valid inputs")
                }

                const salt = await bcrypt.genSalt(10)

                const hashedPassword = await bcrypt.hash(password, salt)

                try {
                    const user = await context.prisma.user.create({
                        data: {
                            name,
                            handle,
                            email,
                            password: hashedPassword,
                        },
                    })

                    const payload = {
                        user: {
                            id: user.id,
                        },
                    }

                    return {
                        token: jwt.sign(payload, process.env.JWTSECRET || "", {
                            expiresIn: 360000,
                        }),
                        createUserError: null,
                    }
                } catch (error) {
                    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                        if (error.message.includes("email")) {
                            return {
                                token: null,
                                createUserError: {
                                    field: "emailTaken",
                                    message: "This email has already been taken",
                                },
                            }
                        }
                        if (error.message.includes("handle")) {
                            return {
                                token: null,
                                createUserError: {
                                    field: "handleTaken",
                                    message: "This handle has already been taken.",
                                },
                            }
                        }
                    }
                    return {
                        token: null,
                        createUserError: {
                            field: "unknownError",
                            message: "An error has occurred",
                        },
                    }
                }
            },
        }),
            t.nonNull.field("login", {
                type: "Token",
                args: {
                    inputs: nonNull(
                        arg({
                            type: "LoginUserInputs",
                        })
                    ),
                },
                resolve: async (parent, args, context) => {
                    const { email, password } = args.inputs

                    const user = await context.prisma.user.findUnique({
                        where: { email },
                    })
                    if (!user) {
                        throw new UserInputError("Please check your email and password")
                    }
                    const match = await bcrypt.compare(password, user.password)

                    if (match) {
                        const payload = {
                            user: {
                                id: user.id,
                            },
                        }

                        return {
                            token: jwt.sign(payload, process.env.JWTSECRET || "", {
                                expiresIn: 360000,
                            }),
                        }
                    } else {
                        throw new UserInputError("Please check your email and password")
                    }
                },
            })
    },
})
