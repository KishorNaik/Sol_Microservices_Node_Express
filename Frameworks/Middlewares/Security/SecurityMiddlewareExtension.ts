import express from "express";
import helmet from "helmet";

export const AddSecurityHeadersMiddleware=function(app:express.Application) : void{
   app.use(helmet());
}