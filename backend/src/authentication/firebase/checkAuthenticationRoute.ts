import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

import AuthenticationValidator from './authenticationValidator';

export default function CheckAuthentication(
    authenticationValidator: AuthenticationValidator
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authToken = req.header('Auth-Token');
        if (await authenticationValidator.verifyToken(authToken)) {
            next();
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized!');
        }
    };
}
