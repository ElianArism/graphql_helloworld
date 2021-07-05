import bcrypt from 'bcrypt';
import { Db } from 'mongodb';
import User from '../../models/User';
import { Datetime } from '../../lib/datetime';
import { IResolvers } from '@graphql-tools/utils';
import { UserResponse } from '../../models/Response';

const mutation: IResolvers = {
    Mutation: {
        /**
         * Insert one user in the db
         * @param __ ?
         * @param params => {user} (data defined in Schema UserInput)
         * @param context (contextConnection)
         */

        register(__:void, { user }, context): Promise<UserResponse<User>> {
            return new Promise(async (resolve, reject) => {
                const db: Db = context.db;
                
                try {
                    const [lastUser, existUser] = await Promise.all([
                        db.collection('users')
                          .find()
                          .limit(1)
                          .sort({registerDate: -1})
                          .toArray(),
                        
                        db.collection('users').findOne({email: user.email})                        
                    ])

                    if(existUser) {
                        return resolve({
                            message: 'This email already exists, please use another',
                            status: false
                        })
                    } else {

                        if(lastUser.length === 0)  user.id = 1; 
                        else user.id = lastUser.length + 1; 
                        
                        user.registerDate = new Datetime().getCurrentDateTime(); 
                        
                        user.password = bcrypt.hashSync(user.password, 10); 

                        await db.collection('users').insertOne(user);
                        
                        resolve(<UserResponse<User>>{ 
                            status: true, 
                            message: "Ok",
                            data: (user as User)
                        });
                    }

                } catch (error) {
                   reject({message: error, status: false});       
                }
            })

        }
    } 
}

export default mutation; 