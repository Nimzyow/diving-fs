[![Nimzyow](https://circleci.com/gh/Nimzyow/diving-fs.svg?style=svg)](https://app.circleci.com/pipelines/github/Nimzyow/diving-fs?filter=all)

NOTES:

It seems that nexus automatically generates the GQL schema and nexus types when you spin up the server. currently with `npx nodemon`

- commands to keep in mind when working with prisma

npx prisma migrate dev -- name A_NAME_FOR_THE_MIGRATION

npx prisma migrate dev --create-only

- To generate your prisma client

npx prisma generate

- To open prisma studio

npx prisma studio

Untitled

This is an attempt at making a full stack TS boilerplate. The goal is to be able to pull down this boilerplate and just get started on a fullstack application without having to do all of the configuration and setup that is required. Needless to say, it's taken a lot of time to get this all up to scratch but I believe I have developed something I can be proud of.

Tech stack

The following is the tech stack:

Apollo server
GraphQL
Prisma
Postgres
Nexus
TypeScript
jest unit testing
eslint

React with webpack
Apollo client
Apollo tooling
graphql-codegen
TypeScript
eslint
jest unit testing
cypress integration and end to end testing

Docker
docker-compose

Coming up

pre commit hooks to ensure no code breaking code is commited

Backend

Very early on I was presented with numereous choices and directions to take the backend. Would I go the python route and use Django framework to build my backend? I use Django at work and I could always ask questions if I was stuck on a particular point. The documentation is very well established and the framework is great to use. The fact that you can create management commands and custom migration files is fantastic too.

I was pretty adament that I wanted to use GraphQL. At work we use Django with Graphene, which is the GraphQL framework to use for Django. We've been very successful in replacing the Django rest framework with graphene and the resulting dev experience is something that cannot be ignored.

GraphQL provides a wonderful dev experience and if I'm going to build the ultimate fullstack boilerplate, you can bet your life I'm going to be implementing GraphQL and no one is going to persuade me otherwise :P

One of the most commonly used GraphQL servers out there is Apollo server. I have played around and experiemented with Apollo server quite extensively and I enjoy Apollo studio, the GraphQL playground, which nudged me to utilise Apollo server in my ideal full stack boilerplate. The GraphQL playground by the way, is a place in which you can interact with your GraphQL schema.

Can I just take a moment and just say how awesome that feature is? The GraphQL playground is bloody fantastic. The fact that I can look at all the types, queries, mutations and subscriptions, all in one place and for me to create whatever operation I want, very easily with just a few clicks of the mouse (or trackpad, in my case), and get type automatic error highlighting if I make a mistake, just never ceases to amaze me. I won't be going back to REST anytime soon.

If you're wondering what I meant when I used the words queries, mutation and subscriptions:

GraphQL queries: used to fetch or read values.

GraphQL mutations: used to write or alter values.

GraphQL subscriptions: think websocket. its very much like a query but the results can change over time as subscriptions are long running operations.

The dilemma I faced after this is which Database I was going to use. either no SQL or relational database. If I were to go down the no SQL route, I would have gone for MongoDB as that is a no SQL DB that I am very familiar with and I have experiemented with that in the past. Another option would have been to use DynamoDB, by aws. I have used DynamoDB within the aws Amplify framework so I am some what familiar with it but ultimately, if I had to go down the no SQL route, I would have chosen MongoDB just because I am more familiar with it.

But I didn't go down the no SQL route, instead, I wanted to use a relational database as I have been using Postgres at work and I got used to thinking about databases within the context of a relational database. I feel like it makes more sense and I like the strict structure a relational database affords. So for this boilerplate I thought it would make sense to use a local postgres database for development environment and to then switch to aws RDS postgres when it comes to production envioronment.

Through Django, I got used to the flow of creating migration files and applying migraitons to the database. It just made a lot of sense to me and I found it intuitive. The problem I found with Django though is that there is no type checkings during compile time. If for example I were to get a user using Djangos ORM with:

```
    User.objects.get(random_field="blah")
```

I would only get a nasty error during runtime, when that particular line is run. Obviously it would be super nice to get errors during compile time, as I'm typing, rather than having to run the application and wait for the line above to run before my backend crashes.

There are a few ORM's out there which have type safety built in that would prevent the above problem by showing you errors at compile time. TypeORM is one such ORM that apparently does a good job. However, what I ultimately chose to go with is Prisma, a lovely TypeScript ORM. I preferred the syntax, it was very easy to use and just filled me with joy. The autocompletion is just lovely and super helpful. The fact that I can create a model and have TypeScript checkings applied to that, is just a game changer for someone that's been using Django as part of their everyday work. Plus the documentation is not too shabby and is easy to read.

Just to show how you can get a user through prisma:

```
const user = await prisma.user.findUnique({
    where: {
        id: context.user.id,
    },
})
```

Fantastic :)

So the next thing is how the mutations and queries are written. So there are two approaches one can generally take to creating a schema file ( which is what you need for defining GraphQL types). You can either take a code-first approach, or a SDL (Schema definition language) first approach.

To give a very brief description of the differences between the two:

Code-first approach: You use the language of your framework to create the schema file, be it Python or JavaScript/TypeScript. The advantage of using TypeScript to create the schema file is that you get error checkings on your types and with nexus (a framework for creating GraphQL types using TS), you can get automatic type checkings on all your types and all your resolvers. It's bloody fantastic!!

Schema Definition Language first approach: You create the schema file, manually, yourself. While this is fine when you are starting to learn, or for very small projects, this can get out of hand very quickly when you need to scale up. You need to get on top of managing relationships between different types manually and you won't get error checkings. If something is wrong with the graph, the whole thing will just fail and not in a graceful manner.

I decided to take a code-first approach to creating the mutation and query types. Why is that? I wanted type checkings on my schema. It's as simple as that. Sure, theres a bit more boilerplate. Sure, I have to dig through documentation to find different examples of how to create types and input types and etc.., but ultimately, this scales far better than if one were to take the SDL approach
