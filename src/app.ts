import cors from 'cors'
import express from 'express'
import compression from 'compression'
import { ApolloServer } from 'apollo-server-express';
import schema from './schema'
import { createServer } from 'http';

const app = express()

// Middlewares
app.use(cors())
app.use(compression())

// routes (using express-graphql)

const server = new ApolloServer({
    schema, 
    introspection: true, 
})

server.applyMiddleware({ app } as any)

// port config
const port = 3000

const HttpServer = createServer(app)

HttpServer.listen(
    port, 
    () => console.log(`Hello with GraphQL, Server: http://localhost:${port}/graphql`) 
)