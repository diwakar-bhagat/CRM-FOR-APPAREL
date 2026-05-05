const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/FlowCalendar-DyNMGDzG.js", "assets/index-BA5ou0W-.js", "assets/index-Bh2r4P0U.css", "assets/QSelect-Cu1YN_YO.js", "assets/QChip-CN77J6Er.js", "assets/QItem-CmACu0VL.js", "assets/QItemLabel-DKOIiaRD.js", "assets/QMenu-DDWBo2BJ.js", "assets/position-engine-C3cfRS00.js", "assets/selection-DtWR3mjl.js", "assets/rtl-DFPa-2ov.js", "assets/QBadge-Cw-oJzeN.js", "assets/QTooltip-OHH9lc35.js", "assets/QSpace-BjbyB_LR.js", "assets/QSpinnerDots-qUvozSP6.js", "assets/QMarkupTable-DCh2V2Pr.js", "assets/ClosePopup-CgV1_utH.js", "assets/useLookups-CEiTzjLh.js", "assets/useHelpers-CLyV6CYd.js", "assets/FileSaver.min-BZowWFmT.js", "assets/_commonjsHelpers-D6-XlEtG.js", "assets/_plugin-vue_export-helper-DlAUqK2U.js", "assets/FlowCalendar-CWJC3NrZ.css"]))) => i.map(i => d[i]);
import {
    V as ee,
    D as u,
    M as b,
    m as a,
    q as l,
    aw as ke,
    s as p,
    l as m,
    p as t,
    N as r,
    O as o,
    a4 as g,
    Q as V,
    r as k,
    a5 as I,
    bZ as It,
    G as ze,
    K as te,
    v as ge,
    x as j,
    ab as D,
    aa as Ke,
    ac as ye,
    E as $t,
    $ as Rt,
    w as it,
    ae as J,
    i as Vt,
    k as Nt,
    ax as jt,
    y as Lt,
    J as oe,
    H as dt,
    I as y,
    ad as Et,
    ar as Ut,
    af as Ht
} from "./index-BA5ou0W-.js";
import {
    Q as _
} from "./QChip-CN77J6Er.js";
import {
    Q as Ye
} from "./QSpace-BjbyB_LR.js";
import {
    Q as ve
} from "./QItemLabel-DKOIiaRD.js";
import {
    a as Me,
    Q as H
} from "./QItem-CmACu0VL.js";
import {
    Q as Ze
} from "./QList-CZpbZIWw.js";
import {
    Q as ut
} from "./QMenu-DDWBo2BJ.js";
import {
    Q as ct
} from "./QSelect-Cu1YN_YO.js";
import {
    Q as O
} from "./QTooltip-OHH9lc35.js";
import {
    Q as mt
} from "./QImg-HDxxj7ri.js";
import {
    Q as Gt
} from "./QIntersection-DMg4TR6U.js";
import {
    Q as Wt
} from "./QPagination-lywm11nU.js";
import {
    Q as Kt
} from "./QBar-BU8Osy4W.js";
import {
    Q as Zt
} from "./QDate-DirjmJW-.js";
import {
    C as be
} from "./ClosePopup-CgV1_utH.js";
import {
    d as z
} from "./date-cIYipMv-.js";
import {
    e as Xt
} from "./index-B7SCgQeN.js";
import {
    a as Jt
} from "./useHelpers-CLyV6CYd.js";
import {
    Q as ne
} from "./QTd-rJwHHrSa.js";
import {
    Q as Se
} from "./QTable-BtAJ-z4N.js";
import {
    Q as ft
} from "./QTr-GmZf20Nu.js";
import ea from "./showVGOrderItem-3cLJC08h.js";
import {
    _ as ta
} from "./_plugin-vue_export-helper-DlAUqK2U.js";
import "./position-engine-C3cfRS00.js";
import "./selection-DtWR3mjl.js";
import "./rtl-DFPa-2ov.js";
import "./use-render-cache-DLxPkVnQ.js";
import "./FileSaver.min-BZowWFmT.js";
import "./_commonjsHelpers-D6-XlEtG.js";
import "./QMarkupTable-DCh2V2Pr.js";
import "./use-fullscreen-i0p8qSCM.js";
import "./QTabs-CBFyGzjl.js";
import "./QResizeObserver-BPtCLTks.js";
import "./QSpinnerDots-qUvozSP6.js";
import "./QInnerLoading-BjWCqppw.js";
import "./QTabPanels-CnBThG97.js";
import "./use-panel-BXiFpZEA.js";
import "./touch-BjYP5sR0.js";
import "./QBadge-Cw-oJzeN.js";
const w = (v, P) => {
        const F = Array.isArray(v ? .sop_details) ? v ? .sop_details ? .[0] : v ? .sop_details;
        let M = {
            delayDays: 0,
            targetDate: null
        };
        switch (P) {
            case "risk_analysis":
                {
                    if (!v.order_date) return 0;
                    const Q = 5,
                        i = new Date(v.order_date),
                        f = new Date(i);f.setDate(f.getDate() + Q);
                    let q = 0;
                    const S = new Date(i);
                    for (S.setDate(S.getDate() + 1); S <= f;) S.getDay() === 0 && q++,
                    S.setDate(S.getDate() + 1);f.setDate(f.getDate() + q);
                    const R = new Date;R.setHours(0, 0, 0, 0),
                    f.setHours(0, 0, 0, 0);
                    const L = f - R;M.delayDays = Math.floor(L / (1e3 * 60 * 60 * 24)),
                    M.targetDate = f;
                    break
                }
            case "bulk_emb":
                {
                    if (!v.order_date) return 0;
                    const Q = 5,
                        i = new Date(v.order_date),
                        f = new Date(i);f.setDate(f.getDate() + Q);
                    let q = 0;
                    const S = new Date(i);
                    for (S.setDate(S.getDate() + 1); S <= f;) S.getDay() === 0 && q++,
                    S.setDate(S.getDate() + 1);f.setDate(f.getDate() + q);
                    const R = new Date;R.setHours(0, 0, 0, 0),
                    f.setHours(0, 0, 0, 0);
                    const L = f - R;M.delayDays = Math.floor(L / (1e3 * 60 * 60 * 24)),
                    M.targetDate = f;
                    break
                }
            case "pfh":
                {
                    if (!v ? .design_head ? .target_pfh_date) return 0;
                    const Q = new Date(v.design_head.target_pfh_date),
                        i = new Date;i.setHours(0, 0, 0, 0),
                    Q.setHours(0, 0, 0, 0);
                    const f = Q - i;M.delayDays = Math.floor(f / (1e3 * 60 * 60 * 24)),
                    M.targetDate = Q;
                    break
                }
            case "rnd":
                {
                    if (!F ? .target_sop_date) return 0;
                    const Q = new Date(F ? .target_sop_date),
                        i = new Date;i.setHours(0, 0, 0, 0),
                    Q.setHours(0, 0, 0, 0);
                    const f = Q - i;M.delayDays = Math.floor(f / (1e3 * 60 * 60 * 24)),
                    M.targetDate = Q;
                    break
                }
            case "sop":
                {
                    const Q = F ? .target_approved_date ? ? F ? .target_sop_date;
                    if (!Q) return 0;
                    const i = new Date(Q),
                        f = new Date;f.setHours(0, 0, 0, 0),
                    i.setHours(0, 0, 0, 0);
                    const q = i - f;M.delayDays = Math.floor(q / (1e3 * 60 * 60 * 24)),
                    M.targetDate = i;
                    break
                }
            case "ppm":
                {
                    if (!F ? .approved_at) return 0;
                    const Q = 5,
                        i = new Date(F ? .approved_at);i.setDate(i.getDate() + Q);
                    let f = 0;
                    const q = new Date(i);
                    for (q.setDate(q.getDate() + 1); q <= i;) q.getDay() === 0 && f++,
                    q.setDate(q.getDate() + 1);i.setDate(i.getDate() + f);
                    const S = new Date;S.setHours(0, 0, 0, 0),
                    i.setHours(0, 0, 0, 0);
                    const R = i - S;M.delayDays = Math.floor(R / (1e3 * 60 * 60 * 24)),
                    M.targetDate = i;
                    break
                }
            default:
                M.delayDays = 0, M.targetDate = null;
                break
        }
        const $ = M.delayDays;
        return M.formattedDelayDays = $ > 0 ? `+${$}` : `${$}`, M
    },
    aa = {
        key: 0,
        class: "flex flex-center q-pa-sm"
    },
    la = {
        key: 1,
        class: "trims-expand-wrapper"
    },
    ra = {
        class: "row q-gutter-x-sm q-mb-sm items-center"
    },
    sa = {
        key: 1,
        class: "text-grey-5 q-pa-xs text-caption"
    },
    oa = {
        __name: "TrimsExpandRow",
        props: {
            trimsData: {
                type: Object,
                default: null
            },
            trimsLoading: {
                type: Boolean,
                default: !1
            }
        },
        setup(v) {
            const P = v,
                F = i => i.poOrderQty > 0 || i.stkTransferIn > 0 ? 3 : i.itemapproved == "-1" && i.reqnQty == "0" && i.reqnQty == 0 ? 1 : i.reqnQty !== "0" && i.reqnQty !== 0 ? 2 : 0,
                M = ee(() => P.trimsData ? .items ? [...P.trimsData.items].sort((i, f) => F(i) - F(f)) : []),
                $ = [{
                    name: "sequenceNo",
                    label: "Seq",
                    field: "sequenceNo",
                    align: "center"
                }, {
                    name: "itemCode",
                    label: "Item Code",
                    field: "itemCode",
                    align: "center"
                }, {
                    name: "itemCategory",
                    label: "Item Category",
                    field: "itemCategory",
                    align: "left"
                }, {
                    name: "description",
                    label: "Description",
                    field: "description",
                    align: "left"
                }, {
                    name: "fabColor",
                    label: "Color",
                    field: "fabColor",
                    align: "left"
                }, {
                    name: "itemSize",
                    label: "Size",
                    field: "itemSize",
                    align: "left"
                }, {
                    name: "unit",
                    label: "Unit",
                    field: "unit",
                    align: "center"
                }, {
                    name: "sourcing",
                    label: "Sourcing",
                    field: "sourcing",
                    align: "center"
                }, {
                    name: "reqdQty",
                    label: "Reqd Qty",
                    field: "reqdQty",
                    format: i => parseFloat(i).toFixed(2),
                    align: "right"
                }, {
                    name: "reqnQty",
                    label: "Reqn Qty",
                    field: "reqnQty",
                    format: i => parseFloat(i).toFixed(2),
                    align: "right"
                }, {
                    name: "poOrderQty",
                    label: "PO Qty",
                    field: "poOrderQty",
                    align: "right"
                }, {
                    name: "receivedQty",
                    label: "Received",
                    field: "receivedQty",
                    align: "right"
                }, {
                    name: "stkTransferIn",
                    label: "From Stock Qty",
                    field: "stkTransferIn",
                    align: "right"
                }, {
                    name: "rate",
                    label: "Rate",
                    field: "rate",
                    format: i => parseFloat(i).toFixed(2),
                    align: "right"
                }, {
                    name: "currency",
                    label: "Currency",
                    field: "currency",
                    align: "center"
                }, {
                    name: "po_status",
                    label: "PO Status",
                    field: "po_status",
                    align: "center"
                }],
                Q = i => i.poOrderQty > 0 ? "text-green-8 bg-green-1" : i.stkTransferIn > 0 ? "text-indigo-10 bg-indigo-1" : i.reqnQty !== "0" && i.reqnQty !== 0 ? "text-orange-8 bg-orange-1" : (i.itemapproved == "-1" && i.reqnQty == "0" && i.reqnQty == 0, "text-red-8 bg-red-1");
            return (i, f) => v.trimsLoading ? (a(), u("div", aa, [l(ke, {
                color: "primary",
                size: "20px"
            })])) : v.trimsData ? (a(), u("div", la, [p("div", ra, [f[0] || (f[0] = p("div", {
                class: "text-subtitle2"
            }, "Trim Details:", -1)), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "purple-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" Total: " + o(v.trimsData.total_items), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "indigo-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" From Stocks: " + o(v.trimsData.total_items_from_stocks), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "green-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" PO Completed: " + o(v.trimsData.po_completed_items), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "orange-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" PR Completed: " + o(v.trimsData.pr_completed_items), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "red-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" Pending: " + o(v.trimsData.approved_items + v.trimsData.non_approved_items), 1)]),
                _: 1
            })]), v.trimsData.items ? .length ? (a(), m(Se, {
                key: 0,
                rows: M.value,
                columns: $,
                "row-key": "trid",
                dense: "",
                flat: "",
                bordered: "",
                "hide-bottom": "",
                pagination: {
                    rowsPerPage: 0
                },
                "table-row-class-fn": Q
            }, {
                "body-cell-sequenceNo": t(q => [l(ne, {
                    props: q,
                    class: "text-center"
                }, {
                    default: t(() => [l(_, {
                        dense: "",
                        square: "",
                        size: "sm",
                        color: "grey-3",
                        "text-color": "grey-8"
                    }, {
                        default: t(() => [r(o(q.rowIndex + 1), 1)]),
                        _: 2
                    }, 1024)]),
                    _: 2
                }, 1032, ["props"])]),
                "body-cell-po_status": t(q => [l(ne, {
                    props: q,
                    class: "text-center"
                }, {
                    default: t(() => [q.row.poOrderQty > 0 || q.row.stkTransferIn > 0 ? (a(), u(g, {
                        key: 0
                    }, [q.row.poOrderQty > 0 ? (a(), m(V, {
                        key: 0,
                        name: "mdi-check-circle",
                        color: "green",
                        size: "18px"
                    }, {
                        default: t(() => [l(O, null, {
                            default: t(() => f[1] || (f[1] = [r("PO Completed", -1)])),
                            _: 1,
                            __: [1]
                        })]),
                        _: 1
                    })) : b("", !0), q.row.stkTransferIn > 0 ? (a(), m(V, {
                        key: 1,
                        name: "mdi-inbox-arrow-down",
                        color: "indigo-10",
                        size: "18px"
                    }, {
                        default: t(() => [l(O, null, {
                            default: t(() => f[2] || (f[2] = [r(" Transfer From Stock ", -1)])),
                            _: 1,
                            __: [2]
                        })]),
                        _: 1
                    })) : b("", !0)], 64)) : (a(), m(V, {
                        key: 1,
                        name: "mdi-clock-outline",
                        color: "orange",
                        size: "18px"
                    }, {
                        default: t(() => [l(O, null, {
                            default: t(() => f[3] || (f[3] = [r(" PO Pending ", -1)])),
                            _: 1,
                            __: [3]
                        })]),
                        _: 1
                    }))]),
                    _: 2
                }, 1032, ["props"])]),
                _: 1
            }, 8, ["rows"])) : (a(), u("div", sa, "No trims data"))])) : b("", !0)
        }
    },
    na = {
        key: 0,
        class: "flex flex-center q-pa-sm"
    },
    ia = {
        key: 1,
        class: "fabrics-expand-wrapper"
    },
    da = {
        class: "row q-gutter-x-sm q-mb-sm items-center"
    },
    ua = {
        key: 1,
        class: "text-grey-5 q-pa-xs text-caption"
    },
    ca = {
        __name: "FabricsExpandRow",
        props: {
            fabricsData: {
                type: Object,
                default: null
            },
            fabricsLoading: {
                type: Boolean,
                default: !1
            }
        },
        setup(v) {
            const P = v,
                F = i => i.poOrderQty > 0 ? 4 : i.stkTransferIn > 0 ? 3 : i.itemapproved == "-1" && i.reqnQty == "0" && i.reqnQty == 0 ? 1 : i.reqnQty !== "0" && i.reqnQty !== 0 ? 2 : 0,
                M = ee(() => P.fabricsData ? .items ? [...P.fabricsData.items].sort((i, f) => F(i) - F(f)) : []),
                $ = [{
                    name: "sequenceNo",
                    label: "Seq",
                    field: "sequenceNo",
                    align: "center"
                }, {
                    name: "itemCode",
                    label: "Item Code",
                    field: "itemCode",
                    align: "center"
                }, {
                    name: "itemCategory",
                    label: "Item Category",
                    field: "itemCategory",
                    align: "left"
                }, {
                    name: "category",
                    label: "Category",
                    field: "category",
                    align: "left"
                }, {
                    name: "description",
                    label: "Description",
                    field: "description",
                    align: "left"
                }, {
                    name: "fabColor",
                    label: "Color",
                    field: "fabColor",
                    align: "left"
                }, {
                    name: "itemSize",
                    label: "Size",
                    field: "itemSize",
                    align: "left"
                }, {
                    name: "unit",
                    label: "Unit",
                    field: "unit",
                    align: "center"
                }, {
                    name: "sourcing",
                    label: "Sourcing",
                    field: "sourcing",
                    align: "center"
                }, {
                    name: "reqdQty",
                    label: "Reqd Qty",
                    field: "reqdQty",
                    format: i => parseFloat(i).toFixed(2),
                    align: "right"
                }, {
                    name: "reqnQty",
                    label: "Reqn Qty",
                    field: "reqnQty",
                    format: i => parseFloat(i).toFixed(2),
                    align: "right"
                }, {
                    name: "poOrderQty",
                    label: "PO Qty",
                    field: "poOrderQty",
                    align: "right"
                }, {
                    name: "receivedQty",
                    label: "Received",
                    field: "receivedQty",
                    align: "right"
                }, {
                    name: "stkTransferIn",
                    label: "From Stock Qty",
                    field: "stkTransferIn",
                    align: "right"
                }, {
                    name: "rate",
                    label: "Rate",
                    field: "rate",
                    format: i => parseFloat(i).toFixed(2),
                    align: "right"
                }, {
                    name: "currency",
                    label: "Currency",
                    field: "currency",
                    align: "center"
                }, {
                    name: "po_status",
                    label: "PO Status",
                    field: "po_status",
                    align: "center"
                }],
                Q = i => i.poOrderQty > 0 ? "text-green-8 bg-green-1" : i.stkTransferIn > 0 ? "text-indigo-10 bg-indigo-1" : i.reqnQty !== "0" && i.reqnQty !== 0 ? "text-orange-8 bg-orange-1" : (i.itemapproved == "-1" && i.reqnQty == "0" && i.reqnQty == 0, "text-red-8 bg-red-1");
            return (i, f) => v.fabricsLoading ? (a(), u("div", na, [l(ke, {
                color: "primary",
                size: "20px"
            })])) : v.fabricsData ? (a(), u("div", ia, [p("div", da, [f[0] || (f[0] = p("div", {
                class: "text-subtitle2"
            }, "Fabric Details:", -1)), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "purple-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" Total: " + o(v.fabricsData.total_items), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "indigo-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" From Stocks: " + o(v.fabricsData.total_items_from_stocks), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "green-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" PO Completed: " + o(v.fabricsData.po_completed_items), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "orange-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" PR Completed: " + o(v.fabricsData.pr_completed_items), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "red-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" Pending: " + o(v.fabricsData.approved_items + v.fabricsData.non_approved_items), 1)]),
                _: 1
            })]), v.fabricsData.items ? .length ? (a(), m(Se, {
                key: 0,
                rows: M.value,
                columns: $,
                "row-key": "trid",
                dense: "",
                flat: "",
                bordered: "",
                "hide-bottom": "",
                pagination: {
                    rowsPerPage: 0
                },
                "table-row-class-fn": Q
            }, {
                "body-cell-sequenceNo": t(q => [l(ne, {
                    props: q,
                    class: "text-center"
                }, {
                    default: t(() => [l(_, {
                        dense: "",
                        square: "",
                        size: "sm",
                        color: "grey-3",
                        "text-color": "grey-8"
                    }, {
                        default: t(() => [r(o(q.rowIndex + 1), 1)]),
                        _: 2
                    }, 1024)]),
                    _: 2
                }, 1032, ["props"])]),
                "body-cell-po_status": t(q => [l(ne, {
                    props: q,
                    class: "text-center"
                }, {
                    default: t(() => [q.row.poOrderQty > 0 || q.row.stkTransferIn > 0 ? (a(), u(g, {
                        key: 0
                    }, [q.row.poOrderQty > 0 ? (a(), m(V, {
                        key: 0,
                        name: "mdi-check-circle",
                        color: "green",
                        size: "18px"
                    }, {
                        default: t(() => [l(O, null, {
                            default: t(() => f[1] || (f[1] = [r("PO Completed", -1)])),
                            _: 1,
                            __: [1]
                        })]),
                        _: 1
                    })) : b("", !0), q.row.stkTransferIn > 0 ? (a(), m(V, {
                        key: 1,
                        name: "mdi-inbox-arrow-down",
                        color: "indigo-10",
                        size: "18px"
                    }, {
                        default: t(() => [l(O, null, {
                            default: t(() => f[2] || (f[2] = [r(" Transfer From Stock ", -1)])),
                            _: 1,
                            __: [2]
                        })]),
                        _: 1
                    })) : b("", !0)], 64)) : (a(), m(V, {
                        key: 1,
                        name: "mdi-clock-outline",
                        color: "orange",
                        size: "18px"
                    }, {
                        default: t(() => [l(O, null, {
                            default: t(() => f[3] || (f[3] = [r(" PO Pending ", -1)])),
                            _: 1,
                            __: [3]
                        })]),
                        _: 1
                    }))]),
                    _: 2
                }, 1032, ["props"])]),
                _: 1
            }, 8, ["rows"])) : (a(), u("div", ua, "No fabrics data"))])) : b("", !0)
        }
    },
    ma = {
        key: 1,
        class: "flex flex-center q-pa-sm"
    },
    fa = {
        key: 2,
        class: "fob-expand-wrapper"
    },
    _a = {
        class: "row q-gutter-x-sm q-mb-sm items-center"
    },
    pa = {
        key: 3,
        class: "row justify-evenly q-gutter-xs"
    },
    ga = {
        class: "column q-gutter-y-xs"
    },
    ya = {
        class: "row items-center q-gutter-x-sm"
    },
    ba = {
        class: "row items-start q-gutter-x-sm"
    },
    va = {
        class: "column q-gutter-y-xs"
    },
    ka = {
        key: 1,
        class: "text-grey-5 q-pa-xs text-caption"
    },
    ha = {
        __name: "FOBExpandRow",
        props: {
            fobData: {
                type: Object,
                default: null
            },
            fobLoading: {
                type: Boolean,
                default: !1
            },
            vgOrderMaster: {
                type: Object,
                default: null
            },
            pendingFabrics: {
                type: Array,
                default: () => []
            }
        },
        setup(v) {
            const P = k(new Set),
                F = h => {
                    const Y = new Set(P.value);
                    Y.has(h) ? Y.delete(h) : Y.add(h), P.value = Y
                },
                M = v,
                $ = [{
                    name: "action",
                    label: "",
                    field: "action",
                    align: "left"
                }, {
                    name: "requested_at",
                    label: "Requested At",
                    field: "requested_at",
                    format: h => z.formatDate(h, "DD-MM-YYYY"),
                    align: "left"
                }, {
                    name: "fob_date",
                    label: "FOB Date",
                    field: "fob_date",
                    align: "left",
                    format: h => z.formatDate(h, "DD-MM-YYYY") || ""
                }, {
                    name: "fob_approval_req_at",
                    label: "FOB Sent Date",
                    field: "fob_approval_req_at",
                    align: "left",
                    format: h => z.formatDate(h, "DD-MM-YYYY")
                }, {
                    name: "order_status",
                    label: "Status",
                    field: "order_status",
                    align: "center"
                }, {
                    name: "griege_type",
                    label: "Greige Type",
                    field: "griege_type",
                    align: "center"
                }, {
                    name: "embroidery",
                    label: "Job Work Status",
                    field: "embroidery",
                    align: "center"
                }, {
                    name: "order_qty",
                    label: "Order Qty",
                    field: "order_qty",
                    align: "left"
                }, {
                    name: "fabric_category",
                    label: "Fabric Category",
                    field: "fabric_category",
                    align: "left"
                }, {
                    name: "fabric_color",
                    label: "Fabric Color",
                    field: "fabric_color",
                    align: "left"
                }, {
                    name: "fabric_description",
                    label: "Fabric Description",
                    field: "fabric_description",
                    align: "left"
                }, {
                    name: "fabric_qty",
                    label: "Fabric Qty",
                    field: "fabric_qty",
                    align: "left"
                }, {
                    name: "fabric_unit",
                    label: "Fabric Unit",
                    field: "fabric_unit",
                    align: "left"
                }, {
                    name: "fabric_width",
                    label: "Fabric Width",
                    field: "fabric_width",
                    align: "left"
                }, {
                    name: "current_greige_inhouse_qty",
                    label: "Current Greige In-house Qty",
                    field: "current_greige_inhouse_qty",
                    align: "left"
                }, {
                    name: "rejected_at",
                    label: "Rejected At",
                    field: "rejected_at",
                    align: "center",
                    format: h => z.formatDate(h, "DD-MM-YYYY")
                }, {
                    name: "rejected_by",
                    label: "Rejected By",
                    field: "rejected_by",
                    align: "center"
                }, {
                    name: "accepted_at",
                    label: "Accepted At",
                    field: "accepted_at",
                    align: "center",
                    format: h => z.formatDate(h, "DD-MM-YYYY")
                }, {
                    name: "accepted_by",
                    label: "Accepted By",
                    field: "accepted_by",
                    align: "center"
                }, {
                    name: "completed_at",
                    label: "Completed At",
                    field: "completed_at",
                    align: "center",
                    format: h => z.formatDate(h, "DD-MM-YYYY")
                }, {
                    name: "completed_by",
                    label: "completed By",
                    field: "completed_by",
                    align: "center"
                }],
                Q = [{
                    name: "OutputColor",
                    label: "Color",
                    field: "OutputColor",
                    align: "left"
                }, {
                    name: "OutputItemDescription",
                    label: "Item Description",
                    field: "OutputItemDescription",
                    align: "left"
                }, {
                    name: "OutputGsm",
                    label: "GSM",
                    field: "OutputGsm",
                    align: "left"
                }, {
                    name: "OutputItem",
                    label: "Item Code",
                    field: "OutputItem",
                    align: "left"
                }, {
                    name: "OutputQty",
                    label: "Qty",
                    field: "OutputQty",
                    align: "center"
                }, {
                    name: "OutputSize",
                    label: "Size",
                    field: "OutputSize",
                    align: "center"
                }, {
                    name: "OutputUnit",
                    label: "Unit",
                    field: "OutputUnit",
                    align: "center"
                }],
                i = h => {
                    if (!h) return "-";
                    try {
                        var Y = {
                            date: null,
                            unit: null,
                            qty: null
                        };
                        const C = typeof h == "string" ? JSON.parse(h) : h,
                            T = C ? .date;
                        if (!T) return "-";
                        const [ae, Qe, le] = T.split("-");
                        return Y = {
                            date: z.formatDate(new Date(`${le}-${Qe}-${ae}`), "D-MMM-YYYY"),
                            unit: C ? .unit ? .label,
                            qty: C ? .mtrsFlow
                        }, Y
                    } catch {
                        return "-"
                    }
                },
                f = h => h ? typeof h == "string" ? JSON.parse(h) : h : "-",
                q = h => {
                    if (!h) return "-";
                    const [Y, C, T] = h.split("-");
                    return z.formatDate(new Date(`${T}-${C}-${Y}`), "D-MMM-YYYY")
                },
                S = () => R() !== "Not Embroidery / Handwork",
                R = () => {
                    const h = (M.vgOrderMaster ? .production_process || "").toLowerCase(),
                        Y = h.includes("emb") || h.includes("comp emb-w"),
                        C = h.includes("handwork");
                    return Y && C ? "Embroidery + Handwork" : Y ? "Embroidery" : C ? "Handwork" : "Not Embroidery / Handwork"
                },
                L = h => h === "go-ahead-received" ? {
                    bg: "green-2",
                    text: "green-8"
                } : h === "go-ahead-rejected" ? {
                    bg: "red-2",
                    text: "red-8"
                } : h === "approval-pending" ? {
                    bg: "orange-2",
                    text: "orange-8"
                } : {
                    bg: "grey-3",
                    text: "grey-8"
                },
                he = h => h.order_status === "go-ahead-received" ? "text-green-8 bg-green-1" : h.order_status === "go-ahead-rejected" ? "text-red-8 bg-red-1" : h.order_status === "approval-pending" ? "text-orange-8 bg-orange-1" : "";
            return (h, Y) => (a(), u(g, null, [v.pendingFabrics ? .length ? (a(), m(Se, {
                key: 0,
                rows: v.pendingFabrics,
                columns: Q,
                dense: "",
                flat: "",
                bordered: "",
                "hide-bottom": "",
                "table-header-class": "bg-red-2 text-red-8",
                "table-row-class-fn": () => "bg-red-1 text-red-8",
                pagination: {
                    rowsPerPage: 0
                }
            }, null, 8, ["rows"])) : b("", !0), v.fobLoading ? (a(), u("div", ma, [l(ke, {
                color: "primary",
                size: "20px"
            })])) : v.fobData ? (a(), u("div", fa, [p("div", _a, [Y[0] || (Y[0] = p("div", {
                class: "text-subtitle2"
            }, "Bulk Process / FOB Details:", -1)), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "purple-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" Total Fabrics: " + o(v.fobData.fab_count), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "indigo-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" Total Requests: " + o(v.fobData.items.length), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "orange-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" Pending: " + o(v.fobData.items.filter(C => C.order_status === "approval-pending").length), 1)]),
                _: 1
            }), l(_, {
                dense: "",
                square: "",
                size: "sm",
                color: "green-8",
                "text-color": "white"
            }, {
                default: t(() => [r(" Completed: " + o(v.fobData.items.filter(C => C.order_status === "go-ahead-received").length), 1)]),
                _: 1
            })]), v.fobData.items ? .length ? (a(), m(Se, {
                key: 0,
                rows: v.fobData.items,
                columns: $,
                "row-key": "id",
                dense: "",
                flat: "",
                bordered: "",
                "hide-bottom": "",
                pagination: {
                    rowsPerPage: 0
                },
                "table-row-class-fn": he
            }, {
                body: t(C => [l(ft, {
                    props: C
                }, {
                    default: t(() => [(a(!0), u(g, null, I(C.cols, T => (a(), m(ne, {
                        key: T.name,
                        props: C
                    }, {
                        default: t(() => [T.name === "action" ? (a(), m(_, {
                            key: 0,
                            "icon-right": P.value.has(C.row.id) ? "mdi-chevron-up" : "mdi-chevron-down",
                            dense: "",
                            square: "",
                            size: "sm",
                            color: "teal-12",
                            "text-color": "black",
                            clickable: "",
                            onClick: ae => F(C.row.id)
                        }, {
                            default: t(() => Y[1] || (Y[1] = [r(" Bulk Flow ", -1)])),
                            _: 2,
                            __: [1]
                        }, 1032, ["icon-right", "onClick"])) : T.name === "fob_date" ? (a(), u(g, {
                            key: 1
                        }, [r(o(i(C.row.fob).date), 1)], 64)) : T.name === "order_status" ? (a(), m(_, {
                            key: 2,
                            dense: "",
                            square: "",
                            size: "sm",
                            color: L(C.row.order_status).bg,
                            "text-color": L(C.row.order_status).text
                        }, {
                            default: t(() => [r(o(C.row.order_status), 1)]),
                            _: 2
                        }, 1032, ["color", "text-color"])) : T.name === "griege_type" ? (a(), u("div", pa, [l(_, {
                            dense: "",
                            square: "",
                            color: C.row.stocked_greige ? "cyan-1" : "grey-1",
                            "text-color": C.row.stocked_greige ? "cyan-8" : "grey-8",
                            size: "sm"
                        }, {
                            default: t(() => [Y[3] || (Y[3] = r(" SG ", -1)), l(O, null, {
                                default: t(() => Y[2] || (Y[2] = [r("Stocked Greige", -1)])),
                                _: 1,
                                __: [2]
                            })]),
                            _: 2,
                            __: [3]
                        }, 1032, ["color", "text-color"]), l(_, {
                            dense: "",
                            square: "",
                            color: C.row.purchased_greige ? "cyan-1" : "grey-1",
                            "text-color": C.row.purchased_greige ? "cyan-8" : "grey-8",
                            size: "sm"
                        }, {
                            default: t(() => [Y[5] || (Y[5] = r(" PG ", -1)), l(O, null, {
                                default: t(() => Y[4] || (Y[4] = [r("Purchased Greige", -1)])),
                                _: 1,
                                __: [4]
                            })]),
                            _: 2,
                            __: [5]
                        }, 1032, ["color", "text-color"])])) : T.name === "embroidery" ? (a(), m(_, {
                            key: 4,
                            dense: "",
                            square: "",
                            size: "sm",
                            color: S() ? "green-2" : "grey-2",
                            "text-color": S() ? "green-8" : "grey-8",
                            icon: S() ? "mdi-check-circle-outline" : "mdi-close-circle-outline"
                        }, {
                            default: t(() => [r(o(R()), 1)]),
                            _: 1
                        }, 8, ["color", "text-color", "icon"])) : (a(), u(g, {
                            key: 5
                        }, [r(o(T.value), 1)], 64))]),
                        _: 2
                    }, 1032, ["props"]))), 128))]),
                    _: 2
                }, 1032, ["props"]), P.value.has(C.row.id) ? (a(), m(ft, {
                    key: 0,
                    props: C
                }, {
                    default: t(() => [l(ne, {
                        colspan: $.length,
                        class: "bg-teal-1 text-black q-pa-sm"
                    }, {
                        default: t(() => [p("div", ga, [p("div", ya, [Y[6] || (Y[6] = p("span", {
                            class: "text-caption text-weight-medium text-grey-7",
                            style: {
                                "min-width": "70px"
                            }
                        }, "FOB:", -1)), l(_, {
                            dense: "",
                            square: "",
                            size: "sm",
                            color: "purple-2",
                            "text-color": "purple-8"
                        }, {
                            default: t(() => [r(" Date: " + o(i(C.row.fob).date), 1)]),
                            _: 2
                        }, 1024), l(_, {
                            dense: "",
                            square: "",
                            size: "sm",
                            color: "purple-2",
                            "text-color": "purple-8"
                        }, {
                            default: t(() => [r(" Flow: " + o(i(C.row.fob).qty) + " " + o(i(C.row.fob).unit), 1)]),
                            _: 2
                        }, 1024)]), p("div", ba, [Y[7] || (Y[7] = p("span", {
                            class: "text-caption text-weight-medium text-grey-7",
                            style: {
                                "min-width": "70px"
                            }
                        }, "Bulk Flow:", -1)), p("div", va, [(a(!0), u(g, null, I(f(C.row.bulk_flow), (T, ae) => (a(), u("div", {
                            key: "bulk_flow" + ae,
                            class: "row q-gutter-x-sm items-center"
                        }, [l(_, {
                            dense: "",
                            square: "",
                            size: "sm",
                            color: "purple-2",
                            "text-color": "purple-8"
                        }, {
                            default: t(() => [r(" Date: " + o(q(T ? .date)), 1)]),
                            _: 2
                        }, 1024), l(_, {
                            dense: "",
                            square: "",
                            size: "sm",
                            color: "purple-2",
                            "text-color": "purple-8"
                        }, {
                            default: t(() => [r(" Flow: " + o(T.mtrsFlow) + " " + o(T.unit.label), 1)]),
                            _: 2
                        }, 1024)]))), 128))])])])]),
                        _: 2
                    }, 1032, ["colspan"])]),
                    _: 2
                }, 1032, ["props"])) : b("", !0)]),
                _: 1
            }, 8, ["rows"])) : (a(), u("div", ka, "No FOB data"))])) : b("", !0)], 64))
        }
    },
    Da = {
        class: "row q-gutter-sm"
    },
    xa = {
        class: "row q-gutter-sm"
    },
    qa = {
        __name: "StatusInfoDialog",
        props: {
            modelValue: {
                default: !1
            },
            modelModifiers: {}
        },
        emits: ["update:modelValue"],
        setup(v) {
            const P = It(v, "modelValue"),
                F = [{
                    label: "Lazy Thumbnail Loading",
                    description: "Style thumbnails load only when rows become visible in the table.",
                    avatarColor: "cyan-2",
                    textColor: "cyan-8",
                    icon: "mdi-timer-sand"
                }, {
                    label: "Click to Preview",
                    description: "Click the image thumbnail to open a larger preview popup.",
                    avatarColor: "indigo-2",
                    textColor: "indigo-8",
                    icon: "mdi-image-search-outline"
                }, {
                    label: "Completed / Accepted",
                    description: "Task is done or accepted by the relevant party.",
                    avatarColor: "green-2",
                    textColor: "green-8",
                    icon: "mdi-check-decagram"
                }, {
                    label: "In Progress / Dispatched",
                    description: "Task has been initiated or dispatched and is awaiting the next step.",
                    avatarColor: "blue-2",
                    textColor: "blue-8",
                    icon: "mdi-timer-outline"
                }, {
                    label: "Upcoming (days remaining shown)",
                    description: "Task is not yet due. Number shows days left until the target date.",
                    avatarColor: "orange-2",
                    textColor: "orange-8",
                    icon: null,
                    sample: "+5"
                }, {
                    label: "Delayed (overdue days shown)",
                    description: "Task is overdue. Negative number shows how many days past the target date.",
                    avatarColor: "red-2",
                    textColor: "red-8",
                    icon: null,
                    sample: "-3"
                }],
                M = [{
                    label: "Pending",
                    color: "orange-2",
                    textColor: "orange-8"
                }, {
                    label: "Accepted",
                    color: "green-2",
                    textColor: "green-8"
                }, {
                    label: "Rejected",
                    color: "red-2",
                    textColor: "red-8"
                }, {
                    label: "Approval Pending",
                    color: "blue-2",
                    textColor: "blue-8"
                }, {
                    label: "Go-Ahead Received",
                    color: "teal-2",
                    textColor: "teal-8"
                }, {
                    label: "Go-Ahead Rejected",
                    color: "deep-orange-2",
                    textColor: "deep-orange-8"
                }],
                $ = [{
                    label: "Pending / Non-Approved",
                    color: "red-9",
                    textColor: "white"
                }, {
                    label: "Approved (Trims)",
                    color: "orange-9",
                    textColor: "white"
                }, {
                    label: "PR Completed",
                    color: "green-9",
                    textColor: "white"
                }, {
                    label: "PO Completed",
                    color: "teal-9",
                    textColor: "white"
                }, {
                    label: "From Stock",
                    color: "indigo-10",
                    textColor: "white"
                }, {
                    label: "Total",
                    color: "purple-8",
                    textColor: "white"
                }];
            return (Q, i) => (a(), m(ye, {
                modelValue: P.value,
                "onUpdate:modelValue": i[0] || (i[0] = f => P.value = f),
                "max-width": "520px"
            }, {
                default: t(() => [l(ze, {
                    style: {
                        "min-width": "460px",
                        "border-radius": "8px"
                    }
                }, {
                    default: t(() => [l(te, {
                        class: "row items-center q-pb-none"
                    }, {
                        default: t(() => [i[1] || (i[1] = p("div", {
                            class: "text-subtitle1 text-weight-bold"
                        }, "Status Legend", -1)), l(Ye), ge(l(j, {
                            icon: "close",
                            flat: "",
                            round: "",
                            dense: ""
                        }, null, 512), [
                            [be]
                        ])]),
                        _: 1,
                        __: [1]
                    }), l(te, null, {
                        default: t(() => [i[2] || (i[2] = p("div", {
                            class: "text-caption text-grey-7 q-mb-md"
                        }, " Each cell in the table shows an icon/number representing the current status of that task. ", -1)), l(Ze, {
                            separator: ""
                        }, {
                            default: t(() => [(a(), u(g, null, I(F, f => l(Me, {
                                key: f.label,
                                class: "q-py-sm"
                            }, {
                                default: t(() => [l(H, {
                                    avatar: ""
                                }, {
                                    default: t(() => [f.icon ? (a(), m(D, {
                                        key: 1,
                                        color: f.avatarColor,
                                        "text-color": f.textColor,
                                        icon: f.icon,
                                        size: "sm",
                                        rounded: ""
                                    }, null, 8, ["color", "text-color", "icon"])) : (a(), m(D, {
                                        key: 0,
                                        color: f.avatarColor,
                                        "text-color": f.textColor,
                                        size: "sm",
                                        rounded: ""
                                    }, {
                                        default: t(() => [r(o(f.sample), 1)]),
                                        _: 2
                                    }, 1032, ["color", "text-color"]))]),
                                    _: 2
                                }, 1024), l(H, null, {
                                    default: t(() => [l(ve, {
                                        class: "text-weight-medium"
                                    }, {
                                        default: t(() => [r(o(f.label), 1)]),
                                        _: 2
                                    }, 1024), l(ve, {
                                        caption: ""
                                    }, {
                                        default: t(() => [r(o(f.description), 1)]),
                                        _: 2
                                    }, 1024)]),
                                    _: 2
                                }, 1024)]),
                                _: 2
                            }, 1024)), 64))]),
                            _: 1
                        }), l(Ke, {
                            class: "q-my-sm"
                        }), i[3] || (i[3] = p("div", {
                            class: "text-caption text-weight-bold q-mb-sm"
                        }, "FOB Order Statuses", -1)), p("div", Da, [(a(), u(g, null, I(M, f => l(_, {
                            key: f.label,
                            color: f.color,
                            "text-color": f.textColor,
                            dense: "",
                            square: "",
                            size: "sm"
                        }, {
                            default: t(() => [r(o(f.label), 1)]),
                            _: 2
                        }, 1032, ["color", "text-color"])), 64))]), l(Ke, {
                            class: "q-my-md"
                        }), i[4] || (i[4] = p("div", {
                            class: "text-caption text-weight-bold q-mb-sm"
                        }, "Fabrics / Trims Statuses", -1)), p("div", xa, [(a(), u(g, null, I($, f => l(_, {
                            key: f.label,
                            color: f.color,
                            "text-color": f.textColor,
                            dense: "",
                            square: "",
                            size: "sm"
                        }, {
                            default: t(() => [r(o(f.label), 1)]),
                            _: 2
                        }, 1032, ["color", "text-color"])), 64))])]),
                        _: 1,
                        __: [2, 3, 4]
                    })]),
                    _: 1
                })]),
                _: 1
            }, 8, ["modelValue"]))
        }
    },
    Ca = {
        class: "row q-mb-sm q-gutter-y-sm items-center"
    },
    za = {
        class: "row q-gutter-x-sm q-gutter-y-sm q-mt-none items-center full-width-xs flex-wrap"
    },
    Ya = {
        class: "col-xs-12 col-sm-auto"
    },
    Ma = {
        class: "col-xs-12 col-sm-auto"
    },
    Sa = {
        class: "col-xs-12 col-sm-auto"
    },
    Qa = {
        class: "main-container"
    },
    wa = {
        class: "table-scroll-container"
    },
    Oa = {
        class: "sticky-table",
        cellspacing: "0",
        cellpadding: "0"
    },
    Fa = ["colspan"],
    Ta = {
        class: "style-thumb-wrapper"
    },
    Pa = {
        class: "style-thumb-fallback"
    },
    Ba = {
        key: 1,
        class: "style-thumb-fallback"
    },
    Aa = {
        key: 1,
        class: "row items-center justify-center"
    },
    Ia = {
        key: 2
    },
    $a = {
        key: 10,
        class: "text-bold"
    },
    Ra = {
        class: "column items-center"
    },
    Va = {
        class: "column items-center"
    },
    Na = {
        key: 15,
        class: "row items-center justify-center no-wrap q-gutter-sm"
    },
    ja = {
        class: "column items-center"
    },
    La = {
        key: 16,
        class: "row items-center justify-center no-wrap q-gutter-sm"
    },
    Ea = {
        class: "column items-center"
    },
    Ua = {
        class: "column items-center"
    },
    Ha = {
        class: "q-gutter-x-sm"
    },
    Ga = {
        class: "row q-gutter-x-sm"
    },
    Wa = {
        class: "column items-center"
    },
    Ka = {
        class: "q-gutter-x-sm flex items-center justify-center"
    },
    Za = {
        class: "row q-gutter-x-sm"
    },
    Xa = {
        key: 20,
        class: "q-gutter-x-sm flex items-center justify-center"
    },
    Ja = {
        class: "row q-gutter-x-sm"
    },
    el = {
        class: "column items-center"
    },
    tl = {
        class: "column items-center"
    },
    al = {
        class: "column items-center"
    },
    ll = {
        class: "column items-center"
    },
    rl = ["colspan"],
    sl = ["colspan"],
    ol = ["colspan"],
    nl = {
        key: 0
    },
    il = ["colspan"],
    dl = {
        key: 1
    },
    ul = ["colspan"],
    cl = {
        class: "flex flex-center q-pa-sm"
    },
    ml = {
        class: "q-pa-sm flex flex-center justify-between pagination"
    },
    fl = {
        class: "text-subtitle1 text-weight-medium"
    },
    _t = "taskmanager_visible_columns",
    _l = "v3/dashboard/style-thumbnail",
    pl = 120,
    gl = {
        __name: "TaskManager",
        setup(v) {
            const P = Et(() => Ht(() =>
                    import ("./FlowCalendar-DyNMGDzG.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]))),
                F = $t(),
                M = ee(() => F.dark.isActive),
                $ = Rt(Xt),
                Q = k(!1),
                i = k(null),
                f = k("all"),
                q = k(!1),
                S = k(null),
                R = k(!1),
                L = k([]),
                he = k([]),
                h = k(new Date),
                Y = k(!1),
                C = k([]),
                T = async () => {
                    Y.value = !0;
                    try {
                        const s = `${h.value.getFullYear()}-${String(h.value.getMonth()+1).padStart(2,"0")}`,
                            {
                                data: n
                            } = await J.get("/v3/bulk-process/flow-data", {
                                params: {
                                    month: s
                                }
                            });
                        L.value = n.data ? .occupied || [], he.value = n.data ? .free || [], C.value = n.data ? .cpb_daily_remaining || []
                    } catch (s) {
                        console.error(s), F.notify({
                            type: "negative",
                            message: "Failed to fetch flow calendar data."
                        })
                    } finally {
                        Y.value = !1
                    }
                },
                ae = async s => {
                    h.value = new Date(s), await T()
                },
                Qe = async () => {
                    R.value = !0, await T()
                },
                le = k(!1),
                B = k({
                    page: 1,
                    rowsPerPage: 100,
                    rowsNumber: 0,
                    totalRows: 0,
                    from: 0,
                    to: 0
                }),
                E = k(localStorage.getItem("taskManager_sortBy") ? ? "delivery_date"),
                we = k([{
                    label: "Order Date",
                    value: "order_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "Delivery Date",
                    value: "delivery_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "Target PFH Date",
                    value: "target_pfh_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "Target PCD Date",
                    value: "target_pcd_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "VG Linked Date",
                    value: "vg_linked_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "RA Date",
                    value: "ra_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "Bulk Process Date",
                    value: "bulk_process_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "FOB Date",
                    value: "fob_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "Bulk Emb. Date",
                    value: "bulk_emb_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "R&D Date",
                    value: "rnd_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "SOP Date",
                    value: "sop_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }, {
                    label: "PPM Date",
                    value: "ppm_date",
                    description: "Sort By Ascending",
                    icon: "mdi-sort-clock-ascending-outline",
                    sortByDesc: !1
                }]),
                pt = k([{
                    label: "All",
                    value: "all"
                }, {
                    label: "Last Week",
                    value: "last_week"
                }, {
                    label: "This Week",
                    value: "this_week"
                }, {
                    label: "Next Week",
                    value: "next_week"
                }, {
                    label: "Last Month",
                    value: "last_month"
                }, {
                    label: "This Month",
                    value: "this_month"
                }, {
                    label: "Next Month",
                    value: "next_month"
                }, {
                    label: "Previous 90 Days",
                    value: "prev_90_days"
                }, {
                    label: "Next 90 Days",
                    value: "next_90_days"
                }, {
                    label: "Prev 30 Days + Next 90 Days",
                    value: "prev_30_days_next_90_days"
                }, {
                    label: "Custom",
                    value: "custom"
                }]),
                gt = s => {
                    String(s).toLowerCase() === "custom" ? q.value = !0 : Z()
                },
                De = k([]),
                xe = k([]),
                Oe = k(""),
                yt = (s, n) => {
                    n(() => {
                        if (!s) {
                            xe.value = De.value;
                            return
                        }
                        const e = s.toLowerCase();
                        xe.value = De.value.filter(x => (x.label || "").toLowerCase().includes(e))
                    })
                },
                Xe = [{
                    label: "Style Details",
                    class: "bg-purple-2",
                    columns: [{
                        label: "Image",
                        key: "image",
                        align: "center"
                    }, {
                        label: "Reff No.",
                        key: "ref_no",
                        align: "center"
                    }, {
                        label: "Order Date",
                        key: "order_date",
                        align: "center"
                    }, {
                        label: "Delivery Date",
                        key: "first_delivery_date",
                        align: "center"
                    }, {
                        label: "Target PFH Date",
                        key: "pfh_date",
                        align: "center"
                    }, {
                        label: "Target PCD Date",
                        key: "pcd_date",
                        align: "center"
                    }, {
                        label: "Buyer",
                        key: "buyer"
                    }, {
                        label: "Brand",
                        key: "brand"
                    }, {
                        label: "Style No.",
                        key: "style_no"
                    }, {
                        label: "Style Name",
                        key: "style_name"
                    }, {
                        label: "Order Qty",
                        key: "qty",
                        align: "right"
                    }, {
                        label: "Price",
                        key: "price",
                        align: "right",
                        access: "view merchant-dashboard-price"
                    }, {
                        label: "Currency",
                        key: "currency",
                        align: "center",
                        access: "view merchant-dashboard-price"
                    }]
                }, {
                    label: "Processes",
                    class: "bg-teal-2",
                    columns: [{
                        label: "VG Linked",
                        key: "vg_linked",
                        align: "center"
                    }, {
                        label: "RA",
                        key: "risk_analysis",
                        align: "center"
                    }, {
                        label: "Fabrics",
                        key: "fabrics",
                        align: "center"
                    }, {
                        label: "Trims",
                        key: "trims",
                        align: "center"
                    }, {
                        label: "Bulk Process",
                        key: "bulk_process",
                        align: "center"
                    }, {
                        label: "FOB",
                        key: "fob",
                        align: "center"
                    }, {
                        label: "Bulk Emb.",
                        key: "bulk_emb",
                        align: "center"
                    }, {
                        label: "R&D Graded Pattern",
                        key: "rnd_graded_pattern",
                        align: "center"
                    }, {
                        label: "PFH",
                        key: "pfh",
                        align: "center"
                    }, {
                        label: "R&D",
                        key: "rnd",
                        align: "center"
                    }, {
                        label: "SOP",
                        key: "sop",
                        align: "center"
                    }, {
                        label: "PPM",
                        key: "ppm",
                        align: "center"
                    }]
                }],
                bt = Xe.flatMap(s => s.columns.map(n => n.key)),
                Je = localStorage.getItem(_t),
                ie = k(Je ? JSON.parse(Je) : bt);
            it(ie, s => localStorage.setItem(_t, JSON.stringify(s)), {
                deep: !0
            });
            const Fe = ee(() => Xe.map(s => ({ ...s,
                    columns: s.columns.filter(n => {
                        if (!n.access) return !0;
                        const [e, x] = n.access.split(" ");
                        return $.can(e, x)
                    })
                }))),
                vt = ee(() => Fe.value.map(s => ({ ...s,
                    visibleColumns: s.columns.filter(n => ie.value.includes(n.key))
                })).filter(s => s.visibleColumns.length > 0)),
                G = ee(() => {
                    const s = [];
                    return Fe.value.forEach((n, e) => {
                        n.columns.filter(c => ie.value.includes(c.key)).forEach(c => {
                            s.push({ ...c,
                                class: n.class,
                                gIdx: e
                            })
                        })
                    }), s
                }),
                Te = k([]),
                Pe = k(null),
                kt = () => {
                    q.value = !1, S.value ? .from && S.value ? .to && (Pe.value = `${tt(S.value.from)} - ${tt(S.value.to)}`), Z()
                },
                et = ee(() => we.value.find(s => s.value === E.value).label),
                tt = s => z.formatDate(s, "D/MMM/YYYY"),
                ht = (s, n) => "",
                A = s => Array.isArray(s ? .sop_details) ? s ? .sop_details ? .[0] : s ? .sop_details,
                Dt = s => {
                    if (!s) return "-";
                    try {
                        const e = (typeof s == "string" ? JSON.parse(s) : s) ? .date;
                        if (!e) return "-";
                        const [x, c, N] = e.split("-");
                        return z.formatDate(new Date(`${N}-${c}-${x}`), "D-MMM-YYYY")
                    } catch {
                        return "-"
                    }
                },
                Be = k(!1),
                at = k(null),
                Ae = k(!1),
                lt = k(null),
                rt = k(null),
                xt = s => {
                    at.value = s, Be.value = !0
                },
                qt = s => {
                    const n = We(s);
                    n && (lt.value = n, rt.value = s ? .ourref ? `- ${s.ourref}` : "", Ae.value = !0)
                };
            k(!1);
            const Ie = k(null),
                $e = k(!1),
                W = k(null),
                de = k(null),
                Re = k(null),
                Ve = k(null),
                Ne = k(!1),
                K = k(null),
                ue = k(null),
                je = k(null),
                Le = k(null),
                Ee = k(!1),
                U = k(null),
                ce = () => {
                    W.value = null, Ie.value = null, de.value = null, Re.value = null
                },
                me = () => {
                    K.value = null, Ve.value = null, ue.value = null, je.value = null
                },
                fe = () => {
                    U.value = null, Le.value = null
                },
                qe = (s, n) => {
                    if (K.value === s.ourref && je.value === n) {
                        me();
                        return
                    }
                    ce(), fe(), K.value = s.ourref, ue.value = null, je.value = n, Ue(s.ourref, n)
                },
                Ct = s => {
                    ue.value === s.ourref ? me() : (ce(), fe(), K.value = s.ourref, ue.value = s.ourref, Ue(s.ourref))
                },
                Ce = (s, n) => {
                    if (W.value === s.ourref && Re.value === n) {
                        ce();
                        return
                    }
                    me(), fe(), W.value = s.ourref, de.value = null, Re.value = n, He(s.ourref, n)
                },
                zt = s => {
                    de.value === s.ourref ? ce() : (me(), fe(), W.value = s.ourref, de.value = s.ourref, He(s.ourref))
                },
                st = s => {
                    U.value === s.ourref ? fe() : (me(), ce(), U.value = s.ourref, ot(s.ourref))
                },
                Yt = async () => {
                    K.value ? await Ue(K.value) : W.value ? await He(W.value) : U.value && await ot(U.value)
                },
                Mt = async () => {
                    try {
                        const {
                            data: s
                        } = await J.get("/v3/dashboard/get-buyer");
                        De.value = Array.isArray(s ? .data.buyerOptions) ? s.data.buyerOptions : [], xe.value = De.value
                    } catch (s) {
                        console.error(s)
                    }
                },
                Ue = async (s, n = null) => {
                    try {
                        Ne.value = !0;
                        const e = "v3/dashboard/fabrics-status",
                            x = {
                                ourrefs: [s],
                                status: n
                            },
                            {
                                data: c
                            } = await J.get(e, {
                                params: x
                            }),
                            N = c.data ? ? [];
                        Ve.value = N.find(d => d.ourref === s) ? ? null
                    } catch (e) {
                        console.error(e)
                    } finally {
                        Ne.value = !1
                    }
                },
                He = async (s, n = null) => {
                    try {
                        $e.value = !0;
                        const e = "v3/dashboard/trims-status",
                            x = {
                                ourrefs: [s],
                                status: n
                            },
                            {
                                data: c
                            } = await J.get(e, {
                                params: x
                            }),
                            N = c.data ? ? [];
                        Ie.value = N.find(d => d.ourref === s) ? ? null
                    } catch (e) {
                        console.error(e)
                    } finally {
                        $e.value = !1
                    }
                },
                ot = async s => {
                    try {
                        Ee.value = !0;
                        const n = "v3/dashboard/fob-status",
                            e = {
                                ourrefs: [s]
                            },
                            {
                                data: x
                            } = await J.get(n, {
                                params: e
                            }),
                            c = x.data ? ? [];
                        Le.value = c.find(N => N.ourref === s) ? ? null
                    } catch (n) {
                        console.error(n)
                    } finally {
                        Ee.value = !1
                    }
                };
            it(E, s => {
                localStorage.setItem("taskManager_sortBy", s), B.value.page = 1, Z()
            });
            const Z = async () => {
                    try {
                        F.loading.show(), le.value = !0;
                        const s = "v3/dashboard/task-manager",
                            n = we.value.find(c => c.value === E.value),
                            e = {
                                filter: i.value,
                                date_filter: f.value,
                                date_range: S.value,
                                page: B.value.page,
                                rows_per_page: B.value.rowsPerPage,
                                sort_by: E.value,
                                sort_desc: n ? .sortByDesc ? ? !1,
                                buyer_filter: Oe.value
                            },
                            {
                                data: x
                            } = await J.get(s, {
                                params: e
                            });
                        Te.value = x.data.data, B.value.page = x.data.current_page, B.value.rowsPerPage = x.data.per_page, B.value.rowsNumber = x.data.total, B.value.from = x.data.from, B.value.to = x.data.to, await Yt(), F.loading.hide(), le.value = !1
                    } catch (s) {
                        console.error(s), F.notify({
                            type: "negative",
                            message: Jt(s),
                            position: "top"
                        })
                    }
                },
                nt = s => {
                    if (!s ? .fabric_details || !Array.isArray(s.fabric_details)) return [];
                    const n = s ? .bulk_process_fob ? ? [];
                    return s.fabric_details.filter(e => !n.some(x => x.fabric_description === e.OutputItemDescription && x.fabric_color === e.OutputColor))
                },
                _e = k({}),
                re = k({}),
                Ge = k({}),
                se = k([]);
            let X = null;
            const We = s => s ? .ourref ? _e.value[s.ourref] ? ? null : null,
                St = s => !s || typeof s != "object" ? null : s.style_thumbnail_url ? ? s.thumbnail_url ? ? s.thumbnail ? ? s.image_url ? ? s.image ? ? s.url ? ? null,
                Qt = s => s ? Array.isArray(s) ? s : typeof s == "object" && Array.isArray(s ? .data) ? s.data : typeof s == "object" && s ? .ourref ? [s] : [] : [],
                wt = s => {
                    const n = {};
                    return Qt(s).forEach(x => {
                        const c = x ? .ourref,
                            N = St(x);
                        c && N && (n[c] = N)
                    }), n
                },
                Ot = s => {
                    !s || re.value[s] || (re.value = { ...re.value,
                        [s]: !0
                    }, se.value.includes(s) || (se.value = [...se.value, s]), !X && (X = setTimeout(() => {
                        Ft()
                    }, pl)))
                },
                Ft = async () => {
                    if (!se.value.length) {
                        X = null;
                        return
                    }
                    const s = [...new Set(se.value)];
                    se.value = [], X = null;
                    try {
                        const {
                            data: n
                        } = await J.get(_l, {
                            params: {
                                ourrefs: s
                            }
                        }), e = wt(n ? .data ? ? n);
                        Object.keys(e).length && (_e.value = { ..._e.value,
                            ...e
                        })
                    } catch (n) {
                        console.error(n)
                    } finally {
                        const n = { ...re.value
                        };
                        s.forEach(e => {
                            n[e] = !1
                        }), re.value = n
                    }
                },
                Tt = s => {
                    s && Ot(s)
                },
                Pt = (s, n) => {
                    const e = s ? .ourref;
                    if (!(!e || !n || Ge.value[e])) {
                        if (Ge.value = { ...Ge.value,
                                [e]: !0
                            }, s ? .style_thumbnail_url) {
                            _e.value = { ..._e.value,
                                [e]: s.style_thumbnail_url
                            };
                            return
                        }
                        Tt(e)
                    }
                },
                Bt = s => {
                    const n = `/design/${s}/details`;
                    window.open(n, "_blank")
                };
            return Vt(async () => {
                await Promise.all([Mt(), Z()])
            }), Nt(() => {
                X && (clearTimeout(X), X = null)
            }), (s, n) => (a(), u("div", null, [p("div", Ca, [l(_, {
                class: "status-info-chip",
                color: "indigo-1",
                "text-color": "indigo-8",
                clickable: "",
                square: "",
                onClick: n[0] || (n[0] = e => Q.value = !0)
            }, {
                default: t(() => [l(D, {
                    color: "indigo",
                    "text-color": "white",
                    icon: "mdi-information",
                    size: "md",
                    class: "status-info-avatar"
                }), n[14] || (n[14] = r(" Status Info ", -1)), l(V, {
                    name: "mdi-chevron-right",
                    size: "14px",
                    class: "q-ml-xs"
                })]),
                _: 1,
                __: [14]
            }), l(Ye, {
                class: "gt-xs"
            }), p("div", za, [p("div", null, [l(j, {
                color: "deep-purple-1",
                "text-color": "deep-purple-8",
                icon: "mdi-calendar-month",
                label: "Bulk Flow",
                unelevated: "",
                "no-caps": "",
                onClick: Qe
            })]), p("div", null, [l(j, {
                "text-color": "blue-8",
                color: "blue-1",
                label: "Sort By " + et.value,
                icon: "sort",
                unelevated: "",
                "no-caps": ""
            }, {
                default: t(() => [l(ut, null, {
                    default: t(() => [l(Ze, {
                        style: {
                            "min-width": "180px"
                        }
                    }, {
                        default: t(() => [(a(!0), u(g, null, I(we.value, e => (a(), m(Me, {
                            key: e.value,
                            dense: "",
                            clickable: "",
                            onClick: x => E.value = e.value,
                            "active-class": "bg-blue-2 text-blue-8",
                            active: E.value === e.value
                        }, {
                            default: t(() => [l(H, null, {
                                default: t(() => [l(ve, null, {
                                    default: t(() => [r(o(e.label), 1)]),
                                    _: 2
                                }, 1024)]),
                                _: 2
                            }, 1024), l(H, {
                                avatar: "",
                                side: ""
                            }, {
                                default: t(() => [l(V, {
                                    name: e.icon
                                }, null, 8, ["name"])]),
                                _: 2
                            }, 1024)]),
                            _: 2
                        }, 1032, ["onClick", "active"]))), 128)), E.value !== "delivery_date" ? (a(), m(Ke, {
                            key: 0
                        })) : b("", !0), E.value !== "delivery_date" ? ge((a(), m(Me, {
                            key: 1,
                            dense: "",
                            clickable: "",
                            onClick: n[1] || (n[1] = e => E.value = "delivery_date")
                        }, {
                            default: t(() => [l(H, null, {
                                default: t(() => [l(ve, {
                                    class: "text-grey"
                                }, {
                                    default: t(() => n[15] || (n[15] = [r("Reset to Default", -1)])),
                                    _: 1,
                                    __: [15]
                                })]),
                                _: 1
                            }), l(H, {
                                avatar: "",
                                side: ""
                            }, {
                                default: t(() => [l(V, {
                                    name: "restart_alt",
                                    class: "text-grey"
                                })]),
                                _: 1
                            })]),
                            _: 1
                        })), [
                            [be]
                        ]) : b("", !0)]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            }, 8, ["label"])]), p("div", null, [l(j, {
                "text-color": "purple-8",
                color: "purple-1",
                label: "Columns",
                icon: "mdi-filter-outline",
                unelevated: "",
                "no-caps": ""
            }, {
                default: t(() => [l(ut, null, {
                    default: t(() => [l(Ze, {
                        style: {
                            "min-width": "180px"
                        }
                    }, {
                        default: t(() => [(a(!0), u(g, null, I(Fe.value, e => (a(), u(g, {
                            key: e.label
                        }, [l(ve, {
                            header: "",
                            class: "text-weight-bold text-caption q-pt-sm q-pb-xs"
                        }, {
                            default: t(() => [r(o(e.label), 1)]),
                            _: 2
                        }, 1024), (a(!0), u(g, null, I(e.columns, x => (a(), m(Me, {
                            key: x.key,
                            dense: "",
                            tag: "label",
                            clickable: ""
                        }, {
                            default: t(() => [l(H, {
                                side: ""
                            }, {
                                default: t(() => [l(jt, {
                                    modelValue: ie.value,
                                    "onUpdate:modelValue": n[2] || (n[2] = c => ie.value = c),
                                    val: x.key,
                                    dense: ""
                                }, null, 8, ["modelValue", "val"])]),
                                _: 2
                            }, 1024), l(H, null, {
                                default: t(() => [r(o(x.label), 1)]),
                                _: 2
                            }, 1024)]),
                            _: 2
                        }, 1024))), 128))], 64))), 128))]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            })]), p("div", Ya, [l(ct, {
                modelValue: Oe.value,
                "onUpdate:modelValue": [n[3] || (n[3] = e => Oe.value = e), Z],
                options: xe.value,
                "option-label": "label",
                "option-value": "value",
                "emit-value": "",
                "map-options": "",
                label: "Buyer",
                clearable: "",
                outlined: "",
                dense: "",
                "use-input": "",
                onFilter: yt,
                style: {
                    "min-width": "160px"
                }
            }, null, 8, ["modelValue", "options"])]), p("div", Ma, [l(Lt, {
                modelValue: i.value,
                "onUpdate:modelValue": [n[4] || (n[4] = e => i.value = e), Z],
                label: "Search",
                debounce: "500",
                outlined: "",
                dense: "",
                clearable: "",
                style: {
                    "min-width": "180px"
                }
            }, {
                append: t(() => [l(V, {
                    name: "search"
                })]),
                _: 1
            }, 8, ["modelValue"])]), p("div", Sa, [l(ct, {
                modelValue: f.value,
                "onUpdate:modelValue": [n[5] || (n[5] = e => f.value = e), gt],
                options: pt.value,
                "option-label": "label",
                "option-value": "value",
                "emit-value": "",
                "map-options": "",
                "display-value": f.value === "custom" && Pe.value ? Pe.value : void 0,
                label: et.value,
                debounce: "500",
                outlined: "",
                dense: "",
                style: {
                    "min-width": "160px"
                }
            }, {
                append: t(() => [l(V, {
                    name: "mdi-calendar-range"
                })]),
                _: 1
            }, 8, ["modelValue", "options", "display-value", "label"])])])]), p("div", Qa, [p("div", wa, [p("table", Oa, [p("thead", null, [p("tr", null, [(a(!0), u(g, null, I(vt.value, (e, x) => (a(), u("th", {
                key: "g-" + x,
                colspan: e.visibleColumns.length,
                class: oe(["text-center text-black", e.class]),
                style: {
                    "z-index": "20"
                }
            }, o(e.label), 11, Fa))), 128))]), p("tr", null, [(a(!0), u(g, null, I(G.value, (e, x) => (a(), u("th", {
                key: "c-" + x,
                class: oe(["sub-header", e.class, e.align ? "text-" + e.align : "text-left", {
                    "sticky-col": e.isSticky,
                    "sticky-col-edge": e.isStickyEdge
                }, "text-black"]),
                style: dt({
                    minWidth: e.width,
                    width: e.width,
                    zIndex: e.isSticky ? 25 : 15,
                    ...e.isSticky ? {
                        left: e.left
                    } : {}
                })
            }, [e.key == "fabrics" ? (a(), u(g, {
                key: 0
            }, [r(o(e.label), 1)], 64)) : e.key == "trims" ? (a(), u(g, {
                key: 1
            }, [r(o(e.label), 1)], 64)) : e.key == "fob" ? (a(), u(g, {
                key: 2
            }, [r(o(e.label), 1)], 64)) : (a(), u(g, {
                key: 3
            }, [r(o(e.label), 1)], 64))], 6))), 128))])]), p("tbody", null, [(a(!0), u(g, null, I(Te.value, (e, x) => (a(), u(g, {
                key: "r-" + x
            }, [p("tr", null, [(a(!0), u(g, null, I(G.value, (c, N) => (a(), u("td", {
                key: "v-" + x + "-" + N,
                class: oe([c.align ? "text-" + c.align : "text-left", {
                    "sticky-col": c.isSticky,
                    "sticky-col-edge": c.isStickyEdge
                }, ht(c.key), c.gIdx == 0 ? M.value ? "bg-purple-9" : "bg-purple-1" : M.value ? "bg-grey-10" : ""]),
                style: dt({
                    minWidth: c.width,
                    width: c.width,
                    ...c.isSticky ? {
                        left: c.left,
                        zIndex: 10
                    } : {}
                })
            }, [c.key == "image" ? (a(), m(Gt, {
                key: 0,
                once: "",
                onVisibility: d => Pt(e, d)
            }, {
                default: t(() => [p("div", Ta, [We(e) ? (a(), m(mt, {
                    key: 0,
                    src: We(e),
                    width: "30px",
                    height: "30px",
                    fit: "cover",
                    loading: "lazy",
                    "spinner-color": "grey-7",
                    class: "style-thumb-image cursor-pointer",
                    onClick: d => qt(e)
                }, {
                    error: t(() => [p("div", Pa, [l(V, {
                        name: "mdi-image-off-outline",
                        size: "12px",
                        color: "grey-6"
                    })])]),
                    default: t(() => [l(O, null, {
                        default: t(() => n[16] || (n[16] = [r("Click to view", -1)])),
                        _: 1,
                        __: [16]
                    })]),
                    _: 2
                }, 1032, ["src", "onClick"])) : (a(), u("div", Ba, [re.value[e ? .ourref] ? (a(), m(ke, {
                    key: 0,
                    size: "10px",
                    color: "grey-7"
                })) : (a(), m(V, {
                    key: 1,
                    name: "mdi-image-off-outline",
                    size: "12px",
                    color: "grey-6"
                }))]))])]),
                _: 2
            }, 1032, ["onVisibility"])) : c.key == "ref_no" ? (a(), u("div", Aa, [e ? .design_head ? .id ? (a(), m(_, {
                key: 0,
                clickable: "",
                onClick: d => xt(e),
                target: "_blank",
                dense: "",
                square: "",
                size: "sm",
                class: "q-pa-sm",
                color: "purple-8",
                "text-color": "white"
            }, {
                default: t(() => [r(o(e.ourref), 1)]),
                _: 2
            }, 1032, ["onClick"])) : b("", !0), e ? .design_head ? .id ? (a(), m(V, {
                key: 1,
                clickable: "",
                onClick: d => Bt(e ? .design_head ? .id),
                name: "mdi-open-in-new",
                class: "cursor-pointer",
                color: "grey-8"
            }, {
                default: t(() => [l(O, null, {
                    default: t(() => n[17] || (n[17] = [r("Open Design Details", -1)])),
                    _: 1,
                    __: [17]
                })]),
                _: 2
            }, 1032, ["onClick"])) : (a(), u("div", Ia, o(e.ourref ? ? "-"), 1))])) : c.key == "order_date" ? (a(), u(g, {
                key: 2
            }, [r(o(e ? .order_date ? y(z).formatDate(e.order_date, "DD-MMM-YYYY") : "-"), 1)], 64)) : c.key == "first_delivery_date" ? (a(), u(g, {
                key: 3
            }, [r(o(e ? .order_date ? y(z).formatDate(e.first_delivery_date, "DD-MMM-YYYY") : "-"), 1)], 64)) : c.key == "pfh_date" ? (a(), u(g, {
                key: 4
            }, [r(o(e ? .design_head && e ? .design_head ? .target_pfh_date ? y(z).formatDate(e ? .design_head ? .target_pfh_date, "DD-MMM-YYYY") : "-"), 1)], 64)) : c.key == "pcd_date" ? (a(), u(g, {
                key: 5
            }, [r(o(e ? .design_head && e ? .design_head ? .target_pcd_date ? y(z).formatDate(e ? .design_head ? .target_pcd_date, "DD-MMM-YYYY") : "-"), 1)], 64)) : c.key == "buyer" ? (a(), u(g, {
                key: 6
            }, [r(o(e ? .buyer ? ? "-"), 1)], 64)) : c.key == "brand" ? (a(), u(g, {
                key: 7
            }, [r(o(e ? .brand ? ? "-"), 1)], 64)) : c.key == "style_no" ? (a(), u(g, {
                key: 8
            }, [r(o(e ? .styleno ? ? "-"), 1)], 64)) : c.key == "style_name" ? (a(), u(g, {
                key: 9
            }, [r(o(e ? .stylename ? ? "-"), 1)], 64)) : c.key == "qty" ? (a(), u("div", $a, o(e ? .qty ? ? "-"), 1)) : c.key == "price" ? (a(), u(g, {
                key: 11
            }, [r(o(e ? .price != null && e ? .price !== "" ? Number(e.price).toFixed(2) : "-"), 1)], 64)) : c.key == "currency" ? (a(), u(g, {
                key: 12
            }, [r(o(e ? .currency != null && e ? .currency !== "" ? e.currency : "-"), 1)], 64)) : c.key == "vg_linked" ? (a(), u(g, {
                key: 13
            }, [e ? .design_head ? .vg_reffno ? (a(), m(D, {
                key: 0,
                color: "green-8",
                "text-color": "white",
                icon: "mdi-check-decagram",
                size: "sm",
                rounded: ""
            })) : (a(), m(D, {
                key: 1,
                color: "orange-8",
                "text-color": "white",
                icon: "mdi-timer-sand",
                size: "sm",
                rounded: ""
            })), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", Ra, [e ? .design_head ? .vg_linked_at ? (a(), m(_, {
                    key: 0,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Completed Date: " + o(y(z).formatDate(e ? .design_head ? .vg_linked_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0)])]),
                _: 2
            }, 1024)], 64)) : c.key == "risk_analysis" ? (a(), u(g, {
                key: 14
            }, [e ? .risk_analysis ? .approved ? (a(), m(D, {
                key: 0,
                color: "green-8",
                "text-color": "white",
                icon: "mdi-check-decagram",
                size: "sm",
                rounded: ""
            })) : y(w)(e, c.key).delayDays < 0 ? (a(), m(D, {
                key: 1,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : y(w)(e, c.key).delayDays >= 0 ? (a(), m(D, {
                key: 2,
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : b("", !0), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", Va, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Target Date: " + o(y(z).formatDate(y(w)(e, c.key).targetDate, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024), e ? .risk_analysis ? .approved ? (a(), m(_, {
                    key: 0,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Completed Date: " + o(y(z).formatDate(e ? .risk_analysis ? .approve_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0)])]),
                _: 2
            }, 1024)], 64)) : c.key == "fabrics" ? (a(), u("div", Na, [l(D, {
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: "",
                style: {
                    cursor: "pointer"
                },
                onClick: d => qe(e, "pending")
            }, {
                default: t(() => [r(o(e ? .fabrics_status ? .non_approved_items + e ? .fabrics_status ? .approved_items), 1)]),
                _: 2
            }, 1032, ["onClick"]), l(D, {
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: "",
                style: {
                    cursor: "pointer"
                },
                onClick: d => qe(e, "pr_completed")
            }, {
                default: t(() => [r(o(e ? .fabrics_status ? .pr_completed_items), 1)]),
                _: 2
            }, 1032, ["onClick"]), l(D, {
                color: "green-8",
                "text-color": "white",
                size: "sm",
                rounded: "",
                style: {
                    cursor: "pointer"
                },
                onClick: d => qe(e, "po_completed")
            }, {
                default: t(() => [r(o(e ? .fabrics_status ? .po_completed_items), 1)]),
                _: 2
            }, 1032, ["onClick"]), l(D, {
                color: "indigo-8",
                "text-color": "white",
                size: "sm",
                rounded: "",
                style: {
                    cursor: "pointer"
                },
                onClick: d => qe(e, "from_stock")
            }, {
                default: t(() => [r(o(e ? .fabrics_status ? .total_items_from_stocks), 1)]),
                _: 2
            }, 1032, ["onClick"]), l(j, {
                icon: ue.value === e.ourref ? "mdi-chevron-up" : "mdi-chevron-down",
                size: "xs",
                dense: "",
                flat: "",
                onClick: d => Ct(e)
            }, null, 8, ["icon", "onClick"]), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", ja, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "red-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Pending: " + o(e ? .fabrics_status ? .non_approved_items + e ? .fabrics_status ? .approved_items), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "orange-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" PR Completed: " + o(e ? .fabrics_status ? .pr_completed_items), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" PO Completed: " + o(e ? .fabrics_status ? .po_completed_items), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "indigo-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" From Stock: " + o(e ? .fabrics_status ? .total_items_from_stocks), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Total: " + o(e ? .fabrics_status ? .total_items), 1)]),
                    _: 2
                }, 1024)])]),
                _: 2
            }, 1024)])) : c.key == "trims" ? (a(), u("div", La, [l(D, {
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: "",
                style: {
                    cursor: "pointer"
                },
                onClick: d => Ce(e, "pending")
            }, {
                default: t(() => [r(o(e ? .trims_status ? .non_approved_items + e ? .trims_status ? .approved_items), 1)]),
                _: 2
            }, 1032, ["onClick"]), l(D, {
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: "",
                style: {
                    cursor: "pointer"
                },
                onClick: d => Ce(e, "pr_completed")
            }, {
                default: t(() => [r(o(e ? .trims_status ? .pr_completed_items), 1)]),
                _: 2
            }, 1032, ["onClick"]), l(D, {
                color: "green-8",
                "text-color": "white",
                size: "sm",
                rounded: "",
                style: {
                    cursor: "pointer"
                },
                onClick: d => Ce(e, "po_completed")
            }, {
                default: t(() => [r(o(e ? .trims_status ? .po_completed_items), 1)]),
                _: 2
            }, 1032, ["onClick"]), l(D, {
                color: "indigo-8",
                "text-color": "white",
                size: "sm",
                rounded: "",
                style: {
                    cursor: "pointer"
                },
                onClick: d => Ce(e, "from_stock")
            }, {
                default: t(() => [r(o(e ? .trims_status ? .total_items_from_stocks), 1)]),
                _: 2
            }, 1032, ["onClick"]), l(j, {
                icon: de.value === e.ourref ? "mdi-chevron-up" : "mdi-chevron-down",
                size: "xs",
                dense: "",
                flat: "",
                onClick: d => zt(e)
            }, null, 8, ["icon", "onClick"]), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", Ea, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "red-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Pending: " + o(e ? .trims_status ? .non_approved_items + e ? .trims_status ? .approved_items), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "orange-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" PR Completed: " + o(e ? .trims_status ? .pr_completed_items), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" PO Completed: " + o(e ? .trims_status ? .po_completed_items), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "indigo-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" From Stock: " + o(e ? .trims_status ? .total_items_from_stocks), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Total: " + o(e ? .trims_status ? .total_items), 1)]),
                    _: 2
                }, 1024)])]),
                _: 2
            }, 1024)])) : c.key == "bulk_emb" ? (a(), u(g, {
                key: 17
            }, [(e.has_fab_emb || e.has_process_emb) && e ? .bulk_embroidery.length && e ? .bulk_embroidery ? .some(d => d.stage == "final") ? (a(), m(D, {
                key: 0,
                color: "green-8",
                "text-color": "white",
                icon: "mdi-check-decagram",
                size: "sm",
                rounded: ""
            })) : (e.has_fab_emb || e.has_process_emb) && !e ? .bulk_embroidery.length ? (a(), m(D, {
                key: 1,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : (e.has_fab_emb || e.has_process_emb) && e ? .bulk_embroidery.length && e ? .bulk_embroidery ? .some(d => d.stage !== "final") ? (a(), m(D, {
                key: 2,
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                icon: "mdi-timer-sand",
                rounded: ""
            })) : b("", !0), e.has_fab_emb || e.has_process_emb ? (a(), m(O, {
                key: 3,
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", Ua, [e ? .design_head ? .vg_linked_at ? (a(), m(_, {
                    key: 0,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Target Date: " + o(y(z).formatDate(y(w)(e, c.key).targetDate, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0), e ? .bulk_embroidery ? .some(d => d.stage == "initial") ? (a(), m(_, {
                    key: 1,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "orange-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Initial Request Date: " + o(y(z).formatDate(e ? .bulk_embroidery ? .some(d => d.stage == "initial").requested_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0), e ? .bulk_embroidery ? .some(d => d.stage == "final") ? (a(), m(_, {
                    key: 2,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Final Request Date: " + o(y(z).formatDate(e ? .bulk_embroidery ? .some(d => d.stage == "final").requested_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0)])]),
                _: 2
            }, 1024)) : (a(), u(g, {
                key: 4
            }, [r(" - ")], 64))], 64)) : c.key == "bulk_process" ? (a(), u(g, {
                key: 18
            }, [p("div", Ha, [e.fab_has_process && e ? .fab_count > (e ? .bulk_process_fob ? .length ? ? 0) ? (a(), m(D, {
                key: 0,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(Math.max(0, e ? .fab_count - (e ? .bulk_process_fob ? .filter(d => d.order_status !== "rejected").length ? ? 0))) + " ", 1), e ? .fab_has_process ? (a(), m(O, {
                    key: 0,
                    class: "bg-purple-1"
                }, {
                    default: t(() => [(a(!0), u(g, null, I(nt(e) ? ? [], (d, pe) => (a(), u("div", {
                        key: "fab-" + pe,
                        class: "column items-start"
                    }, [p("div", Ga, [l(_, {
                        dense: "",
                        square: "",
                        size: "sm",
                        color: "indigo-8",
                        "text-color": "white"
                    }, {
                        default: t(() => [r(" Color: " + o(d.OutputColor), 1)]),
                        _: 2
                    }, 1024), l(_, {
                        dense: "",
                        square: "",
                        size: "sm",
                        color: "teal-8",
                        "text-color": "white"
                    }, {
                        default: t(() => [r(" Fabric Info: " + o(d.OutputItemDescription), 1)]),
                        _: 2
                    }, 1024), l(_, {
                        dense: "",
                        square: "",
                        size: "sm",
                        color: "red-8",
                        "text-color": "white"
                    }, {
                        default: t(() => n[18] || (n[18] = [r(" Request Pending ", -1)])),
                        _: 1,
                        __: [18]
                    })])]))), 128))]),
                    _: 2
                }, 1024)) : b("", !0)]),
                _: 2
            }, 1024)) : b("", !0), e.fab_has_process && e ? .bulk_process_fob ? .filter(d => d.order_status == "pending").length ? (a(), m(D, {
                key: 1,
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(e ? .bulk_process_fob ? .filter(d => d.order_status == "pending").length), 1)]),
                _: 2
            }, 1024)) : b("", !0), e.fab_has_process && e ? .bulk_process_fob ? .filter(d => d.order_status !== "pending" || d.order_status !== "accepted" || d.order_status !== "rejected").length ? (a(), m(D, {
                key: 2,
                color: "green-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(e ? .bulk_process_fob ? .filter(d => d.order_status !== "pending" || d.order_status !== "accepted" || d.order_status !== "rejected").length), 1)]),
                _: 2
            }, 1024)) : b("", !0), e ? .fab_has_process ? b("", !0) : (a(), u(g, {
                key: 3
            }, [r(" - ")], 64)), e ? .fab_has_process ? (a(), m(j, {
                key: 4,
                icon: U.value === e.ourref ? "mdi-chevron-up" : "mdi-chevron-down",
                size: "xs",
                dense: "",
                flat: "",
                onClick: d => st(e)
            }, null, 8, ["icon", "onClick"])) : b("", !0)]), e ? .fab_has_process ? (a(), m(O, {
                key: 0,
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", Wa, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "red-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Request Pending: " + o(Math.max(0, e ? .fab_count - (e ? .bulk_process_fob ? .filter(d => d.order_status !== "rejected").length ? ? 0))), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "orange-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Accepted Pending: " + o(e ? .bulk_process_fob ? .filter(d => d.order_status == "pending").length), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Accepted: " + o(e ? .bulk_process_fob ? .filter(d => d.order_status !== "pending" || d.order_status !== "accepted" || d.order_status !== "rejected").length), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Fabric Count: " + o(e ? .fab_count), 1)]),
                    _: 2
                }, 1024)])]),
                _: 2
            }, 1024)) : b("", !0)], 64)) : c.key == "fob" ? (a(), u(g, {
                key: 19
            }, [p("div", Ka, [e ? .bulk_process_fob ? .some(d => d.order_status == "pending" || d.order_status == "accepted") ? (a(), m(D, {
                key: 0,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(e ? .bulk_process_fob ? .filter(d => d.order_status == "pending" || d.order_status == "accepted").length), 1)]),
                _: 2
            }, 1024)) : b("", !0), e ? .bulk_process_fob ? .some(d => d.order_status == "approval-pending") ? (a(), m(D, {
                key: 1,
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(e ? .bulk_process_fob ? .filter(d => d.order_status == "approval-pending").length), 1)]),
                _: 2
            }, 1024)) : b("", !0), e ? .bulk_process_fob ? .some(d => d.order_status == "go-ahead-received") ? (a(), m(D, {
                key: 2,
                color: "green-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(e ? .bulk_process_fob ? .filter(d => d.order_status == "go-ahead-received").length), 1)]),
                _: 2
            }, 1024)) : b("", !0), e ? .bulk_process_fob ? .length ? b("", !0) : (a(), u(g, {
                key: 3
            }, [r(" - ")], 64)), e ? .bulk_process_fob ? .length ? (a(), m(j, {
                key: 4,
                icon: U.value === e.ourref ? "mdi-chevron-up" : "mdi-chevron-down",
                size: "xs",
                dense: "",
                flat: "",
                onClick: d => st(e)
            }, null, 8, ["icon", "onClick"])) : b("", !0)]), e ? .bulk_process_fob.length ? (a(), m(O, {
                key: 0,
                class: "bg-purple-1"
            }, {
                default: t(() => [(a(!0), u(g, null, I(e ? .bulk_process_fob, (d, pe) => (a(), u("div", {
                    key: "fob-" + pe,
                    class: "column items-start"
                }, [p("div", Za, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" FOB Date: " + o(Dt(d.fob)), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "indigo-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Color: " + o(d.fabric_color), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "teal-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Fabric Info: " + o(d.fabric_description), 1)]),
                    _: 2
                }, 1024), l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: d.order_status == "pending" || d.order_status == "accepted" ? "blue-8" : d.order_status == "approval-pending" ? "orange-8" : d.order_status == "go-ahead-received" ? "green-8" : d.order_status == "go-ahead-rejected" ? "red-8" : "indigo-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(o(d.order_status ? .replace(/-/g, " ").replace(/\b\w/g, At => At.toUpperCase())), 1)]),
                    _: 2
                }, 1032, ["color"])])]))), 128))]),
                _: 2
            }, 1024)) : b("", !0)], 64)) : c.key == "rnd_graded_pattern" ? (a(), u("div", Xa, [e ? .rnd_graded_pattern ? .length ? (a(), u(g, {
                key: 1
            }, [e ? .rnd_graded_pattern ? .[0] ? .status === "completed" ? (a(), m(D, {
                key: 0,
                color: "green-8",
                "text-color": "white",
                icon: "mdi-check-decagram",
                size: "sm",
                rounded: ""
            })) : e ? .rnd_graded_pattern ? .[0] ? .status === "pending" ? (a(), m(D, {
                key: 1,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(e ? .rnd_graded_pattern ? .length), 1)]),
                _: 2
            }, 1024)) : e ? .rnd_graded_pattern ? .[0] ? .status === "accepted" ? (a(), m(D, {
                key: 2,
                color: "orange-8",
                "text-color": "white",
                icon: "mdi-timer-sand",
                size: "sm",
                rounded: ""
            })) : e ? .rnd_graded_pattern ? .[0] ? .status === "rejected" ? (a(), m(D, {
                key: 3,
                color: "grey-7",
                "text-color": "white",
                icon: "mdi-close-circle",
                size: "sm",
                rounded: ""
            })) : b("", !0), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [(a(!0), u(g, null, I(e ? .rnd_graded_pattern, (d, pe) => (a(), u("div", {
                    key: "rnd-gp-" + pe,
                    class: "column items-start q-mb-xs"
                }, [p("div", Ja, [d.created_at ? (a(), m(_, {
                    key: 0,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "blue-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Requested: " + o(y(z).formatDate(d.created_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0), d.accepted_at ? (a(), m(_, {
                    key: 1,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "orange-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Accepted: " + o(y(z).formatDate(d.accepted_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0), d.completed_at ? (a(), m(_, {
                    key: 2,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Completed: " + o(y(z).formatDate(d.completed_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0), d.rejected_at ? (a(), m(_, {
                    key: 3,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "grey-7",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Rejected: " + o(y(z).formatDate(d.rejected_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0)])]))), 128))]),
                _: 2
            }, 1024)], 64)) : (a(), u(g, {
                key: 0
            }, [r(" - ")], 64))])) : c.key == "pfh" ? (a(), u(g, {
                key: 21
            }, [e ? .production_handover ? .status == "accepted" || e ? .production_handover ? .accepted_at ? (a(), m(D, {
                key: 0,
                color: "green-8",
                "text-color": "white",
                icon: "mdi-check-decagram",
                size: "sm",
                rounded: ""
            })) : !e ? .production_handover && y(w)(e, c.key).delayDays < 0 ? (a(), m(D, {
                key: 1,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : !e ? .production_handover && y(w)(e, c.key).delayDays >= 0 ? (a(), m(D, {
                key: 2,
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : e ? .production_handover ? .status == "pending" || e ? .production_handover ? .requested_at ? (a(), m(D, {
                key: 3,
                color: "blue-8",
                "text-color": "white",
                icon: "mdi-timer-outline",
                size: "sm",
                rounded: ""
            })) : b("", !0), !e ? .design_head ? .target_pfh_date && !e ? .design_head ? .target_pcd_date ? (a(), u(g, {
                key: 4
            }, [r(" - ")], 64)) : b("", !0), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", el, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Target Date: " + o(y(z).formatDate(y(w)(e, c.key).targetDate, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024), e ? .production_handover ? .requested_at ? (a(), m(_, {
                    key: 0,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "cyan-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Requested Date: " + o(y(z).formatDate(e ? .production_handover ? .requested_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0), e ? .production_handover ? .accepted_at ? (a(), m(_, {
                    key: 1,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Accepted Date: " + o(y(z).formatDate(e ? .production_handover ? .accepted_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0)])]),
                _: 2
            }, 1024)], 64)) : c.key == "rnd" ? (a(), u(g, {
                key: 22
            }, [A(e) ? .dispatched_at ? (a(), m(D, {
                key: 0,
                color: "green-8",
                "text-color": "white",
                icon: "mdi-check-decagram",
                size: "sm",
                rounded: ""
            })) : A(e) ? .status == "pending" && y(w)(e, c.key).delayDays < 0 ? (a(), m(D, {
                key: 1,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : A(e) ? .status == "pending" && y(w)(e, c.key).delayDays >= 0 ? (a(), m(D, {
                key: 2,
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : (a(), u(g, {
                key: 3
            }, [r(" - ")], 64)), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", tl, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Target Date: " + o(y(z).formatDate(y(w)(e, c.key).targetDate, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024), A(e) ? .dispatched_at ? (a(), m(_, {
                    key: 0,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "blue-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Dispatched Date: " + o(y(z).formatDate(A(e) ? .dispatched_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0), A(e) ? .approved_at ? (a(), m(_, {
                    key: 1,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Approved Date: " + o(y(z).formatDate(A(e) ? .approved_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0)])]),
                _: 2
            }, 1024)], 64)) : c.key == "sop" ? (a(), u(g, {
                key: 23
            }, [A(e) ? .approved_at ? (a(), m(D, {
                key: 0,
                color: "green-8",
                "text-color": "white",
                icon: "mdi-check-decagram",
                size: "sm",
                rounded: ""
            })) : A(e) ? .status == "dispatched" && y(w)(e, c.key).delayDays < 0 ? (a(), m(D, {
                key: 1,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : A(e) ? .status == "dispatched" && y(w)(e, c.key).delayDays >= 0 ? (a(), m(D, {
                key: 2,
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : (a(), u(g, {
                key: 3
            }, [r(" - ")], 64)), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", al, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Target Date: " + o(y(z).formatDate(y(w)(e, c.key).targetDate, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024), A(e) ? .dispatched_at ? (a(), m(_, {
                    key: 0,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "blue-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Dispatched Date: " + o(y(z).formatDate(A(e) ? .dispatched_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0), A(e) ? .approved_at ? (a(), m(_, {
                    key: 1,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Approved Date: " + o(y(z).formatDate(A(e) ? .approved_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0)])]),
                _: 2
            }, 1024)], 64)) : c.key == "ppm" ? (a(), u(g, {
                key: 24
            }, [e ? .order_ppm ? .is_completed ? (a(), m(D, {
                key: 0,
                color: "green-8",
                "text-color": "white",
                icon: "mdi-check-decagram",
                size: "sm",
                rounded: ""
            })) : (!e ? .order_ppm || !e ? .order_ppm ? .is_completed) && y(w)(e, c.key).delayDays < 0 ? (a(), m(D, {
                key: 1,
                color: "red-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : (!e ? .order_ppm || !e ? .order_ppm ? .is_completed) && y(w)(e, c.key).delayDays >= 0 ? (a(), m(D, {
                key: 2,
                color: "orange-8",
                "text-color": "white",
                size: "sm",
                rounded: ""
            }, {
                default: t(() => [r(o(y(w)(e, c.key).formattedDelayDays), 1)]),
                _: 2
            }, 1024)) : b("", !0), !A(e) || !A(e).approved_at ? (a(), u(g, {
                key: 3
            }, [r(" - ")], 64)) : b("", !0), l(O, {
                class: "bg-purple-1"
            }, {
                default: t(() => [p("div", ll, [l(_, {
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "purple-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Target Date: " + o(y(z).formatDate(y(w)(e, c.key).targetDate, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024), e ? .order_ppm ? .is_completed ? (a(), m(_, {
                    key: 0,
                    dense: "",
                    square: "",
                    size: "sm",
                    color: "green-8",
                    "text-color": "white"
                }, {
                    default: t(() => [r(" Completed Date: " + o(y(z).formatDate(e ? .order_ppm ? .updated_at, "D-MMM-YYYY")), 1)]),
                    _: 2
                }, 1024)) : b("", !0)])]),
                _: 2
            }, 1024)], 64)) : (a(), u(g, {
                key: 25
            }, [r(" - ")], 64))], 6))), 128))]), K.value === e.ourref ? (a(), u("tr", {
                key: "expand-fabrics-" + x
            }, [p("td", {
                colspan: G.value.length,
                class: oe(M.value ? "bg-grey-10" : "bg-grey-2")
            }, [l(ca, {
                "fabrics-data": Ve.value,
                "fabrics-loading": Ne.value
            }, null, 8, ["fabrics-data", "fabrics-loading"])], 10, rl)])) : b("", !0), W.value === e.ourref ? (a(), u("tr", {
                key: "expand-trims-" + x
            }, [p("td", {
                colspan: G.value.length,
                class: oe(M.value ? "bg-grey-10" : "bg-grey-2")
            }, [l(oa, {
                "trims-data": Ie.value,
                "trims-loading": $e.value
            }, null, 8, ["trims-data", "trims-loading"])], 10, sl)])) : b("", !0), U.value === e.ourref ? (a(), u("tr", {
                key: "expand-fob-" + x
            }, [p("td", {
                colspan: G.value.length,
                class: oe(M.value ? "bg-grey-10" : "bg-grey-2")
            }, [l(ha, {
                "fob-data": Le.value,
                "fob-loading": Ee.value,
                "vg-order-master": e,
                "pending-fabrics": nt(e)
            }, null, 8, ["fob-data", "fob-loading", "vg-order-master", "pending-fabrics"])], 10, ol)])) : b("", !0)], 64))), 128)), !le.value && !Te.value ? .length ? (a(), u("tr", nl, [p("td", {
                colspan: G.value.length,
                class: "text-center text-grey-6"
            }, " No records found ", 8, il)])) : b("", !0), le.value ? (a(), u("tr", dl, [p("td", {
                colspan: G.value.length,
                class: "text-center text-grey-6"
            }, [p("div", cl, [l(ke, {
                color: "primary",
                size: "20px"
            })])], 8, ul)])) : b("", !0)])])]), p("div", ml, [p("div", null, "Records per page: " + o(B.value.rowsPerPage), 1), l(Wt, {
                modelValue: B.value.page,
                "onUpdate:modelValue": [n[6] || (n[6] = e => B.value.page = e), Z],
                max: Math.ceil(B.value.rowsNumber / B.value.rowsPerPage),
                "max-pages": 6,
                "direction-links": "",
                "boundary-links": "",
                "boundary-numbers": "",
                size: "12px",
                color: "grey",
                "active-color": "purple-2",
                "active-text-color": "purple-8"
            }, null, 8, ["modelValue", "max"]), p("div", null, o(B.value.from) + " - " + o(B.value.to) + " of " + o(B.value.rowsNumber), 1)])]), l(qa, {
                modelValue: Q.value,
                "onUpdate:modelValue": n[7] || (n[7] = e => Q.value = e)
            }, null, 8, ["modelValue"]), l(ye, {
                modelValue: R.value,
                "onUpdate:modelValue": n[8] || (n[8] = e => R.value = e),
                maximized: ""
            }, {
                default: t(() => [l(ze, null, {
                    default: t(() => [l(Kt, {
                        class: "bg-primary text-white"
                    }, {
                        default: t(() => [n[19] || (n[19] = p("div", {
                            class: "text-subtitle2"
                        }, "Flow Calendar", -1)), l(Ye), ge(l(j, {
                            dense: "",
                            flat: "",
                            round: "",
                            icon: "close"
                        }, null, 512), [
                            [be]
                        ])]),
                        _: 1,
                        __: [19]
                    }), l(te, {
                        class: "q-pa-md"
                    }, {
                        default: t(() => [l(y(P), {
                            "flow-data": L.value,
                            "free-machines": he.value,
                            loading: Y.value,
                            "cpb-daily-remaining": C.value,
                            onMonthChanged: ae
                        }, null, 8, ["flow-data", "free-machines", "loading", "cpb-daily-remaining"])]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            }, 8, ["modelValue"]), l(ye, {
                modelValue: Be.value,
                "onUpdate:modelValue": n[9] || (n[9] = e => Be.value = e),
                persistent: "",
                "full-width": ""
            }, {
                default: t(() => [l(ea, {
                    vg_reffno: at.value.ourref
                }, null, 8, ["vg_reffno"])]),
                _: 1
            }, 8, ["modelValue"]), l(ye, {
                modelValue: Ae.value,
                "onUpdate:modelValue": n[10] || (n[10] = e => Ae.value = e)
            }, {
                default: t(() => [l(ze, {
                    style: {
                        width: "90vw",
                        "max-width": "900px"
                    }
                }, {
                    default: t(() => [l(te, {
                        class: "row items-center q-pb-none"
                    }, {
                        default: t(() => [p("div", fl, "Style Image " + o(rt.value), 1), l(Ye), ge(l(j, {
                            icon: "close",
                            flat: "",
                            round: "",
                            dense: ""
                        }, null, 512), [
                            [be]
                        ])]),
                        _: 1
                    }), l(te, {
                        class: "q-pt-sm"
                    }, {
                        default: t(() => [l(mt, {
                            src: lt.value,
                            fit: "contain",
                            style: {
                                "max-height": "80vh"
                            }
                        }, null, 8, ["src"])]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            }, 8, ["modelValue"]), l(ye, {
                modelValue: q.value,
                "onUpdate:modelValue": n[13] || (n[13] = e => q.value = e),
                persistent: ""
            }, {
                default: t(() => [l(ze, {
                    style: {
                        "min-width": "350px"
                    }
                }, {
                    default: t(() => [l(te, {
                        class: "text-h6"
                    }, {
                        default: t(() => n[20] || (n[20] = [r("Select Date Range", -1)])),
                        _: 1,
                        __: [20]
                    }), l(te, {
                        class: "row justify-center"
                    }, {
                        default: t(() => [l(Zt, {
                            modelValue: S.value,
                            "onUpdate:modelValue": n[11] || (n[11] = e => S.value = e),
                            range: "",
                            bordered: "",
                            flat: ""
                        }, null, 8, ["modelValue"])]),
                        _: 1
                    }), l(Ut, {
                        align: "right"
                    }, {
                        default: t(() => [ge(l(j, {
                            flat: "",
                            label: "Cancel",
                            color: "grey-8",
                            onClick: n[12] || (n[12] = () => f.value = null)
                        }, null, 512), [
                            [be]
                        ]), l(j, {
                            flat: "",
                            label: "Apply",
                            color: "primary",
                            onClick: kt
                        })]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            }, 8, ["modelValue"])]))
        }
    },
    ar = ta(gl, [
        ["__scopeId", "data-v-72266b34"]
    ]);
export {
    ar as
    default
};