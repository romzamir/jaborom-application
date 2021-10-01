import {ProfilesPageItem} from './profilesPageItem';
import {ProfilesPageSearchBar} from './profilesPageSearchBar';

import {Profile} from '../../../types/profile.type';

import './profilesPage.css';

const exampleProfile: Profile = {
    partial: true,
    personId: 123456789,
    firstName: 'רום',
    lastName: 'זמיר',
    school: 0,
    grade: 12,
    sex: true,
};

export function ProfilesPage() {
    return (
        <div className='profiles-page'>
            <ProfilesPageSearchBar />
            <div className='profiles-grid-container'>
                <ProfilesPageItem
                    profile={{...exampleProfile, lastName: 'התותח'}}
                ></ProfilesPageItem>
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
