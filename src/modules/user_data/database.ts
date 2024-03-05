import { _Database, insertOne, updateOne, updateOneWithFilters } from "../../database";
import { QueryResult } from "pg";
import { CreateUserDataServiceDTO, IUserData, UpdateUserDataFilterDTO, UpdateUserDataServiceDTO } from "./user_data.interface";

export class UserDataDatabase {
    private static _UserDataDatabase: _UserDataDatabase;
    
    static getDatabase() {
        if (this._UserDataDatabase == null) {
            this._UserDataDatabase = new _UserDataDatabase();
        }
        return this._UserDataDatabase;
    }
}

class _UserDataDatabase extends _Database {
    constructor() {
        super('user_data');
    }

    async getUserDataByUserId(userId: string): Promise<QueryResult<IUserData>> {
        try {
            let statement = `SELECT * FROM user_data WHERE user_id = '${userId}'`;
            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async createUserData(payload: CreateUserDataServiceDTO): Promise<QueryResult<IUserData>> {
        try {
            let statement = insertOne('user_data', payload);
            return await super.create(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async updateUserData(payload: UpdateUserDataServiceDTO, filters: UpdateUserDataFilterDTO): Promise<QueryResult<IUserData>> {
        try {
            let statement = updateOneWithFilters(payload, 'user_data', filters);
            return await super.update(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async updateUserDataByUserId(userId: string, payload: UpdateUserDataServiceDTO): Promise<QueryResult<IUserData>> {
        try {
            let statement = updateOne(payload, 'user_data', 'user_id', userId);
            return await super.update(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async updateUserDataByUserIdStatement(userId: string, payload: UpdateUserDataServiceDTO): Promise<string> {
        try {
            return updateOne(payload, 'user_data', 'user_id', userId);
        } catch(err) {
            throw "internal_server_error";
        }
    }
}