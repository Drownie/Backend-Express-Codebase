import { v4 as uuidV4 } from 'uuid';

import { hashData, verifyPassword, ErrorMessageEnum, TimeUnitEnum, getCurrentTimestamp, TransactionTypeEnum } from "../../utils";
import { UserDatabase } from "./database";
import { CreateUserDTO, CreateUserResponse, CreateUserServiceDTO, GetMyAccountResponse, IUser, RequestLoginDTO, RequestLoginResponse, UpdateUserDTO, UpdateUserResponse } from "./user.interface";
import { FirebaseService } from '../../external/firebase';
import { TransactionService } from '../transaction/service';
import { CreateUserDataServiceDTO } from '../user_data/user_data.interface';
import { UserDataService } from '../user_data/service';

export class UserService {
    private static _UserService: _UserService;

    static getService() {
        if (this._UserService == null) {
            this._UserService = new _UserService();
        }
        return this._UserService;
    }
}

class _UserService {
    async createUser(payload: CreateUserDTO): Promise<CreateUserResponse> {
        try {
            let userId = uuidV4();
            const email = payload.email;
            const password = payload.password;
            const hash = await hashData(email, password);

            // Check if the email already taken
            let checkEmailResult = await UserDatabase.getDatabase().getUserByEmail(email);
            if (checkEmailResult.rowCount) {
                throw ErrorMessageEnum.EMAIL_ALREADY_TAKEN
            }

            // Register to firebase
            let firebaseEmail = userId + '@mamon.xyz';
            let firebaseData = await FirebaseService.getService().signUpWithEmail(firebaseEmail, password);
            let externalId = firebaseData.uid;
            let createUserPayload: CreateUserServiceDTO = {
                user_id: userId,
                email: email,
                hash: hash,
                external_id: externalId
            }

            let createUserResult = await UserDatabase.getDatabase().createUser(createUserPayload);
            if (createUserResult.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }

            let newUserData = createUserResult.rows[0];
            return { user_id: newUserData.user_id };
        } catch(err) {
            throw err;
        }
    }

    async requestLogin(payload: RequestLoginDTO): Promise<RequestLoginResponse> {
        try {
            const email = payload.email;
            const password = payload.password;

            let getUserResults = await UserDatabase.getDatabase().getUserByEmail(email);
            if (getUserResults.rowCount === 0) {
                throw ErrorMessageEnum.USER_NOT_FOUND;
            }
            let userData = getUserResults.rows[0];
            let hash = userData.hash;

            let verifyResult = await verifyPassword(email, password, hash);
            if (!verifyResult) {
                throw ErrorMessageEnum.UNAUTHORIZED;
            }

            let externalId = userData.external_id;
            let token = await FirebaseService.getService().requestCustomToken(externalId);
            return { token: token };
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async getUserDataByExternalId(externalId: string, isHard: boolean = false): Promise<IUser | undefined> {
        try {
            let getUserResults = await UserDatabase.getDatabase().getUserByExternalId(externalId);
            if (getUserResults.rowCount === 0) {
                if (isHard) {
                    throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
                } else {
                    return undefined;
                }
            }

            return getUserResults.rows[0];
        } catch(err) {
            throw err;
        }
    }

    async getMyAccount(externalId: any, query: any): Promise<GetMyAccountResponse> {
        try {
            let user = await this.getUserDataByExternalId(externalId, true);
            let userId = user!.user_id;

            let timeUnit: TimeUnitEnum = query.timeUnit || TimeUnitEnum.MONTH;
            let timeAmount: number = query.timeAmount || 1;

            let startTime = getCurrentTimestamp().subtract(timeAmount, timeUnit).startOf(TimeUnitEnum.DAY).toISOString();
            let endTime = getCurrentTimestamp().endOf(TimeUnitEnum.DAY).toISOString();

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
            const currentBalance = getUserData.balance;

            let expenseQuery = {
                start_time: startTime,
                end_time: endTime,
                transaction_type: TransactionTypeEnum.EXPENSE
            }
            let expenseTotal = await TransactionService.getService().getTransactionSum(userId, expenseQuery);

            let incomeQuery = {
                start_time: startTime,
                end_time: endTime,
                transaction_type: TransactionTypeEnum.INCOME
            }
            let incomeTotal = await TransactionService.getService().getTransactionSum(userId, incomeQuery);

            return {expense_total: expenseTotal, income_total: incomeTotal, current_balance: currentBalance, name: user?.name};
        } catch(err) {
            throw err;
        }
    }

    async UpdateUser(externalId: any, payload: UpdateUserDTO): Promise<UpdateUserResponse> {
        try {
            let user = await this.getUserDataByExternalId(externalId, true);
            let userId = user!.user_id;

            let updateUserResult = await UserDatabase.getDatabase().updateUser(userId, payload);
            if (updateUserResult.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }

            return { user_id: userId, name: payload.name };
        } catch(err) {
            throw err;
        }
    }
}