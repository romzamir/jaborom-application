import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';

import { Sibling } from '../core/types/sibling.type';
import ISiblingsDbTable from '../db/abstractions/types/siblings.dbTables';

export default function SiblingsRouter(dbTable: ISiblingsDbTable): Router {
    const router = Router();

    return router;
}
