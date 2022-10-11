import {Link} from 'react-router-dom';

import {ProfileDb} from '../../../../core/types/profileDb.type';

import {sexNumberToProfileSex} from '../../../../utils/sex';

import './profilesPageItem.css';

export function ProfilesPageItem(props: {profile: ProfileDb}) {
    const name = `${props.profile.firstName} ${props.profile.lastName}`;
    const id = props.profile.personId;
    const sex =
        sexNumberToProfileSex(props.profile.sex) === 'Male' ? 'בן' : 'בת';
    const grade = props.profile.grade;
    const school = "עמל ב'";

    return (
        <div className='profiles-page-item-container'>
            <Link
                to={`/profile/${props.profile.id}`}
                style={{textDecoration: 'none'}}
            >
                <h2 className='profiles-page-item-name'>{name}</h2>
                <h4 className='profiles-page-item-id'>{id}</h4>
                <div className='profiles-page-item-tags'>
                    <span className='profiles-page-item-tag profiles-page-item-sex'>
                        {sex}
                    </span>
                    <span className='profiles-page-item-tag profiles-page-item-grade'>
                        {grade}
                    </span>
                    <span className='profiles-page-item-tag profiles-page-item-school'>
                        {school}
                    </span>
                </div>
            </Link>
        </div>
    );
}
