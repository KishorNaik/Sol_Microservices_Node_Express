import {AddCorsMiddleware} from "../../../../../../Frameworks/Middlewares/Cors/CorsMiddlewareExtension";
import {AddExceptionMiddleware} from "../../../../../../Frameworks/Middlewares/ExceptionHandling/ExceptionMiddlewareExtension";
import {AddGZipCompressionMiddleware} from "../../../../../../Frameworks/Middlewares/GzipCompress/GZipCompressionMiddlewareExtension";
import {AddJsonMiddleware} from "../../../../../../Frameworks/Middlewares/Json/JsonMiddlewaresExtensions";
import {AddLogerMiddleware} from "../../../../../../Frameworks/Middlewares/Logger/LoggerMiddlewareExtension";
import {AddSecurityHeadersMiddleware} from "../../../../../../Frameworks/Middlewares/Security/SecurityMiddlewareExtension";

export default class MiddlewareCollections{

    constructor(){
        console.log("Middleware running");
    }

    public AddJsonMiddleware=AddJsonMiddleware;
    public AddExceptionMiddleware=AddExceptionMiddleware;
    public AddLogerMiddleware=AddLogerMiddleware;
    public AddCorsMiddleware=AddCorsMiddleware;
    public AddGZipCompressionMiddleware=AddGZipCompressionMiddleware;
    public AddSecurityHeaderMiddleware=AddSecurityHeadersMiddleware;

}