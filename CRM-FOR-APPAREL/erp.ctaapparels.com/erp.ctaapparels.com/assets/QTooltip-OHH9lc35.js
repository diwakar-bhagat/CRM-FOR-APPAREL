import {
    b as te,
    aS as T,
    aR as ae,
    aj as oe,
    aT as ne,
    j as ie,
    r as k,
    V as f,
    aU as se,
    aV as le,
    aW as re,
    aX as ue,
    aY as ce,
    w as C,
    k as E,
    b8 as x,
    b7 as H,
    ak as de,
    h as j,
    T as fe,
    _ as he,
    b5 as ve
} from "./index-BA5ou0W-.js";
import {
    v as me,
    b as A,
    e as ge,
    p as q,
    c as Te,
    a as ye,
    d as pe,
    r as D,
    s as be
} from "./position-engine-C3cfRS00.js";
import {
    c as M
} from "./selection-DtWR3mjl.js";
const Oe = te({
    name: "QTooltip",
    inheritAttrs: !1,
    props: { ...ge,
        ...ne,
        ...T,
        maxHeight: {
            type: String,
            default: null
        },
        maxWidth: {
            type: String,
            default: null
        },
        transitionShow: { ...T.transitionShow,
            default: "jump-down"
        },
        transitionHide: { ...T.transitionHide,
            default: "jump-up"
        },
        anchor: {
            type: String,
            default: "bottom middle",
            validator: A
        },
        self: {
            type: String,
            default: "top middle",
            validator: A
        },
        offset: {
            type: Array,
            default: () => [14, 14],
            validator: me
        },
        scrollTarget: oe,
        delay: {
            type: Number,
            default: 0
        },
        hideDelay: {
            type: Number,
            default: 0
        },
        persistent: Boolean
    },
    emits: [...ae],
    setup(e, {
        slots: L,
        emit: y,
        attrs: h
    }) {
        let i, s;
        const v = ie(),
            {
                proxy: {
                    $q: a
                }
            } = v,
            l = k(null),
            c = k(!1),
            W = f(() => q(e.anchor, a.lang.rtl)),
            Q = f(() => q(e.self, a.lang.rtl)),
            R = f(() => e.persistent !== !0),
            {
                registerTick: V,
                removeTick: _
            } = se(),
            {
                registerTimeout: d
            } = le(),
            {
                transitionProps: B,
                transitionStyle: N
            } = re(e),
            {
                localScrollTarget: p,
                changeScrollEvent: U,
                unconfigureScrollTarget: I
            } = Te(e, w),
            {
                anchorEl: o,
                canShow: X,
                anchorEvents: r
            } = ye({
                showing: c,
                configureAnchorEl: K
            }),
            {
                show: Y,
                hide: m
            } = ue({
                showing: c,
                canShow: X,
                handleShow: z,
                handleHide: F,
                hideOnRouteChange: R,
                processOnMount: !0
            });
        Object.assign(r, {
            delayShow: G,
            delayHide: J
        });
        const {
            showPortal: b,
            hidePortal: S,
            renderPortal: $
        } = ce(v, l, ee, "tooltip");
        if (a.platform.is.mobile === !0) {
            const t = {
                    anchorEl: o,
                    innerRef: l,
                    onClickOutside(n) {
                        return m(n), n.target.classList.contains("q-dialog__backdrop") && ve(n), !0
                    }
                },
                g = f(() => e.modelValue === null && e.persistent !== !0 && c.value === !0);
            C(g, n => {
                (n === !0 ? pe : D)(t)
            }), E(() => {
                D(t)
            })
        }

        function z(t) {
            b(), V(() => {
                s = new MutationObserver(() => u()), s.observe(l.value, {
                    attributes: !1,
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                }), u(), w()
            }), i === void 0 && (i = C(() => a.screen.width + "|" + a.screen.height + "|" + e.self + "|" + e.anchor + "|" + a.lang.rtl, u)), d(() => {
                b(!0), y("show", t)
            }, e.transitionDuration)
        }

        function F(t) {
            _(), S(), P(), d(() => {
                S(!0), y("hide", t)
            }, e.transitionDuration)
        }

        function P() {
            s !== void 0 && (s.disconnect(), s = void 0), i !== void 0 && (i(), i = void 0), I(), x(r, "tooltipTemp")
        }

        function u() {
            be({
                targetEl: l.value,
                offset: e.offset,
                anchorEl: o.value,
                anchorOrigin: W.value,
                selfOrigin: Q.value,
                maxHeight: e.maxHeight,
                maxWidth: e.maxWidth
            })
        }

        function G(t) {
            if (a.platform.is.mobile === !0) {
                M(), document.body.classList.add("non-selectable");
                const g = o.value,
                    n = ["touchmove", "touchcancel", "touchend", "click"].map(O => [g, O, "delayHide", "passiveCapture"]);
                H(r, "tooltipTemp", n)
            }
            d(() => {
                Y(t)
            }, e.delay)
        }

        function J(t) {
            a.platform.is.mobile === !0 && (x(r, "tooltipTemp"), M(), setTimeout(() => {
                document.body.classList.remove("non-selectable")
            }, 10)), d(() => {
                m(t)
            }, e.hideDelay)
        }

        function K() {
            if (e.noParentEvent === !0 || o.value === null) return;
            const t = a.platform.is.mobile === !0 ? [
                [o.value, "touchstart", "delayShow", "passive"]
            ] : [
                [o.value, "mouseenter", "delayShow", "passive"],
                [o.value, "mouseleave", "delayHide", "passive"]
            ];
            H(r, "anchor", t)
        }

        function w() {
            if (o.value !== null || e.scrollTarget !== void 0) {
                p.value = de(o.value, e.scrollTarget);
                const t = e.noParentEvent === !0 ? u : m;
                U(p.value, t)
            }
        }

        function Z() {
            return c.value === !0 ? j("div", { ...h,
                ref: l,
                class: ["q-tooltip q-tooltip--style q-position-engine no-pointer-events", h.class],
                style: [h.style, N.value],
                role: "tooltip"
            }, he(L.default)) : null
        }

        function ee() {
            return j(fe, B.value, Z)
        }
        return E(P), Object.assign(v.proxy, {
            updatePosition: u
        }), $
    }
});
export {
    Oe as Q
};