import { IMediatR } from "../../../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { UpdatePostDataService } from "../../Infrastructures/DataService/UpdatePostDataServiceHandler";

export  class UpdatePostCommand implements IRequest<boolean>{

    public Post?:string;
    public PostIdentity?:string;

    constructor(post?:string,postIdentity?:string){
        this.Post=post;
        this.PostIdentity=postIdentity;
    }
}

export class UpdatePostCommandHandler implements IRequestHandler<UpdatePostCommand, boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: UpdatePostCommand): Promise<boolean> {
        try
        {
            return this.mediatR.SendAsync<boolean,UpdatePostDataService>(new UpdatePostDataService(requestPara.PostIdentity,requestPara.Post));
        }
        catch(ex)
        {
            throw ex;
        }
    }

}