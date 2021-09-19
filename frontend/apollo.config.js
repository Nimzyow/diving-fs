module.exports = {
    client: {
        excludes: ["**/__tests__/**/*", "./src/generated/graphql.ts"],
        includes: ["./src/**/*"],
        service: {
            name: "nima-graphql",
            localSchemaFile: __dirname + "/graphql.schema.json",
        },
    },
}
