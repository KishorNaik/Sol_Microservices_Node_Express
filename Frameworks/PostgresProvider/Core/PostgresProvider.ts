import pgPromise from 'pg-promise';
import {IInitOptions, IDatabase, IMain} from 'pg-promise';

export interface IPostgresProvider{

    OpenSqlConnectionAsync(postgresConfig:any):Promise<IDatabase<any>>;
    CloseSqlConnectionAsync():Promise<void>
}

export class PostgresProvider implements IPostgresProvider{
 
    private pgp:IMain=undefined | null;
    private db:IDatabase<any>=undefined | null;

    public OpenSqlConnectionAsync(postgresConfig:any):Promise<IDatabase<any>>{
        
            return new Promise((resolve,reject)=>{

                try
                {
                    this.pgp=pgPromise();
                    this.db=this.pgp(postgresConfig);

                    resolve(this.db);
                }
                catch(ex)
                {
                    reject(ex);
                    throw ex;
                }

            });
            
            
        
    }
    
    public async CloseSqlConnectionAsync():Promise<void>{
        try
        {
            await this.db?.$pool?.end();
            this.pgp.end();
        }
        catch(ex)
        {
            throw ex;
        }
       
    }
}