import {check,ValidationChain,validationResult } from "express-validator";

export default abstract class UserValidationAbstract{

    protected UserIdentityValidation=():ValidationChain=>{
        return check("UserIdentity").isUUID();
    }

    protected FirstNameValidation=():ValidationChain=>{
        return check("FirstName").notEmpty().withMessage("First Name Required");
    }

    protected LastNameValidation=():ValidationChain=>{
        return check("LastName").notEmpty().withMessage("Last Name Required");
    }

    protected EmailValidation=():ValidationChain=>{
        return check("Email").notEmpty().isEmail();
    }

    protected PasswordValidation=():ValidationChain=>{
        return check("Password").notEmpty().withMessage("Password required")
    }
}