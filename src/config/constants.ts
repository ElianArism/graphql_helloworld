import environments from './environments';

// constants values
if(process.env.NODE_ENV !== 'production') {
   const environment = environments; 
   
}

export const SECRET_KEY = process.env.SECRET_KEY || 'secret'; 