import { Request, Response, Router } from 'express';
import IProfilesDbTable from '../db/abstractions/types/profiles.dbTable';

export default function ProfilesRouter(dbTable: IProfilesDbTable): Router {
    const router = Router();

    router.get('/', async (req, res) => {
        const includeGraduates = (req.query.includeGraduate ||
            false) as boolean;

        const profiles = await dbTable.getProfiles({ includeGraduates });
        res.json(profiles);
    });

    return router;
}
