import {profileSexToString} from '@jaborom/core';

export const SEX_OPTIONS: string[] = (['Male', 'Female'] as const).map(
    (profileSex) => profileSexToString(profileSex),
);
