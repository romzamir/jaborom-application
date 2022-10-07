import {initializeApp} from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    UserCredential,
} from 'firebase/auth';
import {getConfig} from './configs';

export const authenticator = {
    getUser,
    getUserToken,
    isAuthenticated,
    signInWithGoogle,
    onUserChanged,
};

const firebaseConfig = getConfig('Test');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setDefaultLanguage('he');

let userCredential: UserCredential | null = null;
const userChangedListeners: ((user: User | null) => void)[] = [];

async function signInWithGoogle() {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        setUserCredential(userCredential);
    } catch (err) {
        console.log('auth error', err);
    }
}

function onUserChanged(callback: (user: User | null) => void) {
    userChangedListeners.push(callback);

    return () => {
        const index = userChangedListeners.indexOf(callback);
        if (index === -1) return;

        userChangedListeners.splice(index, 1);
    };
}

function setUserCredential(newUserCredential: UserCredential | null) {
    userCredential = newUserCredential;
    const user = userCredential?.user ?? null;
    userChangedListeners.forEach((listener) => listener?.(user));
}

function getUser(): User | null {
    return userCredential?.user ?? null;
}

async function getUserToken(): Promise<string | null> {
    return (await getUser()?.getIdToken()) ?? null;
}

async function isAuthenticated(): Promise<boolean> {
    if (!getUser()) return false;

    return true;
}
