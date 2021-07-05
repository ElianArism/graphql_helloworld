import cors from 'cors'
import express from 'express'
import compression from 'compression'
import { ApolloServer } from 'apollo-server-express';
import schema from './schema'
import { createServer } from 'http';
import environments from './config/environments';
import Database from './config/database';

if(process.env.NODE_ENV !== 'production') {
    const envs = environments; 
    console.log(envs);
}

async function init() {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(compression());

    // local database 
    const db = await Database.init()

    // Context of the connection (Connection data) || context information
    const contextConnection: any = async({req, connection}: any) => {
        /**
         * To get the token there are two ways: 
         * if the context of the connection are mutations or queries, the token is in the http request headers
         * otherwise, the token is in the connection headers (in case of subscriptions)  
         */
        const token = req ? req.headers.authorization : connection.authorization; 
        return {db, token};
    }

    // routes (using express-graphql)
    const server = new ApolloServer({
        schema, 
        context: contextConnection,
        introspection: true, 
    });

    server.applyMiddleware({ app } as any);

    // port config
    const port = process.env.PORT;

    const HttpServer = createServer(app);

    HttpServer.listen(
        port, 
        () => console.log(`Hello with GraphQL, Server: http://localhost:${port}/graphql`) 
    );
}

init();