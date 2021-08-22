import bodyParser from "body-parser";
import express from "express";


// export default class JsonMiddleware{

//     public AddJsonMiddleware(app:express.Application){
//         app.use(express.json());
//         app.use(bodyParser.json());
//         app.use(bodyParser.urlencoded({extended:true}));
//     }
// }

// declare module "../MiddlewaresCollections"{
//     export interface MiddlewaresCollections{
//         AddJsonMiddleware(app:express.Application):void;
//     }
// }

export const AddJsonMiddleware=function(app:express.Application) : void{
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
}
