import {
    j as v,
    r as F,
    bF as b,
    w as f,
    bG as p,
    o as y,
    i as h,
    k as x
} from "./index-BA5ou0W-.js";
let r = 0;
const E = {
        fullscreen: Boolean,
        noRouteFullscreenExit: Boolean
    },
    g = ["update:fullscreen", "fullscreen"];

function w() {
    const d = v(),
        {
            props: o,
            emit: m,
            proxy: e
        } = d;
    let n, u, c;
    const l = F(!1);
    b(d) === !0 && f(() => e.$route.fullPath, () => {
        o.noRouteFullscreenExit !== !0 && t()
    }), f(() => o.fullscreen, s => {
        l.value !== s && a()
    }), f(l, s => {
        m("update:fullscreen", s), m("fullscreen", s)
    });

    function a() {
        l.value === !0 ? t() : i()
    }

    function i() {
        l.value !== !0 && (l.value = !0, c = e.$el.parentNode, c.replaceChild(u, e.$el), document.body.appendChild(e.$el), r++, r === 1 && document.body.classList.add("q-body--fullscreen-mixin"), n = {
            handler: t
        }, p.add(n))
    }

    function t() {
        l.value === !0 && (n !== void 0 && (p.remove(n), n = void 0), c.replaceChild(e.$el, u), l.value = !1, r = Math.max(0, r - 1), r === 0 && (document.body.classList.remove("q-body--fullscreen-mixin"), e.$el.scrollIntoView !== void 0 && setTimeout(() => {
            e.$el.scrollIntoView()
        })))
    }
    return y(() => {
        u = document.createElement("span")
    }), h(() => {
        o.fullscreen === !0 && i()
    }), x(t), Object.assign(e, {
        toggleFullscreen: a,
        setFullscreen: i,
        exitFullscreen: t
    }), {
        inFullscreen: l,
        toggleFullscreen: a
    }
}
export {
    E as a, w as b, g as u
};