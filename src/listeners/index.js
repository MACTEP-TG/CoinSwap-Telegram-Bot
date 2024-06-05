import {Composer} from "grammy";
import {updateHear} from "./updateHear.js";
import {updateAdminHear} from "./updateAdminHear.js";
import {makeUserHear} from "./makeUserHear.js";
import {makeAdminHear} from "./makeAdminHear.js";
import {changeMarginHear} from "./changeMarginHear.js";

export const listeners = new Composer()

listeners.use(updateHear)
listeners.use(updateAdminHear)
listeners.use(makeAdminHear)
listeners.use(makeUserHear)
listeners.use(changeMarginHear)