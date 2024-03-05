export interface IUser {
    user_id: string,
    name: string,
    email: string,
    hash: string,
    external_id: string,
    is_deleted: boolean,
    created_timestamp?: any,
    updated_timestamp?: any
}

export interface CreateUserServiceDTO {
    user_id: string,
    email: string,
    external_id: string,
    hash: string
}

export interface CreateUserDTO {
    email: string,
    password: string,
    confirm_password: string
}

export interface CreateUserResponse {
    user_id: string
}

export interface RequestLoginDTO {
    email: string,
    password: string
}

export interface RequestLoginResponse {
    token: string
}

export interface GetMyAccountResponse {
    name: any,
    income_total: number,
    expense_total: number,
    current_balance: number  
}

export interface UpdateUserDTO {
    name: string
}

export interface UpdateUserResponse {
    user_id: string,
    name: string
}