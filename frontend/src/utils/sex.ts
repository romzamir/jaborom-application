import {ProfileSex} from '../core/types/sex.type';

export function profileSexToString(sex: ProfileSex): string {
    const str = profileSexToStringMap[sex];
    if (str === undefined) {
        throw new Error('Invalid sex: ' + sex);
    }

    return str;
}

export function sexStringToProfileSex(sex: string): string {
    const entry = Object.entries(profileSexToString).find(
        ([_key, value]) => value === sex,
    );
    if (!entry) {
        throw new Error('Invalid sex: ' + sex);
    }

    return entry[0];
}

export function sexNumberToProfileSex(sex: number): ProfileSex {
    switch (sex) {
        case 0:
            return 'Male';
        case 1:
            return 'Female';
        default:
            throw new Error('Invalid sex number: ' + sex);
    }
}

const profileSexToStringMap: Record<ProfileSex, string> = {
    Male: 'זכר',
    Female: 'נקבה',
};
