import BCrypt from 'bcrypt';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function hashData(email: string, password: string): Promise<string> {
    let salt = await BCrypt.genSalt();
    let newPassword = email + password;
    return BCrypt.hash(newPassword, salt);
}

export async function verifyPassword(email: string, password: string, hash: string): Promise<boolean> {
    let currentPassword = email + password;
    return BCrypt.compare(currentPassword, hash);
}

export function getCurrentTimestamp(tz: string = 'UTC') {
    return dayjs.tz(tz);
}
