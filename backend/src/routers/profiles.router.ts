import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';

import { Profile } from '../core/types/profile.type';
import IProfilesDbTable from '../db/abstractions/types/profiles.dbTable';

export default function ProfilesRouter(dbTable: IProfilesDbTable): Router {
    const router = Router();

    router.get('/', async (req, res) => {
        const includeGraduates = (req.query.includeGraduate ||
            false) as boolean;

        const profiles = await dbTable.getProfiles({ includeGraduates });
        res.json(profiles);
    });

    router.post('/', async (req, res) => {
        const profile: Profile = req.body;
        try {
            const result = await dbTable.insertProfile(profile);
            res.json(result);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    return router;
}
