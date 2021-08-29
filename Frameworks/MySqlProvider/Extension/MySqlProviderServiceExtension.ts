import Bottle from "bottlejs";
import { MySqlProvider } from "../Core/MySqlProvider";

export const AddSqlProviderService=function(bottleContainer:Bottle){
    bottleContainer.service("mySqlProvider",MySqlProvider);
}