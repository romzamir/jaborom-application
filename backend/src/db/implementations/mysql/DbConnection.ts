import IDbConnection from '../../abstractions/DbConnection';

export default class MySqlDbConnection implements IDbConnection {
    connect(config?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    disconnect(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    isConnected(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
