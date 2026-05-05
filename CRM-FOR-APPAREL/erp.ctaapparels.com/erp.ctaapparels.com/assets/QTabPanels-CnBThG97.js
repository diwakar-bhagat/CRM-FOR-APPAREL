import {
    u,
    a as c,
    b as i,
    c as P
} from "./use-panel-BXiFpZEA.js";
import {
    b as s,
    h as b,
    _ as m,
    aE as d,
    aF as v,
    j as q,
    V as k,
    bl as D
} from "./index-BA5ou0W-.js";
const C = s({
        name: "QTabPanel",
        props: u,
        setup(a, {
            slots: e
        }) {
            return () => b("div", {
                class: "q-tab-panel",
                role: "tabpanel"
            }, m(e.default))
        }
    }),
    T = s({
        name: "QTabPanels",
        props: { ...i,
            ...d
        },
        emits: c,
        setup(a, {
            slots: e
        }) {
            const n = q(),
                t = v(a, n.proxy.$q),
                {
                    updatePanelsList: r,
                    getPanelContent: l,
                    panelDirectives: p
                } = P(),
                o = k(() => "q-tab-panels q-panel-parent" + (t.value === !0 ? " q-tab-panels--dark q-dark" : ""));
            return () => (r(e), D("div", {
                class: o.value
            }, l(), "pan", a.swipeable, () => p.value))
        }
    });
export {
    T as Q, C as a
};