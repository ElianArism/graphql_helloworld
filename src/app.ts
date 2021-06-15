import cors from 'cors'
import express from 'express'
import compression from 'compression'
import { graphqlHTTP } from 'express-graphql';
import schema from './schema'

const app = express()

// Middlewares
app.use(cors())
app.use(compression())

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