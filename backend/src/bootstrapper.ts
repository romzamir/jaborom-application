import { Router } from 'express';

//#region Db
import MySqlDbConnection from './db/implementations/mysql/DbConnection';

//#endregion
//#region Authentication
import IAuthenticationValidator from './authentication/abstractions/authenticationValidator';
import FirebaseAuthenticationValidator from './authentication/firebase/authenticationValidator';
import MockAuthenticationValidator from './authentication/mock/authenticationValidator';
import FirebaseCheckAuthenticationRoute from './authentication/checkAuthenticationRoute';
//#endregion
//#region Routers
import VerifyTokenRouter from './routers/verifyToken.router';
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
    const verifyTokenRouter = VerifyTokenRouter();
    //#endregion
    //#region Authentication
    const authenticationValidator: IAuthenticationValidator =
        new MockAuthenticationValidator();
    const checkAuthenticationRoute = FirebaseCheckAuthenticationRoute(
        authenticationValidator
    );
    //#endregion

    router.use('/', checkAuthenticationRoute);
    router.use('/verifyToken', verifyTokenRouter);

    return router;
}
