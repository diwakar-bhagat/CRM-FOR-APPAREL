import {
    b as o
} from "./index-3fevySbJ.js";
import {
    i
} from "./fp.esm-CX0C8FTR.js";
const s = o(async ({
    app: t
}) => {
    const r = await i.load();
    t.config.globalProperties.$getFingerprint = async () => (await r.get()).visitorId
});
export {
    s as
    default
};