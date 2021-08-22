import { ValidationChain } from "express-validator";
import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import UserValidationAbstract from "./Abstract/UserValidationAbstract";

export class RegisterUserValidation implements IRequest<ValidationChain[]>{

}

export class RegisterUserValidationHandler extends UserValidationAbstract implements IRequestHandler<RegisterUserValidation,ValidationChain[]>{
    
    public HandleAsync(requestPara: RegisterUserValidation): Promise<ValidationChain[]> {
        return new Promise((resolve,reject)=>{

            try
            {
                let validationSummary:ValidationChain[]=new Array<ValidationChain>();

                    validationSummary.push(
                        this.FirstNameValidation(),
                        this.LastNameValidation(),
                        this.EmailValidation(),
                        this.PasswordValidation()
                    );

                    resolve(validationSummary);
            }
            catch(ex){
                reject(ex);
                throw ex;
            }

        });
    }

}