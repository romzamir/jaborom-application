import { Router } from 'express';
import HttpStatus from 'http-status';

export async function LoginRouter(): Promise<Router> {
    const router = Router();

    router.get('/', (req, res) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.end();
    });

    return router;
}
