import { ErrorBuilder } from "../../common/errorBuilder";
import { UserDatabase } from "./database";

export class UserService {
    private static userDatabase = new UserDatabase();

    static async getUserList() {
        try {
            return await this.userDatabase.getUserList();
        } catch(err) {
            throw new ErrorBuilder('internal_server_error', 500);
        }
    }   
}