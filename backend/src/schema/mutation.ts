import { Prisma } from "@prisma/client"
import { UserInputError, ApolloError } from "apollo-server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { arg, extendType, nonNull, inputObjectType } from "nexus"

export const CreateUserInputs = inputObjectType({
    name: "CreateUserInputs",
    definition(t) {
        t.nonNull.string("name"),
            t.nonNull.string("handle"),
            t.nonNull.string("email"),
            t.nonNull.string("password")
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
        t.field("createUser", {
            type: "Token",
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
                    throw new UserInputError("Please enter valid inputs")
                }

                let hashedPassword: string

                try {
                    const salt = await bcrypt.genSalt(10)

                    hashedPassword = await bcrypt.hash(password, salt)
                } catch (error) {
                    throw new ApolloError("Please try again later")
                }

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
                    }
                } catch (error) {
                    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                        if (error.message.includes("email")) {
                            throw new UserInputError("This email has already been taken.")
                        }
                        if (error.message.includes("handle")) {
                            throw new UserInputError("This handle has already been taken.")
                        }
                    }
                    return null
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
