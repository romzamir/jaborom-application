import {Profile} from '../../../../core/types/profile.type';

type ProfilePageBodyProps = {
    profile: Profile;
};

export function ProfilePageBody({profile}: ProfilePageBodyProps) {
    return <div className='profile-page-body'></div>;
}
