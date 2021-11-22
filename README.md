1. create a simple apollo server. basic hello world DONE
2. create a prisma schema with user type only with only a few fields DONE
3. generate gql schema with nexus and add context done
4. add auto completion to nexus resolver DONE
5. write a test with nexus DONE
6. pick up authorization token through context DONE
7. Establish 1-1 relationship between user and Address DONE
8. Need to establish test db when test is running so that it does not pollute the dev db

   NOTES:

It seems that nexus automatically generates the GQL schema and nexus types when you spin up the server. currently with `npx nodemon`

- commands to keep in mind when working with prisma

npx prisma migrate dev -- name A_NAME_FOR_THE_MIGRATION

npx prisma migrate dev --create-only

- To generate your prisma client

npx prisma generate

- To open prisma studio

npx prisma studio
