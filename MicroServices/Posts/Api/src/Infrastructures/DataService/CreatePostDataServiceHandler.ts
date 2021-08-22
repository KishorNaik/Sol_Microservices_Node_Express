import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { ISqlProvider } from "../../../../../../Frameworks/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserPostModel from "../../Models/UserPostModel";
import PostDataServiceAbstract from "../Abstract/PostDataServiceAbstract";

export class CreatePostDataService extends UserPostModel implements IRequest<boolean>{

    constructor(post?:string,userIdentity?:string){
        super();
        this.Post=post;
        this.UserIdentity=userIdentity;
    }
}

export class CreatePostDataServiceHandler extends PostDataServiceAbstract implements IRequestHandler<CreatePostDataService,boolean>{
    
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }
    
    public HandleAsync(requestPara: CreatePostDataService): Promise<boolean> {
        try
        {
            return this.CommandExecuteAsync(this.sqlProvider,this.configuration,"Create-Post","uspSetUserPost",requestPara);
        }
        catch(ex)
        {
            throw ex;
        }
    }

}