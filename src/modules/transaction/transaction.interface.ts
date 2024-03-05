import { CategoryTypeEnum, OrderByEnum, TransactionTypeEnum } from "../../utils"

export interface ITransaction {
    transaction_id: string,
    user_id: string,
    previous_balance: number,
    transaction_amount: number,
    current_balance: number,
    transaction_type: TransactionTypeEnum,
    category_type: CategoryTypeEnum,
    icon_url: string,
    is_deleted: boolean,
    created_timestamp?: any,
    updated_timestamp?: any
}

export interface ITransactionOut {
    transaction_id: string,
    user_id: string,
    transaction_amount: number,
    transaction_type: TransactionTypeEnum,
    category_type: CategoryTypeEnum,
    icon_url: string,
    created_timestamp: any,
    updated_timestamp: any
}

export interface CreateTransactionDTO {
    transaction_amount: number,
    transaction_type: TransactionTypeEnum,
    category_type: CategoryTypeEnum,
    icon_url: string
}

export interface CreateTransactionServiceDTO {
    user_id: string,
    previous_balance: number,
    transaction_amount: number,
    current_balance: number,
    transaction_type: TransactionTypeEnum,
    category_type: CategoryTypeEnum,
    icon_url: string,
    created_timestamp?: any,
    updated_timestamp?: any
}

export interface GetTransactionsFilterDTO {
    transaction_type?: string,
    category_type?: CategoryTypeEnum,
    user_id: string,
    start_timestamp: string,
    end_timestamp: string,
    is_deleted: boolean
}

export interface GetTransactionsQueryDTO {
    limit: number,
    offset: number,
    orderBy: OrderByEnum
}

export interface UpdateTransactionDTO {
    transaction_id: string,
    transaction_amount?: number,
    transaction_type?: TransactionTypeEnum,
    category_type?: CategoryTypeEnum,
    icon_url?: string
}

export interface UpdateTransactionServiceDTO {
    transaction_amount: number,
    current_balance: number,
    transaction_type: TransactionTypeEnum,
    category_type: CategoryTypeEnum,
    icon_url: string,
    is_deleted?: boolean
}

export interface CreateTransactionResponse {
    transaction_id: string
}

export interface GetTransactionsDetail {
    total_page: number,
    page: number,
    limit: number
}

export interface GetTransactionsResponse {
    detail: GetTransactionsDetail,
    data: ITransactionOut[]
}

export interface UpdateTransactionResponse {
    user_id: string
}

export interface DeleteTransactionResponse {
    user_id: string,
    transaction_id: string
}