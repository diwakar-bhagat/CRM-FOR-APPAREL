import {
    b as o,
    V as s,
    h as a,
    _ as n
} from "./index-BA5ou0W-.js";
const p = o({
    name: "QTr",
    props: {
        props: Object,
        noHover: Boolean
    },
    setup(e, {
        slots: r
    }) {
        const t = s(() => "q-tr" + (e.props === void 0 || e.props.header === !0 ? "" : " " + e.props.__trClass) + (e.noHover === !0 ? " q-tr--no-hover" : ""));
        return () => a("tr", {
            style: e.props ? .__trStyle,
            class: t.value
        }, n(r.default))
    }
});
export {
    p as Q
};