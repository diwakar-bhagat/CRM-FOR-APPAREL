const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/index-Dk2WRsAV.js", "assets/index-BA5ou0W-.js", "assets/index-Bh2r4P0U.css", "assets/QSpace-BjbyB_LR.js", "assets/QSkeleton--7UAm24T.js", "assets/QMarkupTable-DCh2V2Pr.js", "assets/QSelect-Cu1YN_YO.js", "assets/QChip-CN77J6Er.js", "assets/QItem-CmACu0VL.js", "assets/QItemLabel-DKOIiaRD.js", "assets/QMenu-DDWBo2BJ.js", "assets/position-engine-C3cfRS00.js", "assets/selection-DtWR3mjl.js", "assets/rtl-DFPa-2ov.js", "assets/QTooltip-OHH9lc35.js", "assets/QBadge-Cw-oJzeN.js", "assets/QTd-rJwHHrSa.js", "assets/QTr-GmZf20Nu.js", "assets/QTable-BtAJ-z4N.js", "assets/QList-CZpbZIWw.js", "assets/use-fullscreen-i0p8qSCM.js", "assets/date-cIYipMv-.js", "assets/useHelpers-CLyV6CYd.js", "assets/FileSaver.min-BZowWFmT.js", "assets/_commonjsHelpers-D6-XlEtG.js", "assets/_plugin-vue_export-helper-DlAUqK2U.js", "assets/index-dzFf5WZw.css", "assets/TaskManager-BaJS7ABF.js", "assets/QImg-HDxxj7ri.js", "assets/QIntersection-DMg4TR6U.js", "assets/QPagination-lywm11nU.js", "assets/QBar-BU8Osy4W.js", "assets/QDate-DirjmJW-.js", "assets/use-render-cache-DLxPkVnQ.js", "assets/ClosePopup-CgV1_utH.js", "assets/index-B7SCgQeN.js", "assets/showVGOrderItem-3cLJC08h.js", "assets/QTabs-CBFyGzjl.js", "assets/QResizeObserver-BPtCLTks.js", "assets/QSpinnerDots-qUvozSP6.js", "assets/QInnerLoading-BjWCqppw.js", "assets/QTabPanels-CnBThG97.js", "assets/use-panel-BXiFpZEA.js", "assets/touch-BjYP5sR0.js", "assets/showVGOrderItem-BWO1Dd2-.css", "assets/TaskManager-CeXy-r67.css"]))) => i.map(i => d[i]);
import {
    r as d,
    l as t,
    m as o,
    p as s,
    s as g,
    q as n,
    D as b,
    a4 as v,
    a5 as k,
    M as l,
    I as i,
    ad as m,
    af as p
} from "./index-BA5ou0W-.js";
import {
    Q as V,
    a as c
} from "./QTabs-CBFyGzjl.js";
import {
    Q as x,
    a as y
} from "./QTabPanels-CnBThG97.js";
import {
    Q
} from "./QPage-Dk3JZKqo.js";
import {
    _ as T
} from "./_plugin-vue_export-helper-DlAUqK2U.js";
import "./QResizeObserver-BPtCLTks.js";
import "./rtl-DFPa-2ov.js";
import "./use-panel-BXiFpZEA.js";
import "./touch-BjYP5sR0.js";
import "./selection-DtWR3mjl.js";
import "./use-render-cache-DLxPkVnQ.js";
const P = {
        style: {
            width: "100%"
        },
        class: "q-pa-md"
    },
    q = {
        __name: "index",
        setup(E) {
            const u = m(() => p(() =>
                    import ("./index-Dk2WRsAV.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]))),
                _ = m(() => p(() =>
                    import ("./TaskManager-BaJS7ABF.js"), __vite__mapDeps([27, 1, 2, 7, 3, 9, 8, 19, 10, 11, 12, 6, 13, 14, 28, 29, 30, 31, 32, 33, 21, 34, 35, 22, 23, 24, 16, 18, 5, 20, 17, 36, 37, 38, 39, 40, 41, 42, 43, 15, 25, 44, 45]))),
                e = d("task-manager"),
                f = d(["pending", "task-manager"]);
            return (B, r) => (o(), t(Q, {
                class: "page"
            }, {
                default: s(() => [g("div", P, [n(V, {
                    modelValue: e.value,
                    "onUpdate:modelValue": r[0] || (r[0] = a => e.value = a),
                    "inline-label": "",
                    dense: "",
                    breakpoint: 0,
                    "active-color": e.value == "pending" ? "red-13" : "indigo",
                    "indicator-color": e.value == "pending" ? "red-13" : "indigo"
                }, {
                    default: s(() => [n(c, {
                        name: "pending",
                        icon: "dashboard",
                        label: "Dashboard",
                        class: "q-mr-md",
                        style: {
                            "border-radius": "8px"
                        }
                    }), n(c, {
                        name: "task-manager",
                        icon: "mdi-chart-areaspline",
                        label: "Task Manager",
                        style: {
                            "border-radius": "8px"
                        }
                    })]),
                    _: 1
                }, 8, ["modelValue", "active-color", "indicator-color"]), n(x, {
                    modelValue: e.value,
                    "onUpdate:modelValue": r[1] || (r[1] = a => e.value = a),
                    animated: "",
                    class: "panels",
                    style: {
                        "border-radius": "4px"
                    }
                }, {
                    default: s(() => [(o(!0), b(v, null, k(f.value, a => (o(), t(y, {
                        class: "q-pa-none q-pt-md q-px-none",
                        key: a,
                        name: a
                    }, {
                        default: s(() => [a == "pending" ? (o(), t(i(u), {
                            key: 0
                        })) : l("", !0), a == "task-manager" ? (o(), t(i(_), {
                            key: 1
                        })) : l("", !0)]),
                        _: 2
                    }, 1032, ["name"]))), 128))]),
                    _: 1
                }, 8, ["modelValue"])])]),
                _: 1
            }))
        }
    },
    F = T(q, [
        ["__scopeId", "data-v-dc997f3c"]
    ]);
export {
    F as
    default
};