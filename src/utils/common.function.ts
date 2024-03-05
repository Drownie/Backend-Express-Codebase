import BCrypt from 'bcrypt';
import moment from 'moment-timezone';
import { ItemTypeEnum } from './common.enum';

export async function hashData(email: string, password: string): Promise<string> {
    let salt = await BCrypt.genSalt();
    let newPassword = email + password;
    return BCrypt.hash(newPassword, salt);
}

export async function verifyPassword(email: string, password: string, hash: string): Promise<boolean> {
    let currentPassword = email + password;
    return BCrypt.compare(currentPassword, hash);
}

export function getCurrentTimestamp(timezone: string = 'Asia/Jakarta'): moment.Moment {
    return moment().tz(timezone);
}

export function formatDateToTimestamp(date: string, timezone: string = 'Asia/Jakarta'): moment.Moment {
    return moment(date, 'YYYY-MM-DD').tz(timezone);
}

export function getType(item: any): ItemTypeEnum {
    if (Array.isArray(item)) {
        return ItemTypeEnum.ARRAY;
    } else if (typeof item === ItemTypeEnum.NUMBER) {
        return ItemTypeEnum.NUMBER;
    } else if (typeof item === ItemTypeEnum.BOOLEAN) {
        return ItemTypeEnum.BOOLEAN;
    } else if (typeof item === ItemTypeEnum.STRING) {
        return ItemTypeEnum.STRING;
    } else if (typeof item === ItemTypeEnum.OBJECT) {
        return ItemTypeEnum.OBJECT;
    } else {
        return ItemTypeEnum.OTHER;
    }
}