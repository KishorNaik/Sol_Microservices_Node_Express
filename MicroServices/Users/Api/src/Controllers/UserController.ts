import BaseController from "../../../../../Frameworks/BaseController/BaseController";
import { IMediatR } from "../../../../../Frameworks/MediatR/Core/MediatR";
import express, { NextFunction } from "express";
import { ValidationChain } from "express-validator";
import { RegisterUserValidation } from "../Business/Validations/RegisterUserValidationHandler";
import { ValidationDelegateHandlerAsync } from "../../../../../Frameworks/ValidationDelegates/Core/ValidationDelegateHandler";
import { RegisterUserCommand } from "../Applications/Features/Commands/RegisterUserCommandHandler";
import UserModel from "../Models/UserModel";
import { UserAuthQuery } from "../Applications/Features/Queries/UserAuthQueryHandler";
import { UserAuthValidation } from "../Business/Validations/UserAuthValidationHandler";
import { UpdateUserCommand } from "../Applications/Features/Commands/UpdateUserCommandHandler";
import { UpdateUserValidation } from "../Business/Validations/UpdateUserValidationHandler";
import { IConfiguration } from "../Config/Settings/Core/Configuration";
import { UseAuthorize } from "../../../../../Frameworks/Middlewares/Jwt/JwtMiddlewareExtensions";
import { RemoveUserValidation } from "../Business/Validations/RemoveUserValidationHandler";
import { RemoveUserCommand } from "../Applications/Features/Commands/RemoveUserCommandHandler";

export default class UserController extends BaseController{
    

    private readonly mediatR:IMediatR;
    private readonly configuration:IConfiguration;

    constructor(mediatR:IMediatR,configuration:IConfiguration){
        super();

        this.router=express.Router();
        this.routePath="/api/user";

        this.mediatR=mediatR;
        this.configuration=configuration;

        this.InitializeRoutes().then((resolve)=>console.log("User Route Initialize"));
    }

    protected async InitializeRoutes(): Promise<void> {
        // http://localhost:3000/api/user/register

        this.router?.post(
            `${this.routePath}/register`,
            await this.mediatR.SendAsync<ValidationChain[],RegisterUserValidation>(new RegisterUserValidation()),
            this.RegisterUserAsync.bind(this)
        );

        // http://localhost:3000/api/user/auth
        this.router?.post(
            `${this.routePath}/auth`,
            await this.mediatR.SendAsync<ValidationChain[],UserAuthValidation>(new UserAuthValidation()),
            this.AuthUserAsync.bind(this)
        );

        // http://localhost:3000/api/user/update
        this.router?.post(
            `${this.routePath}/update`,
            await this.mediatR.SendAsync<ValidationChain[],UpdateUserValidation>(new UpdateUserValidation()),
            UseAuthorize(this.configuration.AppSettingConfig.Development.Secret), // Auth for All Role
            this.UpdateUserAsync.bind(this)
        );

        // http://localhost:3000/api/user/remove
        this.router?.post(
            `${this.routePath}/remove`,
            await this.mediatR.SendAsync<ValidationChain[],RemoveUserValidation>(new RemoveUserValidation()),
            UseAuthorize(this.configuration.AppSettingConfig.Development.Secret), // Auth for All Role
            this.RemoveUserAsync.bind(this)
        );
    }

    public async RegisterUserAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync<boolean>(request,response,async ()=>{

                const {
                    FirstName,
                    LastName,
                    Email,
                    Password
                }=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,RegisterUserCommand>(new RegisterUserCommand(FirstName,LastName,Email,Password));
                return flag;

            });
        }
        catch(ex){
            next(ex);
        }
    }

    public async AuthUserAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync<UserModel>(request,response,async ()=>{

                const {
                    Email,
                    Password
                }=request.body;

                let userModel:UserModel=await this.mediatR.SendAsync<UserModel,UserAuthQuery>(new UserAuthQuery(Email,Password));
                return userModel;

            });
        }
        catch(ex){
            next(ex);
        }
    }

    public async UpdateUserAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync<boolean>(request,response,async ()=>{

                const {
                    UserIdentity,
                    FirstName,
                    LastName,
                    Email,
                    Password
                }=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,UpdateUserCommand>(new UpdateUserCommand(UserIdentity,FirstName,LastName,Email,Password));
                return flag;

            });
        }
        catch(ex){
            throw ex;
        }
    }

    public async RemoveUserAsync(request:express.Request,response:express.Response,next:NextFunction):Promise<void>{
        try
        {
            await ValidationDelegateHandlerAsync<boolean>(request,response,async ()=>{

                const {
                    UserIdentity
                   
                }=request.body;

                let flag:boolean=await this.mediatR.SendAsync<boolean,RemoveUserCommand>(new RemoveUserCommand(UserIdentity));
                return flag;

            });
        }
        catch(ex){
            throw ex;
        }
    }
}