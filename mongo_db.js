require("dotenv").config()
const { MongoClient } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URI)

async function getDB() {
    try {
        await client.connect()
        console.log("connected to Mongo DB")
        await listDatabases(client)
    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
    }
}

async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases()

    console.log("Databases:")
    databaseList.databases.forEach(db => console.log(` - ${db.name}`));
}

getDB()