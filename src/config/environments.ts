import dotenv from 'dotenv';

// config environment vars
const environments = dotenv.config({path: '.env'}); 

if(process.env.NODE_ENV !== 'production') {
    if(environments.error) {
        throw environments.error;
    }
}

export default environments; 

