import IBroadCast from "./IBroadCast";

export default interface IBroadCastHandler<TBroadcast extends IBroadCast>{
    HandleAsync(broadcastPara:TBroadcast): Promise<void>;
}