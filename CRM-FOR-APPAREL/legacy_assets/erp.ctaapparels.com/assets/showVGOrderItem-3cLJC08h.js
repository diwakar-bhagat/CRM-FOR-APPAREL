const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/OrderSizeWiseDetails-tyxiWDsG.js", "assets/QMarkupTable-DCh2V2Pr.js", "assets/index-BA5ou0W-.js", "assets/index-Bh2r4P0U.css", "assets/date-cIYipMv-.js", "assets/OrderProductionReport-DkDNFlOq.js"]))) => i.map(i => d[i]);
import {
    r as d,
    w as fe,
    ae as g,
    i as ue,
    l as f,
    m as u,
    p as r,
    q as o,
    K as W,
    s as a,
    v as pe,
    x as E,
    aa as me,
    M as p,
    y as ce,
    Q as ge,
    O as n,
    I as D,
    ad as z,
    N as m,
    G as ye,
    af as L
} from "./index-BA5ou0W-.js";
import {
    Q as k
} from "./QSpace-BjbyB_LR.js";
import {
    Q as ve,
    a as w
} from "./QTabs-CBFyGzjl.js";
import {
    Q as B
} from "./QSelect-Cu1YN_YO.js";
import {
    Q as be
} from "./QMarkupTable-DCh2V2Pr.js";
import {
    Q as _
} from "./QSpinnerDots-qUvozSP6.js";
import {
    Q as P
} from "./QInnerLoading-BjWCqppw.js";
import {
    Q as he,
    a as x
} from "./QTabPanels-CnBThG97.js";
import {
    Q
} from "./QTooltip-OHH9lc35.js";
import {
    Q as Re
} from "./QBadge-Cw-oJzeN.js";
import {
    Q as M,
    b as we
} from "./QTable-BtAJ-z4N.js";
import {
    Q as K
} from "./QTd-rJwHHrSa.js";
import {
    C as xe
} from "./ClosePopup-CgV1_utH.js";
import {
    d as y
} from "./date-cIYipMv-.js";
import {
    d as j
} from "./useHelpers-CLyV6CYd.js";
import {
    _ as Qe
} from "./_plugin-vue_export-helper-DlAUqK2U.js";
import "./QResizeObserver-BPtCLTks.js";
import "./rtl-DFPa-2ov.js";
import "./QChip-CN77J6Er.js";
import "./QItem-CmACu0VL.js";
import "./QItemLabel-DKOIiaRD.js";
import "./QMenu-DDWBo2BJ.js";
import "./position-engine-C3cfRS00.js";
import "./selection-DtWR3mjl.js";
import "./use-panel-BXiFpZEA.js";
import "./touch-BjYP5sR0.js";
import "./use-render-cache-DLxPkVnQ.js";
import "./QList-CZpbZIWw.js";
import "./use-fullscreen-i0p8qSCM.js";
import "./FileSaver.min-BZowWFmT.js";
import "./_commonjsHelpers-D6-XlEtG.js";
const De = {
        class: "row"
    },
    _e = {
        class: "row q-gutter-sm items-center"
    },
    Pe = {
        class: "text-right"
    },
    Ce = {
        class: "text-right"
    },
    Oe = {
        class: "text-right"
    },
    Fe = {
        class: "text-right"
    },
    qe = {
        class: "text-right"
    },
    Te = {
        class: "text-right"
    },
    Me = {
        class: "text-right"
    },
    Ye = {
        class: "text-right"
    },
    Ne = {
        class: "text-right"
    },
    Ve = {
        class: "text-right"
    },
    Ee = {
        class: "text-right"
    },
    ke = {
        class: "text-right"
    },
    Be = {
        class: "text-right"
    },
    Ie = {
        class: "text-right"
    },
    Se = {
        class: "absolute-full flex flex-center"
    },
    Ge = {
        __name: "showVGOrderItem",
        props: {
            vg_reffno: {
                type: String,
                required: !0
            }
        },
        setup(I) {
            const H = z(() => L(() =>
                    import ("./OrderSizeWiseDetails-tyxiWDsG.js"), __vite__mapDeps([0, 1, 2, 3, 4]))),
                J = z(() => L(() =>
                    import ("./OrderProductionReport-DkDNFlOq.js"), __vite__mapDeps([5, 1, 2, 3]))),
                b = I,
                i = d(!1),
                c = d("details"),
                v = d(""),
                s = d(null),
                C = d([]),
                O = d([]),
                F = d([]),
                q = d([]),
                Y = d([]),
                N = d("A"),
                h = d("A"),
                V = d([{
                    label: "Accessories",
                    value: "A"
                }, {
                    label: "Fabric",
                    value: "F"
                }]),
                S = new Set;
            fe(c, async e => {
                S.has(e) || (e === "details" && !s.value ? await G() : e === "bom" && C.value.length <= 0 ? await A() : e === "purchase-requisition" && O.value.length <= 0 ? await $() : e === "purchase-order" && F.value.length <= 0 ? await U() : e === "grn" && q.value.length <= 0 ? await re() : e === "production-report" && Y.value.length <= 0 && await ne(), S.add(e))
            });
            const X = e => {
                    const t = Number(e);
                    return isFinite(t) ? `${(Math.max(0,Math.min(1,t))*100).toFixed(0)}%` : "-"
                },
                T = e => e.length <= 20 ? e : e.substring(0, 20) + "...",
                Z = [{
                    name: "ItemCategory",
                    label: "Category",
                    field: "ItemCategory",
                    align: "left"
                }, {
                    name: "Description",
                    label: "Description",
                    field: "Description",
                    align: "left"
                }, {
                    name: "FabColor",
                    label: "Color",
                    field: "FabColor",
                    align: "left"
                }, {
                    name: "Itemsize",
                    label: "Width",
                    field: "Itemsize",
                    align: "left"
                }, {
                    name: "PoType",
                    label: "PO Type",
                    field: "PoType",
                    align: "left"
                }, {
                    name: "POOrderQty",
                    label: "PO Order Qty",
                    field: "POOrderQty",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "ReqdQty",
                    label: "Reqd Qty",
                    field: "ReqdQty",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "ReqnQty",
                    label: "Reqn Qty",
                    field: "ReqnQty",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "ReceivedQty",
                    label: "Received Qty",
                    field: "ReceivedQty",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "BalanceToOrder",
                    label: "Balance Qty",
                    field: "BalanceToOrder",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "BalancePerc",
                    label: "Balance (%)",
                    field: "BalancePerc",
                    align: "left"
                }, {
                    name: "Rate",
                    label: "Rate",
                    field: "Rate",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "ExpConsumption",
                    label: "Consumption",
                    field: "ExpConsumption",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "Unit",
                    label: "Unit",
                    field: "Unit",
                    align: "left"
                }],
                ee = [{
                    name: "action",
                    label: "Action",
                    field: "action",
                    align: "left"
                }, {
                    name: "ReqnYr",
                    label: "Reqn Year",
                    field: "ReqnYr",
                    align: "left"
                }, {
                    name: "ReqnDate",
                    label: "Reqn Date",
                    field: "ReqnDate",
                    format: e => y.formatDate(e, "DD-MMM-YYYY"),
                    align: "left"
                }, {
                    name: "RequiredOn",
                    label: "Reqd Date",
                    field: "RequiredOn",
                    format: e => y.formatDate(e, "DD-MMM-YYYY"),
                    align: "left"
                }, {
                    name: "ReqnNo",
                    label: "Reqn No",
                    field: "ReqnNo",
                    align: "left"
                }, {
                    name: "Category",
                    label: "Category",
                    field: "Category",
                    align: "left"
                }, {
                    name: "BOMCategory",
                    label: "BOM Category",
                    field: "BOMCategory",
                    align: "left"
                }, {
                    name: "description",
                    label: "Description",
                    field: "description",
                    align: "left"
                }, {
                    name: "Color",
                    label: "Color",
                    field: "Color",
                    align: "left"
                }, {
                    name: "Width",
                    label: "Width",
                    field: "Width",
                    align: "left"
                }, {
                    name: "ReqdQty",
                    label: "Reqd Qty",
                    field: "ReqdQty",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "ReqnQty",
                    label: "Reqn Qty",
                    field: "ReqnQty",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "Consumption",
                    label: "Consumption",
                    field: "Consumption",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "Extra",
                    label: "Extra (%)",
                    field: "Extra",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "Rate",
                    label: "Rate",
                    field: "Rate",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "PRCurr",
                    label: "Currency",
                    field: "PRCurr",
                    align: "center"
                }, {
                    name: "PRExchRate",
                    label: "Exch Rate",
                    field: "PRExchRate",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "Unit",
                    label: "Unit",
                    field: "Unit",
                    align: "left"
                }],
                te = [{
                    name: "actions",
                    label: "Action",
                    field: "actions",
                    align: "left"
                }, {
                    name: "pono",
                    label: "PO No.",
                    field: "pono",
                    align: "left"
                }, {
                    name: "Eono",
                    label: "EO No.",
                    field: "Eono",
                    align: "left"
                }, {
                    name: "podate",
                    label: "PO Date",
                    field: "podate",
                    format: e => y.formatDate(e, "DD-MMM-YYYY"),
                    align: "left"
                }, {
                    name: "DelivDate",
                    label: "PO Deliv Date",
                    field: "DelivDate",
                    format: e => y.formatDate(e, "DD-MMM-YYYY"),
                    align: "left"
                }, {
                    name: "poType",
                    label: "PO Type",
                    field: "poType",
                    align: "left"
                }, {
                    name: "ItemCategory",
                    label: "Category",
                    field: "ItemCategory",
                    align: "left"
                }, {
                    name: "Description",
                    label: "Description",
                    field: "Description",
                    align: "left"
                }, {
                    name: "Color",
                    label: "Color",
                    field: "Color",
                    align: "left"
                }, {
                    name: "Width",
                    label: "Width",
                    field: "Width",
                    align: "left"
                }, {
                    name: "supplier",
                    label: "Supplier",
                    field: "supplier",
                    align: "left"
                }, {
                    name: "EstQty",
                    label: "Reqd Qty",
                    field: "EstQty",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }, {
                    name: "Qty",
                    label: "PO Qty",
                    field: "Qty",
                    format: e => parseFloat(e).toFixed(2),
                    align: "left"
                }],
                le = [{
                    name: "GRNNo",
                    label: "GRN No.",
                    field: "GRNNo",
                    align: "left"
                }, {
                    name: "GRNDate",
                    label: "GRN Date",
                    field: "GRNDate",
                    format: e => y.formatDate(e, "DD-MMM-YYYY"),
                    align: "left"
                }, {
                    name: "GRNDocType",
                    label: "GRN Doc Type",
                    field: "GRNDocType",
                    align: "left"
                }, {
                    name: "pono",
                    label: "PO No.",
                    field: "pono",
                    align: "left"
                }, {
                    name: "poType",
                    label: "PO Type",
                    field: "poType",
                    align: "left"
                }, {
                    name: "ItemCategory",
                    label: "Category",
                    field: "ItemCategory",
                    align: "left"
                }, {
                    name: "Description",
                    label: "Description",
                    field: "Description",
                    align: "left"
                }, {
                    name: "Color",
                    label: "Color",
                    field: "Color",
                    align: "left"
                }, {
                    name: "Width",
                    label: "Width",
                    field: "Width",
                    align: "left"
                }, {
                    name: "supplier",
                    label: "Supplier",
                    field: "supplier",
                    align: "left"
                }, {
                    name: "PoQty",
                    label: "PO Qty",
                    field: "PoQty",
                    align: "left"
                }, {
                    name: "realchQty",
                    label: "Chk Qty",
                    field: "realchQty",
                    align: "left"
                }, {
                    name: "PendingQty",
                    label: "Pending Qty",
                    field: "PendingQty",
                    align: "left"
                }, {
                    name: "ReturnedQty",
                    label: "Returned Qty",
                    field: "ReturnedQty",
                    align: "left"
                }, {
                    name: "NetReceivedQty",
                    label: "Net Recd Qty",
                    field: "NetReceivedQty",
                    align: "left"
                }, {
                    name: "TotalReceivedQty",
                    label: "Total Recd Qty",
                    field: "TotalReceivedQty",
                    align: "left"
                }],
                G = async () => {
                    try {
                        i.value = !0;
                        const {
                            data: e
                        } = await g.get(`/v3/vg/order-details?ourref=${b.vg_reffno}`);
                        s.value = e.data
                    } catch (e) {
                        console.error("Error fetching order details:", e)
                    } finally {
                        i.value = !1
                    }
                },
                A = async () => {
                    try {
                        i.value = !0;
                        const {
                            data: e
                        } = await g.get(`/v3/vg/bom-list?ourref=${b.vg_reffno}&type=${N.value}`);
                        C.value = e.data
                    } catch (e) {
                        console.error("Error fetching BOMs:", e)
                    } finally {
                        i.value = !1
                    }
                },
                $ = async () => {
                    try {
                        i.value = !0;
                        const {
                            data: e
                        } = await g.get(`/v3/vg/pr-list?ourref=${b.vg_reffno}&type=${h.value}`);
                        O.value = e.data
                    } catch (e) {
                        console.error("Error fetching Purchase Requisitions:", e)
                    } finally {
                        i.value = !1
                    }
                },
                U = async () => {
                    try {
                        i.value = !0;
                        const {
                            data: e
                        } = await g.get(`/v3/vg/po-list?ourrefs=${b.vg_reffno}&type=${h.value}`);
                        F.value = e.data
                    } catch (e) {
                        console.error("Error fetching Purchase Orders:", e)
                    } finally {
                        i.value = !1
                    }
                },
                ae = async (e, t = !0) => {
                    const l = e;
                    console.log(e, "PARENT");
                    const R = await g.post("/v3/purchase-requisition/download", {
                        PoType: l.ItemType,
                        reqnNo: l.ReqnNo,
                        ReqnYr: l.ReqnYr,
                        Ourref: l.Ourref
                    }, {
                        responseType: "arraybuffer",
                        headers: {
                            Accept: "application/pdf"
                        }
                    });
                    j(R, t)
                },
                oe = async (e, t = !0) => {
                    const l = e;
                    console.log(l, "parent");
                    const R = l.poType === "Fabric",
                        se = R ? "/v3/purchase-requisition/fabric-download-po" : "/v3/purchase-requisition/download-po",
                        de = await g.post(se, {
                            PoType: R ? "F" : "A",
                            PoNo: l.pono,
                            Yr: l.Yr
                        }, {
                            responseType: "arraybuffer",
                            headers: {
                                Accept: "application/pdf"
                            }
                        });
                    j(de, t)
                },
                re = async () => {
                    try {
                        i.value = !0;
                        const {
                            data: e
                        } = await g.get(`/v3/vg/grn-list?ourref=${b.vg_reffno}`);
                        q.value = e.data
                    } catch (e) {
                        console.error("Error fetching GRNs:", e)
                    } finally {
                        i.value = !1
                    }
                },
                ne = async () => {
                    try {
                        i.value = !0;
                        const {
                            data: e
                        } = await g.get(`/v3/vg/order-production-report?ourref=${b.vg_reffno}`);
                        Y.value = e.data
                    } catch (e) {
                        console.error("Error fetching Production Report:", e)
                    } finally {
                        i.value = !1
                    }
                },
                ie = () => {
                    console.log("Filter value:", v.value)
                };
            return ue(() => {
                G()
            }), (e, t) => (u(), f(ye, {
                style: {
                    "border-radius": "12px"
                }
            }, {
                default: r(() => [o(W, {
                    class: "row items-center"
                }, {
                    default: r(() => [o(k), t[8] || (t[8] = a("div", {
                        class: "text-h6 text-center q-pa-none q-ma-none"
                    }, "VG Order Details", -1)), o(k), pe(o(E, {
                        color: "grey",
                        icon: "mdi-close",
                        "no-caps": "",
                        flat: "",
                        dense: "",
                        rounded: ""
                    }, null, 512), [
                        [xe]
                    ])]),
                    _: 1,
                    __: [8]
                }), o(W, null, {
                    default: r(() => [o(ve, {
                        modelValue: c.value,
                        "onUpdate:modelValue": t[6] || (t[6] = l => c.value = l),
                        dense: "",
                        align: "left",
                        flat: "",
                        "active-color": "primary",
                        "indicator-color": "primary",
                        breakpoint: 0,
                        "no-caps": ""
                    }, {
                        default: r(() => [a("div", null, [a("div", De, [o(w, {
                            name: "details",
                            label: "Details"
                        }), o(w, {
                            name: "bom",
                            label: "BOMs"
                        }), o(w, {
                            name: "purchase-requisition",
                            label: "Purchase Requisitions"
                        }), o(w, {
                            name: "purchase-order",
                            label: "Purchase Orders"
                        }), o(w, {
                            name: "grn",
                            label: "GRNs"
                        }), o(w, {
                            name: "production-report",
                            label: "Production Report"
                        })]), o(me)]), o(k), a("div", _e, [c.value == "bom" ? (u(), f(B, {
                            key: 0,
                            label: "BOM Type",
                            outlined: "",
                            dense: "",
                            options: V.value,
                            modelValue: N.value,
                            "onUpdate:modelValue": [t[0] || (t[0] = l => N.value = l), A],
                            "emit-value": "",
                            "map-options": "",
                            style: {
                                width: "150px"
                            }
                        }, null, 8, ["options", "modelValue"])) : p("", !0), c.value == "purchase-requisition" ? (u(), f(B, {
                            key: 1,
                            label: "Item Type",
                            outlined: "",
                            dense: "",
                            options: V.value,
                            modelValue: h.value,
                            "onUpdate:modelValue": [t[1] || (t[1] = l => h.value = l), t[2] || (t[2] = l => $())],
                            "emit-value": "",
                            "map-options": "",
                            style: {
                                width: "150px"
                            }
                        }, null, 8, ["options", "modelValue"])) : p("", !0), c.value == "purchase-order" ? (u(), f(B, {
                            key: 2,
                            label: "Item Type",
                            outlined: "",
                            dense: "",
                            options: V.value,
                            modelValue: h.value,
                            "onUpdate:modelValue": [t[3] || (t[3] = l => h.value = l), t[4] || (t[4] = l => U())],
                            "emit-value": "",
                            "map-options": "",
                            style: {
                                width: "150px"
                            }
                        }, null, 8, ["options", "modelValue"])) : p("", !0), c.value !== "details" ? (u(), f(ce, {
                            key: 3,
                            modelValue: v.value,
                            "onUpdate:modelValue": [t[5] || (t[5] = l => v.value = l), ie],
                            outlined: "",
                            dense: "",
                            style: {
                                width: "250px"
                            },
                            debounce: "500",
                            placeholder: "Search / Filter"
                        }, {
                            append: r(() => [o(ge, {
                                name: "search"
                            })]),
                            _: 1
                        }, 8, ["modelValue"])) : p("", !0)])]),
                        _: 1
                    }, 8, ["modelValue"]), o(he, {
                        modelValue: c.value,
                        "onUpdate:modelValue": t[7] || (t[7] = l => c.value = l),
                        animated: ""
                    }, {
                        default: r(() => [o(x, {
                            name: "details"
                        }, {
                            default: r(() => [s.value ? (u(), f(be, {
                                key: 0,
                                class: "q-mb-md",
                                dense: "",
                                bordered: "",
                                flat: "",
                                separator: "cell"
                            }, {
                                default: r(() => [a("tbody", null, [a("tr", null, [t[9] || (t[9] = a("td", {
                                    class: "text-left"
                                }, "Ourref:", -1)), a("td", Pe, n(s.value.ourref || "-"), 1), t[10] || (t[10] = a("td", {
                                    class: "text-left"
                                }, "Order Status:", -1)), a("td", Ce, n(s.value.order_status || "-"), 1)]), a("tr", null, [t[11] || (t[11] = a("td", {
                                    class: "text-left"
                                }, "Order Date:", -1)), a("td", Oe, n(D(y).formatDate(s.value.order_date, "DD-MMM-YYYY") || "-"), 1), t[12] || (t[12] = a("td", {
                                    class: "text-left"
                                }, "Order Qty:", -1)), a("td", Fe, n(s.value.qty || "-"), 1)]), a("tr", null, [t[13] || (t[13] = a("td", {
                                    class: "text-left"
                                }, "Buyer:", -1)), a("td", qe, n(s.value.buyer || "-"), 1), t[14] || (t[14] = a("td", {
                                    class: "text-left"
                                }, "Brand:", -1)), a("td", Te, n(s.value.brand || "-"), 1)]), a("tr", null, [t[15] || (t[15] = a("td", {
                                    class: "text-left"
                                }, "Style No.:", -1)), a("td", Me, n(s.value.styleno || "-"), 1), t[16] || (t[16] = a("td", {
                                    class: "text-left"
                                }, "Style Name:", -1)), a("td", Ye, n(s.value.stylename || "-"), 1)]), a("tr", null, [t[17] || (t[17] = a("td", {
                                    class: "text-left"
                                }, "Merchandiser:", -1)), a("td", Ne, n(s.value.merchandiser || "-"), 1), t[18] || (t[18] = a("td", {
                                    class: "text-left"
                                }, "Mode:", -1)), a("td", Ve, n(s.value.mode || "-"), 1)]), a("tr", null, [t[19] || (t[19] = a("td", {
                                    class: "text-left"
                                }, "First Delivery Date:", -1)), a("td", Ee, n(D(y).formatDate(s.value.first_delivery_date, "DD-MMM-YYYY") || "-"), 1), t[20] || (t[20] = a("td", {
                                    class: "text-left"
                                }, "PCD Date:", -1)), a("td", ke, n(D(y).formatDate(s.value ? .order_pcd.find(l => l.isCompleted) ? .pcd_date || "-", "DD-MMM-YYYY")), 1)]), a("tr", null, [t[21] || (t[21] = a("td", {
                                    class: "text-left"
                                }, "Total Lace (m):", -1)), a("td", Be, n(parseFloat(s.value.total_lace_average).toFixed(2) || "-"), 1), t[22] || (t[22] = a("td", {
                                    class: "text-left"
                                }, "Total SAM:", -1)), a("td", Ie, n(parseFloat(s.value.total_sam).toFixed(2) || "-"), 1)])])]),
                                _: 1
                            })) : p("", !0), i.value ? p("", !0) : (u(), f(D(H), {
                                key: 1,
                                vg_reffno: I.vg_reffno
                            }, null, 8, ["vg_reffno"])), o(P, {
                                showing: i.value
                            }, {
                                default: r(() => [o(_, {
                                    size: "32px"
                                })]),
                                _: 1
                            }, 8, ["showing"])]),
                            _: 1
                        }), o(x, {
                            name: "bom"
                        }, {
                            default: r(() => [C.value.length ? (u(), f(M, {
                                key: 0,
                                columns: Z,
                                rows: C.value,
                                dense: "",
                                flat: "",
                                bordered: "",
                                filter: v.value,
                                separator: "cell",
                                "wrap-cells": "",
                                "row-key": "OurRef",
                                pagination: {
                                    rowsPerPage: 10
                                }
                            }, {
                                "body-cell-Description": r(l => [a("td", null, [m(n(T(l.row.Description)) + " ", 1), o(Q, null, {
                                    default: r(() => [m(n(l.row.Description), 1)]),
                                    _: 2
                                }, 1024)])]),
                                "body-cell-BalancePerc": r(l => [a("td", null, [o(we, {
                                    size: "25px",
                                    value: l.row.BalancePerc,
                                    color: "primary"
                                }, {
                                    default: r(() => [a("div", Se, [o(Re, {
                                        color: "white",
                                        "text-color": "primary",
                                        label: X(l.row.BalancePerc)
                                    }, null, 8, ["label"])])]),
                                    _: 2
                                }, 1032, ["value"])])]),
                                _: 1
                            }, 8, ["rows", "filter"])) : p("", !0), o(P, {
                                showing: i.value
                            }, {
                                default: r(() => [o(_, {
                                    size: "32px"
                                })]),
                                _: 1
                            }, 8, ["showing"])]),
                            _: 1
                        }), o(x, {
                            name: "purchase-requisition"
                        }, {
                            default: r(() => [O.value.length ? (u(), f(M, {
                                key: 0,
                                columns: ee,
                                rows: O.value,
                                dense: "",
                                flat: "",
                                bordered: "",
                                filter: v.value,
                                separator: "cell",
                                "row-key": "Ourref",
                                pagination: {
                                    rowsPerPage: 10
                                }
                            }, {
                                "body-cell-description": r(l => [a("td", null, [m(n(T(l.row.description)) + " ", 1), o(Q, null, {
                                    default: r(() => [m(n(l.row.description), 1)]),
                                    _: 2
                                }, 1024)])]),
                                "body-cell-action": r(l => [o(K, {
                                    props: l
                                }, {
                                    default: r(() => [o(E, {
                                        dense: "",
                                        flat: "",
                                        round: "",
                                        color: "primary",
                                        icon: "mdi-monitor-eye",
                                        onClick: R => ae(l.row, !1)
                                    }, {
                                        default: r(() => [o(Q, null, {
                                            default: r(() => t[23] || (t[23] = [m("View Report", -1)])),
                                            _: 1,
                                            __: [23]
                                        })]),
                                        _: 2
                                    }, 1032, ["onClick"])]),
                                    _: 2
                                }, 1032, ["props"])]),
                                _: 1
                            }, 8, ["rows", "filter"])) : p("", !0), o(P, {
                                showing: i.value
                            }, {
                                default: r(() => [o(_, {
                                    size: "32px"
                                })]),
                                _: 1
                            }, 8, ["showing"])]),
                            _: 1
                        }), o(x, {
                            name: "purchase-order"
                        }, {
                            default: r(() => [F.value.length ? (u(), f(M, {
                                key: 0,
                                columns: te,
                                rows: F.value,
                                dense: "",
                                flat: "",
                                bordered: "",
                                filter: v.value,
                                separator: "cell",
                                "row-key": "pono",
                                pagination: {
                                    rowsPerPage: 10
                                }
                            }, {
                                "body-cell-Description": r(l => [a("td", null, [m(n(T(l.row.Description)) + " ", 1), o(Q, null, {
                                    default: r(() => [m(n(l.row.Description), 1)]),
                                    _: 2
                                }, 1024)])]),
                                "body-cell-actions": r(l => [o(K, {
                                    props: l
                                }, {
                                    default: r(() => [o(E, {
                                        dense: "",
                                        flat: "",
                                        round: "",
                                        color: "primary",
                                        icon: "mdi-monitor-eye",
                                        onClick: R => oe(l.row, !1)
                                    }, {
                                        default: r(() => [o(Q, null, {
                                            default: r(() => t[24] || (t[24] = [m("View Report", -1)])),
                                            _: 1,
                                            __: [24]
                                        })]),
                                        _: 2
                                    }, 1032, ["onClick"])]),
                                    _: 2
                                }, 1032, ["props"])]),
                                _: 1
                            }, 8, ["rows", "filter"])) : p("", !0), o(P, {
                                showing: i.value
                            }, {
                                default: r(() => [o(_, {
                                    size: "32px"
                                })]),
                                _: 1
                            }, 8, ["showing"])]),
                            _: 1
                        }), o(x, {
                            name: "grn"
                        }, {
                            default: r(() => [q.value.length ? (u(), f(M, {
                                key: 0,
                                columns: le,
                                rows: q.value,
                                dense: "",
                                flat: "",
                                bordered: "",
                                filter: v.value,
                                separator: "cell",
                                "row-key": "pono",
                                pagination: {
                                    rowsPerPage: 10
                                }
                            }, {
                                "body-cell-Description": r(l => [a("td", null, [m(n(T(l.row.Description)) + " ", 1), o(Q, null, {
                                    default: r(() => [m(n(l.row.Description), 1)]),
                                    _: 2
                                }, 1024)])]),
                                _: 1
                            }, 8, ["rows", "filter"])) : p("", !0), o(P, {
                                showing: i.value
                            }, {
                                default: r(() => [o(_, {
                                    size: "32px"
                                })]),
                                _: 1
                            }, 8, ["showing"])]),
                            _: 1
                        }), o(x, {
                            name: "production-report"
                        }, {
                            default: r(() => [o(D(J), {
                                data: Y.value
                            }, null, 8, ["data"])]),
                            _: 1
                        })]),
                        _: 1
                    }, 8, ["modelValue"])]),
                    _: 1
                })]),
                _: 1
            }))
        }
    },
    ht = Qe(Ge, [
        ["__scopeId", "data-v-9689213f"]
    ]);
export {
    ht as
    default
};