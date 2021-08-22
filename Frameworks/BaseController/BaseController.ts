import { Router } from "express";

export default abstract class BaseController{

    constructor(){

    }
    
    public router?:Router;

    protected abstract InitializeRoutes():Promise<void>;

    protected routePath?:string;
}