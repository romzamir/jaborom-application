import Admin from 'firebase-admin';

const serviceAccount = require('./firebase-admin-authentication.json');

export default class FirebaseAuthentication {
    private readonly _app: Admin.app.App;
    constructor() {
        this._app = Admin.initializeApp({
            credential: Admin.credential.cert(serviceAccount),
        });
    }

    verifyToken(token: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this._app
                .auth()
                .verifyIdToken(token)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }
}
