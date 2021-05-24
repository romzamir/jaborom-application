import { Router } from 'express';

import MySqlDbConnection from './db/implementations/mysql/DbConnection';

import IAuthenticationValidator from './authentication/abstractions/authenticationValidator';
import { CheckAuthenticationRoute } from './authentication/abstractions/checkAuthenticationRoute.type';
import FirebaseAuthenticationValidator from './authentication/firebase/authenticationValidator';
import FirebaseCheckAuthenticationRoute from './authentication/firebase/checkAuthenticationRoute';

//#region Routers
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
    //#endregion

    //#region Authentication
    const authenticationValidator: IAuthenticationValidator =
        new FirebaseAuthenticationValidator();
    const checkAuthenticationRoute: CheckAuthenticationRoute =
        FirebaseCheckAuthenticationRoute(authenticationValidator);
    //#endregion

    router.use('/', checkAuthenticationRoute);

    return router;
}
