import {ProfileSex} from '../types/sex.type';
import {profileSexToSexNumber, sexNumberToProfileSex} from '../../utils/sex';
import {uuidv4} from '@firebase/util';

export class Profile {
    public dateOfSigning: Date;
    public dateOfBirth: Date | null = null;

    constructor(
        public id: number | null,
        public personId: string,
        public firstName: string,
        public lastName: string,
        public school: number,
        public grade: number,
        public sex: ProfileSex,
        dateOfBirth: Date | string,
        dateOfSigning: Date | string,
        public address: string = '',
        public hobbies: string = '',
        public allergies: string = '',
        public notes: string = '',
    ) {
        this.sex = typeof sex === 'number' ? sexNumberToProfileSex(sex) : sex;
        this.dateOfBirth = Profile.formatDate(dateOfBirth);
        this.dateOfSigning = Profile.formatDate(dateOfSigning)!;
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

    private static formatDate(maybeDate: Date | string | null): Date | null {
        if (!maybeDate) return null;
        return new Date(maybeDate);
    }
}
