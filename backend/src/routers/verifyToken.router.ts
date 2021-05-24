import { Router } from 'express';
import HttpStatus from 'http-status';

export default function VerifyTokenRouter(): Router {
    const router = Router();
    router.get('/', (_req, res) => {
        res.status(HttpStatus.OK);
        res.end();
    });

    return router;
}
