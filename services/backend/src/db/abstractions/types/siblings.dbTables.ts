import {Sibling} from '@jaborom/core';
import {SearchOptions} from '../../../core/types/searchOptions';

export default interface ISiblingsDbTable {
    getSiblings(options?: SearchOptions<Sibling>): Promise<Sibling[]>;

    insertSibling(sibling: Sibling): Promise<Sibling>;

    insertSiblings(siblings: Sibling[]): Promise<Sibling[]>;

    updateSibling(
        options: SearchOptions<Sibling>,
        sibling: Sibling,
    ): Promise<Sibling>;

    deleteSiblings(options: SearchOptions<Sibling>): Promise<number>;
}
