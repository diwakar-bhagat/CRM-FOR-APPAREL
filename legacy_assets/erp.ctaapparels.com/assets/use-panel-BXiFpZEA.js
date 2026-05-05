import {
    aJ as U,
    b8 as q,
    ba as x,
    bm as V,
    al as W,
    b7 as T,
    b5 as E,
    b0 as M,
    bn as F,
    j as J,
    aV as Z,
    r as G,
    V as f,
    w as H,
    h as C,
    T as Q,
    Z as ee,
    _ as R,
    bI as te
} from "./index-BA5ou0W-.js";
import {
    g as L,
    s as z
} from "./touch-BjYP5sR0.js";
import {
    c as ne
} from "./selection-DtWR3mjl.js";
import {
    u as ie
} from "./use-render-cache-DLxPkVnQ.js";

function oe(t) {
    const o = [.06, 6, 50];
    return typeof t == "string" && t.length && t.split(":").forEach((c, d) => {
        const m = parseFloat(c);
        m && (o[d] = m)
    }), o
}
const re = U({
        name: "touch-swipe",
        beforeMount(t, {
            value: o,
            arg: c,
            modifiers: d
        }) {
            if (d.mouse !== !0 && x.has.touch !== !0) return;
            const m = d.mouseCapture === !0 ? "Capture" : "",
                e = {
                    handler: o,
                    sensitivity: oe(c),
                    direction: L(d),
                    noop: W,
                    mouseStart(i) {
                        z(i, e) && F(i) && (T(e, "temp", [
                            [document, "mousemove", "move", `notPassive${m}`],
                            [document, "mouseup", "end", "notPassiveCapture"]
                        ]), e.start(i, !0))
                    },
                    touchStart(i) {
                        if (z(i, e)) {
                            const u = i.target;
                            T(e, "temp", [
                                [u, "touchmove", "move", "notPassiveCapture"],
                                [u, "touchcancel", "end", "notPassiveCapture"],
                                [u, "touchend", "end", "notPassiveCapture"]
                            ]), e.start(i)
                        }
                    },
                    start(i, u) {
                        x.is.firefox === !0 && V(t, !0);
                        const l = M(i);
                        e.event = {
                            x: l.left,
                            y: l.top,
                            time: Date.now(),
                            mouse: u === !0,
                            dir: !1
                        }
                    },
                    move(i) {
                        if (e.event === void 0) return;
                        if (e.event.dir !== !1) {
                            E(i);
                            return
                        }
                        const u = Date.now() - e.event.time;
                        if (u === 0) return;
                        const l = M(i),
                            h = l.left - e.event.x,
                            a = Math.abs(h),
                            g = l.top - e.event.y,
                            s = Math.abs(g);
                        if (e.event.mouse !== !0) {
                            if (a < e.sensitivity[1] && s < e.sensitivity[1]) {
                                e.end(i);
                                return
                            }
                        } else if (window.getSelection().toString() !== "") {
                            e.end(i);
                            return
                        } else if (a < e.sensitivity[2] && s < e.sensitivity[2]) return;
                        const y = a / u,
                            v = s / u;
                        e.direction.vertical === !0 && a < s && a < 100 && v > e.sensitivity[0] && (e.event.dir = g < 0 ? "up" : "down"), e.direction.horizontal === !0 && a > s && s < 100 && y > e.sensitivity[0] && (e.event.dir = h < 0 ? "left" : "right"), e.direction.up === !0 && a < s && g < 0 && a < 100 && v > e.sensitivity[0] && (e.event.dir = "up"), e.direction.down === !0 && a < s && g > 0 && a < 100 && v > e.sensitivity[0] && (e.event.dir = "down"), e.direction.left === !0 && a > s && h < 0 && s < 100 && y > e.sensitivity[0] && (e.event.dir = "left"), e.direction.right === !0 && a > s && h > 0 && s < 100 && y > e.sensitivity[0] && (e.event.dir = "right"), e.event.dir !== !1 ? (E(i), e.event.mouse === !0 && (document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), ne(), e.styleCleanup = S => {
                            e.styleCleanup = void 0, document.body.classList.remove("non-selectable");
                            const b = () => {
                                document.body.classList.remove("no-pointer-events--children")
                            };
                            S === !0 ? setTimeout(b, 50) : b()
                        }), e.handler({
                            evt: i,
                            touch: e.event.mouse !== !0,
                            mouse: e.event.mouse,
                            direction: e.event.dir,
                            duration: u,
                            distance: {
                                x: a,
                                y: s
                            }
                        })) : e.end(i)
                    },
                    end(i) {
                        e.event !== void 0 && (q(e, "temp"), x.is.firefox === !0 && V(t, !1), e.styleCleanup ? .(!0), i !== void 0 && e.event.dir !== !1 && E(i), e.event = void 0)
                    }
                };
            if (t.__qtouchswipe = e, d.mouse === !0) {
                const i = d.mouseCapture === !0 || d.mousecapture === !0 ? "Capture" : "";
                T(e, "main", [
                    [t, "mousedown", "mouseStart", `passive${i}`]
                ])
            }
            x.has.touch === !0 && T(e, "main", [
                [t, "touchstart", "touchStart", `passive${d.capture===!0?"Capture":""}`],
                [t, "touchmove", "noop", "notPassiveCapture"]
            ])
        },
        updated(t, o) {
            const c = t.__qtouchswipe;
            c !== void 0 && (o.oldValue !== o.value && (typeof o.value != "function" && c.end(), c.handler = o.value), c.direction = L(o.modifiers))
        },
        beforeUnmount(t) {
            const o = t.__qtouchswipe;
            o !== void 0 && (q(o, "main"), q(o, "temp"), x.is.firefox === !0 && V(t, !1), o.styleCleanup ? .(), delete t.__qtouchswipe)
        }
    }),
    ce = {
        name: {
            required: !0
        },
        disable: Boolean
    },
    K = {
        setup(t, {
            slots: o
        }) {
            return () => C("div", {
                class: "q-panel scroll",
                role: "tabpanel"
            }, R(o.default))
        }
    },
    de = {
        modelValue: {
            required: !0
        },
        animated: Boolean,
        infinite: Boolean,
        swipeable: Boolean,
        vertical: Boolean,
        transitionPrev: String,
        transitionNext: String,
        transitionDuration: {
            type: [String, Number],
            default: 300
        },
        keepAlive: Boolean,
        keepAliveInclude: [String, Array, RegExp],
        keepAliveExclude: [String, Array, RegExp],
        keepAliveMax: Number
    },
    pe = ["update:modelValue", "beforeTransition", "transition"];

function ve() {
    const {
        props: t,
        emit: o,
        proxy: c
    } = J(), {
        getCache: d
    } = ie(), {
        registerTimeout: m
    } = Z();
    let e, i;
    const u = G(null),
        l = {
            value: null
        };

    function h(n) {
        const r = t.vertical === !0 ? "up" : "left";
        P((c.$q.lang.rtl === !0 ? -1 : 1) * (n.direction === r ? 1 : -1))
    }
    const a = f(() => [
            [re, h, void 0, {
                horizontal: t.vertical !== !0,
                vertical: t.vertical,
                mouse: !0
            }]
        ]),
        g = f(() => t.transitionPrev || `slide-${t.vertical===!0?"down":"right"}`),
        s = f(() => t.transitionNext || `slide-${t.vertical===!0?"up":"left"}`),
        y = f(() => `--q-transition-duration: ${t.transitionDuration}ms`),
        v = f(() => typeof t.modelValue == "string" || typeof t.modelValue == "number" ? t.modelValue : String(t.modelValue)),
        S = f(() => ({
            include: t.keepAliveInclude,
            exclude: t.keepAliveExclude,
            max: t.keepAliveMax
        })),
        b = f(() => t.keepAliveInclude !== void 0 || t.keepAliveExclude !== void 0);
    H(() => t.modelValue, (n, r) => {
        const p = w(n) === !0 ? k(n) : -1;
        i !== !0 && B(p === -1 ? 0 : p < k(r) ? -1 : 1), l.value !== p && (l.value = p, o("beforeTransition", n, r), m(() => {
            o("transition", n, r)
        }, t.transitionDuration))
    });

    function _() {
        P(1)
    }

    function D() {
        P(-1)
    }

    function N(n) {
        o("update:modelValue", n)
    }

    function w(n) {
        return n != null && n !== ""
    }

    function k(n) {
        return e.findIndex(r => r.props.name === n && r.props.disable !== "" && r.props.disable !== !0)
    }

    function X() {
        return e.filter(n => n.props.disable !== "" && n.props.disable !== !0)
    }

    function B(n) {
        const r = n !== 0 && t.animated === !0 && l.value !== -1 ? "q-transition--" + (n === -1 ? g.value : s.value) : null;
        u.value !== r && (u.value = r)
    }

    function P(n, r = l.value) {
        let p = r + n;
        for (; p !== -1 && p < e.length;) {
            const A = e[p];
            if (A !== void 0 && A.props.disable !== "" && A.props.disable !== !0) {
                B(n), i = !0, o("update:modelValue", A.props.name), setTimeout(() => {
                    i = !1
                });
                return
            }
            p += n
        }
        t.infinite === !0 && e.length !== 0 && r !== -1 && r !== e.length && P(n, n === -1 ? e.length : -1)
    }

    function I() {
        const n = k(t.modelValue);
        return l.value !== n && (l.value = n), !0
    }

    function $() {
        const n = w(t.modelValue) === !0 && I() && e[l.value];
        return t.keepAlive === !0 ? [C(te, S.value, [C(b.value === !0 ? d(v.value, () => ({ ...K,
            name: v.value
        })) : K, {
            key: v.value,
            style: y.value
        }, () => n)])] : [C("div", {
            class: "q-panel scroll",
            style: y.value,
            key: v.value,
            role: "tabpanel"
        }, [n])]
    }

    function Y() {
        if (e.length !== 0) return t.animated === !0 ? [C(Q, {
            name: u.value
        }, $)] : $()
    }

    function j(n) {
        return e = ee(R(n.default, [])).filter(r => r.props !== null && r.props.slot === void 0 && w(r.props.name) === !0), e.length
    }

    function O() {
        return e
    }
    return Object.assign(c, {
        next: _,
        previous: D,
        goTo: N
    }), {
        panelIndex: l,
        panelDirectives: a,
        updatePanelsList: j,
        updatePanelIndex: I,
        getPanelContent: Y,
        getEnabledPanels: X,
        getPanels: O,
        isValidPanelName: w,
        keepAliveProps: S,
        needsUniqueKeepAliveWrapper: b,
        goToPanelByOffset: P,
        goToPanel: N,
        nextPanel: _,
        previousPanel: D
    }
}
export {
    pe as a, de as b, ve as c, ce as u
};