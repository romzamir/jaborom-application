import {ProfilesPageItem} from './profilesPageItem/profilesPageItem';
import {ProfilesPageSearchBar} from './profilesPageSearchBar/profilesPageSearchBar';

import {AppPage} from '../../../types/page.type';

import './profilesPage.css';
import {Profile} from '../../../types/profile.type';

const exampleProfile: Profile = {
    partial: true,
    personId: 123456789,
    firstName: 'רום',
    lastName: 'זמיר',
    school: 0,
    grade: 12,
    sex: true,
};

export function ProfilesPage(props: {name: AppPage}) {
    return (
        <div className='profiles-page'>
            <ProfilesPageSearchBar />
            <div className='profiles-grid-container'>
                <ProfilesPageItem profile={exampleProfile}></ProfilesPageItem>
            </div>
        </div>
    );
}
