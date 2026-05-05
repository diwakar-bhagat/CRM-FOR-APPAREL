import {
    b as o,
    aE as n,
    j as u,
    aF as c,
    V as l,
    h as d,
    _ as p
} from "./index-BA5ou0W-.js";
const b = o({
    name: "QBar",
    props: { ...n,
        dense: Boolean
    },
    setup(a, {
        slots: e
    }) {
        const {
            proxy: {
                $q: r
            }
        } = u(), s = c(a, r), t = l(() => `q-bar row no-wrap items-center q-bar--${a.dense===!0?"dense":"standard"}  q-bar--${s.value===!0?"dark":"light"}`);
        return () => d("div", {
            class: t.value,
            role: "toolbar"
        }, p(e.default))
    }
});
export {
    b as Q
};