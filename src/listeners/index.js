import {Composer} from "grammy";
import {updateHear} from "./updateHear.js";
import {updateAdminHear} from "./updateAdminHear.js";
import {makeUserHear} from "./makeUserHear.js";
import {makeAdminHear} from "./makeAdminHear.js";
import {changeMarginHear} from "./changeMarginHear.js";
import {updateShortAdminHear} from "./makeShortAdminHear.js";
import {adminCountriesHear} from "./adminCountriesHear.js";
import {adminCitiesHear} from "./adminCitiesHear.js";
import {adminCryptoHear} from "./adminCryptoHear.js";
import {adminForexHear} from "./adminForexHear.js";
import {adminGarantexHear} from "./adminGarantexHear.js";
import {ownerChangeLinkHear} from "./ownerChangeLinkHear.js";

export const listeners = new Composer()

listeners.use(updateHear)
listeners.use(updateAdminHear)
listeners.use(makeAdminHear)
listeners.use(makeUserHear)
listeners.use(changeMarginHear)
listeners.use(updateShortAdminHear)
listeners.use(adminCountriesHear)
listeners.use(adminCitiesHear)
listeners.use(adminCryptoHear)
listeners.use(adminForexHear)
listeners.use(adminGarantexHear)
listeners.use(ownerChangeLinkHear)

