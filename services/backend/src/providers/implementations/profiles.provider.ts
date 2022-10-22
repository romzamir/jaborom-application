import {Profile} from '../../core/types/profile.type';
import {Sibling} from '../../core/types/sibling.type';
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

    getAll(includeGraduates: boolean = false): Promise<Profile[]> {
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
    ): Promise<Profile | null> {
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

    async insert(profile: Profile): Promise<Profile | null> {
        try {
            return await this._profilesDbTable.insert(profile);
        } catch {
            return null;
        }
    }

    async update(id: number, profile: Partial<Profile>): Promise<void> {
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

    async getSiblingsByProfileId(profileId: number): Promise<Sibling[] | null> {
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
        sibling: Sibling,
        checkIfProfileExists: boolean = true,
    ): Promise<Sibling | null> {
        if (checkIfProfileExists && !this.checkIsProfileExists(profileId)) {
            return null;
        }

        const result = await this._siblingsDbTable.insertSibling(sibling);
        return result;
    }

    addSiblingToProfileId(
        profileId: number,
        sibling: Sibling,
    ): Promise<Sibling | null> {
        return this.insertSibling(profileId, sibling, true);
    }

    async addSiblingsToProfileId(
        profileId: number,
        siblings: Sibling[],
    ): Promise<Sibling[] | null> {
        const profileExists = await this.checkIsProfileExists(profileId);
        if (!profileExists) {
            return null;
        }

        const results: Sibling[] = [];
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
    ): Promise<Profile[]> {
        return this._profilesDbTable.findByFullName(
            nameToSearch,
            includeGraduates,
        );
    }
}
