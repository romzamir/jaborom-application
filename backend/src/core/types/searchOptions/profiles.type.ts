import {SearchOptions} from '.';
import {Profile} from '../profile.type';

export type ProfilesSearchOptions = {
    includeGraduates: boolean;
    additional?: SearchOptions<Profile>;
};
