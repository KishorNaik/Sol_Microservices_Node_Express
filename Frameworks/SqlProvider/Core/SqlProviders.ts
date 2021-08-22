import mssql, { ConnectionPool } from "mssql/msnodesqlv8";

export interface ISqlProvider{

    OpenSqlConnectionAsync(sqlConfig:mssql.config):Promise<mssql.ConnectionPool>;
    CloseSqlConnectionAsync():Promise<void>
}

export class SqlProvider implements ISqlProvider{
    

    private pool:ConnectionPool;

    public async OpenSqlConnectionAsync(sqlConfig:mssql.config): Promise<mssql.ConnectionPool> {
        try
        {
            
            this.pool=await new ConnectionPool(sqlConfig).connect();
            console.log("# Sql Connection Opened");
            return this.pool;
        }
        catch(ex)
        {
            throw ex;
        }
    }
    public async CloseSqlConnectionAsync(): Promise<void> {
        try
        {
            await this.pool.close();
            console.log("# Sql Connection Closed");
        }
        catch(ex)
        {
            throw ex;
        }
    }



}