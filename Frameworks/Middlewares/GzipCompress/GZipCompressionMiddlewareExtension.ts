import express from "express";
import compression from "compression";

export const AddGZipCompressionMiddleware=function(app:express.Application) : void{
    app.use(compression());
}
