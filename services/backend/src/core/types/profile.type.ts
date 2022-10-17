export type Profile = {
    id: number;
    personId?: number;
    firstName: string;
    lastName: string;
    school: number;
    grade: number;
    sex: number;
    dateOfBirth?: Date;
    dateOfSigning: Date;
    address?: string;
    hobbies?: string;
    allergies?: string;
    notes?: string;
};
