import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../Frameworks/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserAuthModel from "../../Models/UserAuthModel";
import UserModel from "../../Models/UserModel";
import UserDataServiceAbstract from "../Abstracts/UserDataServiceAbstract";

export class UpdateUserDataService extends UserModel implements IRequest<boolean>{

    constructor(
        userIdentity:string,
        firstName:string,
        lastName:string,
        email:string,
        password:string
    ){
        super();
        this.FirstName=firstName;
        this.LastName=lastName;
        this.UserIdentity=userIdentity;
        this.UserAuth=new UserAuthModel();
        this.UserAuth.Email=email;
        this.UserAuth.Password=password;
    }
}

export class UpdateUserDataServiceHandler extends UserDataServiceAbstract implements IRequestHandler<UpdateUserDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }

    public HandleAsync(requestPara: UpdateUserDataService): Promise<boolean> {
       try
       {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Update-User","uspSetUser",requestPara);
       }
       catch(ex){
           throw ex;
       }
    }

}