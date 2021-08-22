import Bottle from "bottlejs";
import MiddlewareCollections from "./Config/Middlewares/MiddlewaresCollection";
import ServiceCollections from "./Config/Services/ServiceCollections";
import Startup from "./Startup";
import * as dotenv from "dotenv";
console.log("Directory Path:",__dirname);
dotenv.config({ path: __dirname+'/.env' });

//console.log(process.env.NODE_ENV);
//console.log(process.env.PORT);

new Startup(new Bottle())
    .ConfigMiddlewares(new MiddlewareCollections())
    .ConfigServices(new ServiceCollections())
    .AddControllers((bottleContainer:Bottle)=>[
        bottleContainer.container.postController
    ])
    .ConfigErrorHandler()
    .Listen();