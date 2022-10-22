import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {User} from 'firebase/auth';

export function useAuthorize(user: User | null): user is User {
    const navigate = useNavigate();
    const location = useLocation();

    const isOk = !!user;

    useEffect(() => {
        if (isOk) return;

        if (!user) return navigate(`/login?returnTo=${location.pathname}`);
    }, [isOk]);

    return isOk;
}
