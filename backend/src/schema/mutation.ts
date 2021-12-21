import { arg, extendType, nonNull, stringArg, inputObjectType, list } from "nexus"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

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
                const errors: { code: string; message: string }[] = []
                const { email, name, handle, password } = args.inputs

                if ((email || name || handle || password) === "") {
                    errors.push({
                        code: "INVALID_INPUTS",
                        message: "Please enter valid inputs",
                    })
                    return { token: null, errors }
                }

                try {
                    const salt = await bcrypt.genSalt(10)

                    const hashedPassword = await bcrypt.hash(password, salt)

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
                        errors: [],
                    }
                } catch (error) {
                    errors.push({
                        code: "GENERAL_ERROR",
                        message: "Please try again later",
                    })
                    return { token: null, errors }
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
                    const errors: { code: string; message: string }[] = []
                    const { email, password } = args.inputs

                    try {
                        const user = await context.prisma.user.findUnique({
                            where: { email },
                        })
                        if (!user) {
                            errors.push({
                                code: "INVALID_CREDENTIALS",
                                message: "Please check your email and password",
                            })
                            return { token: null, errors }
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
                                errors: [],
                            }
                        } else {
                            errors.push({
                                code: "INVALID_CREDENTIALS",
                                message: "Please check your email and password",
                            })
                            return { token: null, errors }
                        }
                    } catch (error) {
                        errors.push({
                            code: "GENERAL_ERROR",
                            message: "Something went wrong, please refresh the page and try again",
                        })
                        return { token: null, errors }
                    }
                },
            })
    },
})
