import {Request, Response, Router} from 'express';
import HttpStatus from 'http-status';

import {Profile} from '../core/types/profile.type';
import IProfilesProvider from '../providers/abstractions/types/profiles.provider';

export default function ProfilesRouter(
    profilesProvider: IProfilesProvider,
    siblingsRouter: Router,
): Router {
    const router = Router();

    router.get('/', async (req, res) => {
        const includeGraduates = req.query.includeGraduates === 'true';
        const searchText = req.query.searchText?.toString();

        let profiles;
        if (searchText) {
            profiles = await profilesProvider.findProfiles(
                searchText,
                includeGraduates,
            );
        } else {
            profiles = await profilesProvider.getAll(includeGraduates);
        }

        res.json(profiles);
    });

    router.get('/:id', async (req, res) => {
        const {id: idString} = req.params;
        const id = +idString;
        if (Number.isNaN(id)) {
            res.status(HttpStatus.BAD_REQUEST);
        } else {
            const profile = await profilesProvider.getById(id);
            if (profile) {
                res.json(profile);
            } else {
                res.status(HttpStatus.NOT_FOUND);
            }
        }

        res.end();
    });

    router.post('/', async (req, res) => {
        const profile: Profile = req.body;
        const result = await profilesProvider.insert(profile);
        if (result !== null) {
            res.json(result);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        res.end();
    });

    router.put('/:id', async (req, res) => {
        const {id} = req.params;
        const profileChanges: Partial<Profile> = req.body;
        await profilesProvider.update(+id, profileChanges);
        res.status(HttpStatus.OK).end();
    });

    router.delete('/:id', async (req, res) => {
        const id: number = parseInt(req.params.id?.toString() || '');
        if (id === NaN) {
            res.status(HttpStatus.BAD_REQUEST);
        } else {
            const didDelete = await profilesProvider.delete(id);

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
