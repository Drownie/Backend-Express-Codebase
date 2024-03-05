import { ErrorMessageEnum } from "../../utils";
import { UserDataDatabase } from "./database";
import { CreateUserDataServiceDTO, IUserData, UpdateUserDataFilterDTO, UpdateUserDataServiceDTO } from './user_data.interface';

export class UserDataService {
    private static _UserDataService: _UserDataService;

    static getService() {
        if (this._UserDataService == null) {
            this._UserDataService = new _UserDataService();
        }
        return this._UserDataService;
    }
}

class _UserDataService {
    async getUserDataByUserId(userId: string, isHard: boolean = false): Promise<IUserData | undefined> {
        try {
            let getUserDataResult = await UserDataDatabase.getDatabase().getUserDataByUserId(userId);
            if (getUserDataResult.rowCount === 0) {
                if (isHard) {
                    throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
                } else {
                    return undefined;
                }
            }

            return getUserDataResult.rows[0];
        } catch(err) {
            throw err;
        }
    }

    async createUserData(payload: CreateUserDataServiceDTO): Promise<IUserData> {
        try {
            let createUserDataResults = await UserDataDatabase.getDatabase().createUserData(payload);
            if (createUserDataResults.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }
            
            return createUserDataResults.rows[0];
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async updateUserData(payload: UpdateUserDataServiceDTO, filters: UpdateUserDataFilterDTO): Promise<IUserData> {
        try {
            let updateUserDataResults = await UserDataDatabase.getDatabase().updateUserData(payload, filters);
            if (updateUserDataResults.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }
            
            return updateUserDataResults.rows[0];
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async updateUserDataByUserId(userId: string, payload: UpdateUserDataServiceDTO): Promise<IUserData> {
        try {
            let updateUserDataResults = await UserDataDatabase.getDatabase().updateUserDataByUserId(userId, payload);
            if (updateUserDataResults.rowCount === 0) {
                throw ErrorMessageEnum.INTERNAL_SERVER_ERROR;
            }
            
            return updateUserDataResults.rows[0];
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async updateUserDataByUserIdStatement(userId: string, payload: UpdateUserDataServiceDTO): Promise<string> {
        try {
            return UserDataDatabase.getDatabase().updateUserDataByUserIdStatement(userId, payload)
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}