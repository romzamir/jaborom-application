import { Request, Response, NextFunction } from 'express';

import IAuthenticationValidator from './authenticationValidator';

export type CheckAuthenticationRoute = (
    authenticationValidator: IAuthenticationValidator
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
