import { extendType, nonNull, stringArg } from "nexus"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const Mutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createUser", {
            type: "Token",
            args: {
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (parent, args, context) => {
                const errors: { code: string; message: string }[] = []
                const { email, lastName, firstName, password } = args

                if (email && lastName && firstName && password) {
                    try {
                        const salt = await bcrypt.genSalt(10)

                        const hashedPassword = await bcrypt.hash(password, salt)

                        const user = await context.prisma.user.create({
                            data: {
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
                            token: jwt.sign(payload, process.env.JWTSECRET || "", {
                                expiresIn: 360000,
                            }),
                            errors: [],
                        }
                    } catch (error) {
                        console.log(error)
                        errors.push({
                            code: "INVALID_INPUTS",
                            message: "Please enter valid inputs",
                        })
                        return { token: null, errors }
                    }
                }
                errors.push({
                    code: "INVALID_INPUTS",
                    message: "Please enter valid inputs",
                })
                return { token: null, errors }
            },
        }),
            t.field("createUserForAdminUI", {
                type: "User",
                args: {
                    firstName: nonNull(stringArg()),
                    lastName: nonNull(stringArg()),
                    email: nonNull(stringArg()),
                    password: nonNull(stringArg()),
                },
                resolve: async (parent, args, context) => {
                    const { email, password, firstName, lastName } = args
                    if (!password || !email) {
                        return null
                    }
                    const user = await context.prisma.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            password,
                        },
                    })
                    return user
                },
            }),
            t.nonNull.field("login", {
                type: "Token",
                args: {
                    email: nonNull(stringArg()),
                    password: nonNull(stringArg()),
                    passwordConfirm: nonNull(stringArg()),
                },
                resolve: async (parent, args, context) => {
                    const errors: { code: string; message: string }[] = []
                    const { email, password, passwordConfirm } = args
                    if (!password || !passwordConfirm || !email) {
                        errors.push({
                            code: "INVALID_INPUTS",
                            message: "Please check for appropriate inputs",
                        })
                        return { token: null, errors }
                    }

                    if (password !== passwordConfirm) {
                        errors.push({
                            code: "INVALID_INPUTS",
                            message: "Please check for password and password confirm mismatch",
                        })
                        return { token: null, errors }
                    }

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
            }),
            t.field("createAddress", {
                type: "Success",
                args: {
                    line1: nonNull(stringArg()),
                    line2: stringArg(),
                    county: stringArg(),
                    postcode: nonNull(stringArg()),
                },
                resolve: async (parent, args, context) => {
                    const { line1, line2, county, postcode } = args

                    const userId = context.user?.id
                    if (!userId) {
                        return {
                            success: false,
                        }
                    }
                    try {
                        await context.prisma.address.upsert({
                            where: {
                                userId,
                            },
                            update: {},
                            create: {
                                line1,
                                line2,
                                county,
                                postcode,
                                userId: userId,
                            },
                        })
                    } catch (error) {
                        console.log(error)
                    }
                    return {
                        success: true,
                    }
                },
            })
    },
})
