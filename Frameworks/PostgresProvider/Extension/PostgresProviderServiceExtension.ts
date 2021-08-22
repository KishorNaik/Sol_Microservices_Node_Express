import Bottle from "bottlejs";
import { PostgresProvider } from "../Core/PostgresProvider";

export const AddPostgresProviderService=function(bottleContainer:Bottle):void{
    bottleContainer.service("postgresProvider",PostgresProvider);
}