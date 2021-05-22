import { Router } from 'express';

import MySqlDbConnection from './db/implementations/mysql/DbConnection';

//#region Routers
import { LoginRouter } from './routers/login.router';
//#endregion

import * as DbConfig from './core/config/db.config';

export default async function Boot(): Promise<Router> {
    const router = Router();

    //#region Db
    const dbConnection = new MySqlDbConnection();
    try {
        await dbConnection.connect({
            host: DbConfig.HOSTNAME,
            port: DbConfig.PORT,
            user: DbConfig.USER,
            password: DbConfig.PASSWORD,
            database: DbConfig.DATABASE,
        });
        console.log('Connected to database!');
    } catch (err) {
        console.error(err);
    }
    //#endregion
    //#region Routers
    const loginRouter = await LoginRouter();
    //#endregion

    router.use('/login', loginRouter);

    return router;
}
