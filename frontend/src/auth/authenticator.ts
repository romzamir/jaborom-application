import {initializeApp} from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
} from 'firebase/auth';
import {getConfig} from './configs';

export const authenticator = {
    getUserToken,
    signInWithGoogle,
};

const firebaseConfig = getConfig('Test');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setDefaultLanguage('he');

let userCredential: UserCredential | null = null;

async function signInWithGoogle() {
    try {
        userCredential = await signInWithPopup(auth, provider);
    } catch (err) {
        console.log('auth error', err);
    }
}

async function getUserToken(): Promise<string | null> {
    return (await userCredential?.user.getIdToken()) ?? null;
}
