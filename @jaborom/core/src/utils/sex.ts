import {Sex} from '../types';

export function profileSexToString(sex: Sex): string {
    const str = profileSexToStringMap[sex];
    if (str === undefined) {
        throw new Error('Invalid sex: ' + sex);
    }

    return str;
}

export function sexStringToProfileSex(sex: string): Sex {
    const entry = Object.entries(profileSexToStringMap).find(
        ([_key, value]) => value === sex,
    );
    if (!entry) {
        throw new Error('Invalid sex: ' + sex);
    }

    return entry[0] as Sex;
}

export function sexNumberToProfileSex(sex: number): Sex {
    switch (sex) {
        case 0:
            return 'Male';
        case 1:
            return 'Female';
        default:
            throw new Error('Invalid sex number: ' + sex);
    }
}

export function profileSexToSexNumber(sex: Sex): number {
    switch (sex) {
        case 'Male':
            return 0;
        case 'Female':
            return 1;
        case 'Other':
            return 2;
        default:
            throw new Error('Invalid profile sex: ' + sex);
    }
}

const profileSexToStringMap: Record<Sex, string> = {
    Male: 'זכר',
    Female: 'נקבה',
    Other: 'אחר',
};
