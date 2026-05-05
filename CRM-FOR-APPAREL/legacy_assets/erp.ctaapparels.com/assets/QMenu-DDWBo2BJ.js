import {
    b as ae,
    aR as ne,
    aj as se,
    aS as ue,
    aE as le,
    aT as ie,
    j as re,
    r as w,
    V as u,
    aF as ce,
    aU as fe,
    aV as de,
    aW as ve,
    aX as ge,
    aY as he,
    w as D,
    aZ as me,
    a_ as M,
    a$ as Te,
    b0 as Pe,
    b1 as ke,
    ak as ye,
    b2 as be,
    b3 as Se,
    h as R,
    _ as Ce,
    T as xe,
    k as Ee,
    b4 as Oe,
    b5 as qe
} from "./index-BA5ou0W-.js";
import {
    v as Be,
    b as A,
    u as Fe,
    c as we,
    a as De,
    p as H,
    d as Me,
    r as K,
    s as Re
} from "./position-engine-C3cfRS00.js";
const Ke = ae({
    name: "QMenu",
    inheritAttrs: !1,
    props: { ...Fe,
        ...ie,
        ...le,
        ...ue,
        persistent: Boolean,
        autoClose: Boolean,
        separateClosePopup: Boolean,
        noEscDismiss: Boolean,
        noRouteDismiss: Boolean,
        noRefocus: Boolean,
        noFocus: Boolean,
        fit: Boolean,
        cover: Boolean,
        square: Boolean,
        anchor: {
            type: String,
            validator: A
        },
        self: {
            type: String,
            validator: A
        },
        offset: {
            type: Array,
            validator: Be
        },
        scrollTarget: se,
        touchPosition: Boolean,
        maxHeight: {
            type: String,
            default: null
        },
        maxWidth: {
            type: String,
            default: null
        }
    },
    emits: [...ne, "click", "escapeKey"],
    setup(t, {
        slots: W,
        emit: c,
        attrs: d
    }) {
        let n = null,
            f, l, v;
        const k = re(),
            {
                proxy: g
            } = k,
            {
                $q: o
            } = g,
            a = w(null),
            s = w(!1),
            _ = u(() => t.persistent !== !0 && t.noRouteDismiss !== !0),
            j = ce(t, o),
            {
                registerTick: Q,
                removeTick: U
            } = fe(),
            {
                registerTimeout: y
            } = de(),
            {
                transitionProps: V,
                transitionStyle: $
            } = ve(t),
            {
                localScrollTarget: b,
                changeScrollEvent: I,
                unconfigureScrollTarget: L
            } = we(t, B),
            {
                anchorEl: i,
                canShow: X
            } = De({
                showing: s
            }),
            {
                hide: S
            } = ge({
                showing: s,
                canShow: X,
                handleShow: J,
                handleHide: N,
                hideOnRouteChange: _,
                processOnMount: !0
            }),
            {
                showPortal: C,
                hidePortal: x,
                renderPortal: Y
            } = he(k, a, ee, "menu"),
            h = {
                anchorEl: i,
                innerRef: a,
                onClickOutside(e) {
                    if (t.persistent !== !0 && s.value === !0) return S(e), (e.type === "touchstart" || e.target.classList.contains("q-dialog__backdrop")) && qe(e), !0
                }
            },
            E = u(() => H(t.anchor || (t.cover === !0 ? "center middle" : "bottom start"), o.lang.rtl)),
            Z = u(() => t.cover === !0 ? E.value : H(t.self || "top start", o.lang.rtl)),
            z = u(() => (t.square === !0 ? " q-menu--square" : "") + (j.value === !0 ? " q-menu--dark q-dark" : "")),
            G = u(() => t.autoClose === !0 ? {
                onClick: p
            } : {}),
            O = u(() => s.value === !0 && t.persistent !== !0);
        D(O, e => {
            e === !0 ? (me(T), Me(h)) : (M(T), K(h))
        });

        function m() {
            Oe(() => {
                let e = a.value;
                e && e.contains(document.activeElement) !== !0 && (e = e.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || e.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || e.querySelector("[autofocus], [data-autofocus]") || e, e.focus({
                    preventScroll: !0
                }))
            })
        }

        function J(e) {
            if (n = t.noRefocus === !1 ? document.activeElement : null, Te(F), C(), B(), f = void 0, e !== void 0 && (t.touchPosition || t.contextMenu)) {
                const P = Pe(e);
                if (P.left !== void 0) {
                    const {
                        top: te,
                        left: oe
                    } = i.value.getBoundingClientRect();
                    f = {
                        left: P.left - oe,
                        top: P.top - te
                    }
                }
            }
            l === void 0 && (l = D(() => o.screen.width + "|" + o.screen.height + "|" + t.self + "|" + t.anchor + "|" + o.lang.rtl, r)), t.noFocus !== !0 && document.activeElement.blur(), Q(() => {
                r(), t.noFocus !== !0 && m()
            }), y(() => {
                o.platform.is.ios === !0 && (v = t.autoClose, a.value.click()), r(), C(!0), c("show", e)
            }, t.transitionDuration)
        }

        function N(e) {
            U(), x(), q(!0), n !== null && (e === void 0 || e.qClickOutside !== !0) && (((e ? .type.indexOf("key") === 0 ? n.closest('[tabindex]:not([tabindex^="-"])') : void 0) || n).focus(), n = null), y(() => {
                x(!0), c("hide", e)
            }, t.transitionDuration)
        }

        function q(e) {
            f = void 0, l !== void 0 && (l(), l = void 0), (e === !0 || s.value === !0) && (ke(F), L(), K(h), M(T)), e !== !0 && (n = null)
        }

        function B() {
            (i.value !== null || t.scrollTarget !== void 0) && (b.value = ye(i.value, t.scrollTarget), I(b.value, r))
        }

        function p(e) {
            v !== !0 ? (be(g, e), c("click", e)) : v = !1
        }

        function F(e) {
            O.value === !0 && t.noFocus !== !0 && Se(a.value, e.target) !== !0 && m()
        }

        function T(e) {
            t.noEscDismiss !== !0 && (c("escapeKey"), S(e))
        }

        function r() {
            Re({
                targetEl: a.value,
                offset: t.offset,
                anchorEl: i.value,
                anchorOrigin: E.value,
                selfOrigin: Z.value,
                absoluteOffset: f,
                fit: t.fit,
                cover: t.cover,
                maxHeight: t.maxHeight,
                maxWidth: t.maxWidth
            })
        }

        function ee() {
            return R(xe, V.value, () => s.value === !0 ? R("div", {
                role: "menu",
                ...d,
                ref: a,
                tabindex: -1,
                class: ["q-menu q-position-engine scroll" + z.value, d.class],
                style: [d.style, $.value],
                ...G.value
            }, Ce(W.default)) : null)
        }
        return Ee(q), Object.assign(g, {
            focus: m,
            updatePosition: r
        }), Y
    }
});
export {
    Ke as Q
};