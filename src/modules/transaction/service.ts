import { QueryResult } from "pg";
import { ErrorMessageEnum, OrderByEnum, TimeUnitEnum, TransactionTypeEnum, formatDateToTimestamp, getCurrentTimestamp } from "../../utils";
import { UserDataService } from "../user_data/service";
import { CreateUserDataServiceDTO, IUserData, UpdateUserDataFilterDTO, UpdateUserDataServiceDTO } from "../user_data/user_data.interface";
import { UserService } from "../users/service";
import { TransactionDatabase } from "./database";
import { CreateTransactionDTO, CreateTransactionResponse, CreateTransactionServiceDTO, DeleteTransactionResponse, GetTransactionsDetail, GetTransactionsFilterDTO, GetTransactionsQueryDTO, GetTransactionsResponse, UpdateTransactionDTO, UpdateTransactionResponse, UpdateTransactionServiceDTO } from './transaction.interface';

export class TransactionService {
    private static _TransactionService: _TransactionService;

    static getService() {
        if (this._TransactionService == null) {
            this._TransactionService = new _TransactionService();
        }
        return this._TransactionService;
    }
}

class _TransactionService {
    async createTransaction(externalId: any, payload: CreateTransactionDTO): Promise<CreateTransactionResponse> {
        try {
            // Begin transactional
            await TransactionDatabase.getDatabase().execute("BEGIN");

            // Get User Data
            let user = await UserService.getService().getUserDataByExternalId(externalId, true);
            let userId = user!.user_id;

            // Check user data
            let getUserData = await UserDataService.getService().getUserDataByUserId(userId);
            if (!getUserData) {
                let createUserDataPayload: CreateUserDataServiceDTO = {
                    user_id: userId,
                    balance: 0
                };
                getUserData = await UserDataService.getService()
                    .createUserData(createUserDataPayload);
            }
            const userDataId = getUserData.user_data_id;
            const currentBalance = getUserData.balance;
            const currentTimestamp = getCurrentTimestamp().toISOString();

            const transactionAmount = payload.transaction_amount;
            const categoryType = payload.category_type;
            const transactionType = payload.transaction_type;
            const iconUrl = payload.icon_url;

            let updatedBalance = currentBalance;
            if (transactionType === TransactionTypeEnum.INCOME) {
                updatedBalance = currentBalance + transactionAmount;
            } else {
                updatedBalance = currentBalance - transactionAmount;
            }

            // create transaction
            let createTransactionPayload: CreateTransactionServiceDTO = {
                user_id: userId,
                previous_balance: currentBalance,
                transaction_amount: transactionAmount,
                category_type: categoryType,
                current_balance: updatedBalance,
                transaction_type: transactionType,
                icon_url: iconUrl,
                created_timestamp: currentTimestamp,
                updated_timestamp: currentTimestamp
            };
            let createTransactionResult = await TransactionDatabase.getDatabase()
                .createTransaction(createTransactionPayload);
            if (createTransactionResult.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }

            let transactionData = createTransactionResult.rows[0];
            let transactionId = transactionData.transaction_id;

            // update user data
            let updateUserDataPayload: UpdateUserDataServiceDTO = {
                balance: updatedBalance
            };
            let updateUserDataFilter: UpdateUserDataFilterDTO = {
                user_data_id: userDataId,
                user_id: userId
            }

            await UserDataService.getService().updateUserData(updateUserDataPayload, updateUserDataFilter);
            
            // Commit Transaction
            await TransactionDatabase.getDatabase().execute("COMMIT");
            return {transaction_id: transactionId};
        } catch(err) {
            await TransactionDatabase.getDatabase().execute("ROLLBACK");
            throw err;
        }
    }

    async getTransactions(externalId: any, query: any): Promise<GetTransactionsResponse> {
        try {
            // Get user
            let user = await UserService.getService().getUserDataByExternalId(externalId, true);
            let userId = user!.user_id;

            // Create get transaction query
            let limit: number = query.limit || 5;
            let page: number = query.page || 0;
            let offset = page * limit;
            let orderBy: OrderByEnum = query.orderBy || OrderByEnum.DESC;
            let getTransactionQuery: GetTransactionsQueryDTO = {
                limit: limit,
                offset: offset,
                orderBy: orderBy
            };

            // Create get transaction filter
            let transactionType = query.transaction_type || undefined;
            let categoryType = query.category_type || undefined;
            let startTime = query.start_date;
            let endTime = query.end_date;
            let startTimestamp = formatDateToTimestamp(startTime).startOf(TimeUnitEnum.DAY).toISOString() || getCurrentTimestamp().startOf(TimeUnitEnum.DAY).toISOString();
            let endTimestamp = formatDateToTimestamp(endTime).endOf(TimeUnitEnum.DAY).toISOString() || getCurrentTimestamp().endOf(TimeUnitEnum.DAY).toISOString();
            let getTransactionFilter: GetTransactionsFilterDTO = {
                start_timestamp: startTimestamp,
                end_timestamp: endTimestamp,
                user_id: userId,
                category_type: categoryType,
                transaction_type: transactionType,
                is_deleted: false
            };

            let getAllTransactionResults = await TransactionDatabase.getDatabase().getAllTransaction(getTransactionFilter, getTransactionQuery);
            let getAllTransactionCount = await TransactionDatabase.getDatabase().getAllTransactionCount(getTransactionFilter);
            let outputDetail: GetTransactionsDetail = {
                limit: limit,
                page: page,
                total_page: 0
            }

            if (getAllTransactionResults.rowCount === 0) {
                return { detail: outputDetail, data: [] };
            }

            let dataCount = getAllTransactionCount.rows[0]['count'];
            let totalPage = Math.ceil( dataCount / limit );
            outputDetail.total_page = totalPage;

            return { detail: outputDetail, data: getAllTransactionResults.rows };
        } catch(err) {
            throw err;
        }
    }

    async getTransactionSum(userId: string, query: any): Promise<number> {
        try {
            // Create get transaction filter
            let transactionType = query.transaction_type || undefined;
            let categoryType = query.category_type || undefined;
            let startTimestamp = query.start_time;
            let endTimestamp = query.end_time;
            
            let getTransactionFilter: GetTransactionsFilterDTO = {
                start_timestamp: startTimestamp,
                end_timestamp: endTimestamp,
                user_id: userId,
                category_type: categoryType,
                transaction_type: transactionType,
                is_deleted: false
            };

            let getAllTransactionSum = await TransactionDatabase.getDatabase().getAllTransactionSum(getTransactionFilter);
            if (getAllTransactionSum.rowCount === 0) {
                return 0;
            }
            return getAllTransactionSum.rows[0]['sum'];
        } catch(err) {
            throw err;
        }
    }

    async updateTransaction(externalId: any, payload: UpdateTransactionDTO): Promise<UpdateTransactionResponse> {
        try {
            await TransactionDatabase.getDatabase().execute("BEGIN");

            // Get user
            let user = await UserService.getService().getUserDataByExternalId(externalId, true);
            let userId = user!.user_id;

            let transactionId = payload.transaction_id;
            let getTransactionFilters = {
                user_id: userId,
                transaction_id: transactionId,
                is_deleted: false
            };
            let getTransactionData = await TransactionDatabase.getDatabase().getTransactionByFilters(getTransactionFilters);
            if (getTransactionData.rowCount === 0) {
                throw ErrorMessageEnum.TRANSACTION_NOT_FOUND
            }

            let userBalanceData = await UserDataService.getService().getUserDataByUserId(userId, true);
            let userBalanceAmount = userBalanceData!.balance;

            let previousTransactionData = getTransactionData.rows[0];
            let previousTransactionAmount = previousTransactionData.transaction_amount;
            let previousTransactionType = previousTransactionData.transaction_type;
            let previousTransactionPrevBalance = previousTransactionData.previous_balance;

            let currentTransactionType = payload.transaction_type || previousTransactionData.transaction_type;
            let currentCategoryType = payload.category_type || previousTransactionData.category_type;
            let transactionAmount = payload.transaction_amount || previousTransactionAmount;
            let iconUrl = payload.icon_url || previousTransactionData.icon_url;

            let [ currentBalance, updatedPreviousCurrentBalance ] = this.getUserUpdatedBalance(
                previousTransactionType,
                currentTransactionType,
                previousTransactionAmount,
                transactionAmount,
                userBalanceAmount,
                previousTransactionPrevBalance
            );

            // Update Transaction by Id
            let updateTransactionPayload: UpdateTransactionServiceDTO = {
                category_type: currentCategoryType,
                transaction_type: currentTransactionType,
                transaction_amount: transactionAmount,
                current_balance: updatedPreviousCurrentBalance,
                icon_url: iconUrl
            };

            let updateTransactionResult = await TransactionDatabase.getDatabase().updateTransactionById(transactionId, updateTransactionPayload);
            if (updateTransactionResult.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }

            // Update User Balance data
            let updateUserBalancePayload: UpdateUserDataServiceDTO = {
                balance: currentBalance
            }

            let updateUserBalanceStatement: string = await UserDataService
                .getService().updateUserDataByUserIdStatement(userId, updateUserBalancePayload);

            let updateUserBalanceResult: QueryResult<IUserData> = await TransactionDatabase.getDatabase()
                .execute(updateUserBalanceStatement);

            if (updateUserBalanceResult.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }
            
            // Commit Transaction
            await TransactionDatabase.getDatabase().execute("COMMIT");

            return { user_id: userId };
        } catch(err) {
            await TransactionDatabase.getDatabase().execute("ROLLBACK");
            throw err;
        }
    }

    private getUserUpdatedBalance(
        previousTransactionType: TransactionTypeEnum, 
        currentTransactionType: TransactionTypeEnum,
        previousTransactionAmount: number,
        transactionAmount: number,
        userBalanceAmount: number,
        previousTransactionPrevBalance: number
    ): [number, number] {
        let currentBalance = userBalanceAmount;
        let prevCurrentBalance = previousTransactionPrevBalance;

        if (previousTransactionType === TransactionTypeEnum.INCOME) { // Income -> current - prevAmount
            currentBalance -= previousTransactionAmount;
        } else { // Expense -> current + prevAmount
            currentBalance += previousTransactionAmount;
        }

        // Current balance
        if (currentTransactionType === TransactionTypeEnum.EXPENSE) {
            currentBalance -= transactionAmount;
            prevCurrentBalance -= transactionAmount;
        } else {
            currentBalance += transactionAmount;
            prevCurrentBalance += transactionAmount;
        }

        return [currentBalance, prevCurrentBalance];
    }

    async deleteTransaction(externalId: any, transactionId: string): Promise<DeleteTransactionResponse> {
        try {
            await TransactionDatabase.getDatabase().execute("BEGIN");

            // Get user
            let user = await UserService.getService().getUserDataByExternalId(externalId, true);
            let userId = user!.user_id;

            let getTransactionFilters = {
                user_id: userId,
                transaction_id: transactionId,
                is_deleted: false
            };
            let getTransactionData = await TransactionDatabase.getDatabase().getTransactionByFilters(getTransactionFilters);
            if (getTransactionData.rowCount === 0) {
                throw ErrorMessageEnum.TRANSACTION_NOT_FOUND
            }

            let transactionData = getTransactionData.rows[0];
            let categoryType = transactionData.category_type;
            let transactionType = transactionData.transaction_type;
            let transactionAmount = transactionData.transaction_amount;
            let currentBalance = transactionData.current_balance;
            let iconUrl = transactionData.icon_url;

            let userBalanceData = await UserDataService.getService().getUserDataByUserId(userId, true);
            let currentUserBalance = userBalanceData!.balance;
            if (transactionType === TransactionTypeEnum.EXPENSE) {
                currentUserBalance += transactionAmount;
            } else {
                currentUserBalance -= transactionAmount;
            }

            // Update Transaction by Id
            let updateTransactionPayload: UpdateTransactionServiceDTO = {
                category_type: categoryType,
                transaction_type: transactionType,
                transaction_amount: transactionAmount,
                current_balance: currentBalance,
                icon_url: iconUrl,
                is_deleted: true
            };
            let updateTransactionResult = await TransactionDatabase.getDatabase().updateTransactionById(transactionId, updateTransactionPayload);
            if (updateTransactionResult.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }

            // Update User Balance data
            let updateUserBalancePayload: UpdateUserDataServiceDTO = {
                balance: currentUserBalance
            }

            let updateUserBalanceStatement: string = await UserDataService
                .getService().updateUserDataByUserIdStatement(userId, updateUserBalancePayload);

            let updateUserBalanceResult: QueryResult<IUserData> = await TransactionDatabase.getDatabase()
                .execute(updateUserBalanceStatement);

            if (updateUserBalanceResult.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }
            
            // Commit Transaction
            await TransactionDatabase.getDatabase().execute("COMMIT");

            return { user_id: userId, transaction_id: transactionId };
        } catch(err) {
            await TransactionDatabase.getDatabase().execute("ROLLBACK");
            throw err;
        }
    }
}