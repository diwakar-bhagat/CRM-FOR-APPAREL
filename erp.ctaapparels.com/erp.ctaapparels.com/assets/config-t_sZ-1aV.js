import {
    d as a,
    r as o
} from "./index-BA5ou0W-.js";
const u = 3,
    m = 1,
    f = 52,
    r = {
        major: u,
        minor: m,
        build: f
    },
    d = a("config", () => {
        o([]);
        const e = o([]),
            t = o([]);
        let s = "--";
        try {
            s = `${r.major}.${r.minor}.${r.build}`
        } catch (n) {
            console.error("Error fetching version data:", n)
        }
        const i = s;

        function c(n) {
            t.value = n
        }
        return {
            sampling_masterlist: e,
            menuLinks: t,
            setMenuLinks: c,
            version: i
        }
    }, {
        persist: !0
    });
export {
    d as u
};