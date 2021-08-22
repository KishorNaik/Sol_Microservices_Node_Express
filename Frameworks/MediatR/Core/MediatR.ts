import BroadCastModel from "./Broadcast/BroadCastModel";
import IBroadCast from "./Broadcast/IBroadCast";
import IBroadCastHandler from "./Broadcast/IBroadCastHandler";
import INotification from "./Notification/INotification";
import INotificationHandler from "./Notification/INotificationHandler";
import IRequest from "./Request/IRequest";
import IRequestHandler from "./Request/IRequestHandler";

export interface IMediatRRegister{
    RegisterRequest<TRequest extends IRequest<TReturnType>,TReturnType>(requestType:any,requestHandler:IRequestHandler<TRequest,TReturnType>):void;
    RegisterNotification<TNotification extends INotification>(notificationType:any,notificationHandler:INotificationHandler<TNotification>):void;
    RegisterBroadCast<TBroadCast extends IBroadCast>(broadCastType:any,broadCastHandler:IBroadCastHandler<TBroadCast>):void
}

export interface IMediatR{
    
    SendAsync<TReturnType,TRequest>(request:TRequest) : Promise<TReturnType>;
    PublishAsync<TNotification>(notification:TNotification) : Promise<void>;
    BroadCastAsync<TBroadCast>(broadCast:TBroadCast):Promise<void>;
}

export class MediatR implements IMediatRRegister, IMediatR{
    

    private keyValuePairs:Map<any,any>=new Map<any,any>();
    private keyValuePairsBroadCast:Array<BroadCastModel>=new Array();

    public RegisterRequest<TRequest extends IRequest<TReturnType>,TReturnType>(requestType:any,requestHandler:IRequestHandler<TRequest,TReturnType>):void{
        //console.log(requestType);
        this.keyValuePairs.set(requestType,requestHandler);
    }

    public RegisterNotification<TNotification extends INotification>(notificationType:any,notificationHandler:INotificationHandler<TNotification>):void{
        this.keyValuePairs.set(notificationType,notificationHandler);
    }

    public RegisterBroadCast<TBroadCast extends IBroadCast>(broadCastType:any,broadCastHandler:IBroadCastHandler<TBroadCast>):void{
        this.keyValuePairsBroadCast.push({Key:broadCastType,Values:broadCastHandler});
    }

    public async SendAsync<TReturnType,TRequest extends IRequest<TReturnType>>(request:TRequest) : Promise<TReturnType>{
       // console.log(request.constructor);
        var handler=this.keyValuePairs.get(request.constructor);
        //console.log(handler);

        return await (<IRequestHandler<TRequest,TReturnType>>handler).HandleAsync(request);
    }

    public async PublishAsync<TNotification extends INotification>(notification: TNotification): Promise<void> {
        var handler=this.keyValuePairs.get(notification.constructor);

        await (<INotificationHandler<TNotification>>handler).HandleAsync(notification);
    }

    public async BroadCastAsync<TBroadCast extends IBroadCast>(broadCast: TBroadCast): Promise<void> {
        let promiseArray:Promise<any>[]=new Array();

        this.keyValuePairsBroadCast.forEach((broadCastModel)=>{

            if(broadCastModel.Key===broadCast.constructor){
                promiseArray.push((<IBroadCastHandler<TBroadCast>>broadCastModel.Values).HandleAsync(broadCast));
            }

        });
        await Promise.all(promiseArray);
    }
}