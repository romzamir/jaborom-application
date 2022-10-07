import {Profile} from '../../../../core/models/profile';

import {dateToLongDateString} from '../../../../utils/date';

import './header.css';

const CREATE_BUTTON_TEXT = 'יצירה';
const UPDATE_BUTTON_TEXT = 'שמירה';
const RESET_BUTTON_TEXT = 'איפוס';
const CANCEL_EDIT_BUTTON_TEXT = 'ביטול';

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
                        <>
                            <span
                                className='profile-page-header-button profile-page-header-save-draft-button'
                                onClick={saveDraft}
                                data-disabled={!hasChanges}
                            >
                                {isNew
                                    ? CREATE_BUTTON_TEXT
                                    : UPDATE_BUTTON_TEXT}
                            </span>
                            <span
                                className='profile-page-header-button profile-page-header-discard-draft-button'
                                onClick={discardDraft}
                            >
                                {isNew
                                    ? RESET_BUTTON_TEXT
                                    : CANCEL_EDIT_BUTTON_TEXT}
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
