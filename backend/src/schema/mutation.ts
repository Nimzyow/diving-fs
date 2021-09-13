import { extendType, stringArg } from "nexus"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const Mutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createUser", {
            type: "Token",
            args: {
                firstName: stringArg(),
                lastName: stringArg(),
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async (parent, args, context) => {
                const errors: { code: string; message: string }[] = []
                const { email, lastName, firstName, password } = args

                if (email && lastName && firstName && password) {
                    try {
                        const salt = await bcrypt.genSalt(10)

                        const hashedPassword = await bcrypt.hash(password, salt)

                        const user = await context.prisma.user.upsert({
                            where: {
                                email,
                            },
                            update: {},
                            create: {
                                email,
                                firstName,
                                lastName,
                                password: hashedPassword,
                            },
                        })

                        const payload = {
                            user: {
                                id: user.id,
                            },
                        }

                        return {
                            token: jwt.sign(payload, process.env.JWTSECRET || "", { expiresIn: 360000 }),
                            errors: [],
                        }
                    } catch (error) {
                        errors.push({
                            code: "INVALID_INPUTS",
                            message: "Please enter valid inputs",
                        })
                        return { token: null, errors }
                    }
                }

                return null
            },
        }),
            t.field("login", {
                type: "Token",
                args: {
                    email: stringArg(),
                    password: stringArg(),
                    passwordConfirm: stringArg(),
                },
                resolve: async (parent, args, context) => {
                    const errors: { code: string; message: string }[] = []
                    const { email, password, passwordConfirm } = args
                    if (password && passwordConfirm && password === passwordConfirm) {
                        if (email) {
                            try {
                                const user = await context.prisma.user.findUnique({ where: { email } })
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
                                    message:
                                        "Something went wrong, please refresh the page and try again",
                                })
                                return { token: null, errors }
                            }
                        } else {
                            errors.push({
                                code: "INVALID_CREDENTIALS",
                                message: "Please check your email and password",
                            })
                            return { token: null, errors }
                        }
                    } else {
                        errors.push({
                            code: "INVALID_INPUTS",
                            message: "Please check for password and password confirm mismatch",
                        })
                        return { token: null, errors }
                    }
                },
            })
    },
})
