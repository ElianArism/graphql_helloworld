import { IResolvers } from '@graphql-tools/utils';

const query: IResolvers = {
    
    Query: {
        hello(): string { return 'Hello World!' },
        
        /**
         * @param 1st Param required though unused
         * @param 2do param args => with destruct {name: string}
         */
        helloWName(__: void, { name }): string { return `Hello ${name}!` }, 
    }, 

}

export default query; 