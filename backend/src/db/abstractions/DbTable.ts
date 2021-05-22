export default abstract class DbTable {
    constructor(protected readonly _name: string) {}

    getName() {
        return this._name;
    }
}
