import Express from 'express';
import HttpStatus from 'http-status';

import { PORT } from './core/config/app.config';

const app = Express();
app.use(Express.json());

app.get('/ok', (req, res) => {
    res.sendStatus(HttpStatus.OK);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
