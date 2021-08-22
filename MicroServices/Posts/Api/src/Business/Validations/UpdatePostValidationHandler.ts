import { ValidationChain } from "express-validator";
import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import PostValidationAbstract from "./Abstract/PostValidationAbstract";

export class UpdatePostValidation implements IRequest<ValidationChain[]>{

}

export class UpdatePostValidationHandler extends PostValidationAbstract implements IRequestHandler<UpdatePostValidation,ValidationChain[]>{
    

    public HandleAsync(requestPara: UpdatePostValidation): Promise<ValidationChain[]> {
       return new Promise((resolve,reject)=>{
           try
           {
                let validationSummary:ValidationChain[]=new Array<ValidationChain>();
                validationSummary.push(
                    this.PostValidation(),
                    this.PostIdentityValidation()
                );

                resolve(validationSummary);
           }
           catch(ex)
           {
               reject(ex);
               throw ex;
           }
           
       });
    }

}