import {useState} from 'react';
import {useParams} from 'react-router-dom';

import './profilePage.css';

export function ProfilePage() {
    const {id} = useParams<ProfileParams>();
    const [isLoading, setIsLoading] = useState(true);
    return isLoading && <div className='profile-page'></div>;
}

type ProfileParams = {
    id: string;
};
