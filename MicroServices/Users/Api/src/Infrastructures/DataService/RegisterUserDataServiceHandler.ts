
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserModel from "../../Models/UserModel";
import UserDataServiceAbstract from "../Abstracts/UserDataServiceAbstract";
import mssql from "mssql/msnodesqlv8";
import UserAuthModel from "../../Models/UserAuthModel";
import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";

export class RegisterUserDataService extends UserModel implements IRequest<boolean>{

    constructor(
        firstName:string,
        lastName:string,
        email:string,
        password:string
    ){
        super();
        this.FirstName=firstName;
        this.LastName=lastName;
        this.UserAuth=new UserAuthModel();
        this.UserAuth.Email=email;
        this.UserAuth.Password=password;
    }

}

export class RegisterUserDataServiceHandler extends UserDataServiceAbstract implements IRequestHandler<RegisterUserDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }

    public HandleAsync(requestPara: RegisterUserDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Register-User","uspSetUser",requestPara);
        }
        catch(ex){
            throw ex;
        }
    }

}