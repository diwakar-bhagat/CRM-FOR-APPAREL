import {
    b as k
} from "./index-3fevySbJ.js";
import {
    r as m,
    w as p,
    i as g,
    l as d,
    m as i,
    p as s,
    q as n,
    Q as w,
    s as c,
    v as f,
    x as D,
    y as Q
} from "./index-BA5ou0W-.js";
import {
    Q as v
} from "./QDate-DirjmJW-.js";
import {
    Q as S
} from "./QPopupProxy-B_gWZB7j.js";
import {
    C as Y
} from "./ClosePopup-CgV1_utH.js";
import "./use-render-cache-DLxPkVnQ.js";
import "./date-cIYipMv-.js";
import "./QMenu-DDWBo2BJ.js";
import "./position-engine-C3cfRS00.js";
import "./selection-DtWR3mjl.js";
const C = {
        class: "row items-center justify-end"
    },
    q = {
        class: "row items-center justify-end"
    },
    x = {
        __name: "datepicker",
        props: {
            modelValue: String,
            label: {
                type: String,
                default: "Date"
            },
            rules: {
                type: Array,
                default: () => []
            },
            slots: {
                type: Array,
                default: () => []
            }
        },
        emits: ["update:modelValue"],
        setup(l, {
            emit: y
        }) {
            const u = l,
                r = m([]),
                V = y,
                a = m(u.modelValue || "");
            p(a, t => {
                V("update:modelValue", t)
            }), p(() => u.modelValue, t => {
                a.value = t
            });
            const h = t => {
                const e = new Date(t),
                    o = e.getFullYear(),
                    M = String(e.getMonth() + 1).padStart(2, "0"),
                    b = String(e.getDate()).padStart(2, "0");
                return `${o}/${M}/${b}`
            };
            return g(() => {
                u.slots.forEach(t => {
                    const e = h(t.date);
                    r.value.push(e)
                })
            }), (t, e) => (i(), d(Q, {
                modelValue: a.value,
                "onUpdate:modelValue": e[2] || (e[2] = o => a.value = o),
                mask: "##-##-####",
                type: "text",
                label: l.label,
                rules: l.rules,
                dense: t.dense,
                filled: t.filled,
                square: t.square,
                "hide-bottom-space": ""
            }, {
                append: s(() => [n(w, {
                    name: "event",
                    class: "cursor-pointer"
                }, {
                    default: s(() => [n(S, {
                        cover: "",
                        "transition-show": "scale",
                        "transition-hide": "scale"
                    }, {
                        default: s(() => [r.value && r.value.length ? (i(), d(v, {
                            key: 0,
                            options: r.value,
                            modelValue: a.value,
                            "onUpdate:modelValue": e[0] || (e[0] = o => a.value = o),
                            hint: "Date: DD-MM-YYYY",
                            mask: "DD-MM-YYYY"
                        }, {
                            default: s(() => [c("div", C, [f(n(D, {
                                label: "Close",
                                color: "primary",
                                flat: ""
                            }, null, 512), [
                                [Y]
                            ])])]),
                            _: 1
                        }, 8, ["options", "modelValue"])) : (i(), d(v, {
                            key: 1,
                            modelValue: a.value,
                            "onUpdate:modelValue": e[1] || (e[1] = o => a.value = o),
                            hint: "Date: DD-MM-YYYY",
                            mask: "DD-MM-YYYY"
                        }, {
                            default: s(() => [c("div", q, [f(n(D, {
                                label: "Close",
                                color: "primary",
                                flat: ""
                            }, null, 512), [
                                [Y]
                            ])])]),
                            _: 1
                        }, 8, ["modelValue"]))]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            }, 8, ["modelValue", "label", "rules", "dense", "filled", "square"]))
        }
    },
    F = k(({
        app: l
    }) => {
        l.component("DatePicker", x)
    });
export {
    F as
    default
};