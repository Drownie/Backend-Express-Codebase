import { DataSource } from "typeorm";
import { setting } from './config/setting';

import { UserEntity } from './modules/user/user.entity';


const appDataSource = new DataSource({
    type: 'postgres',
    host: setting.databaseHost,
    port: Number(setting.databasePort),
    username: setting.databaseUsername,
    password: setting.databasePassword,
    database: setting.databaseName,
    synchronize: false,
    logging: true, // Can be false
    entities: [
        UserEntity,
    ],
    cache: true,
    migrations: [`src/migrations/*.ts`],
    subscribers: [],
    useUTC: true,
});

export default appDataSource;