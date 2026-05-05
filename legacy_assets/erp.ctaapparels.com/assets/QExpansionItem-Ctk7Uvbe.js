import {
    b as z,
    bo as X,
    aR as J,
    aE as W,
    aT as Y,
    R as C,
    j as Z,
    aF as p,
    r as k,
    bg as ee,
    aX as te,
    V as i,
    w as m,
    az as ne,
    k as ae,
    h as n,
    aa as w,
    v as oe,
    av as ie,
    _ as le,
    Q as L,
    b5 as ue
} from "./index-BA5ou0W-.js";
import {
    a as ce,
    Q as x
} from "./QItem-CmACu0VL.js";
import {
    Q as y
} from "./QItemLabel-DKOIiaRD.js";
import {
    Q as re
} from "./QSlideTransition-_6g7eGuE.js";
const u = X({}),
    de = Object.keys(C),
    he = z({
        name: "QExpansionItem",
        props: { ...C,
            ...Y,
            ...W,
            icon: String,
            label: String,
            labelLines: [Number, String],
            caption: String,
            captionLines: [Number, String],
            dense: Boolean,
            toggleAriaLabel: String,
            expandIcon: String,
            expandedIcon: String,
            expandIconClass: [Array, String, Object],
            duration: {},
            headerInsetLevel: Number,
            contentInsetLevel: Number,
            expandSeparator: Boolean,
            defaultOpened: Boolean,
            hideExpandIcon: Boolean,
            expandIconToggle: Boolean,
            switchToggleSide: Boolean,
            denseToggle: Boolean,
            group: String,
            popup: Boolean,
            headerStyle: [Array, String, Object],
            headerClass: [Array, String, Object]
        },
        emits: [...J, "click", "afterShow", "afterHide"],
        setup(e, {
            slots: g,
            emit: v
        }) {
            const {
                proxy: {
                    $q: c
                }
            } = Z(), f = p(e, c), a = k(e.modelValue !== null ? e.modelValue : e.defaultOpened), S = k(null), h = ee(), {
                show: Q,
                hide: I,
                toggle: b
            } = te({
                showing: a
            });
            let l, r;
            const A = i(() => `q-expansion-item q-item-type q-expansion-item--${a.value===!0?"expanded":"collapsed"} q-expansion-item--${e.popup===!0?"popup":"standard"}`),
                B = i(() => e.contentInsetLevel === void 0 ? null : {
                    ["padding" + (c.lang.rtl === !0 ? "Right" : "Left")]: e.contentInsetLevel * 56 + "px"
                }),
                d = i(() => e.disable !== !0 && (e.href !== void 0 || e.to !== void 0 && e.to !== null && e.to !== "")),
                O = i(() => {
                    const t = {};
                    return de.forEach(o => {
                        t[o] = e[o]
                    }), t
                }),
                j = i(() => d.value === !0 || e.expandIconToggle !== !0),
                E = i(() => e.expandedIcon !== void 0 && a.value === !0 ? e.expandedIcon : e.expandIcon || c.iconSet.expansionItem[e.denseToggle === !0 ? "denseIcon" : "icon"]),
                P = i(() => e.disable !== !0 && (d.value === !0 || e.expandIconToggle === !0)),
                R = i(() => ({
                    expanded: a.value === !0,
                    detailsId: h.value,
                    toggle: b,
                    show: Q,
                    hide: I
                })),
                T = i(() => {
                    const t = e.toggleAriaLabel !== void 0 ? e.toggleAriaLabel : c.lang.label[a.value === !0 ? "collapse" : "expand"](e.label);
                    return {
                        role: "button",
                        "aria-expanded": a.value === !0 ? "true" : "false",
                        "aria-controls": h.value,
                        "aria-label": t
                    }
                });
            m(() => e.group, t => {
                r ? .(), t !== void 0 && _()
            });

            function H(t) {
                d.value !== !0 && b(t), v("click", t)
            }

            function N(t) {
                t.keyCode === 13 && q(t, !0)
            }

            function q(t, o) {
                o !== !0 && t.qAvoidFocus !== !0 && S.value ? .focus(), b(t), ue(t)
            }

            function D() {
                v("afterShow")
            }

            function $() {
                v("afterHide")
            }

            function _() {
                l === void 0 && (l = ne()), a.value === !0 && (u[e.group] = l);
                const t = m(a, s => {
                        s === !0 ? u[e.group] = l : u[e.group] === l && delete u[e.group]
                    }),
                    o = m(() => u[e.group], (s, U) => {
                        U === l && s !== void 0 && s !== l && I()
                    });
                r = () => {
                    t(), o(), u[e.group] === l && delete u[e.group], r = void 0
                }
            }

            function G() {
                const t = {
                        class: [`q-focusable relative-position cursor-pointer${e.denseToggle===!0&&e.switchToggleSide===!0?" items-end":""}`, e.expandIconClass],
                        side: e.switchToggleSide !== !0,
                        avatar: e.switchToggleSide
                    },
                    o = [n(L, {
                        class: "q-expansion-item__toggle-icon" + (e.expandedIcon === void 0 && a.value === !0 ? " q-expansion-item__toggle-icon--rotated" : ""),
                        name: E.value
                    })];
                return P.value === !0 && (Object.assign(t, {
                    tabindex: 0,
                    ...T.value,
                    onClick: q,
                    onKeyup: N
                }), o.unshift(n("div", {
                    ref: S,
                    class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
                    tabindex: -1
                }))), n(x, t, () => o)
            }

            function K() {
                let t;
                return g.header !== void 0 ? t = [].concat(g.header(R.value)) : (t = [n(x, () => [n(y, {
                    lines: e.labelLines
                }, () => e.label || ""), e.caption ? n(y, {
                    lines: e.captionLines,
                    caption: !0
                }, () => e.caption) : null])], e.icon && t[e.switchToggleSide === !0 ? "push" : "unshift"](n(x, {
                    side: e.switchToggleSide === !0,
                    avatar: e.switchToggleSide !== !0
                }, () => n(L, {
                    name: e.icon
                })))), e.disable !== !0 && e.hideExpandIcon !== !0 && t[e.switchToggleSide === !0 ? "unshift" : "push"](G()), t
            }

            function M() {
                const t = {
                    ref: "item",
                    style: e.headerStyle,
                    class: e.headerClass,
                    dark: f.value,
                    disable: e.disable,
                    dense: e.dense,
                    insetLevel: e.headerInsetLevel
                };
                return j.value === !0 && (t.clickable = !0, t.onClick = H, Object.assign(t, d.value === !0 ? O.value : T.value)), n(ce, t, K)
            }

            function V() {
                return oe(n("div", {
                    key: "e-content",
                    class: "q-expansion-item__content relative-position",
                    style: B.value,
                    id: h.value
                }, le(g.default)), [
                    [ie, a.value]
                ])
            }

            function F() {
                const t = [M(), n(re, {
                    duration: e.duration,
                    onShow: D,
                    onHide: $
                }, V)];
                return e.expandSeparator === !0 && t.push(n(w, {
                    class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
                    dark: f.value
                }), n(w, {
                    class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
                    dark: f.value
                })), t
            }
            return e.group !== void 0 && _(), ae(() => {
                r ? .()
            }), () => n("div", {
                class: A.value
            }, [n("div", {
                class: "q-expansion-item__container relative-position"
            }, F())])
        }
    });
export {
    he as Q
};