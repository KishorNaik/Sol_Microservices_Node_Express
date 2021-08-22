import { IMediatR } from "../../../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { RemovePostDataService } from "../../Infrastructures/DataService/RemovePostDataServiceHandler";
import { UpdatePostDataService } from "../../Infrastructures/DataService/UpdatePostDataServiceHandler";

export  class RemovePostCommand implements IRequest<boolean>{

    public PostIdentity?:string;

    constructor(postIdentity?:string){
        this.PostIdentity=postIdentity;
    }
}

export class RemovePostCommandHandler implements IRequestHandler<RemovePostCommand, boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: RemovePostCommand): Promise<boolean> {
        try
        {
            return this.mediatR.SendAsync<boolean,RemovePostDataService>(new RemovePostDataService(requestPara.PostIdentity));
        }
        catch(ex)
        {
            throw ex;
        }
    }

}