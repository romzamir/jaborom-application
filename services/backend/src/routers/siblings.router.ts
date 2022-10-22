import {Request, Response, Router} from 'express';
import HttpStatus from 'http-status';

import {SiblingType} from '@jaborom/core';
import IProfilesProvider from '../providers/abstractions/types/profiles.provider';

interface IParams {
    profileId: string;
}

export default function SiblingsRouter(
    profilesProvider: IProfilesProvider,
): Router {
    const router = Router();

    router.get('/', async (req: Request<IParams>, res) => {
        const profileId = parseInt(req.params.profileId);
        if (isNaN(profileId)) {
            //TODO: handle profileId is NaN
            throw new Error('Method not implemented.');
        }

        try {
            const result = await profilesProvider.getSiblingsByProfileId(
                profileId,
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

    router.post('/', async (req: Request<IParams>, res) => {
        const profileId = parseInt(req.params.profileId);
        if (Number.isNaN(profileId)) {
            //TODO: handle profileId is NaN
            throw new Error('Method not implemented.');
        }

        const siblings: SiblingType | SiblingType[] = req.body;
        if (!siblings) {
            res.status(HttpStatus.BAD_REQUEST);
        } else {
            let result;
            if (Array.isArray(siblings)) {
                result = await profilesProvider.addSiblingsToProfileId(
                    profileId,
                    siblings,
                );
            } else {
                result = await profilesProvider.addSiblingToProfileId(
                    profileId,
                    siblings,
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
