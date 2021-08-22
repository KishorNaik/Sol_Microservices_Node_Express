import mssql, { VarChar } from "mssql/msnodesqlv8";
import { ISqlProvider } from "../../../../../../Frameworks/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserPostModel from "../../Models/UserPostModel";

export default abstract class PostDataServiceAbstract{
    protected SqlConnectionConfigAsync(configuration:IConfiguration):Promise<mssql.config>{
        return new Promise((resolve,reject)=>{

            try
            {
                const sqlConfig:mssql.config={
                    server:(process.env.NODE_ENV==="development") ? configuration?.AppSettingConfig?.Development?.DatabaseConnection?.Server : configuration?.AppSettingConfig?.Production?.DatabaseConnection?.Server,
                    driver:(process.env.NODE_ENV==="development") ? configuration.AppSettingConfig?.Development?.DatabaseConnection?.Driver : configuration?.AppSettingConfig?.Production?.DatabaseConnection?.Driver,
                    database:(process.env.NODE_ENV==="development") ? configuration.AppSettingConfig?.Development?.DatabaseConnection?.Database : configuration?.AppSettingConfig?.Production?.DatabaseConnection?.Database,
                    options:{
                        trustedConnection:(process.env.NODE_ENV==="development") ? configuration?.AppSettingConfig?.Development?.DatabaseConnection?.Options?.TrustedConnection : configuration?.AppSettingConfig?.Production?.DatabaseConnection?.Options?.TrustedConnection,
                    }
                }

                resolve(sqlConfig);
            }
            catch(ex)
            {
                reject(ex);
                throw ex;
            }

        });
    }

    protected SetParameterAsync(requestPara:mssql.Request,command:string,userPostModel:UserPostModel):Promise<mssql.Request>{
        return new Promise((resolve,reject)=>{
            try
            {
                requestPara
                    .input("Command",mssql.VarChar,command)
                    .input("PostIdentity",mssql.UniqueIdentifier,userPostModel.PostIdentity)
                    .input("Post",mssql.VarChar,userPostModel.Post)
                    .input("UserIdentity",mssql.UniqueIdentifier,userPostModel.UserIdentity);

                resolve(requestPara);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
    }

    protected GetParameterAsync(requestPara:mssql.Request,command:string, userPostModel:UserPostModel):Promise<mssql.Request>{
        return new Promise((resolve,reject)=>{
 
             try
             {
                 requestPara
                     .input("Command",mssql.VarChar,command)
                     .input("UserIdentity",mssql.UniqueIdentifier,userPostModel.UserIdentity)
                     .input("PageNumber",mssql.BigInt,userPostModel?.Pagination?.PageNumber)
                     .input("RowsOfPageNumber",mssql.BigInt,userPostModel?.Pagination?.RowsOfPageNumber);
 
                 resolve(requestPara);
             }
             catch(ex)
             {
                 reject(ex);
                 throw ex;
             }
 
        });
     }

    protected async CommandExecuteAsync(sqlProvider:ISqlProvider, configuration:IConfiguration, command:string,procedureName:string,userPostModel:UserPostModel):Promise<boolean>{
        try
        {
            let pool:mssql.ConnectionPool=await sqlProvider.OpenSqlConnectionAsync(await this.SqlConnectionConfigAsync(configuration));

            let request:mssql.Request=await this.SetParameterAsync(pool.request(),command,userPostModel);

            let queryResult=await request.execute(procedureName);

            let flag=(queryResult.rowsAffected[0]>=1) ? true :false;

            return flag;
        }
        catch(ex){
            throw ex;
        }
        finally
        {
            await sqlProvider.CloseSqlConnectionAsync();
        }
    }

    protected async QueryExecuteAsync(sqlProvider:ISqlProvider,configuration:IConfiguration,command:string,procedureName:string,userPostModel?:UserPostModel):Promise<mssql.IProcedureResult<any>>{
        try
        {
            let pool:mssql.ConnectionPool=await sqlProvider.OpenSqlConnectionAsync(await this.SqlConnectionConfigAsync(configuration));

            let request:mssql.Request=await this.GetParameterAsync(pool.request(),command,userPostModel!);

            let queryResult=await request.execute(procedureName);

            return queryResult;

        }
        catch(ex)
        {
            throw ex;
        }
        finally
        {
            await sqlProvider.CloseSqlConnectionAsync();
        }
    }
}