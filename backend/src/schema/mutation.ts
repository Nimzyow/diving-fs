import { arg, extendType, nonNull, stringArg, inputObjectType, list } from "nexus"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const CreateUserInputs = inputObjectType({
    name: "CreateUserInputs",
    definition(t) {
        t.nonNull.string("firstName"),
            t.nonNull.string("lastName"),
            t.nonNull.string("email"),
            t.nonNull.string("password")
    },
})

export const UpdateUserInputs = inputObjectType({
    name: "UpdateUserInputs",
    definition(t) {
        t.nonNull.string("id"),
            t.nonNull.string("firstName"),
            t.nonNull.string("lastName"),
            t.nonNull.string("email")
    },
})

export const UpdateUserAddressInputs = inputObjectType({
    name: "UpdateUserAddressInputs",
    definition(t) {
        t.nonNull.string("id"),
            t.nonNull.string("line1"),
            t.nonNull.string("line2"),
            t.nonNull.string("county"),
            t.nonNull.string("postcode"),
            t.nonNull.string("country"),
            t.nonNull.string("userId"),
            t.nonNull.string("createdAt"),
            t.nonNull.string("updatedAt")
    },
})

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

                if ((email || lastName || firstName || password) === "") {
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
                    email: nonNull(stringArg()),
                    password: nonNull(stringArg()),
                },
                resolve: async (parent, args, context) => {
                    const errors: { code: string; message: string }[] = []
                    const { email, password } = args

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
