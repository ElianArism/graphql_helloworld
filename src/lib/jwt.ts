import { SECRET_KEY } from '../config/constants';
import jwt from 'jsonwebtoken'; 
import User from '../models/User';

export default class JWT {
    private _secretKey = SECRET_KEY as string; 
    
    sign(user: User): string {
        user.password = ':)';
        delete user._id

        return jwt.sign( { user } , this._secretKey, { expiresIn: 24 * 60 * 60}); // 24h 
    }

    verify(token: string): string {
        try {
            return jwt.verify(token, this._secretKey) as string
        } catch (error) {
            return 'false'
        }
    }
}