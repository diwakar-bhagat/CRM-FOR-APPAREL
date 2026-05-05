const p = Object.prototype.toString,
    s = Object.prototype.hasOwnProperty,
    y = new Set(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp"].map(t => "[object " + t + "]"));

function u(t) {
    if (t !== Object(t) || y.has(p.call(t)) === !0 || t.constructor && s.call(t, "constructor") === !1 && s.call(t.constructor.prototype, "isPrototypeOf") === !1) return !1;
    let r;
    for (r in t);
    return r === void 0 || s.call(t, r)
}

function g() {
    let t, r, a, n, l, i, e = arguments[0] || {},
        o = 1,
        c = !1;
    const f = arguments.length;
    for (typeof e == "boolean" && (c = e, e = arguments[1] || {}, o = 2), Object(e) !== e && typeof e != "function" && (e = {}), f === o && (e = this, o--); o < f; o++)
        if ((t = arguments[o]) !== null)
            for (r in t) a = e[r], n = t[r], e !== n && (c === !0 && n && ((l = Array.isArray(n)) || u(n) === !0) ? (l === !0 ? i = Array.isArray(a) === !0 ? a : [] : i = u(a) === !0 ? a : {}, e[r] = g(c, i, n)) : n !== void 0 && (e[r] = n));
    return e
}
export {
    g as e
};