import GoogleButton from 'react-google-button';

import {authenticator} from '../../../auth';

import './loginPage.css';

export function LoginPage() {
    return <></>;
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
