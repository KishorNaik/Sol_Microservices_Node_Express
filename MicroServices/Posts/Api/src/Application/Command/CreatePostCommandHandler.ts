import { IMediatR } from "../../../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { CreatePostDataService } from "../../Infrastructures/DataService/CreatePostDataServiceHandler";

export  class CreatePostCommand implements IRequest<boolean>{

    public Post?:string;
    public UserIdentity?:string;

    constructor(post?:string,userIdentity?:string){
        this.Post=post;
        this.UserIdentity=userIdentity;
    }
}

export class CreatePostCommandHandler implements IRequestHandler<CreatePostCommand, boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: CreatePostCommand): Promise<boolean> {
        try
        {
            return this.mediatR.SendAsync<boolean,CreatePostDataService>(new CreatePostDataService(requestPara.Post,requestPara.UserIdentity));
        }
        catch(ex)
        {
            throw ex;
        }
    }

}