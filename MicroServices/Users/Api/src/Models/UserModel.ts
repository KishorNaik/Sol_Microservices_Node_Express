import UserAuthModel from "./UserAuthModel";
import UserTokenModel from "./UserTokenModel";

export default class UserModel{
    public UserIdentity?:string;
    public FirstName?:string;
    public LastName?:string;

    public UserAuth?:UserAuthModel;

    public UserToken?:UserTokenModel;
}