import { App } from './src';
import * as env from "dotenv";
env.config()
const port = process.env.PORT ?? 8088 
const app = new App(port);
app.runApp();
