import IRequest from "../../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import UserModel from "../../../Models/UserModel";
import jwt from "jsonwebtoken";
import cleanDeep from "clean-deep";
import { IMediatR } from "../../../../../../../Frameworks/MediatR/Core/MediatR";
import { IConfiguration } from "../../../Config/Settings/Core/Configuration";
import { UserAuthDataService } from "../../../Infrastructures/DataService/UserAuthDataServiceHandler";
import { HttpException } from "../../../../../../../Frameworks/Middlewares/ExceptionHandling/ExceptionMiddlewareExtension";
import bcrypt from "bcryptjs";
import UserTokenModel from "../../../Models/UserTokenModel";



export class UserAuthQuery implements IRequest<UserModel>{

    public Email:string|undefined;
    public Password:string|undefined;

    constructor(email:string|undefined,password:string|undefined){
        this.Email=email;
        this.Password=password;
    }
}

export class UserAuthQueryHandler implements IRequestHandler<UserAuthQuery,UserModel>{

    private readonly mediatR:IMediatR;
    private readonly configuration:IConfiguration;

    constructor(mediatR:IMediatR,configuration:IConfiguration){
        this.mediatR=mediatR;
        this.configuration=configuration;
    }


    public async HandleAsync(requestPara: UserAuthQuery): Promise<UserModel> {
        try
        {
            let user=await this.mediatR.SendAsync<UserModel,UserAuthDataService>(new UserAuthDataService(requestPara.Email));

            // Compare Hash Password
            if(!user || !bcrypt.compareSync(requestPara.Password!,user?.UserAuth?.Password!)){
                throw new HttpException(200,"UserName or Password does not match");
            }

            // jwt
            const token=jwt.sign({sub:user.UserIdentity},this.configuration.AppSettingConfig.Development.Secret,{expiresIn:"7d",algorithm:"HS256"});
            
            user!.UserAuth!.Password=undefined;
            user.UserToken=new UserTokenModel();
                user.UserToken.Token=token;
            
            // Clear all null values
            user=cleanDeep(user);

            return user;

        }
        catch(ex){
            throw ex;
        }
    }

}