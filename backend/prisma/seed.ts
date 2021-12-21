import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const main = async () => {
    const salt = await bcrypt.genSalt(10)

    const superUserHashedPassword = await bcrypt.hash(
        process.env.SUPER_USER_PASSWORD || "randomPasswords",
        salt
    )

    const superUser = await prisma.user.upsert({
        where: { email: "n_soufiani@hotmail.com" },
        update: {},
        create: {
            email: "n_soufiani@hotmail.com",
            name: "Nima",
            handle: "Soufiani",
            password: superUserHashedPassword,
        },
    })

    const johnHashedPassword = await bcrypt.hash("johnDoe123", salt)

    const johnDoe = await prisma.user.upsert({
        where: { email: "johndoe@example.com" },
        update: {},
        create: {
            email: "johndoe@example.com",
            name: "John",
            handle: "Doe",
            password: johnHashedPassword,
        },
    })

    const bobHashedPassword = await bcrypt.hash("bobDillion123", salt)

    const bob = await prisma.user.upsert({
        where: { email: "bobdillon@example.com" },
        update: {},
        create: {
            email: "bobdillion@example.com",
            name: "Bob",
            handle: "Dillon",
            password: bobHashedPassword,
        },
    })
    console.log(superUser, johnDoe, bob)
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
