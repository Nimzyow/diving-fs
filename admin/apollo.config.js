module.exports = {
  client: {
    excludes: ["**/__tests__/**/*", "./src/generated/graphql.ts"],
    includes: ["./src/**/*"],
    service: {
      name: "admin-graphql",
      localSchemaFile: __dirname + "/graphql.schema.json",
    },
  },
};
