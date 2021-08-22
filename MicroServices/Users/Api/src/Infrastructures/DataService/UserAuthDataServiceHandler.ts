import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../Frameworks/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserAuthModel from "../../Models/UserAuthModel";
import UserModel from "../../Models/UserModel";
import UserDataServiceAbstract from "../Abstracts/UserDataServiceAbstract";

export class UserAuthDataService extends UserModel implements IRequest<UserModel>{

    constructor(email:string|undefined){
        super();
        this.UserAuth=new UserAuthModel();
        this.UserAuth.Email=email;
    }
}

export class UserAuthDataServiceHandler extends UserDataServiceAbstract implements IRequestHandler<UserAuthDataService,UserModel>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }
    
    public async HandleAsync(requestPara: UserAuthDataService): Promise<UserModel> {
       try
       {
            let query=await  this.QueryExecuteAsync(this.sqlProvider,this.configuration,"Auth","uspGetUser",requestPara);

            let queryResult=query.recordset[0];

            // Map query Result into User Model
            let userModel:UserModel=new UserModel();
                userModel.FirstName=queryResult.FirstName;
                userModel.LastName=queryResult.LastName;
                userModel.UserAuth=new UserAuthModel();

                userModel.UserAuth.Email=queryResult.Email;
                userModel.UserAuth.Password=queryResult.HashPassword;

            return userModel;
       }
       catch(ex)
       {
           throw ex;
       }
    }

}