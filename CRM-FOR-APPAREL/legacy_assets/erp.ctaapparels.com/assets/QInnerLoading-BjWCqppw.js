import {
    b as g,
    aS as v,
    aE as S,
    aF as f,
    j as m,
    aW as y,
    V as t,
    h as a,
    T as C,
    aw as h
} from "./index-BA5ou0W-.js";
const k = g({
    name: "QInnerLoading",
    props: { ...S,
        ...v,
        showing: Boolean,
        color: String,
        size: {
            type: [String, Number],
            default: "42px"
        },
        label: String,
        labelClass: String,
        labelStyle: [String, Array, Object]
    },
    setup(e, {
        slots: n
    }) {
        const s = m(),
            i = f(e, s.proxy.$q),
            {
                transitionProps: r,
                transitionStyle: o
            } = y(e),
            u = t(() => "q-inner-loading q--avoid-card-border absolute-full column flex-center" + (i.value === !0 ? " q-inner-loading--dark" : "")),
            c = t(() => "q-inner-loading__label" + (e.labelClass !== void 0 ? ` ${e.labelClass}` : ""));

        function d() {
            const l = [a(h, {
                size: e.size,
                color: e.color
            })];
            return e.label !== void 0 && l.push(a("div", {
                class: c.value,
                style: e.labelStyle
            }, [e.label])), l
        }

        function b() {
            return e.showing === !0 ? a("div", {
                class: u.value,
                style: o.value
            }, n.default !== void 0 ? n.default() : d()) : null
        }
        return () => a(C, r.value, b)
    }
});
export {
    k as Q
};