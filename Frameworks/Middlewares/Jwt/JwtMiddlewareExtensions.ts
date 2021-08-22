import express, { NextFunction, Request, Response } from "express";
import expressJwt from "express-jwt";
export const UseAuthorize=(secret:string,roles=[])=>{

    if(typeof roles==="string"){
        roles=[roles];
    }

    let option:expressJwt.Options={
        secret:secret,
        algorithms:['HS256']
    }

    return [
          // authenticate JWT token and attach user to request object (req.user)
          expressJwt(option),
          //authorize based on user role
          (request:Request,response :Response,next:NextFunction)=>{
              if(roles.length && !roles.includes(request.user.role)){
                 
                    return response.status(401).json({message:"Unauthorized"})
              }
              //authentication and authorization successful
              next();
          }
    ];
}