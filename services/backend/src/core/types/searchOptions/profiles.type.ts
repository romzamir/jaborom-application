import {SearchOptions} from '.';
import {ProfileType} from '@jaborom/core';

export type ProfilesSearchOptions = {
    includeGraduates: boolean;
    additional?: SearchOptions<ProfileType>;
};
