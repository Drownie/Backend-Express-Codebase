import { QueryResult } from 'pg';
import { getRDSConnection } from './postgresql';

export class _Database {
    private connection: any;
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
        this.connection = getRDSConnection();
    } 

    async get(statement: string): Promise<QueryResult> {
        let connection = await this.connection;
        return (await connection.query(statement));
    }

    async create(statement: string): Promise<QueryResult> {
        let connection = await this.connection;
        return (await connection.query(statement));
    }

    async update(statement: string): Promise<QueryResult> {
        let connection = await this.connection;
        return (await connection.query(statement));
    }

    async delete(statement: string): Promise<QueryResult> {
        let connection = await this.connection;
        return (await connection.query(statement));
    }

    async execute(statement: string): Promise<QueryResult> {
        let connection = await this.connection;
        return (await connection.query(statement));
    }
}