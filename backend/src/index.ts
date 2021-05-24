import Express from 'express';
import HttpStatus from 'http-status';

import { PORT } from './core/config/app.config';

import Bootstrap from './bootstrapper';

require('dotenv').config({ path: './.env' });

const app = Express();
app.use(Express.json());

app.get('/ok', (req, res) => {
    res.sendStatus(HttpStatus.OK);
});

Bootstrap().then((router) => {
    app.use('/', router);
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
