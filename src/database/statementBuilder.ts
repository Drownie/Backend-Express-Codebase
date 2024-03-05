import { IExtraParams, ItemTypeEnum, OrderByEnum, getCurrentTimestamp, getType } from "../utils";

export function queryBy(tableName: string, filters: any, extraParams?: IExtraParams): string {
    let limit = extraParams?.limit || 1000;
    let offset = extraParams?.offset || 0;
    let orderField = extraParams?.orderField || 'created_timestamp';
    let orderBy = extraParams?.orderBy || OrderByEnum.DESC;
    let alias = extraParams?.alias || '';
    let select = extraParams?.select || '*';
    let join = extraParams?.join;

    let filterStatementBuilder = [];
    for (let key in filters) {
        let filterValue = filters[key];
        
        let value: any;
        if (getType(filterValue) === ItemTypeEnum.NUMBER) {
            value = filterValue
        } else if (getType(filterValue) === ItemTypeEnum.ARRAY) {
            let valueString = filterValue.map((id: any) => `'${id}'`).join();
            value = `in (${valueString})`;
        } else {
            value = `'${filterValue}'`;
        }

        let filterStatement: string;
        if (filterValue !== null) {
            filterStatement = `"${tableName}"."${key}" = ${value}`;
        } else {
            filterStatement = `"${tableName}"."${key}" is null`;
        }

        filterStatementBuilder.push(filterStatement);
    }

    let statement = `SELECT ${select} FROM "${tableName}" ${alias} `;
    let filterStatement = filterStatementBuilder.join(' AND ');
    if (join) {
        statement += join;
    }

    if (filterStatementBuilder.length > 0) {
        statement += `WHERE ${filterStatement}`;
    }

    statement += `ORDER BY ${orderField} ${orderBy} LIMIT ${limit} OFFSET ${offset}`;
    return statement;
}

export function insertOne(tableName: string, data: any): string {
    let keys = [];
    let values = [];
    for (let key in data) {
        let value = data[key];
        if (value !== null) {
            keys.push(key.toString());

            if (getType(value) === ItemTypeEnum.NUMBER || getType(value) === ItemTypeEnum.BOOLEAN) {
                values.push(value);
            } else if (getType(value) === ItemTypeEnum.ARRAY) {
                let joinedValue = value.join("','");
                values.push(`ARRAY ['${joinedValue}']`);
            } else {
                values.push(`'${value}'`);
            }
        }
    }
    return `INSERT INTO "${tableName}" (` + '"' + `${keys.join('","')}") 
                VALUES (${values.join(",")}) RETURNING *`;
}

export function updateOne(data: any, tableName: string, primaryKey: string, primaryKeyValue: string): string {
    let statement = `UPDATE "${tableName}" SET `;
    let updateData = [];

    data['updated_timestamp'] = getCurrentTimestamp().toISOString();
    for (let key in data) {
        let value = data[key];

        if (getType(value) === ItemTypeEnum.BOOLEAN || getType(value) === ItemTypeEnum.NUMBER) {
            updateData.push(`"${key}" = ${value}`);
        } else {
            updateData.push(`"${key}" = '${value}'`);
        }
    }

    statement += updateData.join(',');
    statement += ` WHERE "${primaryKey}" = '${primaryKeyValue}' RETURNING *`;
    return statement;
}

export function updateOneWithFilters(data: any, tableName: string, filters: any): string {
    let statement = `UPDATE "${tableName}" SET `;
    let updateData = [];

    data["updated_timestamp"] = getCurrentTimestamp().toISOString();
    for (let key in data) {
        let value = data[key];

        if (getType(value) === ItemTypeEnum.BOOLEAN || getType(value) === ItemTypeEnum.NUMBER) {
            updateData.push(`"${key}" = ${value}`);
        } else {
            updateData.push(`"${key}" = '${value}'`);
        }
    }

    statement += updateData.join(",");
    
    let filterStatementBuilder = [];
    for (let filterKey in filters) {
        let filterValue = filters[filterKey];

        let value: any;
        if (getType(filterValue) === ItemTypeEnum.NUMBER) {
            value = filterValue
        } else if (getType(filterValue) === ItemTypeEnum.ARRAY) {
            let valueString = filterValue.map((id: any) => `'${id}'`).join();
            value = `in (${valueString})`;
        } else {
            value = `'${filterValue}'`;
        }

        let filterStatement: string;
        if (filterValue !== null) {
            filterStatement = `"${tableName}"."${filterKey}" = ${value}`;
        } else {
            filterStatement = `"${tableName}"."${filterKey}" is null`;
        }

        filterStatementBuilder.push(filterStatement);
    }
   
    statement += ` WHERE ${filterStatementBuilder.join(" AND ")}  RETURNING *`;
    return statement;
}