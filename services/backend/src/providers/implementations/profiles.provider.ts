import {ProfileType, SiblingType} from '@jaborom/core';
import IProfilesDbTable from '../../db/abstractions/types/profiles.dbTable';
import ISiblingsDbTable from '../../db/abstractions/types/siblings.dbTables';
import IProfilesProvider from '../abstractions/types/profiles.provider';

export default class ProfilesProvider implements IProfilesProvider {
    private readonly _profilesDbTable: IProfilesDbTable;
    private readonly _siblingsDbTable: ISiblingsDbTable;
    public readonly name = 'profiles';

    constructor(
        profilesDbTable: IProfilesDbTable,
        siblingsDbTable: ISiblingsDbTable,
    ) {
        this._profilesDbTable = profilesDbTable;
        this._siblingsDbTable = siblingsDbTable;
    }

    getAll(includeGraduates: boolean = false): Promise<ProfileType[]> {
        return this._profilesDbTable.get({includeGraduates});
    }

    checkIsProfileExists(profileId: number): Promise<boolean> {
        return this._profilesDbTable.isExists({
            includeGraduates: true,
            additional: {
                key: 'id',
                condition: {
                    name: 'equals',
                    value: profileId,
                },
            },
        });
    }

    async getById(
        id: number,
        includeGraduates: boolean = false,
    ): Promise<ProfileType | null> {
        const result = await this._profilesDbTable.get({
            includeGraduates,
            additional: {
                key: 'id',
                condition: {
                    name: 'equals',
                    value: id,
                },
            },
        });

        return result[0] ?? null;
    }

    async insert(profile: ProfileType): Promise<ProfileType | null> {
        try {
            return await this._profilesDbTable.insert(profile);
        } catch {
            return null;
        }
    }

    async update(id: number, profile: Partial<ProfileType>): Promise<void> {
        await this._profilesDbTable.update(
            {
                includeGraduates: true,
                additional: {
                    key: 'id',
                    condition: {
                        name: 'equals',
                        value: id,
                    },
                },
            },
            profile,
        );
    }

    async delete(
        id: number,
        includeGraduates: boolean = false,
    ): Promise<boolean> {
        const result = await this._profilesDbTable.delete({
            includeGraduates,
            additional: {
                key: 'id',
                condition: {
                    name: 'equals',
                    value: id,
                },
            },
        });

        return result !== 0;
    }

    async getSiblingsByProfileId(
        profileId: number,
    ): Promise<SiblingType[] | null> {
        const siblings = await this._siblingsDbTable.getSiblings({
            key: 'profileId',
            condition: {
                name: 'equals',
                value: profileId,
            },
        });

        if (siblings.length === 0) {
            return null;
        }

        return siblings;
    }

    private async insertSibling(
        profileId: number,
        sibling: SiblingType,
        checkIfProfileExists: boolean = true,
    ): Promise<SiblingType | null> {
        if (checkIfProfileExists && !this.checkIsProfileExists(profileId)) {
            return null;
        }

        const result = await this._siblingsDbTable.insertSibling(sibling);
        return result;
    }

    addSiblingToProfileId(
        profileId: number,
        sibling: SiblingType,
    ): Promise<SiblingType | null> {
        return this.insertSibling(profileId, sibling, true);
    }

    async addSiblingsToProfileId(
        profileId: number,
        siblings: SiblingType[],
    ): Promise<SiblingType[] | null> {
        const profileExists = await this.checkIsProfileExists(profileId);
        if (!profileExists) {
            return null;
        }

        const results: SiblingType[] = [];
        for (const sibling of siblings) {
            results.push(
                (await this.insertSibling(profileId, sibling, false))!,
            );
        }

        return results;
    }

    findProfiles(
        nameToSearch: string,
        includeGraduates?: boolean,
    ): Promise<ProfileType[]> {
        return this._profilesDbTable.findByFullName(
            nameToSearch,
            includeGraduates,
        );
    }
}
