1. create a simple apollo server. basic hello world DONE
2. create a prisma schema with user type only with only a few fields DONE
3. generate gql schema with nexus and add context done
4. add auto completion to nexus resolver DONE
5. write a test with nexus DONE
6. pick up authorization token through context DONE
7. Establish 1-1 relationship between user and Address DONE
8. createUserForAdminUI in frontend must include total count. DONE
9. update user backend and frontend for admin ui DONE
10. delete user backend and frontend for admin ui DONE
11. delete many users backend and frontend for admin ui DONE
12. wire up pagination in get all users list DONE
13. dockerize admin ON HOLd
14. dockerize frontend DONE
15. login stores token and redirects to main page DONE
16. all unrecognised pathnames should show a not recognised url path. DONE
17. introduce unit testing for frontend DONE
18. introduce cypress testing for frontend DONE
19. create backend tests for queries and mutations that you're using for the frontend
20. Create Navbar with logout DONE
21. Create footer DONE
22.

NOTES:

It seems that nexus automatically generates the GQL schema and nexus types when you spin up the server. currently with `npx nodemon`

- commands to keep in mind when working with prisma

npx prisma migrate dev -- name A_NAME_FOR_THE_MIGRATION

npx prisma migrate dev --create-only

- To generate your prisma client

npx prisma generate

- To open prisma studio

npx prisma studio
