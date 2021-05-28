import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';

import { Sibling } from '../core/types/sibling.type';
import ISiblingsDbTable from '../db/abstractions/types/siblings.dbTables';

export default function SiblingsRouter(dbTable: ISiblingsDbTable): Router {
    const router = Router();

    router.get('/:profileId', async (req, res) => {
        try {
            const result = await dbTable.getSiblings({
                key: 'profileId',
                condition: {
                    name: 'equals',
                    value: req.params.profileId,
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

    router.post('/:profileId', async (req, res) => {
        const siblings: Sibling | Sibling[] = req.body;
        if (!siblings) {
            res.status(HttpStatus.BAD_REQUEST);
        } else {
            if (Array.isArray(siblings)) {
                res.json(await dbTable.insertSiblings(siblings));
            } else {
                res.json(await dbTable.insertSibling(siblings));
            }
        }

        res.end();
    });

    return router;
}
