import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {authenticator} from '../auth';

export function useAuthorize() {
    const navigate = useNavigate();
    const [isOk, setIsOk] = useState(false);

    useEffect(() => {
        (async () => {
            await assertAuthenticated();
        })();
    }, []);

    const assertAuthenticated = async () => {
        const isAuthenticated = await authenticator.isAuthenticated();
        if (!isAuthenticated) {
            return navigate('/login');
        }

        setIsOk(true);
    };

    return isOk;
}
