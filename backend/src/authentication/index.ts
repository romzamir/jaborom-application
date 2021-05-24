import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

import FirebaseAuthentication from './firebaseAuthentication';

export default function CheckAuthentication(
    authenticationChecker: FirebaseAuthentication
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authToken = req.header('Auth-Token');
        if (await authenticationChecker.verifyToken(authToken)) {
            next();
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized!');
        }
    };
}
