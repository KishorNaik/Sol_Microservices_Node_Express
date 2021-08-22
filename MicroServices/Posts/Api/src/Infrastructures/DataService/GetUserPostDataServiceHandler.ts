import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import PaginationModel from "../../../../../../Frameworks/Models/Pagination/PaginationModel";
import { ISqlProvider } from "../../../../../../Frameworks/SqlProvider/Core/SqlProviders";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import GetUserPostResponseModel from "../../Models/Response/GetUserPostResponseModel";
import UserPostModel from "../../Models/UserPostModel";
import PostDataServiceAbstract from "../Abstract/PostDataServiceAbstract";

export class GetUserPostDataService extends UserPostModel implements IRequest<GetUserPostResponseModel[]>{
    constructor(userIdentity?:string,PageNumber?:number, RowsOfPageNumber?:number){
        super();
        this.UserIdentity=userIdentity;
        this.Pagination=new PaginationModel();
        this.Pagination.PageNumber=PageNumber;
        this.Pagination.RowsOfPageNumber=RowsOfPageNumber;
    }
}

export class GetUserPostDataServiceHandler extends PostDataServiceAbstract implements IRequestHandler<GetUserPostDataService,GetUserPostResponseModel[]>{
    private readonly sqlProvider:ISqlProvider;
    private readonly configuration:IConfiguration;

    constructor(sqlProvider:ISqlProvider,configuration:IConfiguration){
        super();
        this.sqlProvider=sqlProvider;
        this.configuration=configuration;
    }
    
    public async HandleAsync(requestPara: GetUserPostDataService): Promise<GetUserPostResponseModel[]> {
        try
        {
            let queryResult=await this.QueryExecuteAsync(this.sqlProvider,this.configuration,"Get-User-Post","uspGetUserPost",requestPara);

            let getUserPostResponseList:GetUserPostResponseModel[]=queryResult.recordset;

            return getUserPostResponseList;
        }
        catch(ex)
        {
            throw ex;
        }
    }

}