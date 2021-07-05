import { IResolvers } from '@graphql-tools/utils';
import mutation from './mutations/mutations';
import query from './query';

// Resolvers for create Schema 
const resolvers: IResolvers = {    
    ...query,
    ...mutation 
}

export default resolvers 