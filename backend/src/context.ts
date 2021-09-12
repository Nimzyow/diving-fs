import prisma from "./db"
import { PrismaClient } from "@prisma/client"

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    isSuperUser: boolean
}

export interface Context {
    prisma: PrismaClient
    user: User | null
}
