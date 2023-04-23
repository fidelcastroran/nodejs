import {MongoClient} from "mongodb"
const MONGO_URL = "mongodb://127.0.0.1:27017"

export async function createDbCollection(){

    //creating a new client to connect

   const client = new MongoClient (MONGO_URL)

   //
   await client.connect()
   console.log("mongodb is connected successfully")
   return client

}

export const client= await createDbCollection();
 
