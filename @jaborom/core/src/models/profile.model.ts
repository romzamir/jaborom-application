import {Sex, ProfileType} from '../types';
import {
    profileSexToSexNumber,
    sexNumberToProfileSex,
    formatDate,
} from '../utils';
import {v4 as uuidv4} from 'uuid';

export class Profile implements ProfileType {
    public dateOfSigning: Date;
    public dateOfBirth: Date | null = null;

    constructor(
        public id: number | null,
        public personId: string,
        public firstName: string,
        public lastName: string,
        public school: number,
        public grade: number,
        public sex: Sex,
        dateOfBirth: Date | string,
        dateOfSigning: Date | string,
        public address: string = '',
        public hobbies: string = '',
        public allergies: string = '',
        public notes: string = '',
    ) {
        this.sex = typeof sex === 'number' ? sexNumberToProfileSex(sex) : sex;
        this.dateOfBirth = formatDate(dateOfBirth);
        this.dateOfSigning = formatDate(dateOfSigning)!;
    }

    public clone(): Profile {
        return Profile.from(this);
    }

    public static empty() {
        return new Profile(
            null,
            uuidv4(),
            '',
            '',
            0,
            0,
            'Male',
            new Date(),
            new Date(),
        );
    }

    public static from(profile: Profile): Profile {
        return Object.assign(
            Object.create(Object.getPrototypeOf(profile)),
            profile,
        );
    }

    public static toJson(profile: Partial<Profile>) {
        const clonedProfile = {...profile} as any;
        if ('sex' in profile && profile.sex !== undefined) {
            clonedProfile.sex = profileSexToSexNumber(profile.sex);
        }

        return clonedProfile;
    }
}
