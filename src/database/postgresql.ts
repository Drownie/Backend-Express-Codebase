import { Pool } from "pg";
import { setting } from "../config";

let dbClient: Pool;
export async function getRDSConnection() {
    if (dbClient !== undefined) {
        return dbClient;
    }

    const pool: Pool = new Pool({
        connectionString: setting.connectionString
    });

    console.log('Connecting to RDS...');
    try {
        pool.connect();
        console.log('Successfully connected to the database');
    } catch(err) {
        throw err;
    }

    return pool;
}