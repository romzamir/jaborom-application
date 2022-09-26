import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {ProfilePageHeader} from './header';
import {ProfilePageBody} from './body';
import {useFetch} from '../../../hooks';

import {profilesProvider} from '../../../api/providers/profiles.provider';
import {Profile} from '../../../core/models/profile';

import './profilePage.css';

export function ProfilePage() {
    const {id} = useParams<ProfileParams>();
    const fetchProfile = useCallback(
        () => profilesProvider.getProfile(id || ''),
        [id],
    );

    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, profileResult] = useFetch(fetchProfile);
    const profile = profileResult?.data;
    const [draft, setDraft] = useState(profile);

    useEffect(() => {
        setDraft(profile);
    }, [profile]);

    const setDraftField = useCallback(
        <T extends keyof Profile>(key: T, value: Profile[T]) => {
            if (draft) {
                const clonedDraft = draft.clone();
                clonedDraft[key] = value;
                setDraft(clonedDraft);
            }
        },
        [draft],
    );

    return (
        <>
            {isLoading ? (
                'בטעינה...'
            ) : !profile ? (
                'הפרופיל לא נמצא'
            ) : (
                <div className='profile-page'>
                    <ProfilePageHeader profile={profile} />
                    <ProfilePageBody
                        profile={draft ?? profile}
                        isEditMode={isEditMode}
                        setField={setDraftField}
                    />
                </div>
            )}
        </>
    );
}

type ProfileParams = {
    id: string;
};
