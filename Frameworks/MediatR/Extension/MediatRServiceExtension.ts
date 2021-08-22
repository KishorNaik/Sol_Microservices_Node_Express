import Bottle from "bottlejs";
import { MediatR } from "../Core/MediatR";

export const AddMediatR=function(bottleContainer:Bottle):void{
    bottleContainer.service("mediatR",MediatR);
}