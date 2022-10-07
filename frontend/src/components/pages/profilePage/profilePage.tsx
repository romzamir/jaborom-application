import _ from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {ProfilePageHeader} from './header';
import {ProfilePageBody} from './body';
import {useAuthorize, useFetch, useUser} from '../../../hooks';

import {profilesProvider} from '../../../api/providers/profiles.provider';
import {differenceObjects} from '../../../utils/difference';
import {Profile} from '../../../core/models/profile';

import './profilePage.css';

export function ProfilePage() {
    const user = useUser();
    const isAuthorized = useAuthorize(user);
    const {id} = useParams<ProfileParams>();
    const fetchProfile = useCallback(
        () => profilesProvider.getById(id || ''),
        [id],
    );

    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, profileResult] = useFetch(fetchProfile);
    const profile = profileResult?.data;
    const [draft, setDraft] = useState(profile);
    const hasChanges = !_.isEqual(draft, profile);

    useEffect(() => {
        setDraft(profile);
    }, [profile]);

    const setDraftField = useCallback(
        function <T extends keyof Profile>(key: T, value: Profile[T]) {
            if (draft) {
                const clonedDraft = draft.clone();
                clonedDraft[key] = value;
                setDraft(clonedDraft);
            }
        },
        [draft],
    );

    const startEditMode = useCallback(() => setIsEditMode(true), []);

    const saveDraft = useCallback(() => {
        if (!draft) return;
        setIsEditMode(false);

        const changes = differenceObjects<Profile>(
            profile ?? new Profile(),
            draft,
        );
        profilesProvider.update(id ?? '', changes);
    }, [draft, profile]);

    const discardDraft = useCallback(() => {
        setDraft(profile);
        setIsEditMode(false);
    }, [profile]);

    if (!isAuthorized) return null;

    return (
        <>
            {isLoading ? (
                'בטעינה...'
            ) : !profile ? (
                'הפרופיל לא נמצא'
            ) : (
                <div className='profile-page'>
                    <ProfilePageHeader
                        profile={profile}
                        isEditMode={isEditMode}
                        hasChanges={hasChanges}
                        startEditMode={startEditMode}
                        saveDraft={saveDraft}
                        discardDraft={discardDraft}
                    />
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
