import dataSource from '../../data-source';
import { UserEntity } from "./user.entity";
import { ErrorBuilder } from "../../common/errorBuilder";

export class UserDatabase {
    async getUserList() {
        try {
            return await dataSource
                .getRepository(UserEntity)
                .createQueryBuilder("user")
                .getMany();
        } catch(err) {
            // Add Log Here
            throw new ErrorBuilder('internal_server_error', 500);
        }
    }

    async findUserById(userId: number) {
        try {
            return await dataSource
                .getRepository(UserEntity)
                .createQueryBuilder("user")
                .where("user.id = :id", { id: userId })
                .getOne();
        } catch(err) {
            // Add Log Here
            throw new ErrorBuilder('internal_server_error', 500);
        }
    }
}