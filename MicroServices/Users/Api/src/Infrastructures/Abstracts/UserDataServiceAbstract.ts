import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import mssql from "mssql/msnodesqlv8";
import UserModel from "../../Models/UserModel";
import { ISqlProvider } from "../../../Frameworks/SqlProvider/Core/SqlProviders";

export default abstract class UserDataServiceAbstract {
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
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
    }

    protected SetParamterAsync(requestPara:mssql.Request,command:string,userModel:UserModel): Promise<mssql.Request>{
        return new Promise((resolve,reject)=>{
            try
            {
                requestPara
                    .input("Command",mssql.VarChar,command)
                    .input("UserIdentity",mssql.UniqueIdentifier,userModel.UserIdentity)
                    .input("FirstName",mssql.VarChar,userModel.FirstName)
                    .input("LastName",mssql.VarChar,userModel.LastName)
                    .input("Email",mssql.VarChar,userModel.UserAuth?.Email)
                    .input("HashPassword",mssql.VarChar,userModel.UserAuth?.Password);

                resolve(requestPara);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
    }

    protected GetParameterAsync(requestPara:mssql.Request,command:string,userModel:UserModel):Promise<mssql.Request>{
        return new Promise((resolve,reject)=>{

            try
            {
                requestPara 
                    .input("Command",mssql.VarChar,command)
                    .input("Email",mssql.VarChar,userModel.UserAuth?.Email);

                resolve(requestPara);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
    }

    protected async CommandExecuteAsync(sqlProvider:ISqlProvider,configuration:IConfiguration,command:string,procedureName:string,userModel:UserModel) : Promise<boolean>{
        try
        {
            let pool:mssql.ConnectionPool=await sqlProvider.OpenSqlConnectionAsync(await this.SqlConnectionConfigAsync(configuration));
            let request:mssql.Request=await this.SetParamterAsync(pool.request(),command,userModel);
            let queryResult=await request.execute(procedureName);
            let flag=(queryResult.rowsAffected[0]>=1) ? true :false;
            return flag;
        }
        catch(ex){
            throw ex;
        }
        finally{
            await sqlProvider.CloseSqlConnectionAsync();
        }
    }

    protected async QueryExecuteAsync(sqlProvider:ISqlProvider, configuration:IConfiguration,command:string,procedureName:string,userModel:UserModel): Promise<mssql.IProcedureResult<any>>{
        try
        {
            let pool:mssql.ConnectionPool=await sqlProvider.OpenSqlConnectionAsync(await this.SqlConnectionConfigAsync(configuration));

            let request:mssql.Request=await this.GetParameterAsync(pool.request(),command,userModel!);

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