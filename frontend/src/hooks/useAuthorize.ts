import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from 'firebase/auth';

export function useAuthorize(user: User | null): user is User {
    const navigate = useNavigate();

    const assertAuthenticated = () => {
        if (user) return true;

        navigate('/login');
        return false;
    };

    if (!assertAuthenticated()) return false;

    return true;
}
