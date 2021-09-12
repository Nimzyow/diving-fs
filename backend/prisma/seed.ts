import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const main = async () => {
    const johnDoe = await prisma.user.upsert({
        where: { email: "johndoe@example.com" },
        update: {},
        create: {
            email: "johndoe@example.com",
            firstName: "John",
            lastName: "Doe",
            isSuperUser: false,
            password: "johnDoe123",
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: "bobdillon@example.com" },
        update: {},
        create: {
            email: "bobdillion@example.com",
            firstName: "Bob",
            lastName: "Dillon",
            isSuperUser: false,
            password: "bobDillion123",
        },
    })
    console.log(johnDoe, bob)
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
