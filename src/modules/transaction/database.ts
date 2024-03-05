import { _Database, insertOne, queryBy, updateOne } from "../../database";
import { CreateTransactionServiceDTO, GetTransactionsFilterDTO, GetTransactionsQueryDTO, ITransaction, ITransactionOut, UpdateTransactionServiceDTO } from "./transaction.interface";
import { QueryResult } from "pg";

export class TransactionDatabase {
    private static _TransactionDatabase: _TransactionDatabase;
    
    static getDatabase() {
        if (this._TransactionDatabase == null) {
            this._TransactionDatabase = new _TransactionDatabase();
        }
        return this._TransactionDatabase;
    }
}

class _TransactionDatabase extends _Database {
    constructor() {
        super('transactions');
    }

    async createTransaction(payload: CreateTransactionServiceDTO): Promise<QueryResult<ITransaction>> {
        try {
            let statement = insertOne('transactions', payload);
            return await super.create(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async updateTransactionById(transactionId: string, payload: UpdateTransactionServiceDTO): Promise<QueryResult<ITransaction>> {
        try {
            let statement = updateOne(payload, 'transactions', 'transaction_id', transactionId);
            return await super.update(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async deleteTransaction(transactionId: string): Promise<QueryResult<ITransaction>> {
        try {
            let deletePayload = { is_deleted: true };
            let statement = updateOne(deletePayload, 'transactions', 'transaction_id', transactionId);
            return await super.update(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async getTransactionByFilters(filters: any): Promise<QueryResult<ITransaction>> {
        try {
            let statement = queryBy('transactions', filters);
            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async getTransactionById(transactionId: string): Promise<QueryResult<ITransaction>> {
        try {
            let filters = {
                transaction_id: transactionId
            };
            let statement = queryBy('transactions', filters);
            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async getAllTransaction(filter: GetTransactionsFilterDTO, query: GetTransactionsQueryDTO): Promise<QueryResult<ITransactionOut>> {
        try {
            let limit = query.limit;
            let offset = query.offset;
            let orderBy = query.orderBy;

            let userId = filter.user_id;
            let startTimestamp = filter.start_timestamp;
            let endTimestamp = filter.end_timestamp;
            let categoryType = filter.category_type;
            let transactionType = filter.transaction_type;

            let statement = `
                SELECT 
                    transaction_id,
                    user_id,
                    transaction_amount,
                    transaction_type,
                    category_type,
                    created_timestamp,
                    updated_timestamp
                FROM transactions
                WHERE user_id = '${userId}'
                AND created_timestamp BETWEEN '${startTimestamp}' AND '${endTimestamp}'
                AND is_deleted = false
                ${categoryType ? `AND category_type = '${categoryType}'` : ''}
                ${transactionType ? `AND transaction_type = '${transactionType}'` : ''}
                ORDER BY created_timestamp ${orderBy}
                LIMIT ${limit} OFFSET ${offset}`;
            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async getAllTransactionCount(filter: GetTransactionsFilterDTO): Promise<QueryResult<any>> {
        try {
            let userId = filter.user_id;
            let startTimestamp = filter.start_timestamp;
            let endTimestamp = filter.end_timestamp;
            let categoryType = filter.category_type;
            let transactionType = filter.transaction_type;

            let statement = `
                SELECT COUNT(*)
                FROM transactions
                WHERE user_id = '${userId}'
                AND created_timestamp BETWEEN '${startTimestamp}' AND '${endTimestamp}'
                AND is_deleted = false
                ${categoryType ? `AND category_type = '${categoryType}'` : ''}
                ${transactionType ? `AND transaction_type = '${transactionType}'` : ''}`;
            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }

    async getAllTransactionSum(filter: GetTransactionsFilterDTO): Promise<QueryResult<any>> {
        try {
            let userId = filter.user_id;
            let startTimestamp = filter.start_timestamp;
            let endTimestamp = filter.end_timestamp;
            let categoryType = filter.category_type;
            let transactionType = filter.transaction_type;

            let statement = `
                SELECT SUM(transaction_amount)
                FROM transactions
                WHERE user_id = '${userId}'
                AND created_timestamp BETWEEN '${startTimestamp}' AND '${endTimestamp}'
                AND is_deleted = false
                ${categoryType ? `AND category_type = '${categoryType}'` : ''}
                ${transactionType ? `AND transaction_type = '${transactionType}'` : ''}`;

            return await super.get(statement);
        } catch(err) {
            throw "internal_server_error";
        }
    }
}