import { Router } from 'express';

//#region Db
import MySqlDbConnection from './db/implementations/mysql/DbConnection';
import IProfilesDbTable from './db/abstractions/types/profiles.dbTable';
import ProfilesMySqlDbTable from './db/implementations/mysql/types/profiles.dbTable';
import ISiblingsDbTable from './db/abstractions/types/siblings.dbTables';
import SiblingsMySqlDbTable from './db/implementations/mysql/types/siblings.dbTable';
//#endregion
//#region Providers
import IProfilesProvider from './providers/abstractions/types/profiles.provider';
import ProfilesProvider from './providers/implementations/profiles.provider';
//#endregion
//#region Authentication
import IAuthenticationValidator from './authentication/abstractions/authenticationValidator';
import FirebaseAuthenticationValidator from './authentication/firebase/authenticationValidator';
import MockAuthenticationValidator from './authentication/mock/authenticationValidator';
import FirebaseCheckAuthenticationRoute from './authentication/checkAuthenticationRoute';
//#endregion
//#region Routers
import VerifyTokenRouter from './routers/verifyToken.router';
import ProfilesRouter from './routers/profiles.router';
import SiblingsRouter from './routers/siblings.router';
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

    const profilesDbTable: IProfilesDbTable = new ProfilesMySqlDbTable(
        'Profiles',
        dbConnection
    );
    const siblingsDbTable: ISiblingsDbTable = new SiblingsMySqlDbTable(
        'Siblings',
        dbConnection
    );
    //#endregion
    //#region Providers
    const profilesProvider: IProfilesProvider = new ProfilesProvider(
        profilesDbTable,
        siblingsDbTable
    );
    //#endregion
    //#region Routers
    const verifyTokenRouter = VerifyTokenRouter();
    const siblingsRouter = SiblingsRouter(profilesProvider);
    const profilesRouter = ProfilesRouter(profilesProvider, siblingsRouter);
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
    router.use('/profiles', profilesRouter);

    return router;
}
