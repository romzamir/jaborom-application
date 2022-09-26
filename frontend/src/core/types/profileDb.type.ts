export type ProfileDb = {
    id: number;
    personId: number;
    firstName: string;
    lastName: string;
    school: number;
    grade: number;
    sex: number;
    dateOfBirth?: string;
    dateOfSigning: string;
    address?: string;
    hobbies?: string;
    allergies?: string;
    notes?: string;
};
