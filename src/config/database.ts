import { Db, MongoClient } from "mongodb";

class Database {
    
    static async init() {
        const MONGODB: string = String(process.env.DATABASE);
        const client: MongoClient = await MongoClient.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});
        const db: Db = await client.db();

        if(client.isConnected()) {
            console.log(`DB Running ${db.databaseName}`)
        }

        return db;
    }
}



export default Database; 