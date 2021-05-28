import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';

import { Sibling } from '../core/types/sibling.type';
import ISiblingsDbTable from '../db/abstractions/types/siblings.dbTables';

export default function SiblingsRouter(dbTable: ISiblingsDbTable): Router {
    const router = Router();

    router.get('/:id', async (req, res) => {
        try {
            const result = await dbTable.getSiblings({
                key: 'id',
                condition: {
                    name: 'equals',
                    value: req.params.id,
                },
            });

            if (result.length === 0) {
                res.status(HttpStatus.NOT_FOUND);
            } else {
                res.json(result);
            }
        } catch {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        res.end();
    });

    return router;
}
