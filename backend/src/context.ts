import { PrismaClient } from "@prisma/client"
import { Object } from "ts-toolbelt"
import jwt from "jsonwebtoken"

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    isSuperUser: boolean
    password: string
}

export interface Context {
    prisma: PrismaClient
    user: Omit<User, "password"> | null
}

export const getUser = (token: string): Omit<User, "password"> | null => {
    interface TokenInterface {
        user: Object.Optional<User, "password"> | undefined | null
    }

    let decodeToken: TokenInterface

    try {
        decodeToken = jwt.verify(token, process.env.JWTSECRET ?? "") as TokenInterface
    } catch (error) {
        return null
    }
    if (decodeToken.user) {
        const user = decodeToken.user
        // const user = decodeToken.user
        // let findUser
        // try {
        //     findUser = await User.findById(user._id)
        // } catch (error) {
        //     return
        // }
        delete user.password
        return user
    } else {
        return null
    }
}
