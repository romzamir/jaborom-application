export abstract class CacheProviderBase<T extends {id: number}> {
    private readonly cache: Map<number, T>;

    constructor() {
        this.cache = new Map<number, T>();
    }

    isCached(id: number): boolean {
        return this.cache.has(id);
    }

    get(id: number): T | null {
        return this.cache.get(id) || null;
    }

    add(item: T): CacheProviderBase<T> {
        this.cache.set(item.id, item);
        return this;
    }

    delete(id: number): CacheProviderBase<T> {
        this.cache.delete(id);
        return this;
    }

    update(item: T): CacheProviderBase<T> {
        if (!this.isCached(item.id)) {
            throw new Error(`Item with id ${item.id} is not cached`);
        }

        this.cache.set(item.id, item);
        return this;
    }

    addOrUpdate(item: T): CacheProviderBase<T> {
        this.cache.set(item.id, item);
        return this;
    }
}
