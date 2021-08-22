import express, { NextFunction } from "express";
import { ValidationChain } from "express-validator";
import BaseController from "../../../../../Frameworks/BaseController/BaseController";
import { IMediatR } from "../../../../../Frameworks/MediatR/Core/MediatR";
import {ValidationDelegateHandlerAsync} from "../../../../../Frameworks/ValidationDelegates/Core/ValidationDelegateHandler";
import { CreatePostCommand } from "../Application/Command/CreatePostCommandHandler";
import { CreatePostValidation } from "../Business/Validations/CreatePostValidationHandler";
import {UseAuthorize} from "../../../../../Frameworks/Middlewares/Jwt/JwtMiddlewareExtensions";
import { IConfiguration } from "../Config/Settings/Core/Configuration";
import { UpdatePostValidation } from "../Business/Validations/UpdatePostValidationHandler";
import { UpdatePostCommand } from "../Application/Command/UpdatePostCommandHandler";
import { RemovePostValidation } from "../Business/Validations/RemovePostValidationHandler";
import { RemovePostCommand } from "../Application/Command/RemovePostCommandHandler";
import { GetUserPostPostValidation } from "../Business/Validations/GetUserPostValidationHandler";
import { GetUserPostQuery } from "../Application/Queries/GetUserPostQueryHandler";
import GetUserPostResponseModel from "../Models/Response/GetUserPostResponseModel";

export default class PostController extends BaseController{
    
    private readonly mediatR:IMediatR;
    private readonly configuration:IConfiguration;

    constructor(mediatR:IMediatR,configuration:IConfiguration){
        super();

        this.router=express.Router();
        this.routePath="/api/post";

        this.mediatR=mediatR;
        this.configuration=configuration;

        this.InitializeRoutes().then((resolve)=>console.log("Post Route Initialize"));
    }

    protected async InitializeRoutes(): Promise<void> {
        // http://localhost:3002/api/post/create
        this.router?.post(
            `${this.routePath}/create`,
            await this.mediatR.SendAsync<ValidationChain[],CreatePostValidation>(new CreatePostValidation()),
            UseAuthorize(this.configuration.AppSettingConfig.Development.Secret),
            this.CreatePostAsync.bind(this)
        );

        // http://localhost:3002/api/post/update
        this.router?.post(
            `${this.routePath}/update`,
            await this.mediatR.SendAsync<ValidationChain[],UpdatePostValidation>(new UpdatePostValidation()),
            UseAuthorize(this.configuration.AppSettingConfig.Development.Secret),
            this.UpdatePostAsync.bind(this)
        );

        // http://localhost:3002/api/post/remove
        this.router?.post(
            `${this.routePath}/remove`,
            await this.mediatR.SendAsync<ValidationChain[],RemovePostValidation>(new RemovePostValidation()),
            UseAuthorize(this.configuration.AppSettingConfig.Development.Secret),
            this.RemovePostAsync.bind(this)
        );

        // http://localhost:3002/api/post/getuserposts
        this.router?.post(
            `${this.routePath}/getuserposts`,
            await this.mediatR.SendAsync<ValidationChain[],GetUserPostPostValidation>(new GetUserPostPostValidation()),
            UseAuthorize(this.configuration.AppSettingConfig.Development.Secret),
            this.GetUserPostsAsync.bind(this)
        );
    }

    private async CreatePostAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync(request,response,async()=>{
                const {
                    Post,
                    UserIdentity
                }=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,CreatePostCommand>(new CreatePostCommand(Post,UserIdentity));
                return flag;
            });
        }
        catch(ex)
        {
            next(ex);
        }
    }

    private async UpdatePostAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync(request,response,async()=>{
                const {
                    Post,
                    PostIdentity
                }=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,UpdatePostCommand>(new UpdatePostCommand(Post,PostIdentity));
                return flag;
            });
        }
        catch(ex)
        {
            next(ex);
        }
    }

    private async RemovePostAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync(request,response,async()=>{
                const {
                    PostIdentity
                }=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,RemovePostCommand>(new RemovePostCommand(PostIdentity));
                return flag;
            });
        }
        catch(ex)
        {
            next(ex);
        }
    }

    private async GetUserPostsAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync(request,response,async()=>{
                const {
                    UserIdentity,
                    PageNumber,
                    RowsOfPageNumber
                }=request.body;

                let getUserPostResponseList:(GetUserPostResponseModel|undefined)[] =await this.mediatR.SendAsync<(GetUserPostResponseModel|undefined)[],GetUserPostQuery>(new GetUserPostQuery(UserIdentity,PageNumber,RowsOfPageNumber));
                return getUserPostResponseList;
            });
        }
        catch(ex)
        {
            next(ex);
        }
    }

}