import {credential} from 'firebase-admin';
import {initializeApp} from 'firebase-admin/app';
import {Auth, getAuth} from 'firebase-admin/auth';

import IAuthenticationValidator from '../abstractions/authenticationValidator';

export default class FirebaseAuthenticationValidator
    implements IAuthenticationValidator
{
    private readonly _auth: Auth;
    constructor() {
        const firebaseAdminConfig = JSON.parse(
            process.env.FIREBASE_ADMIN_SDK_CONFIG as string,
        );

        const app = initializeApp({
            credential: credential.cert(firebaseAdminConfig),
        });
        this._auth = getAuth(app);
    }

    verifyToken(token: string | undefined): Promise<boolean> {
        if (!token) {
            return Promise.resolve(false);
        }

        return new Promise<boolean>((resolve) => {
            this._auth
                .verifyIdToken(token)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }
}
