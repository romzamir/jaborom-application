import {SiblingType} from '@jaborom/core';
import {SearchOptions} from '../../../core/types/searchOptions';

export default interface ISiblingsDbTable {
    getSiblings(options?: SearchOptions<SiblingType>): Promise<SiblingType[]>;

    insertSibling(sibling: SiblingType): Promise<SiblingType>;

    insertSiblings(siblings: SiblingType[]): Promise<SiblingType[]>;

    updateSibling(
        options: SearchOptions<SiblingType>,
        sibling: SiblingType,
    ): Promise<SiblingType>;

    deleteSiblings(options: SearchOptions<SiblingType>): Promise<number>;
}
