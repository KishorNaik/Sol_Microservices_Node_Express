import express from "express";
import { ValidationChain, validationResult } from "express-validator";
export const ValidationDelegateHandlerAsync=<TReturnType>(request:express.Request, response:express.Response, actionDelegate:()=>Promise<TReturnType>):Promise<void>=>{

   
        return new Promise(async (resolve,reject)=>{
            try
            {
                const error=validationResult(request);

                if(!error.isEmpty()){
                    response.status(200).json(error);
                }
                else
                {
                    let result:TReturnType=await actionDelegate();
                    response.status(200).json(result);
                }
                resolve();
            }
            catch(ex){
                reject(ex);
                throw ex;
            }
        });
        
   

}