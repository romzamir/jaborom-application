import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {ProfilesPageItem} from './profilesPageItem';
import {ProfilesPageSearchBar} from './profilesPageSearchBar';

import {Profile} from 'core/types/profile.type';

import './profilesPage.css';

const exampleProfile: Profile = {
    id: 1,
    personId: 123456789,
    firstName: 'רום',
    lastName: 'זמיר',
    school: 0,
    grade: 12,
    sex: true,
};

export function ProfilesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    console.log(location);

    const getSearchText = () => {
        return new URLSearchParams(location.search).get('search') || '';
    };

    return (
        <div className='profiles-page'>
            <ProfilesPageSearchBar text={getSearchText()} />
            <div className='profiles-grid-container'>
                <ProfilesPageItem profile={{...exampleProfile, lastName: 'התותח'}}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
            </div>
        </div>
    );
}
