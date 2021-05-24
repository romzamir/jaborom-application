import Admin from 'firebase-admin';
import IAuthenticationValidator from '../abstractions/authenticationValidator';

const serviceAccount = require('./firebase-admin-authentication.json');

export default class FirebaseAuthenticationValidator
    implements IAuthenticationValidator
{
    private readonly _app: Admin.app.App;
    constructor() {
        this._app = Admin.initializeApp({
            credential: Admin.credential.cert(serviceAccount),
        });
    }

    verifyToken(token: string | undefined): Promise<boolean> {
        if (!token) {
            return Promise.resolve(false);
        }

        return new Promise<boolean>((resolve) => {
            this._app
                .auth()
                .verifyIdToken(token)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }
}
