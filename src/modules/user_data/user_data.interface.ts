export interface IUserData {
    user_data_id: string,
    user_id: string,
    balance: number,
    is_deleted: boolean,
    created_timestamp: any,
    updated_timestamp: any
}

export interface CreateUserDataServiceDTO {
    user_id: string,
    balance: number
}

export interface UpdateUserDataServiceDTO {
    balance: number
}

export interface UpdateUserDataFilterDTO {
    user_data_id: string,
    user_id: string
}