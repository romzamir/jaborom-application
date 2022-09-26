import {profileSexToString} from '../utils/sex';

export const SEX_OPTIONS: string[] = (['Male', 'Female'] as const).map(
    (profileSex) => profileSexToString(profileSex),
);
