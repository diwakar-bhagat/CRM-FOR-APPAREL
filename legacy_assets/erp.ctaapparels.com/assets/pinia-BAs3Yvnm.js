import {
    b as O
} from "./index-3fevySbJ.js";
import {
    d as b,
    r as P,
    u as $,
    c as w
} from "./index-BA5ou0W-.js";
import {
    u as h
} from "./common-C9PBqzii.js";
import {
    u as E
} from "./general-Di09a4g4.js";
import {
    u as F
} from "./config-t_sZ-1aV.js";
const z = b("abilities", () => ({
        abl: P([{
            action: "read",
            subject: "Post"
        }, {
            action: "delete",
            subject: "Post"
        }])
    }), {
        persist: !0
    }),
    S = Object.freeze(Object.defineProperty({
        __proto__: null,
        useAbilitiesStore: z,
        useAuthStore: $,
        useConfigStore: F,
        useGeneralStore: E,
        useStoreCommon: h
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    k = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    T = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    J = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;

function x(e, t) {
    if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype" in t) {
        C(e);
        return
    }
    return t
}

function C(e) {
    console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`)
}

function H(e, t = {}) {
    if (typeof e != "string") return e;
    if (e[0] === '"' && e[e.length - 1] === '"' && e.indexOf("\\") === -1) return e.slice(1, -1);
    const r = e.trim();
    if (r.length <= 9) switch (r.toLowerCase()) {
        case "true":
            return !0;
        case "false":
            return !1;
        case "undefined":
            return;
        case "null":
            return null;
        case "nan":
            return Number.NaN;
        case "infinity":
            return Number.POSITIVE_INFINITY;
        case "-infinity":
            return Number.NEGATIVE_INFINITY
    }
    if (!J.test(e)) {
        if (t.strict) throw new SyntaxError("[destr] Invalid JSON");
        return e
    }
    try {
        if (k.test(e) || T.test(e)) {
            if (t.strict) throw new Error("[destr] Possible prototype pollution");
            return JSON.parse(e, x)
        }
        return JSON.parse(e)
    } catch (n) {
        if (t.strict) throw n;
        return e
    }
}

function R(e, t) {
    if (e == null) return;
    let r = e;
    for (let n = 0; n < t.length; n++) {
        if (r == null || r[t[n]] == null) return;
        r = r[t[n]]
    }
    return r
}

function d(e, t, r) {
    if (r.length === 0) return t;
    const n = r[0];
    return r.length > 1 && (t = d(typeof e != "object" || e === null || !Object.prototype.hasOwnProperty.call(e, n) ? Number.isInteger(Number(r[1])) ? [] : {} : e[n], t, Array.prototype.slice.call(r, 1))), Number.isInteger(Number(n)) && Array.isArray(e) ? e.slice()[n] : Object.assign({}, e, {
        [n]: t
    })
}

function N(e, t) {
    if (e == null || t.length === 0) return e;
    if (t.length === 1) {
        if (e == null) return e;
        if (Number.isInteger(t[0]) && Array.isArray(e)) return Array.prototype.slice.call(e, 0).splice(t[0], 1);
        const r = {};
        for (const n in e) r[n] = e[n];
        return delete r[t[0]], r
    }
    if (e[t[0]] == null) {
        if (Number.isInteger(t[0]) && Array.isArray(e)) return Array.prototype.concat.call([], e);
        const r = {};
        for (const n in e) r[n] = e[n];
        return r
    }
    return d(e, N(e[t[0]], Array.prototype.slice.call(t, 1)), [t[0]])
}

function _(e, t) {
    return t.map(r => r.split(".")).map(r => [r, R(e, r)]).filter(r => r[1] !== void 0).reduce((r, n) => d(r, n[1], n[0]), {})
}

function A(e, t) {
    return t.map(r => r.split(".")).reduce((r, n) => N(r, n), e)
}

function g(e, {
    storage: t,
    serializer: r,
    key: n,
    debug: i,
    pick: o,
    omit: f,
    beforeHydrate: c,
    afterHydrate: s
}, u, a = !0) {
    try {
        a && c ? .(u);
        const l = t.getItem(n);
        if (l) {
            const p = r.deserialize(l),
                y = o ? _(p, o) : p,
                I = f ? A(y, f) : y;
            e.$patch(I)
        }
        a && s ? .(u)
    } catch (l) {
        i && console.error("[pinia-plugin-persistedstate]", l)
    }
}

function m(e, {
    storage: t,
    serializer: r,
    key: n,
    debug: i,
    pick: o,
    omit: f
}) {
    try {
        const c = o ? _(e, o) : e,
            s = f ? A(c, f) : c,
            u = r.serialize(s);
        t.setItem(n, u)
    } catch (c) {
        i && console.error("[pinia-plugin-persistedstate]", c)
    }
}

function D(e, t, r) {
    const {
        pinia: n,
        store: i,
        options: {
            persist: o = r
        }
    } = e;
    if (!o) return;
    if (!(i.$id in n.state.value)) {
        const s = n._s.get(i.$id.replace("__hot:", ""));
        s && Promise.resolve().then(() => s.$persist());
        return
    }
    const c = (Array.isArray(o) ? o : o === !0 ? [{}] : [o]).map(t);
    i.$hydrate = ({
        runHooks: s = !0
    } = {}) => {
        c.forEach(u => {
            g(i, u, e, s)
        })
    }, i.$persist = () => {
        c.forEach(s => {
            m(i.$state, s)
        })
    }, c.forEach(s => {
        g(i, s, e), i.$subscribe((u, a) => m(a, s), {
            detached: !0
        })
    })
}

function G(e = {}) {
    return function(t) {
        D(t, r => ({
            key: (e.key ? e.key : n => n)(r.key ? ? t.store.$id),
            debug: r.debug ? ? e.debug ? ? !1,
            serializer: r.serializer ? ? e.serializer ? ? {
                serialize: n => JSON.stringify(n),
                deserialize: n => H(n)
            },
            storage: r.storage ? ? e.storage ? ? window.localStorage,
            beforeHydrate: r.beforeHydrate,
            afterHydrate: r.afterHydrate,
            pick: r.pick,
            omit: r.omit
        }), e.auto ? ? !1)
    }
}
var U = G();
const q = O(({
    app: e
}) => {
    w().use(U), e.config.globalProperties.$store = {};
    for (const [r, n] of Object.entries(S)) e.config.globalProperties.$store[r] = n()
});

function B() {
    const e = {};
    for (const [t, r] of Object.entries(S)) e[t] = r();
    return e
}
export {
    q as
    default, B as getAllStores
};