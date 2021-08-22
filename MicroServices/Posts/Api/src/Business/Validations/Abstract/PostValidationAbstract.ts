import {check,ValidationChain,validationResult } from "express-validator";

export default abstract class PostValidationAbstract{
    
    protected PostIdentityValidation=():ValidationChain=>{
        return check("PostIdentity").isUUID();
    }

    protected PostValidation=():ValidationChain=>{
        return check("Post").notEmpty().withMessage("Post is required");
    }

    protected UserIdentityValidation=():ValidationChain=>{
        return check("UserIdentity").isUUID();
    }

    protected PageNumberValidation=():ValidationChain=>{
        return check('PageNumber')
                    .notEmpty().withMessage("PageNumber required")
                    .isNumeric().withMessage("PageNumber must be numeric")
                    .custom((value)=>{
                        if(typeof(value)==="number"){
                            if((<number>value)>=0){
                                return true;
                            }
                        }
                        return false;
                    }).withMessage("PageNumber must be Positive number");
                    
    }

    protected RowsOfPageNumberValidation=():ValidationChain=>{
        return check('RowsOfPageNumber')
                    .notEmpty().withMessage("Rows of Page Number required")
                    .isNumeric().withMessage("Rows of Page Number must be numeric")
                    .custom((value)=>{
                        if(typeof(value)==="number"){
                            if((<number>value)>=0){
                                return true;
                            }
                        }
                        return false;
                    }).withMessage("Rows of Page Number must be Positive number");
                    
    }

}