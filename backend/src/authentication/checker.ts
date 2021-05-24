import { Request, Response, NextFunction } from 'express';
import FirebaseAuthentication from '.';

const AUTHORIZED_DUMMY: boolean = false;

export default function CheckAuthentication(
    authenticationChecker: FirebaseAuthentication
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authToken = req.header('Auth-Token');
        if (await authenticationChecker.verifyToken(authToken)) {
            next();
        } else {
            res.status(403).send('Unauthorized!');
        }
    };
}
