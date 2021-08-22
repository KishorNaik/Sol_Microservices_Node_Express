import Bottle from "bottlejs";
import { Configuration } from "../Core/Configuration";


export const AddConfigurationService=function(bottleContainer:Bottle):void{

    bottleContainer.service("configurations",Configuration);

};