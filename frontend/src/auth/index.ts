import {initializeApp} from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    UserCredential,
} from 'firebase/auth';
import {getConfig} from './configs';

const firebaseConfig = getConfig('Test');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setDefaultLanguage('he');

let userCredential: UserCredential | null = null;

export async function signInWithGoogle() {
    try {
        userCredential = await signInWithPopup(auth, provider);
    } catch (err) {
        console.log('auth error', err);
    }
}

export function getUser(): User | null {
    return userCredential?.user ?? null;
}

export async function getUserToken(): Promise<string | null> {
    return (await getUser()?.getIdToken()) ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
    if (!getUser()) return false;

    return true;
}
