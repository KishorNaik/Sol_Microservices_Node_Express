import { IMediatR } from "../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { RemoveUserDataService } from "../../../Infrastructures/DataService/RemoveUserDataServiceHandler";

export class RemoveUserCommand implements IRequest<boolean>{
    public UserIdentity?:string;

    constructor(userIdentity?:string){
        this.UserIdentity=userIdentity;
    }
}

export class RemoveUserCommandHandler implements IRequestHandler<RemoveUserCommand,boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: RemoveUserCommand): Promise<boolean> {
       try
       {
            return this.mediatR.SendAsync<boolean,RemoveUserDataService>(new RemoveUserDataService(requestPara.UserIdentity));
       }
       catch(ex){
           throw ex;
       }
    }

}