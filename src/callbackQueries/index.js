import {Composer} from "grammy";
import {changePercCallback} from "./changePercCallback.js";

export const callbackQueries = new Composer()

callbackQueries.use(changePercCallback)
