import mysql from "mysql2/promise";

export interface IMySqlProvider{
    OpenSqlConnectionAsync(mysqlConfig:mysql.ConnectionOptions):Promise<mysql.Connection>;
    CloseSqlConnectionAsync():Promise<void>;
}

export class MySqlProvider implements IMySqlProvider{
    

    private connection?:mysql.Connection;

    public async OpenSqlConnectionAsync(mySqlConfig: mysql.ConnectionOptions): Promise<mysql.Connection> {
       try
       {
            this.connection=await mysql.createConnection(mySqlConfig);

            return this.connection;
       }
       catch(ex){
           throw ex;
       }
    }

    public CloseSqlConnectionAsync(): Promise<void> {
      return new Promise((resolve,reject)=>{

        try
        {   
            this.connection?.destroy();
            resolve();
        }
        catch(ex){
            reject(ex);
            throw ex;
        }

      });
    }

    
}