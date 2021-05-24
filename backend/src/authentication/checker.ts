import { Request, Response, NextFunction } from 'express';

const AUTHORIZED_DUMMY: boolean = false;

export default function CheckAuthentication(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (AUTHORIZED_DUMMY) {
        next();
    } else {
        res.status(403).send('Unauthorized!');
    }
}
