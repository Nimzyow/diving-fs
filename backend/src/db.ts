import { PrismaClient } from "@prisma/client"

export interface Global {
    document: Document
    window: Window
    prisma: PrismaClient
}

declare let global: Global

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default prisma
