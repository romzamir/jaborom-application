import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';

import { Profile } from '../core/types/profile.type';
import IProfilesProvider from '../providers/abstractions/types/profiles.provider';

export default function ProfilesRouter(
    profilesProvider: IProfilesProvider,
    siblingsRouter: Router
): Router {
    const router = Router();

    router.get('/', async (req, res) => {
        const includeGraduates = req.query.includeGraduates === 'true';
        const searchQuery = req.query.query?.toString();

        let profiles;
        if (!!searchQuery) {
            profiles = await profilesProvider.findProfiles(
                searchQuery,
                includeGraduates
            );
        } else {
            profiles = await profilesProvider.getAllProfiles(includeGraduates);
        }

        res.json(profiles);
    });

    router.post('/', async (req, res) => {
        const profile: Profile = req.body;
        const result = await profilesProvider.insertProfile(profile);
        if (result !== null) {
            res.json(result);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        res.end();
    });

    router.delete('/:id', async (req, res) => {
        const id: number = parseInt(req.params.id?.toString() || '');
        if (id === NaN) {
            res.status(HttpStatus.BAD_REQUEST);
        } else {
            const didDelete = await profilesProvider.deleteProfile(id);

            if (didDelete) {
                res.status(HttpStatus.NOT_FOUND);
            } else {
                res.status(HttpStatus.OK);
            }
        }

        res.end();
    });

    router.use('/:profileId/siblings', siblingsRouter);

    return router;
}
