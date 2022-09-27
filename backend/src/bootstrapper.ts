import {Router} from 'express';

//#region Db
import MSSqlDbConnection from './db/implementations/mssql/DbConnection';
import IProfilesDbTable from './db/abstractions/types/profiles.dbTable';
import ProfilesMSSqlDbTable from './db/implementations/mssql/types/profiles.dbTable';
import ISiblingsDbTable from './db/abstractions/types/siblings.dbTables';
import SiblingsMSSqlDbTable from './db/implementations/mssql/types/siblings.dbTable';
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
    const dbConnection = new MSSqlDbConnection();
    try {
        await dbConnection.connect({
            server: DbConfig.HOSTNAME,
            port: DbConfig.PORT,
            user: DbConfig.USER,
            password: DbConfig.PASSWORD,
            database: DbConfig.DATABASE,
        });
        console.log('Connected to database!');
    } catch (err) {
        console.error(err);
    }

    const profilesDbTable: IProfilesDbTable = new ProfilesMSSqlDbTable(
        'profiles',
        dbConnection,
    );
    const siblingsDbTable: ISiblingsDbTable = new SiblingsMSSqlDbTable(
        'siblings',
        dbConnection,
    );
    //#endregion
    //#region Providers
    const profilesProvider: IProfilesProvider = new ProfilesProvider(
        profilesDbTable,
        siblingsDbTable,
    );
    //#endregion
    //#region Routers
    const verifyTokenRouter = VerifyTokenRouter();
    const siblingsRouter = SiblingsRouter(profilesProvider);
    const profilesRouter = ProfilesRouter(profilesProvider, siblingsRouter);
    //#endregion
    //#region Authentication
    const authenticationValidator: IAuthenticationValidator =
        new FirebaseAuthenticationValidator();
    const checkAuthenticationRoute = FirebaseCheckAuthenticationRoute(
        authenticationValidator,
    );
    //#endregion

    router.use('/', checkAuthenticationRoute);
    router.use('/verifyToken', verifyTokenRouter);
    router.use('/profiles', profilesRouter);

    return router;
}
