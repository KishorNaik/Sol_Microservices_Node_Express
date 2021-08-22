import express from "express";
import cors from "cors";

export const AddCorsMiddleware=function(app:express.Application):void{

    app.use(cors());

}