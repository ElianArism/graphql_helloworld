import 'graphql-import-node'
import { GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "graphql-tools"

import typeDefs from './schema.graphql'
import resolvers from '../resolvers/resolversMap'

// Build Schema GraphQL 
const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers })

export default schema 