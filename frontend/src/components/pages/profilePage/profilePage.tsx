import {useParams} from 'react-router-dom';

import './profilePage.css';

export function ProfilePage() {
    const {id} = useParams<ProfileParams>();
    return <></>;
}

type ProfileParams = {
    id: string;
};
