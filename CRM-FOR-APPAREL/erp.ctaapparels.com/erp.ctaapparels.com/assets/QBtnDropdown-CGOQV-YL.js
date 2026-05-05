import {
    b as R,
    aS as V,
    bf as B,
    j as k,
    r as h,
    bg as x,
    V as u,
    aB as H,
    w as m,
    i as I,
    h as l,
    Q as _,
    _ as M,
    x as d,
    bh as O
} from "./index-BA5ou0W-.js";
import {
    Q as P
} from "./QBtnGroup-sCbxJvpJ.js";
import {
    Q as j
} from "./QMenu-DDWBo2BJ.js";
const E = Object.keys(B);

function F(e) {
    return E.reduce((t, o) => {
        const a = e[o];
        return a !== void 0 && (t[o] = a), t
    }, {})
}
const $ = R({
    name: "QBtnDropdown",
    props: { ...B,
        ...V,
        modelValue: Boolean,
        split: Boolean,
        dropdownIcon: String,
        contentClass: [Array, String, Object],
        contentStyle: [Array, String, Object],
        cover: Boolean,
        persistent: Boolean,
        noEscDismiss: Boolean,
        noRouteDismiss: Boolean,
        autoClose: Boolean,
        noRefocus: Boolean,
        noFocus: Boolean,
        menuAnchor: {
            type: String,
            default: "bottom end"
        },
        menuSelf: {
            type: String,
            default: "top end"
        },
        menuOffset: Array,
        disableMainBtn: Boolean,
        disableDropdown: Boolean,
        noIconAnimation: Boolean,
        toggleAriaLabel: String
    },
    emits: ["update:modelValue", "click", "beforeShow", "show", "beforeHide", "hide"],
    setup(e, {
        slots: t,
        emit: o
    }) {
        const {
            proxy: a
        } = k(), i = h(e.modelValue), s = h(null), c = x(), f = u(() => {
            const n = {
                "aria-expanded": i.value === !0 ? "true" : "false",
                "aria-haspopup": "true",
                "aria-controls": c.value,
                "aria-label": e.toggleAriaLabel || a.$q.lang.label[i.value === !0 ? "collapse" : "expand"](e.label)
            };
            return (e.disable === !0 || e.split === !1 && e.disableMainBtn === !0 || e.disableDropdown === !0) && (n["aria-disabled"] = "true"), n
        }), v = u(() => "q-btn-dropdown__arrow" + (i.value === !0 && e.noIconAnimation === !1 ? " rotate-180" : "") + (e.split === !1 ? " q-btn-dropdown__arrow-container" : "")), b = u(() => H(e)), w = u(() => F(e));
        m(() => e.modelValue, n => {
            s.value ? .[n ? "show" : "hide"]()
        }), m(() => e.split, r);

        function S(n) {
            i.value = !0, o("beforeShow", n)
        }

        function D(n) {
            o("show", n), o("update:modelValue", !0)
        }

        function q(n) {
            i.value = !1, o("beforeHide", n)
        }

        function C(n) {
            o("hide", n), o("update:modelValue", !1)
        }

        function A(n) {
            o("click", n)
        }

        function y(n) {
            O(n), r(), o("click", n)
        }

        function Q(n) {
            s.value ? .toggle(n)
        }

        function g(n) {
            s.value ? .show(n)
        }

        function r(n) {
            s.value ? .hide(n)
        }
        return Object.assign(a, {
            show: g,
            hide: r,
            toggle: Q
        }), I(() => {
            e.modelValue === !0 && g()
        }), () => {
            const n = [l(_, {
                class: v.value,
                name: e.dropdownIcon || a.$q.iconSet.arrow.dropdown
            })];
            return e.disableDropdown !== !0 && n.push(l(j, {
                ref: s,
                id: c.value,
                class: e.contentClass,
                style: e.contentStyle,
                cover: e.cover,
                fit: !0,
                persistent: e.persistent,
                noEscDismiss: e.noEscDismiss,
                noRouteDismiss: e.noRouteDismiss,
                autoClose: e.autoClose,
                noFocus: e.noFocus,
                noRefocus: e.noRefocus,
                anchor: e.menuAnchor,
                self: e.menuSelf,
                offset: e.menuOffset,
                separateClosePopup: !0,
                transitionShow: e.transitionShow,
                transitionHide: e.transitionHide,
                transitionDuration: e.transitionDuration,
                onBeforeShow: S,
                onShow: D,
                onBeforeHide: q,
                onHide: C
            }, t.default)), e.split === !1 ? l(d, {
                class: "q-btn-dropdown q-btn-dropdown--simple",
                ...w.value,
                ...f.value,
                disable: e.disable === !0 || e.disableMainBtn === !0,
                noWrap: !0,
                round: !1,
                onClick: A
            }, {
                default: () => M(t.label, []).concat(n),
                loading: t.loading
            }) : l(P, {
                class: "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",
                rounded: e.rounded,
                square: e.square,
                ...b.value,
                glossy: e.glossy,
                stretch: e.stretch
            }, () => [l(d, {
                class: "q-btn-dropdown--current",
                ...w.value,
                disable: e.disable === !0 || e.disableMainBtn === !0,
                noWrap: !0,
                round: !1,
                onClick: y
            }, {
                default: t.label,
                loading: t.loading
            }), l(d, {
                class: "q-btn-dropdown__arrow-container q-anchor--skip",
                ...f.value,
                ...b.value,
                disable: e.disable === !0 || e.disableDropdown === !0,
                rounded: e.rounded,
                color: e.color,
                textColor: e.textColor,
                dense: e.dense,
                size: e.size,
                padding: e.padding,
                ripple: e.ripple
            }, () => n)])
        }
    }
});
export {
    $ as Q
};