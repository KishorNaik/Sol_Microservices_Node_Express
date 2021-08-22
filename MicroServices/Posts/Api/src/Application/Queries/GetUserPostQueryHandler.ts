import { IMediatR } from "../../../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { GetUserPostDataService } from "../../Infrastructures/DataService/GetUserPostDataServiceHandler";
import GetUserPostResponseModel from "../../Models/Response/GetUserPostResponseModel";
import cleanDeep from "clean-deep";

export class GetUserPostQuery implements IRequest<(GetUserPostResponseModel|undefined)[]>{
    public UserIdentity?:string;

    public PageNumber?:number;
    public RowsOfPageNumber?:number;

    constructor(userIdentity?:string,PageNumber?:number, RowsOfPageNumber?:number){
        this.UserIdentity=userIdentity;
        this.PageNumber=PageNumber;
        this.RowsOfPageNumber=RowsOfPageNumber;
    }
}

export class GetUserPostQueryHandler implements IRequestHandler<GetUserPostQuery, (GetUserPostResponseModel|undefined)[]>{
    
    private readonly mediatR:IMediatR;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public async HandleAsync(requestPara: GetUserPostQuery): Promise<(GetUserPostResponseModel|undefined)[]> {
        try
        {
            let getUserPostResponseList:(GetUserPostResponseModel|undefined)[]=await this.mediatR.SendAsync<GetUserPostResponseModel[],GetUserPostDataService>(new GetUserPostDataService(requestPara.UserIdentity,requestPara.PageNumber,requestPara.RowsOfPageNumber));

            getUserPostResponseList=cleanDeep(getUserPostResponseList);

            return getUserPostResponseList;
        }
        catch(ex)
        {
            throw ex;
        }
    }

}