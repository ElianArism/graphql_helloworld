import cors from 'cors'
import express from 'express'
import compression from 'compression'

import { IResolvers } from '@graphql-tools/utils'
import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlHTTP } from 'express-graphql';

const app = express()

// Middlewares
app.use(cors())
app.use(compression())

// Create Schema GraphQL 
const typeDefs = `
    type Query {
        hello: String! 
        helloWName(name: String!): String!
    }
`

// Resolvers for create Schema 
const resolvers: IResolvers = {
    
    Query: {
        hello(): string { return 'Hello World!' },
        
        /**
         * @param 1st Param required though unused
         * @param 2do param args => with destruct {name: string}
         */
        helloWName(__: void, { name }): string { return `Hello ${name}!` }, 
    }, 

}

// Build Schema GraphQL 
const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers })

// routes (using express-graphql)
app.use('/', 
    /**
     *  init GraphQL console with Grapy
     */
    
    graphqlHTTP({
        schema,
        graphiql: true
    })
)

// port config
const port = 3000

app.listen(
    port, 
    () => console.log(`Hello with GraphQL, Server: http://localhost:${port}/graphql`) 
)