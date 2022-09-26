export default interface IDbConnection {
    connect(config?: any): Promise<any>;
    disconnect(): Promise<any>;
    get isConnected(): boolean;
}
