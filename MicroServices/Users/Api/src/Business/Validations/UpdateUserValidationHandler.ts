import { ValidationChain } from "express-validator";
import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import UserValidationAbstract from "./Abstract/UserValidationAbstract";

export class UpdateUserValidation implements IRequest<ValidationChain[]>{

}

export class UpdateUserValidationHandler extends UserValidationAbstract implements IRequestHandler<UpdateUserValidation,ValidationChain[]>{
    
    public HandleAsync(requestPara: UpdateUserValidation): Promise<ValidationChain[]> {
       return new Promise((resolve,reject)=>{

            try
            {
                let validationSummary:ValidationChain[]=new Array<ValidationChain>();
                    validationSummary.push(
                        this.UserIdentityValidation(),
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