import { IResolvers } from '@graphql-tools/utils';
import { GetResult } from '../models/Response';
import User from '../models/User';
import { Db } from 'mongodb';
import JWT from '../lib/jwt';
import bcrypt from 'bcrypt';

const query: IResolvers = {
    
    Query: {
        async users(__:void, {}, context): Promise<GetResult<User[]>> {
            const db: Db = context.db;

            try {
                const users = <User[]>await db.collection('users')
                .find()
                .toArray();
                
                return {
                    message: 'Ok',
                    status: true, 
                    data: users
                }
                
            } catch (error) {
                return {
                    message: error,
                    status: false
                };
            }
        },

        async login(__: void, {email, password}, context): Promise<GetResult<User>> {
            const db: Db = context.db; 
            
            try {
                const user = <User>await db.collection('users').findOne({ email })
                
                if(!user) {
                    return Promise.resolve({
                        message: 'User not found',
                        status: false
                    })
                }

                if(bcrypt.compareSync(password, user.password)) {
                    return Promise.resolve({
                        status: true,
                        message: 'Ok',
                        token: new JWT().sign(user)
                    })
                } else {
                    return Promise.resolve({
                        message: 'Incorrect login credentials',
                        status: false
                    })
                }

            } catch (error) {
                return Promise.reject({
                    message: error, 
                    status: false
                })
            }
        },

        me(__:void, ___:any, context): GetResult<any> {
            const {token} = context;
    
            const {user}:any = new JWT().verify(token);

            if(!user) {
                return {
                    status: false,
                    message: 'Error, invalid token',
                };
            } else {
                return {
                    status: true,
                    message: 'valid token', 
                    data: user
                }; 
            }
        } 
    }

}

export default query; 