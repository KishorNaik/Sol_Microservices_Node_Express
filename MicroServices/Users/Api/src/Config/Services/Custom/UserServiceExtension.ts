import Bottle from "bottlejs";
import { IMediatRRegister } from "../../../../Frameworks/MediatR/Core/MediatR";
import { RegisterUserCommand, RegisterUserCommandHandler } from "../../../Applications/Features/Commands/RegisterUserCommandHandler";
import { RemoveUserCommand, RemoveUserCommandHandler } from "../../../Applications/Features/Commands/RemoveUserCommandHandler";
import { UpdateUserCommand, UpdateUserCommandHandler } from "../../../Applications/Features/Commands/UpdateUserCommandHandler";
import { UserAuthQuery, UserAuthQueryHandler } from "../../../Applications/Features/Queries/UserAuthQueryHandler";
import { RegisterUserValidation, RegisterUserValidationHandler } from "../../../Business/Validations/RegisterUserValidationHandler";
import { RemoveUserValidation, RemoveUserValidationHandler } from "../../../Business/Validations/RemoveUserValidationHandler";
import { UpdateUserValidation, UpdateUserValidationHandler } from "../../../Business/Validations/UpdateUserValidationHandler";
import { UserAuthValidation, UserAuthValidationHandler } from "../../../Business/Validations/UserAuthValidationHandler";
import UserController from "../../../Controllers/UserController";
import { RegisterUserDataService, RegisterUserDataServiceHandler } from "../../../Infrastructures/DataService/RegisterUserDataServiceHandler";
import { RemoveUserDataService, RemoveUserDataServiceHandler } from "../../../Infrastructures/DataService/RemoveUserDataServiceHandler";
import { UpdateUserDataService, UpdateUserDataServiceHandler } from "../../../Infrastructures/DataService/UpdateUserDataServiceHandler";
import { UserAuthDataService, UserAuthDataServiceHandler } from "../../../Infrastructures/DataService/UserAuthDataServiceHandler";

export const UserServiceExtension=(bottleContainer:Bottle):void=>{
    let DataServiceHandler=():void=>{
        bottleContainer.service("registerUserDataServiceHandler",RegisterUserDataServiceHandler,"sqlProvider","configurations");
        bottleContainer.service("userAuthDataServiceHandler",UserAuthDataServiceHandler,"sqlProvider","configurations");
        bottleContainer.service("updateUserDataServiceHandler",UpdateUserDataServiceHandler,"sqlProvider","configurations");
        bottleContainer.service("removeUserDataServiceHandler",RemoveUserDataServiceHandler,"sqlProvider","configurations");
    }

    let CommmandHandler=():void=>{
        bottleContainer.service("registerUserCommmandHandler",RegisterUserCommandHandler,"mediatR");
        bottleContainer.service("updateUserCommandHandler",UpdateUserCommandHandler,"mediatR");
        bottleContainer.service("removeUserCommandHandler",RemoveUserCommandHandler,"mediatR");
    }

    let QueryHandler=():void=>{
        bottleContainer.service("userAuthQueryHandler",UserAuthQueryHandler,"mediatR","configurations");
    }

    let ValidationHandler=():void=>{
        bottleContainer.service("registerUserValidationHandler",RegisterUserValidationHandler);
        bottleContainer.service("userAuthValidationHandler",UserAuthValidationHandler);
        bottleContainer.service("updateUserValidationHandler",UpdateUserValidationHandler);
        bottleContainer.service("removeUserValidationHandler",RemoveUserValidationHandler);
    }

    let Controller=():void=>{
        bottleContainer.service("userController",UserController,"mediatR","configurations");
    }

    let MediatRRegistration=():void=>{

        let mediatR:IMediatRRegister=bottleContainer.container.mediatR;

        // Register User
        mediatR.RegisterRequest(RegisterUserDataService,bottleContainer.container.registerUserDataServiceHandler);
        mediatR.RegisterRequest(RegisterUserCommand,bottleContainer.container.registerUserCommmandHandler);
        mediatR.RegisterRequest(RegisterUserValidation,bottleContainer.container.registerUserValidationHandler);

        // Auth User
        mediatR.RegisterRequest(UserAuthDataService,bottleContainer.container.userAuthDataServiceHandler);
        mediatR.RegisterRequest(UserAuthQuery,bottleContainer.container.userAuthQueryHandler);
        mediatR.RegisterRequest(UserAuthValidation,bottleContainer.container.userAuthValidationHandler);
        

        // Update User
        mediatR.RegisterRequest(UpdateUserDataService,bottleContainer.container.updateUserDataServiceHandler);
        mediatR.RegisterRequest(UpdateUserCommand,bottleContainer.container.updateUserCommandHandler);
        mediatR.RegisterRequest(UpdateUserValidation,bottleContainer.container.updateUserValidationHandler);

        // Remove User
        mediatR.RegisterRequest(RemoveUserDataService,bottleContainer.container.removeUserDataServiceHandler);
        mediatR.RegisterRequest(RemoveUserCommand,bottleContainer.container.removeUserCommandHandler);
        mediatR.RegisterRequest(RemoveUserValidation,bottleContainer.container.removeUserValidationHandler);


    }

    DataServiceHandler();
    CommmandHandler();
    QueryHandler();
    ValidationHandler();
    MediatRRegistration();
    Controller();

}