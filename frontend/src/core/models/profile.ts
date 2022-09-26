import {ProfileSex} from '../types/sex.type';

export class Profile {
    public id: number;
    public personId: string;
    public firstName: string;
    public lastName: string;
    public school: number;
    public grade: number;
    public sex: ProfileSex;
    public dateOfBirth: Date | null;
    public dateOfSigning: Date;
    public address?: string;
    public hobbies?: string;
    public allergies?: string;
    public notes?: string;

    constructor(template: any) {
        const {
            id,
            personId,
            firstName,
            lastName,
            school,
            grade,
            sex,
            dateOfBirth,
            dateOfSigning,
            address,
            hobbies,
            allergies,
            notes,
        }: {
            id: number;
            personId: string;
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
        } = template;

        this.id = id;
        this.personId = personId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.school = school;
        this.grade = grade;
        this.sex = sex === 0 ? 'Male' : 'Female';
        this.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
        this.dateOfSigning = new Date(dateOfSigning);
        this.address = address;
        this.hobbies = hobbies;
        this.allergies = allergies;
        this.notes = notes;
    }
}
