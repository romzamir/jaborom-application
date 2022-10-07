import {initializeApp} from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
} from 'firebase/auth';
import {getConfig} from './configs';

const firebaseConfig = getConfig('Test');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

let userCredential: UserCredential;

export async function signInWithGoogle() {
    try {
        userCredential = await signInWithPopup(auth, provider);
    } catch (err) {
        console.log('auth error', err);
    }
}

export async function getUserToken(): Promise<string | null> {
    return (await userCredential.user.getIdToken()) ?? null;
}
