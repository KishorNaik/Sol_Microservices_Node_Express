import Bottle from "bottlejs";
import { SqlProvider } from "../Core/SqlProviders";

export const AddSqlProviderService=function(bottleContainer:Bottle){
    bottleContainer.service("sqlProvider",SqlProvider);
}