export enum ErrorMessageEnum {
    UNAUTHORIZED = "unauthorized",
    FORBIDDEN = "forbidden",
    AUTHENTICATION_ERROR = "authentication error",
    USER_NOT_FOUND = "user not found",
    INTERNAL_SERVER_ERROR = "internal server error",
    NO_AUTHORIZATION_TOKEN = "no authorization token",
    TOKEN_EXPIRED = "token expired",
    TRANSACTION_NOT_FOUND = "transaction not found",
    EMAIL_ALREADY_TAKEN = "email already taken"
}

export enum OrderByEnum {
    ASC = "ASC",
    DESC = "DESC"
}

export enum TransactionTypeEnum {
    INCOME = 'income',
    EXPENSE = 'expense'
}

export enum CategoryTypeEnum {
    INCOME_SALARY = "income_salary",
    INCOME_BUSINESS = "income_business",
    INCOME_GIFT = "income_gift",
    EXPENSE_HOUSING = "expense_housing",
    EXPENSE_FOOD = "expense_food",
    EXPENSE_TRANSPORTATION = "expense_transportation",
    EXPENSE_UTILITIES = "expense_utilities",
    EXPENSE_ENTERTAINMENT = "expense_entertainment",
    EXPENSE_HEALTHCARE = "expense_healthcare",
    EXPENSE_EDUCATION = "expense_education",
    EXPENSE_SAVINGS = "expense_savings",
    EXPENSE_OTHER = "expense_other"
}

export enum ItemTypeEnum {
    ARRAY = "array",
    NUMBER = "number",
    BOOLEAN = "boolean",
    STRING = "string",
    OBJECT = "object",
    OTHER = "other"
}

export enum TimeUnitEnum {
    DAY = 'day',
    MONTH = 'month'
}