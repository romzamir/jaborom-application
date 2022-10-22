import {Sex} from './sex.type';

export type ProfileType = {
    id: number | null;
    personId: string;
    firstName: string;
    lastName: string;
    school: number;
    grade: number;
    sex: Sex;
    dateOfBirth?: Date | null;
    dateOfSigning: Date;
    address?: string;
    hobbies?: string;
    allergies?: string;
    notes?: string;
};
