import {ProfileSex} from '../core/types/sex.type';

export function profileSexToString(sex: ProfileSex): string {
    switch (sex) {
        case 'Male':
            return 'זכר';
        case 'Female':
            return 'נקבה';
        default:
            throw new Error('Invalid sex: ' + sex);
    }
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
