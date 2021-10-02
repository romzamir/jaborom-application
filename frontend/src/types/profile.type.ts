export type Profile = {
    id: number;
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
