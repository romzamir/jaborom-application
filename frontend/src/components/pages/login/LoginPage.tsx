import {useEffect} from 'react';
import {User} from 'firebase/auth';
import GoogleButton from 'react-google-button';

import {authenticator} from '../../../auth';
import {useNavigate} from 'react-router-dom';

import './loginPage.css';

export function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const removeListener = authenticator.onUserChanged(onUserChanged);

        return () => {
            removeListener();
        };
    }, []);

    const onUserChanged = (user: User | null) => {
        if (!user) return;

        navigate('/homepage');
    };

    return (
        <div className='login-page'>
            <GoogleButton
                className='login-in-with-google'
                label='התחברות עם Google'
                onClick={authenticator.signInWithGoogle}
            />
        </div>
    );
}
