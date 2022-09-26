import {Profile} from '../../../../core/models/profile';

import {dateToLongDateString} from '../../../../utils/date';

import './header.css';

type ProfilePageHeaderProps = {
    profile: Profile;
    isEditMode: boolean;
    startEditMode: () => void;
    saveDraft: () => void;
};

export function ProfilePageHeader({
    profile,
    isEditMode,
    startEditMode,
    saveDraft,
}: ProfilePageHeaderProps) {
    return (
        <div className='profile-page-header'>
            <div className='profile-page-header-main'>
                <span className='profile-name'>
                    {profile.firstName} {profile.lastName}
                </span>
                <span className='profile-person-id'>{profile.personId}</span>
            </div>
            <div className='profile-page-header-extras'>
                <span className='profile-sign-date'>
                    הפרופיל נוצר ב{dateToLongDateString(profile.dateOfSigning)}
                </span>
                <div className='profile-page-header-buttons'>
                    {isEditMode ? (
                        <span
                            className='profile-page-header-button profile-page-header-save-draft-button'
                            onClick={saveDraft}
                        >
                            שמירה
                        </span>
                    ) : (
                        <span
                            className='profile-page-header-button profile-page-header-edit-button'
                            onClick={startEditMode}
                        >
                            עריכה
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
