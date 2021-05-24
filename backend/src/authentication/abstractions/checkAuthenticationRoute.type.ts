import { Request, Response, NextFunction } from 'express';

import IAuthenticationValidator from './authenticationValidator';

export type CheckAuthenticationRoute = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

export type CheckAuthenticationRouteConstructor = (
    authenticationValidator: IAuthenticationValidator
) => CheckAuthenticationRoute;
