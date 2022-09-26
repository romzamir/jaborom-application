import mssql, {ConnectionPool} from 'mssql';

import IDbConnection from '../../abstractions/DbConnection';

export default class MSSqlDbConnection implements IDbConnection {
    private connectionPool: ConnectionPool | null;

    constructor() {
        this.connectionPool = null;
    }

    async connect(config: string | mssql.config): Promise<void> {
        this.connectionPool = await mssql.connect(config);
    }

    async disconnect(): Promise<void> {
        await this.connectionPool?.close();
    }

    get isConnected(): boolean {
        return this.connectionPool?.connected ?? false;
    }

    async query(sql: string): Promise<any> {
        if (!this.isConnected) {
            throw 'Not connected!';
        }

        return await this.connectionPool?.query(sql);
    }

    request(): mssql.Request | null {
        return this.connectionPool?.request() ?? null;
    }
}
