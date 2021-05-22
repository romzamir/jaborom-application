import { Router } from 'express';

//#region Routers
import { LoginRouter } from './routers/login.router';
//#endregion

export default async function Boot(): Promise<Router> {
    const router = Router();

    //#region Routers
    const loginRouter = await LoginRouter();
    //#endregion

    router.use('/login', loginRouter);

    return router;
}
