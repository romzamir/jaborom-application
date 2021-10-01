import {Request, Response, Router} from 'express';
import HttpStatus from 'http-status';

import {Sibling} from '../core/types/sibling.type';
import IProfilesProvider from '../providers/abstractions/types/profiles.provider';

export default function SiblingsRouter(
    profilesProvider: IProfilesProvider
): Router {
    const router = Router();

    router.get('/', async (req, res) => {
        const profileId = parseInt(req.params.profileId);
        if (Number.isNaN(profileId)) {
            //TODO: handle profileId is NaN
            throw new Error('Method not implemented.');
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
        const profileId = parseInt(req.params.profileId);
        if (Number.isNaN(profileId)) {
            //TODO: handle profileId is NaN
            throw new Error('Method not implemented.');
        }

        const siblings: Sibling | Sibling[] = req.body;
        if (!siblings) {
            res.status(HttpStatus.BAD_REQUEST);
        } else {
            let result;
            if (Array.isArray(siblings)) {
                result = await profilesProvider.addSiblingsToProfileId(
                    profileId,
                    siblings
                );
            } else {
                result = await profilesProvider.addSiblingToProfileId(
                    profileId,
                    siblings
                );
            }

            if (!result) {
                res.status(HttpStatus.NOT_FOUND);
            } else {
                res.json(result);
            }
        }

        res.end();
    });

    return router;
}
