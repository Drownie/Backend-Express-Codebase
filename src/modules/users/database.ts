import { _Database, insertOne, updateOne } from "../../database";
import { CreateUserServiceDTO, IUser, UpdateUserDTO } from "./user.interface";
import { QueryResult } from "pg";

export class UserDatabase {
    private static _UserDatabase: _UserDatabase;
    
    static getDatabase() {
        if (this._UserDatabase == null) {
            this._UserDatabase = new _UserDatabase();
        }
        return this._UserDatabase;
    }
}

class _UserDatabase extends _Database {
    constructor() {
        super('users');
    }

    async getUsers(): Promise<QueryResult<IUser>> {
        try {
            let statement = `SELECT * FROM users`;
            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async getUserByExternalId(externalId: string): Promise<QueryResult<IUser>> {
        try {
            let statement = `SELECT * FROM users WHERE external_id = '${externalId}'`;
            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async getUserByEmail(email: string): Promise<QueryResult<IUser>> {
        try {
            let statement = `SELECT * FROM users WHERE email = '${email}'`;
            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async createUser(payload: CreateUserServiceDTO): Promise<QueryResult<IUser>> {
        try {
            let statement = insertOne('users', payload);
            return await super.create(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async updateUser(userId: string, payload: UpdateUserDTO): Promise<QueryResult<IUser>> {
        try {
            let statement = updateOne(payload, 'users', 'user_id', userId);
            return await super.update(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }
}