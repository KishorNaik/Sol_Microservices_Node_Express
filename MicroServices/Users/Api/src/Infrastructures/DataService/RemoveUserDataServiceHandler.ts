import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../Frameworks/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserModel from "../../Models/UserModel";
import UserDataServiceAbstract from "../Abstracts/UserDataServiceAbstract";

export class RemoveUserDataService extends UserModel implements IRequest<boolean>{

    constructor(userIdentity?:string){
        super();
        this.UserIdentity=userIdentity
    }
}

export class RemoveUserDataServiceHandler extends UserDataServiceAbstract implements IRequestHandler<RemoveUserDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }

    public HandleAsync(requestPara: RemoveUserDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Remove-User","uspSetUser",requestPara);
        }
        catch(ex){
            throw ex;
        }
    }

}