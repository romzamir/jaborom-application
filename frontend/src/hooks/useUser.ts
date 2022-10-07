import {useEffect, useState} from 'react';
import {User} from 'firebase/auth';

import {authenticator} from '../auth';

export function useUser(): User | null {
    const [user, setUser] = useState<User | null>(authenticator.getUser());

    useEffect(() => {
        const removeListener = authenticator.onUserChanged(setUser);
        return () => {
            removeListener();
        };
    }, []);

    return user;
}
