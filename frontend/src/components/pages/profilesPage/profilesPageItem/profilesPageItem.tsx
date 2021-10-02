import {Redirect, Link} from 'react-router-dom';
import {Profile} from 'core/types/profile.type';

import './profilesPageItem.css';

export function ProfilesPageItem(props: {profile: Profile}) {
    const name = `${props.profile.firstName} ${props.profile.lastName}`;
    const id = props.profile.personId;
    const sex = props.profile.sex ? 'בן' : 'בת';
    const grade = props.profile.grade;
    const school = "עמל ב'";

    return (
        <div className='profiles-page-item-container'>
            <Link to='' style={{textDecoration: 'none'}}>
                <h2 className='profiles-page-item-name'>{name}</h2>
                <h4 className='profiles-page-item-id'>{id}</h4>
                <div className='profiles-page-item-tags'>
                    <span className='profiles-page-item-tag profiles-page-item-sex'>{sex}</span>
                    <span className='profiles-page-item-tag profiles-page-item-grade'>{grade}</span>
                    <span className='profiles-page-item-tag profiles-page-item-school'>{school}</span>
                </div>
            </Link>
        </div>
    );
}
