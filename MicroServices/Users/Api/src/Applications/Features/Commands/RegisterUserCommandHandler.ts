import { IMediatR } from "../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import bcrypt from "bcryptjs";
import { RegisterUserDataService } from "../../../Infrastructures/DataService/RegisterUserDataServiceHandler";

export class RegisterUserCommand implements IRequest<boolean>{

    public FirstName?:string;
    public LastName?:string;

    public Email?:string;
    public Password?:string;

    constructor(
        firstName?:string,
        lastName?:string,
        email?:string,
        password?:string
    )
    {
        this.FirstName=firstName;
        this.LastName=lastName;
        this.Email=email;
        this.Password=password
    }
}

export class RegisterUserCommandHandler implements IRequestHandler<RegisterUserCommand,boolean>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(requestPara: RegisterUserCommand): Promise<boolean> {
        try
        {
            const passwordHash:string|undefined = bcrypt.hashSync(requestPara.Password!,10);

            return this.mediatR.SendAsync<boolean,RegisterUserDataService>(new RegisterUserDataService(requestPara.FirstName!,requestPara.LastName!,requestPara.Email!,passwordHash))

        }
        catch(ex){
            throw ex;
        }
    }

}