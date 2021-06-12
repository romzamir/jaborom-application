export type Profile = {
    id?: number;
    partial: boolean;
    personId: number;
    firstName: string;
    lastName: string;
    school: number;
    grade: number;
    sex: boolean;
    dateOfBirth?: number;
    dateOfSigning?: number;
    address?: string;
    hobbies?: string;
    allergies?: string;
    notes?: string;
};
