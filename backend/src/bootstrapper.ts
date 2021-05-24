import { Router } from 'express';

import MySqlDbConnection from './db/implementations/mysql/DbConnection';

import FirebaseAuthentication from './authentication/firebaseAuthentication';
import AuthenticationChecker from './authentication';

//#region Routers
//#endregion

import * as DbConfig from './core/config/db.config';

export default async function Boot(): Promise<Router> {
    const router = Router();

    const firebaseAuthentication = new FirebaseAuthentication();

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
    //#endregion

    router.use('/', AuthenticationChecker(firebaseAuthentication));

    return router;
}
