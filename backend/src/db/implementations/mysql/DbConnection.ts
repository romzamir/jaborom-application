import { createConnection, Connection } from 'mysql';

import IDbConnection from '../../abstractions/DbConnection';

export default class MySqlDbConnection implements IDbConnection {
    private connected: boolean;
    private connection: Connection | null;

    constructor() {
        this.connected = false;
        this.connection = null;
    }

    connect(config: {
        hostname: string;
        port?: number;
        user: string;
        pass: string;
        database?: string;
    }): Promise<void> {
        this.connection = createConnection({
            host: config.hostname,
            port: config.port,
            user: config.user,
            password: config.pass,
            database: config.database,
        });

        this.connected = false;
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                reject('Failed to create a connection object.');
                return;
            }

            this.connection.connect((err) => {
                if (!!err) {
                    reject(err);
                } else {
                    this.connected = true;
                    resolve();
                }
            });
        });
    }

    disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection?.end((err) => {
                if (!!err) {
                    reject(err);
                } else {
                    this.connected = false;
                    resolve();
                }
            });
        });
    }

    isConnected(): Promise<boolean> {
        return Promise.resolve(this.connected);
    }

    query(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                reject('Not connected!');
                return;
            }

            this.connection.query(sql, (err, result) => {
                if (!!err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
