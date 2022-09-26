import {ProfileSex} from '../types/sex.type';

import {sexNumberToProfileSex} from '../../utils/sex';

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
            sex: any;
            dateOfBirth: any;
            dateOfSigning: any;
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
        this.address = address;
        this.hobbies = hobbies;
        this.allergies = allergies;
        this.notes = notes;

        this.sex = typeof sex === 'number' ? sexNumberToProfileSex(sex) : sex;
        this.dateOfBirth =
            dateOfBirth instanceof Date
                ? dateOfBirth
                : !!dateOfBirth
                ? new Date(dateOfBirth)
                : null;
        this.dateOfSigning =
            dateOfSigning instanceof Date
                ? dateOfSigning
                : new Date(dateOfSigning);
    }

    clone() {
        return new Profile(this);
    }
}
