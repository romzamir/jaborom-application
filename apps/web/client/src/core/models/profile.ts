import {ProfileSex} from '../types/sex.type';

import {profileSexToSexNumber, sexNumberToProfileSex} from '../../utils/sex';

export class Profile {
    constructor(
        public id: number,
        public personId: string,
        public firstName: string,
        public lastName: string,
        public school: number,
        public grade: number,
        public sex: ProfileSex,
        public dateOfBirth: Date | null,
        public dateOfSigning: Date,
        public address: string = '',
        public hobbies: string = '',
        public allergies: string = '',
        public notes: string = '',
    ) {
        this.sex = typeof sex === 'number' ? sexNumberToProfileSex(sex) : sex;
        this.dateOfBirth =
            dateOfBirth instanceof Date
                ? dateOfBirth
                : !!dateOfBirth
                ? new Date(dateOfBirth)
                : null;
        this.dateOfSigning =
            dateOfSigning instanceof Date
                ? dateOfSigning
                : new Date(dateOfSigning);
    }

    clone(): Profile {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    static toJson(profile: Partial<Profile>) {
        const clonedProfile = {...profile} as any;
        if ('sex' in profile && profile.sex !== undefined) {
            clonedProfile.sex = profileSexToSexNumber(profile.sex);
        }

        return clonedProfile;
    }
}
