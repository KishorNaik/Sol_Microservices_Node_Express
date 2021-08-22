import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserPostModel from "../../Models/UserPostModel";
import PostDataServiceAbstract from "../Abstract/PostDataServiceAbstract";

export class RemovePostDataService extends UserPostModel implements IRequest<boolean>{

    constructor(postIdentity?:string){
        super();
        this.PostIdentity=postIdentity;
    }
}

export class RemovePostDataServiceHandler extends PostDataServiceAbstract implements IRequestHandler<RemovePostDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }
    
    public HandleAsync(requestPara: RemovePostDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Remove-Post","uspSetUserPost",requestPara);
        }
        catch(ex)
        {
            throw ex;
        }
    }

}