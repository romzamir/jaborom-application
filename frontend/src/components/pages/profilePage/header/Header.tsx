import {Profile} from '../../../../core/models/profile';

import {dateToLongDateString} from '../../../../utils/date';

import './header.css';

type ProfilePageHeaderProps = {
    profile: Profile;
    isNew: boolean;
    isEditMode: boolean;
    hasChanges: boolean;
    startEditMode: () => void;
    saveDraft: () => void;
    discardDraft: () => void;
};

export function ProfilePageHeader({
    profile,
    isNew,
    isEditMode,
    hasChanges,
    startEditMode,
    saveDraft,
    discardDraft,
}: ProfilePageHeaderProps) {
    const dateOfSigning = isNew ? new Date() : profile.dateOfSigning;

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
                    הפרופיל נוצר ב{dateToLongDateString(dateOfSigning)}
                </span>
                <div className='profile-page-header-buttons'>
                    {isEditMode ? (
                        <>
                            <span
                                className='profile-page-header-button profile-page-header-save-draft-button'
                                onClick={saveDraft}
                                data-disabled={!hasChanges}
                            >
                                שמירה
                            </span>
                            <span
                                className='profile-page-header-button profile-page-header-discard-draft-button'
                                onClick={discardDraft}
                            >
                                ביטול
                            </span>
                        </>
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
