import {Request, Response, NextFunction} from 'express';
import HttpStatus from 'http-status';

import IAuthenticationValidator from './abstractions/authenticationValidator';

export default function CheckAuthentication(
    authenticationValidator: IAuthenticationValidator
) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const authToken = req.header('Auth-Token');
        if (!authToken) {
            res.status(HttpStatus.UNAUTHORIZED).send('No Token Specified!');
        } else if (await authenticationValidator.verifyToken(authToken)) {
            next();
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized!');
        }
    };
}
