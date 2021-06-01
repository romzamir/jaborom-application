import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';

import { Sibling } from '../core/types/sibling.type';
import IProfilesProvider from '../providers/abstractions/types/profiles.provider';

export default function SiblingsRouter(
    profilesProvider: IProfilesProvider
): Router {
    const router = Router();

    router.get('/', async (req, res) => {
        const profileId = parseInt(req.params.profileId);
        if (Number.isNaN(profileId)) {
            //TODO: handle profileId is NaN
        }

        try {
            const result = await profilesProvider.getSiblingsByProfileId(
                profileId
            );

            if (!result) {
                res.status(HttpStatus.NOT_FOUND);
            } else {
                res.json(result);
            }
        } catch {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        res.end();
    });

    router.post('/', async (req, res) => {
        const siblings: Sibling | Sibling[] = req.body;
        if (!siblings) {
            res.status(HttpStatus.BAD_REQUEST);
        } else {
            if (Array.isArray(siblings)) {
                throw new Error('Method not implemented.');
            } else {
                throw new Error('Method not implemented.');
            }
        }

        res.end();
    });

    return router;
}
