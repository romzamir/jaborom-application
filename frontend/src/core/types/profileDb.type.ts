export type ProfileDb = {
    id: number;
    personId: number;
    firstName: string;
    lastName: string;
    school: number;
    grade: number;
    sex: boolean;
    dateOfBirth?: string;
    dateOfSigning: string;
    address?: string;
    hobbies?: string;
    allergies?: string;
    notes?: string;
};
