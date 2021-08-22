import {AddCorsMiddleware} from "../../../../../../Frameworks/Middlewares/Cors/CorsMiddlewareExtension";
import {AddExceptionMiddleware} from "../../../../../../Frameworks/Middlewares/ExceptionHandling/ExceptionMiddlewareExtension";
import {AddGZipCompressionMiddleware} from "../../../../../../Frameworks/GzipCompress/GZipCompressionMiddlewareExtension";
import {AddJsonMiddleware} from "../../../../../../Frameworks/Middlewares/Json/JsonMiddlewaresExtensions";
import {AddLogerMiddleware} from "../../../../../../Frameworks/Middlewares/Logger/LoggerMiddlewareExtension";

export default class MiddlewareCollections{

    constructor(){
        console.log("Middleware running");
    }

    public AddJsonMiddleware=AddJsonMiddleware;
    public AddExceptionMiddleware=AddExceptionMiddleware;
    public AddLogerMiddleware=AddLogerMiddleware;
    public AddCorsMiddleware=AddCorsMiddleware;
    public AddGZipCompressionMiddleware=AddGZipCompressionMiddleware;
}