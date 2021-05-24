import { Request, Response, Router } from 'express';
import IProfilesDbTable from '../db/abstractions/types/profiles.dbTable';

export default function ProfilesRouter(dbTable: IProfilesDbTable): Router {
    const router = Router();

    return router;
}
