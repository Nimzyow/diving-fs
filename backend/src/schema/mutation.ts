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
                        }
                    } catch (error) {
                        console.log(error)
                        return null
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
                    const { email, password, passwordConfirm } = args
                    if (password && passwordConfirm && password === passwordConfirm) {
                        if (email) {
                            try {
                                const user = await context.prisma.user.findUnique({ where: { email } })
                                if (!user) {
                                    return null
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
                                    return null
                                }
                            } catch (error) {
                                return null
                            }
                        } else {
                            return null
                        }
                    } else {
                        return null
                    }
                },
            })
    },
})
