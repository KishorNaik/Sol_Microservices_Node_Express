import INotification from "./INotification";

export default interface INotificationHandler<TNotification extends INotification>{
    HandleAsync(notificationPara:TNotification): Promise<void>;
}