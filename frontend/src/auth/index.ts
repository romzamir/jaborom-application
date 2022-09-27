import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {restCommunicator} from '../api/restCommunicator';
import {getConfig} from './configs';

const firebaseConfig = getConfig('Test');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const token = await result.user.getIdToken();
        restCommunicator.setToken(token);
    } catch (err) {
        console.log('auth error', err);
    }
}
