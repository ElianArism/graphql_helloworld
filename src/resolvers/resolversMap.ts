import { IResolvers } from '@graphql-tools/utils';
import query from './query';

// Resolvers for create Schema 
const resolvers: IResolvers = {    
    ...query
}

export default resolvers 