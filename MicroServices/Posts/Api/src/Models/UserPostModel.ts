import PaginationModel from "../../../../../Frameworks/Models/Pagination/PaginationModel";
export default class UserPostModel{
    public PostIdentity?:string;
    public Post?:string;
    public UserIdentity?:string;

    // Non DoMain Model
    public Pagination?:PaginationModel;
}