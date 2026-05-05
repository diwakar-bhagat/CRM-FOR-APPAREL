import {
    l as d,
    m as t,
    p as s,
    q as e,
    G as z,
    K as b,
    s as n,
    v as Q,
    Q as f,
    x as C,
    D as o,
    a4 as p,
    a5 as y,
    I as k,
    J as L,
    M as u,
    N as c,
    O as l,
    aa as q,
    ar as S,
    ac as I
} from "./index-BA5ou0W-.js";
import {
    Q as h
} from "./QBadge-Cw-oJzeN.js";
import {
    Q as T
} from "./QChip-CN77J6Er.js";
import {
    a as N,
    Q as g
} from "./QItem-CmACu0VL.js";
import {
    Q as v
} from "./QItemLabel-DKOIiaRD.js";
import {
    Q as B
} from "./QList-CZpbZIWw.js";
import {
    C as $
} from "./ClosePopup-CgV1_utH.js";
import {
    r as D
} from "./MainLayout-ijkAZKUP.js";
import "./QMenu-DDWBo2BJ.js";
import "./position-engine-C3cfRS00.js";
import "./selection-DtWR3mjl.js";
import "./QTooltip-OHH9lc35.js";
import "./QSpace-BjbyB_LR.js";
import "./QBtnDropdown-CGOQV-YL.js";
import "./QBtnGroup-sCbxJvpJ.js";
import "./QToolbar-p6Rg3VL0.js";
import "./QResizeObserver-BPtCLTks.js";
import "./useNotificationStore-_PualIHj.js";
import "./TouchPan-_lIrL9iK.js";
import "./touch-BjYP5sR0.js";
import "./QLayout-CKXsftTr.js";
import "./QExpansionItem-Ctk7Uvbe.js";
import "./QSlideTransition-_6g7eGuE.js";
import "./_plugin-vue_export-helper-DlAUqK2U.js";
import "./common-C9PBqzii.js";
import "./config-t_sZ-1aV.js";
import "./extend-DTfK50KV.js";
import "./index-B7SCgQeN.js";
const j = {
        class: "text-h6 row items-center q-gutter-sm"
    },
    A = {
        class: "row items-center q-gutter-sm q-mb-md"
    },
    E = {
        class: "text-caption text-grey-6"
    },
    F = {
        class: "row items-center q-gutter-sm q-mb-sm"
    },
    G = {
        class: "text-subtitle1 text-weight-bold"
    },
    H = {
        key: 0,
        class: "text-body2 text-grey-7 q-mb-sm q-ml-lg"
    },
    J = {
        class: "text-caption text-weight-bold text-grey-8 q-mb-xs"
    },
    K = {
        key: 0,
        class: "text-caption text-grey-6 q-mb-xs"
    },
    M = {
        class: "row q-gutter-sm"
    },
    O = {
        key: 2,
        class: "text-caption text-grey-6"
    },
    vt = {
        __name: "ReleaseNoteDialog",
        props: {
            open: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["close"],
        setup(V) {
            return (w, m) => (t(), d(I, {
                "model-value": V.open,
                "onUpdate:modelValue": m[0] || (m[0] = x => w.$emit("close")),
                onHide: m[1] || (m[1] = x => w.$emit("close")),
                "transition-show": "fade",
                "transition-hide": "fade"
            }, {
                default: s(() => [e(z, {
                    style: {
                        width: "680px",
                        "max-width": "95vw",
                        "border-radius": "14px"
                    },
                    class: "q-pa-none shadow-10"
                }, {
                    default: s(() => [e(b, {
                        class: "row items-center justify-between bg-primary text-white q-py-sm q-px-md"
                    }, {
                        default: s(() => [n("div", j, [e(f, {
                            name: "mdi-newspaper-variant-outline"
                        }), m[2] || (m[2] = n("span", null, "What's New", -1))]), Q(e(C, {
                            icon: "close",
                            flat: "",
                            round: "",
                            dense: ""
                        }, null, 512), [
                            [$]
                        ])]),
                        _: 1
                    }), e(b, {
                        class: "q-pa-none",
                        style: {
                            "max-height": "70vh",
                            "overflow-y": "auto"
                        }
                    }, {
                        default: s(() => [(t(!0), o(p, null, y(k(D), (x, _) => (t(), o("div", {
                            key: x.version,
                            class: L(["q-pa-md", {
                                "q-pt-sm": _ > 0
                            }])
                        }, [n("div", A, [e(h, {
                            color: "primary",
                            class: "q-px-sm q-py-xs text-subtitle2"
                        }, {
                            default: s(() => [c(" v" + l(x.version), 1)]),
                            _: 2
                        }, 1024), n("span", E, l(x.date), 1), _ === 0 ? (t(), d(h, {
                            key: 0,
                            color: "green-2",
                            "text-color": "green-8",
                            class: "q-px-sm q-py-xs"
                        }, {
                            default: s(() => m[3] || (m[3] = [c(" Latest ", -1)])),
                            _: 1,
                            __: [3]
                        })) : u("", !0)]), (t(!0), o(p, null, y(x.sections, r => (t(), o("div", {
                            key: r.title,
                            class: "release-feature q-mb-lg"
                        }, [n("div", F, [e(f, {
                            name: r.icon,
                            color: "primary",
                            size: "22px"
                        }, null, 8, ["name"]), n("span", G, l(r.title), 1), r.badge ? (t(), d(h, {
                            key: 0,
                            color: `${r.badge.color}-2`,
                            "text-color": `${r.badge.color}-8`,
                            class: "q-px-xs"
                        }, {
                            default: s(() => [c(l(r.badge.label), 1)]),
                            _: 2
                        }, 1032, ["color", "text-color"])) : u("", !0)]), r.description ? (t(), o("p", H, l(r.description), 1)) : u("", !0), (t(!0), o(p, null, y(r.blocks, a => (t(), o("div", {
                            key: a.label,
                            class: "q-ml-lg q-mb-md"
                        }, [n("div", J, l(a.label), 1), a.type === "chips" ? (t(), o(p, {
                            key: 0
                        }, [a.note ? (t(), o("p", K, l(a.note), 1)) : u("", !0), n("div", M, [(t(!0), o(p, null, y(a.items, i => (t(), d(T, {
                            key: i.label,
                            dense: "",
                            color: i.color || a.chipColor || "grey-2",
                            "text-color": i.textColor || a.chipTextColor || "grey-8",
                            icon: i.icon
                        }, {
                            default: s(() => [c(l(i.label), 1)]),
                            _: 2
                        }, 1032, ["color", "text-color", "icon"]))), 128))])], 64)) : a.type === "list" ? (t(), d(B, {
                            key: 1,
                            dense: "",
                            class: "q-ml-sm"
                        }, {
                            default: s(() => [(t(!0), o(p, null, y(a.items, i => (t(), d(N, {
                                key: i.title,
                                class: "q-pa-xs"
                            }, {
                                default: s(() => [e(g, {
                                    avatar: "",
                                    style: {
                                        "min-width": "36px"
                                    }
                                }, {
                                    default: s(() => [e(f, {
                                        name: i.icon,
                                        color: i.color,
                                        size: "20px"
                                    }, null, 8, ["name", "color"])]),
                                    _: 2
                                }, 1024), e(g, null, {
                                    default: s(() => [e(v, {
                                        class: "text-body2 text-weight-medium"
                                    }, {
                                        default: s(() => [c(l(i.title), 1)]),
                                        _: 2
                                    }, 1024), e(v, {
                                        caption: "",
                                        class: "text-grey-6"
                                    }, {
                                        default: s(() => [c(l(i.desc), 1)]),
                                        _: 2
                                    }, 1024)]),
                                    _: 2
                                }, 1024)]),
                                _: 2
                            }, 1024))), 128))]),
                            _: 2
                        }, 1024)) : a.type === "text" ? (t(), o("p", O, l(a.content), 1)) : u("", !0)]))), 128)), r.tips ? .length ? (t(), o(p, {
                            key: 1
                        }, [e(q, {
                            class: "q-my-md"
                        }), m[4] || (m[4] = n("div", {
                            class: "text-caption text-weight-bold text-grey-8 q-mb-xs"
                        }, "Tips", -1)), e(B, {
                            dense: ""
                        }, {
                            default: s(() => [(t(!0), o(p, null, y(r.tips, a => (t(), d(N, {
                                key: a,
                                class: "q-pa-xs"
                            }, {
                                default: s(() => [e(g, {
                                    avatar: "",
                                    style: {
                                        "min-width": "28px"
                                    }
                                }, {
                                    default: s(() => [e(f, {
                                        name: "mdi-lightbulb-outline",
                                        color: "amber-7",
                                        size: "16px"
                                    })]),
                                    _: 1
                                }), e(g, null, {
                                    default: s(() => [e(v, {
                                        caption: ""
                                    }, {
                                        default: s(() => [c(l(a), 1)]),
                                        _: 2
                                    }, 1024)]),
                                    _: 2
                                }, 1024)]),
                                _: 2
                            }, 1024))), 128))]),
                            _: 2
                        }, 1024)], 64)) : u("", !0)]))), 128)), _ < k(D).length - 1 ? (t(), d(q, {
                            key: 0,
                            class: "q-mt-md"
                        })) : u("", !0)], 2))), 128))]),
                        _: 1
                    }), e(q), e(S, {
                        align: "right",
                        class: "q-pa-sm"
                    }, {
                        default: s(() => [Q(e(C, {
                            flat: "",
                            label: "Close",
                            color: "primary"
                        }, null, 512), [
                            [$]
                        ])]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            }, 8, ["model-value"]))
        }
    };
export {
    vt as
    default
};