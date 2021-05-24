export type Profile = {
    id?: number;
    partial: boolean;
    personId: number;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    dateOfSigning?: Date;
    address?: string;
    hobbies?: string;
    allergies?: string;
    notes?: string;
};
