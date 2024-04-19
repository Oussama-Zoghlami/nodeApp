import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose, { mongo } from "mongoose";
import { PORT, URI } from "./config/config.js";
import App from "./routes/index.js";
import * as path from 'path';
import { fileURLToPath } from "url";


const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.set('view engine','ejs');
server.set('views', path.join(__dirname,"/src/views"));

server.use('*/css',express.static('src/assets/css'));
server.use('*/js',express.static('src/assets/js'));
server.use('*/images',express.static('src/assets/images'));
server.use('*/lib',express.static('src/assets/lib'));
server.use('*/scss',express.static('src/assets/scss'));

server.use(cors());
server.disable("x-powered-by");
server.use(cookieParser());
server.use(express.urlencoded({ extended : true }));
server.use(express.json());


mongoose.Promise = global.Promise;
mongoose.set("strictQuery",false);
mongoose.connect(URI)
.then(console.log("Connected to Database"))
.catch((e) => console.log(e));

server.use(App);

server.listen(PORT,() => 
    console.log(`Server running on http://localhost:${PORT}`));
