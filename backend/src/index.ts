import Express from 'express';
import cors from 'cors';
import HttpStatus from 'http-status';

import {CROSS_ORIGIN_ALLOWED_ORIGINS, PORT} from './core/config/app.config';

import Bootstrap from './bootstrapper';

require('dotenv').config({path: './.env'});

const app = Express();
app.use(cors({origin: CROSS_ORIGIN_ALLOWED_ORIGINS}));
app.use(Express.json());

app.get('/ok', (_req, res) => {
    res.sendStatus(HttpStatus.OK);
});

Bootstrap().then((router) => {
    app.use('/', router);
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
