import Bottle from "bottlejs";
import { IMediatRRegister } from "../../../../../../../Frameworks/MediatR/Core/MediatR";
import { CreatePostCommand, CreatePostCommandHandler } from "../../../Application/Command/CreatePostCommandHandler";
import { RemovePostCommand, RemovePostCommandHandler } from "../../../Application/Command/RemovePostCommandHandler";
import { UpdatePostCommand, UpdatePostCommandHandler } from "../../../Application/Command/UpdatePostCommandHandler";
import { GetUserPostQuery, GetUserPostQueryHandler } from "../../../Application/Queries/GetUserPostQueryHandler";
import { CreatePostValidation, CreatePostValidationHandler } from "../../../Business/Validations/CreatePostValidationHandler";
import { GetUserPostPostValidation, GetUserPostPostValidationHandler } from "../../../Business/Validations/GetUserPostValidationHandler";
import { RemovePostValidation, RemovePostValidationHandler } from "../../../Business/Validations/RemovePostValidationHandler";
import { UpdatePostValidation, UpdatePostValidationHandler } from "../../../Business/Validations/UpdatePostValidationHandler";
import PostController from "../../../Controllers/PostController";
import { CreatePostDataService, CreatePostDataServiceHandler } from "../../../Infrastructures/DataService/CreatePostDataServiceHandler";
import { GetUserPostDataService, GetUserPostDataServiceHandler } from "../../../Infrastructures/DataService/GetUserPostDataServiceHandler";
import { RemovePostDataService, RemovePostDataServiceHandler } from "../../../Infrastructures/DataService/RemovePostDataServiceHandler";
import { UpdatePostDataService, UpdatePostDataServiceHandler } from "../../../Infrastructures/DataService/UpdatePostDataServiceHandler";


export const PostServiceExtension=(bottleContainer:Bottle):void=>{
    let DataServiceHandler=():void=>{
        bottleContainer.service("createPostDataServiceHandler",CreatePostDataServiceHandler,"sqlProvider","configurations");
        bottleContainer.service("updatePostDataServiceHandler",UpdatePostDataServiceHandler,"sqlProvider","configurations");
        bottleContainer.service("removePostDataServiceHandler",RemovePostDataServiceHandler,"sqlProvider","configurations");
        bottleContainer.service("getUserPostDataServiceHandler",GetUserPostDataServiceHandler,"sqlProvider","configurations");
    }

    let CommmandHandler=():void=>{
        bottleContainer.service("createPostCommandHandler",CreatePostCommandHandler,"mediatR");
        bottleContainer.service("updatePostCommandHandler",UpdatePostCommandHandler,"mediatR");
        bottleContainer.service("removePostCommandHandler",RemovePostCommandHandler,"mediatR");
    }

    let QueryHandler=():void=>{
       
       bottleContainer.service("getUserPostQueryHandler",GetUserPostQueryHandler,"mediatR");
    }

    let ValidationHandler=():void=>{
       bottleContainer.service("createPostValidationHandler",CreatePostValidationHandler);
       bottleContainer.service("updatePostValidationHandler",UpdatePostValidationHandler);
       bottleContainer.service("removePostValidationHandler",RemovePostValidationHandler);
       bottleContainer.service("getUserPostValidation",GetUserPostPostValidationHandler);
    }

    let Controller=():void=>{
       bottleContainer.service("postController",PostController,"mediatR","configurations");
    }

    let MediatRRegistration=():void=>{

        let mediatR:IMediatRRegister=bottleContainer.container.mediatR;

        // Create Post
        mediatR.RegisterRequest(CreatePostDataService,bottleContainer.container.createPostDataServiceHandler);
        mediatR.RegisterRequest(CreatePostCommand,bottleContainer.container.createPostCommandHandler);
        mediatR.RegisterRequest(CreatePostValidation,bottleContainer.container.createPostValidationHandler);

        // Update Post
        mediatR.RegisterRequest(UpdatePostDataService,bottleContainer.container.updatePostDataServiceHandler);
        mediatR.RegisterRequest(UpdatePostCommand,bottleContainer.container.updatePostCommandHandler);
        mediatR.RegisterRequest(UpdatePostValidation,bottleContainer.container.updatePostValidationHandler);

        // Remove Post
        mediatR.RegisterRequest(RemovePostDataService,bottleContainer.container.removePostDataServiceHandler);
        mediatR.RegisterRequest(RemovePostCommand,bottleContainer.container.removePostCommandHandler);
        mediatR.RegisterRequest(RemovePostValidation,bottleContainer.container.removePostValidationHandler);

        // Get User Post
        mediatR.RegisterRequest(GetUserPostDataService,bottleContainer.container.getUserPostDataServiceHandler);
        mediatR.RegisterRequest(GetUserPostQuery,bottleContainer.container.getUserPostQueryHandler);
        mediatR.RegisterRequest(GetUserPostPostValidation,bottleContainer.container.getUserPostValidation);

    }

    DataServiceHandler();
    CommmandHandler();
    QueryHandler();
    ValidationHandler();
    MediatRRegistration();
    Controller();

}