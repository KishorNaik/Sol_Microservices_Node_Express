import { IMediatR } from "../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { UpdateUserDataService } from "../../../Infrastructures/DataService/UpdateUserDataServiceHandler";

export class UpdateUserCommand implements IRequest<boolean>{

    public UserIdentity?:string;
    public FirstName?:string;
    public LastName?:string;

    public Email?:string;
    public Password?:string;

    constructor(
        UserIdentity?:string,
        firstName?:string,
        lastName?:string,
        email?:string,
        password?:string
    )
    {
        this.UserIdentity=UserIdentity;
        this.FirstName=firstName;
        this.LastName=lastName;
        this.Email=email;
        this.Password=password
    }
}

export class UpdateUserCommandHandler implements IRequestHandler<UpdateUserCommand,boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: UpdateUserCommand): Promise<boolean> {
       try
       {
            return this.mediatR.SendAsync<boolean,UpdateUserDataService>(
                new UpdateUserDataService
                    (requestPara.UserIdentity!,
                        requestPara.FirstName!,
                        requestPara.LastName!,
                        requestPara.Email!,
                        requestPara.Password!
                    )
            );
       }
       catch(ex){
           throw ex;
       }
    }

}