import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

interface User {
    id: string
    name: string
    email: string
}

export interface Context {
    prisma: PrismaClient
    user: Omit<User, "password"> | null
}

export const getUser = async (token: string, prisma: PrismaClient): Promise<User | null> => {
    interface TokenInterface {
        user: Pick<User, "id"> | undefined | null
    }

    let decodeToken: TokenInterface

    try {
        decodeToken = jwt.verify(token, process.env.JWTSECRET || "") as TokenInterface
    } catch (error) {
        return null
    }
    if (decodeToken.user) {
        const userId = decodeToken.user.id
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!user) {
            return null
        }
        return {
            id: String(user.id),
            name: user.name,
            email: user.email,
        }
    } else {
        return null
    }
}
