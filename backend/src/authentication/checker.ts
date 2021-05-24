import { Request, Response, NextFunction } from 'express';
import FirebaseAuthentication from '.';

const AUTHORIZED_DUMMY: boolean = false;

export default function CheckAuthentication(
    authenticationChecker: FirebaseAuthentication
) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (AUTHORIZED_DUMMY) {
            next();
        } else {
            res.status(403).send('Unauthorized!');
        }
    };
}
