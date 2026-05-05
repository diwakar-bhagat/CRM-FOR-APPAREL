const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/SetAvatar-vmK6MXek.js", "assets/QBadge-Cw-oJzeN.js", "assets/index-BA5ou0W-.js", "assets/index-Bh2r4P0U.css", "assets/QSpace-BjbyB_LR.js", "assets/ClosePopup-CgV1_utH.js", "assets/_plugin-vue_export-helper-DlAUqK2U.js", "assets/SetAvatar-CrQAZSPo.css", "assets/ReleaseNoteDialog-B0uBf9qw.js", "assets/QChip-CN77J6Er.js", "assets/QItem-CmACu0VL.js", "assets/QItemLabel-DKOIiaRD.js", "assets/QList-CZpbZIWw.js", "assets/QMenu-DDWBo2BJ.js", "assets/position-engine-C3cfRS00.js", "assets/selection-DtWR3mjl.js", "assets/QTooltip-OHH9lc35.js", "assets/QBtnDropdown-CGOQV-YL.js", "assets/QBtnGroup-sCbxJvpJ.js", "assets/QToolbar-p6Rg3VL0.js", "assets/QResizeObserver-BPtCLTks.js", "assets/useNotificationStore-_PualIHj.js", "assets/TouchPan-_lIrL9iK.js", "assets/touch-BjYP5sR0.js", "assets/QLayout-CKXsftTr.js", "assets/QExpansionItem-Ctk7Uvbe.js", "assets/QSlideTransition-_6g7eGuE.js", "assets/common-C9PBqzii.js", "assets/config-t_sZ-1aV.js", "assets/extend-DTfK50KV.js", "assets/index-B7SCgQeN.js"]))) => i.map(i => d[i]);
import {
    b as oe,
    R as $e,
    S as ze,
    V as g,
    h as O,
    Q as U,
    W as Ue,
    X as je,
    Y as Ge,
    Z as He,
    _ as Je,
    j as We,
    $ as Ce,
    a0 as te,
    a1 as Ke,
    r as _,
    w as N,
    k as Ye,
    a2 as Xe,
    a3 as Se,
    l as A,
    m as b,
    p as n,
    q as i,
    D as V,
    a4 as K,
    a5 as Y,
    a6 as Ae,
    M as z,
    N as x,
    O as C,
    J as Te,
    a7 as Ze,
    a8 as et,
    B as tt,
    u as it,
    F as at,
    E as ot,
    i as nt,
    s as v,
    x as L,
    I as q,
    a9 as lt,
    v as de,
    L as st,
    aa as ie,
    ab as rt,
    y as ct,
    ac as dt,
    G as ut,
    K as ue,
    ad as me,
    ae as pe,
    af as fe
} from "./index-BA5ou0W-.js";
import {
    Q as ae
} from "./QBadge-Cw-oJzeN.js";
import {
    Q as E
} from "./QItemLabel-DKOIiaRD.js";
import {
    Q as S,
    a as $
} from "./QItem-CmACu0VL.js";
import {
    Q as J
} from "./QList-CZpbZIWw.js";
import {
    Q as mt
} from "./QMenu-DDWBo2BJ.js";
import {
    Q as pt
} from "./QTooltip-OHH9lc35.js";
import {
    Q as ve
} from "./QSpace-BjbyB_LR.js";
import {
    Q as he
} from "./QBtnDropdown-CGOQV-YL.js";
import {
    Q as ft,
    a as vt
} from "./QToolbar-p6Rg3VL0.js";
import {
    Q as ht
} from "./QResizeObserver-BPtCLTks.js";
import {
    u as gt,
    Q as bt
} from "./useNotificationStore-_PualIHj.js";
import {
    Q as kt,
    a as wt
} from "./QLayout-CKXsftTr.js";
import {
    C as ge
} from "./ClosePopup-CgV1_utH.js";
import {
    Q as yt
} from "./QExpansionItem-Ctk7Uvbe.js";
import {
    _ as Pe
} from "./_plugin-vue_export-helper-DlAUqK2U.js";
import {
    u as _t
} from "./common-C9PBqzii.js";
import {
    u as xt
} from "./config-t_sZ-1aV.js";
import {
    e as Ct
} from "./extend-DTfK50KV.js";
import {
    e as St,
    a as At
} from "./index-B7SCgQeN.js";
const be = oe({
        name: "QBreadcrumbsEl",
        props: { ...$e,
            label: String,
            icon: String,
            tag: {
                type: String,
                default: "span"
            }
        },
        emits: ["click"],
        setup(e, {
            slots: r
        }) {
            const {
                linkTag: a,
                linkAttrs: d,
                linkClass: l,
                navigateOnClick: u
            } = ze(), m = g(() => ({
                class: "q-breadcrumbs__el q-link flex inline items-center relative-position " + (e.disable !== !0 ? "q-link--focusable" + l.value : "q-breadcrumbs__el--disable"),
                ...d.value,
                onClick: u
            })), f = g(() => "q-breadcrumbs__el-icon" + (e.label !== void 0 ? " q-breadcrumbs__el-icon--with-label" : ""));
            return () => {
                const k = [];
                return e.icon !== void 0 && k.push(O(U, {
                    class: f.value,
                    name: e.icon
                })), e.label !== void 0 && k.push(e.label), O(a.value, { ...m.value
                }, Ue(r.default, k))
            }
        }
    }),
    Tt = ["", !0],
    Pt = oe({
        name: "QBreadcrumbs",
        props: { ...je,
            separator: {
                type: String,
                default: "/"
            },
            separatorColor: String,
            activeColor: {
                type: String,
                default: "primary"
            },
            gutter: {
                type: String,
                validator: e => ["none", "xs", "sm", "md", "lg", "xl"].includes(e),
                default: "sm"
            }
        },
        setup(e, {
            slots: r
        }) {
            const a = Ge(e),
                d = g(() => `flex items-center ${a.value}${e.gutter==="none"?"":` q-gutter-${e.gutter}`}`),
                l = g(() => e.separatorColor ? ` text-${e.separatorColor}` : ""),
                u = g(() => ` text-${e.activeColor}`);
            return () => {
                if (r.default === void 0) return;
                const m = He(Je(r.default));
                if (m.length === 0) return;
                let f = 1;
                const k = [],
                    F = m.filter(T => T.type ? .name === "QBreadcrumbsEl").length,
                    w = r.separator !== void 0 ? r.separator : () => e.separator;
                return m.forEach(T => {
                    if (T.type ? .name === "QBreadcrumbsEl") {
                        const R = f < F,
                            y = T.props !== null && Tt.includes(T.props.disable),
                            I = (R === !0 ? "" : " q-breadcrumbs--last") + (y !== !0 && R === !0 ? u.value : "");
                        f++, k.push(O("div", {
                            class: `flex items-center${I}`
                        }, [T])), R === !0 && k.push(O("div", {
                            class: "q-breadcrumbs__separator" + l.value
                        }, w()))
                    } else k.push(T)
                }), O("div", {
                    class: "q-breadcrumbs"
                }, [O("div", {
                    class: d.value
                }, k)])
            }
        }
    }),
    Dt = oe({
        name: "QHeader",
        props: {
            modelValue: {
                type: Boolean,
                default: !0
            },
            reveal: Boolean,
            revealOffset: {
                type: Number,
                default: 250
            },
            bordered: Boolean,
            elevated: Boolean,
            heightHint: {
                type: [String, Number],
                default: 50
            }
        },
        emits: ["reveal", "focusin"],
        setup(e, {
            slots: r,
            emit: a
        }) {
            const {
                proxy: {
                    $q: d
                }
            } = We(), l = Ce(Ke, te);
            if (l === te) return console.error("QHeader needs to be child of QLayout"), te;
            const u = _(parseInt(e.heightHint, 10)),
                m = _(!0),
                f = g(() => e.reveal === !0 || l.view.value.indexOf("H") !== -1 || d.platform.is.ios && l.isContainer.value === !0),
                k = g(() => {
                    if (e.modelValue !== !0) return 0;
                    if (f.value === !0) return m.value === !0 ? u.value : 0;
                    const c = u.value - l.scroll.value.position;
                    return c > 0 ? c : 0
                }),
                F = g(() => e.modelValue !== !0 || f.value === !0 && m.value !== !0),
                w = g(() => e.modelValue === !0 && F.value === !0 && e.reveal === !0),
                T = g(() => "q-header q-layout__section--marginal " + (f.value === !0 ? "fixed" : "absolute") + "-top" + (e.bordered === !0 ? " q-header--bordered" : "") + (F.value === !0 ? " q-header--hidden" : "") + (e.modelValue !== !0 ? " q-layout--prevent-focus" : "")),
                R = g(() => {
                    const c = l.rows.value.top,
                        P = {};
                    return c[0] === "l" && l.left.space === !0 && (P[d.lang.rtl === !0 ? "right" : "left"] = `${l.left.size}px`), c[2] === "r" && l.right.space === !0 && (P[d.lang.rtl === !0 ? "left" : "right"] = `${l.right.size}px`), P
                });

            function y(c, P) {
                l.update("header", c, P)
            }

            function I(c, P) {
                c.value !== P && (c.value = P)
            }

            function j({
                height: c
            }) {
                I(u, c), y("size", c)
            }

            function M(c) {
                w.value === !0 && I(m, !0), a("focusin", c)
            }
            N(() => e.modelValue, c => {
                y("space", c), I(m, !0), l.animate()
            }), N(k, c => {
                y("offset", c)
            }), N(() => e.reveal, c => {
                c === !1 && I(m, e.modelValue)
            }), N(m, c => {
                l.animate(), a("reveal", c)
            }), N(l.scroll, c => {
                e.reveal === !0 && I(m, c.direction === "up" || c.position <= e.revealOffset || c.position - c.inflectionPoint < 100)
            });
            const B = {};
            return l.instances.header = B, e.modelValue === !0 && y("size", u.value), y("space", e.modelValue), y("offset", k.value), Ye(() => {
                l.instances.header === B && (l.instances.header = void 0, y("size", 0), y("offset", 0), y("space", !1))
            }), () => {
                const c = Xe(r.default, []);
                return e.elevated === !0 && c.push(O("div", {
                    class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
                })), c.push(O(ht, {
                    debounce: 0,
                    onResize: j
                })), O("header", {
                    class: T.value,
                    style: R.value,
                    onFocusin: M
                }, c)
            }
        }
    }),
    qt = {
        name: "EssentialLink",
        props: {
            link: {
                required: !0
            },
            icon: {
                type: String,
                required: !1
            },
            title: {
                type: String,
                required: !0
            },
            dropdown: {
                type: Boolean,
                default: !1
            },
            color: {
                type: String,
                default: ""
            }
        },
        computed: {
            linkArray() {
                return Array.isArray(this.link) ? this.link : []
            }
        },
        methods: {
            checkActive(e) {
                return this.$route.path === e
            }
        }
    };

function It(e, r, a, d, l, u) {
    const m = Se("EssentialLink", !0);
    return a.dropdown ? (b(), A(yt, {
        key: 0,
        "expand-separator": "",
        dense: "",
        "content-inset-level": .5
    }, {
        header: n(() => [a.icon ? (b(), A(S, {
            key: 0,
            avatar: "",
            style: {
                "min-width": "20px"
            }
        }, {
            default: n(() => [i(U, {
                name: a.icon,
                color: a.color,
                size: "18px"
            }, null, 8, ["name", "color"])]),
            _: 1
        })) : z("", !0), i(S, null, {
            default: n(() => [x(C(a.title), 1)]),
            _: 1
        })]),
        default: n(() => [i(J, null, {
            default: n(() => [(b(!0), V(K, null, Y(u.linkArray, (f, k) => (b(), A(m, Ae({
                key: k
            }, {
                ref_for: !0
            }, f), null, 16))), 128))]),
            _: 1
        })]),
        _: 1
    })) : (b(), A($, {
        key: 1,
        to: a.link,
        active: !1,
        class: Te(u.checkActive(a.link) ? "text-primary" : ""),
        dense: ""
    }, {
        default: n(() => [a.icon ? (b(), A(S, {
            key: 0,
            avatar: "",
            style: {
                "min-width": "20px"
            }
        }, {
            default: n(() => [i(U, {
                name: a.icon,
                color: a.color,
                size: "18px"
            }, null, 8, ["name", "color"])]),
            _: 1
        })) : z("", !0), i(S, null, {
            default: n(() => [i(E, null, {
                default: n(() => [x(C(a.title), 1)]),
                _: 1
            })]),
            _: 1
        })]),
        _: 1
    }, 8, ["to", "class"]))
}
const Ot = Pe(qt, [
    ["render", It],
    ["__scopeId", "data-v-2af8c756"]
]);
let X = null,
    ke;
const W = [];

function Ft(e) {
    e.title && (e.title = e.titleTemplate ? e.titleTemplate(e.title) : e.title, delete e.titleTemplate), [
        ["meta", "content"],
        ["link", "href"]
    ].forEach(r => {
        const a = e[r[0]],
            d = r[1];
        for (const l in a) {
            const u = a[l];
            u.template && (Object.keys(u).length === 1 ? delete a[l] : (u[d] = u.template(u[d] || ""), delete u.template))
        }
    })
}

function Rt(e, r) {
    if (Object.keys(e).length !== Object.keys(r).length) return !0;
    for (const a in e)
        if (e[a] !== r[a]) return !0
}

function we(e) {
    return ["class", "style"].includes(e) === !1
}

function ye(e) {
    return ["lang", "dir"].includes(e) === !1
}

function Mt(e, r) {
    const a = {},
        d = {};
    return e === void 0 ? {
        add: r,
        remove: d
    } : (e.title !== r.title && (a.title = r.title), ["meta", "link", "script", "htmlAttr", "bodyAttr"].forEach(l => {
        const u = e[l],
            m = r[l];
        if (d[l] = [], u == null) {
            a[l] = m;
            return
        }
        a[l] = {};
        for (const f in u) m.hasOwnProperty(f) === !1 && d[l].push(f);
        for (const f in m) u.hasOwnProperty(f) === !1 ? a[l][f] = m[f] : Rt(u[f], m[f]) === !0 && (d[l].push(f), a[l][f] = m[f])
    }), {
        add: a,
        remove: d
    })
}

function Bt({
    add: e,
    remove: r
}) {
    e.title && (document.title = e.title), Object.keys(r).length !== 0 && (["meta", "link", "script"].forEach(a => {
        r[a].forEach(d => {
            document.head.querySelector(`${a}[data-qmeta="${d}"]`).remove()
        })
    }), r.htmlAttr.filter(ye).forEach(a => {
        document.documentElement.removeAttribute(a)
    }), r.bodyAttr.filter(we).forEach(a => {
        document.body.removeAttribute(a)
    })), ["meta", "link", "script"].forEach(a => {
        const d = e[a];
        for (const l in d) {
            const u = document.createElement(a);
            for (const m in d[l]) m !== "innerHTML" && u.setAttribute(m, d[l][m]);
            u.setAttribute("data-qmeta", l), a === "script" && (u.innerHTML = d[l].innerHTML || ""), document.head.appendChild(u)
        }
    }), Object.keys(e.htmlAttr).filter(ye).forEach(a => {
        document.documentElement.setAttribute(a, e.htmlAttr[a] || "")
    }), Object.keys(e.bodyAttr).filter(we).forEach(a => {
        document.body.setAttribute(a, e.bodyAttr[a] || "")
    })
}

function Qt() {
    X = null;
    const e = {
        title: "",
        titleTemplate: null,
        meta: {},
        link: {},
        script: {},
        htmlAttr: {},
        bodyAttr: {}
    };
    for (let r = 0; r < W.length; r++) {
        const {
            active: a,
            val: d
        } = W[r];
        a === !0 && Ct(!0, e, d)
    }
    Ft(e), Bt(Mt(ke, e)), ke = e
}

function H() {
    X !== null && clearTimeout(X), X = setTimeout(Qt, 50)
}

function Lt(e) {
    {
        const r = {
            active: !0
        };
        if (typeof e == "function") {
            const a = g(e);
            r.val = a.value, N(a, d => {
                r.val = d, r.active === !0 && H()
            })
        } else r.val = e;
        W.push(r), H(), Ze(() => {
            r.active = !0, H()
        }), et(() => {
            r.active = !1, H()
        }), tt(() => {
            W.splice(W.indexOf(r), 1), H()
        })
    }
}
const _e = [{
        title: "Home",
        icon: "home",
        link: "/dashboard",
        access: "view all"
    }, {
        title: "Dashboard",
        icon: "dashboard",
        link: "/dashboard/merchant",
        access: "view merchant-dashboard"
    }, {
        title: "Audit",
        icon: "mdi-table-search",
        access: "view audit",
        dropdown: !0,
        link: [{
            title: "Finishing",
            icon: "mdi-tshirt-crew",
            link: "/finishing-qc",
            access: "view finishing-qc"
        }, {
            title: "Self Audit",
            icon: "mdi-diamond-stone",
            link: "/audit",
            access: "view audit"
        }, {
            title: "Corporate Audit / QC",
            icon: "mdi-calculator",
            link: "/corporate-audit",
            access: "view corporate_audit"
        }]
    }, {
        title: "CTA Mill",
        icon: "mdi-smog",
        access: "view cta-mill-menu",
        dropdown: !0,
        link: [{
            title: "Textile Development Desk",
            icon: "mdi-beaker",
            link: "/lab-dip-yardage-strike-off-request/list",
            access: "view mill-admin"
        }, {
            title: "Bulk Processing",
            icon: "mdi-paper-roll",
            link: "/bulk-process/fabric-processing",
            access: "view fabric_processing"
        }]
    }, {
        title: "Procurement & Dispatch",
        icon: "mdi-cart-variant",
        access: "view procurement-menu",
        dropdown: !0,
        link: [{
            title: "VG::Dispatch Challan",
            icon: "mdi-text-box",
            link: "/documents/sample-dispatch",
            access: "view vg-sample-dispatch"
        }, {
            title: "VG::Material Requisition",
            icon: "mdi-cart",
            link: "/documents/material-requisition",
            access: "view vg-material-requisition"
        }]
    }, {
        title: "Approvals",
        icon: "mdi-format-list-checks",
        access: "view approvals-menu",
        dropdown: !0,
        link: [{
            title: "Initial Costing",
            icon: "mdi-cash-100",
            link: "/documents/initial-costing",
            access: "view vg-initial-costing"
        }, {
            title: "PCD Working",
            icon: "mdi-scissors-cutting",
            link: "/documents/orders-pcd",
            access: "view orders-pcd"
        }, {
            title: "Fabric Working",
            icon: "mdi-paper-roll",
            link: "/documents/fabric-working",
            access: "view vg-fabric-working"
        }]
    }, {
        title: "Lab Testing",
        icon: "mdi-flask",
        link: "/documents/lab-testing",
        access: "view lab-testing-menu"
    }, {
        title: "Marketing Material",
        icon: "mdi-bullhorn",
        link: "/documents/marketing-material",
        access: "view accesories-menu"
    }, {
        title: "Sustainbility Report",
        icon: "mdi-leaf",
        access: "view lab-testing-menu",
        dropdown: !0,
        link: [{
            title: "All Reports",
            icon: "mdi-view-dashboard",
            link: "/yearly-sustain-report/list",
            access: "view lab-testing-menu"
        }]
    }, {
        title: "Order Management",
        icon: "mdi-chart-box",
        link: [{
            title: "Smart Document Extractor",
            icon: "mdi-file-document-multiple",
            link: "/order-management/parser",
            access: "view order-parser"
        }, {
            title: "Bulk Orders",
            icon: "mdi-counter",
            link: "/order-management/orders",
            access: "view admin"
        }, {
            title: "Pending BOMs",
            icon: "mdi-clock",
            link: "/order-management/pending-boms",
            access: "view admin"
        }, {
            title: "Order Dispatch",
            icon: "mdi-truck-fast",
            link: "/order-management/datewise-qty",
            access: "view admin"
        }],
        access: "view orders",
        dropdown: !0
    }, {
        title: "Central Purchasing",
        icon: "mdi-counter",
        link: [{
            title: "Purchase Inventory",
            icon: "mdi-paper-roll",
            link: "/purchase-inventory/list",
            access: "view central-purchasing"
        }],
        access: "view central-purchasing",
        dropdown: !0
    }, {
        title: "Production Sourcing",
        icon: "mdi-cart-variant",
        link: [{
            title: "VG::Accessories",
            icon: "mdi-warehouse",
            link: "/purchase-accesories/list",
            access: "view accesories-menu",
            dropdown: !1
        }, {
            title: "VG:Fabric",
            icon: "mdi-texture-box",
            link: "/fabric/hub",
            access: "view fabric-po-menu",
            dropdown: !1
        }, {
            title: "Fabric PO(Draft)",
            icon: "mdi-file-document-edit-outline",
            link: "/fabric/draft-po",
            access: "view fabric-drafts-menu",
            dropdown: !1
        }],
        access: "view production-sourcing-menu",
        dropdown: !0
    }, {
        title: "Industrial Engineering",
        icon: "mdi-cog",
        access: "view ied-menu",
        dropdown: !0,
        link: [{
            title: "CMP Process",
            icon: "mdi-tag",
            link: "/design/cmp",
            access: "view cmtprocess"
        }, {
            title: "Operation Bulletin",
            icon: "mdi-truck-fast",
            link: [{
                title: "Create Report",
                icon: "mdi-note-text",
                link: "/operation-bulletin/list",
                access: "view ob"
            }, {
                title: "Operation Category",
                icon: "mdi-note-text",
                link: "/operation-bulletin/operation-category",
                access: "view ob"
            }, {
                title: "Operation Category Type",
                icon: "mdi-note-text",
                link: "/operation-bulletin/operation-category-type",
                access: "view ob"
            }, {
                title: "Machine Master",
                icon: "mdi-security",
                link: "/operation-bulletin/machine-master",
                access: "view ob"
            }, {
                title: "Machine Attachment",
                icon: "mdi-needle",
                link: "/operation-bulletin/machine-attachment",
                access: "view ob"
            }, {
                title: "Machine Needle Master",
                icon: "mdi-needle",
                link: "/operation-bulletin/machine-needle-master",
                access: "view ob"
            }, {
                title: "Thread Master",
                icon: "mdi-store",
                link: "/operation-bulletin/thread-master",
                access: "view ob"
            }, {
                title: "Requested Report",
                icon: "mdi-file-plus",
                link: "/operation-bulletin/requested-report",
                access: "view ob"
            }],
            access: "view ob",
            dropdown: !0
        }, {
            title: "Lace Average",
            icon: "mdi-wallet",
            link: [{
                title: "Create Lace Average Report",
                icon: "mdi-bulletin-board",
                link: "/lace-average/create-report",
                access: "view ob"
            }, {
                title: "Lace Average Request",
                icon: "mdi-bulletin-board",
                link: "/lace-average/report-request",
                access: "view ob"
            }],
            dropdown: !0,
            access: "view ob"
        }]
    }, {
        title: "Production Module",
        icon: "mdi-castle",
        access: "view production-module-menu",
        dropdown: !0,
        link: [{
            title: "File Handover",
            icon: "mdi-file-send",
            link: "/factory/handover",
            access: "view factory-handover-file"
        }, {
            title: "Embroidery Module",
            icon: "mdi-pen",
            link: "/bulk-process/embroidery",
            access: "view bulk_embroidery"
        }, {
            title: "Production Marker",
            icon: "mdi-home",
            link: "/marker-for-factory/list",
            access: "view admin"
        }]
    }, {
        title: "CAD Team",
        icon: "mdi-drawing",
        link: "/design/pattern",
        access: "view cad-team-menu"
    }, {
        title: "Sampling Module",
        icon: "mdi-tshirt-v",
        access: "view sampling-module-menu",
        dropdown: !0,
        link: [{
            title: "Sample Programs",
            icon: "mdi-tools",
            link: "/design/sample-program",
            access: "view sampleprogram"
        }, {
            title: "Sampling MIS",
            icon: "mdi-poll",
            link: "/design/sampling",
            access: "view designsample"
        }, {
            title: "Sampling Embroidery",
            icon: "mdi-graphql",
            link: "/design/embroidery",
            access: "view embroidery"
        }, {
            title: "Sample Cutting",
            icon: "mdi-content-cut",
            link: "/design/sample-cutting",
            access: "view samplecutting"
        }, {
            title: "Sample Audit",
            icon: "mdi-progress-check",
            link: "/design/sample-audit",
            access: "view sample-audit"
        }, {
            title: "Sampling Report",
            icon: "mdi-bulletin-board",
            link: "/design/sampling-report",
            access: "view admin"
        }]
    }, {
        title: "Style Development",
        icon: "mdi-monitor-dashboard",
        access: "view product-development-menu",
        dropdown: !0,
        link: [{
            title: "Style Repository",
            icon: "mdi-folder",
            link: "/design/repo2",
            access: "view designhead"
        }, {
            title: "My Styles",
            icon: "mdi-folder-open",
            link: "/design/repo",
            access: "view mydesigns"
        }]
    }, {
        title: "Design Vault",
        icon: "mdi-folder-image",
        link: "/design/gallery",
        access: "view design-vault"
    }, {
        title: "Line Plan",
        icon: "school",
        link: "/line-plan",
        access: "view linedata"
    }, {
        title: "Fabric Inspection",
        icon: "published_with_changes",
        link: "/fabric-qc",
        access: "view 4pfabric"
    }, {
        title: "Reports",
        icon: "science",
        link: "/reports",
        access: "view reports"
    }, {
        title: "Time & Action",
        icon: "mdi-timer",
        link: "/time-and-action",
        access: "view T&A"
    }, {
        title: "Manual Invoices",
        icon: "mdi-text-box",
        link: "/invoices",
        access: "view invoices"
    }, {
        title: "Risk & Research",
        icon: "mdi-text-box",
        link: "/risk-research/list",
        access: "view gm-review-pannel"
    }, {
        title: "Production",
        icon: "mdi-cogs",
        link: "/production",
        access: "view production"
    }, {
        title: "Store",
        icon: "mdi-store",
        link: [{
            title: "Purchase Order",
            icon: "mdi-currency-usd",
            link: "/store/purchase-order",
            access: "view purchase-order"
        }, {
            title: "Fabric Processing Order",
            icon: "mdi-hanger",
            link: "/store/fabric-processing-order",
            access: "view fabric-processing-order"
        }, {
            title: "Stock Inward",
            icon: "mdi-import",
            link: "/store/inventory",
            access: "view store"
        }],
        access: "view store",
        dropdown: !0
    }, {
        title: "Plant",
        icon: "mdi-factory",
        link: [{
            title: "Fabric Dispatch",
            icon: "mdi-truck-fast",
            link: "/plant/fabric-dispatch",
            access: "view plant-fabric-dispatch"
        }],
        access: "view processing-plant",
        dropdown: !0
    }, {
        title: "Notification",
        icon: "message",
        link: "/notification",
        access: "view notification"
    }, {
        title: "Information Technology",
        icon: "mdi-web",
        access: "view information-technology-menu",
        dropdown: !0,
        link: [{
            title: "Admin",
            icon: "mdi-shield-account",
            link: [{
                title: "Admin Controls",
                icon: "mdi-tune",
                link: "/admin",
                access: "view admin"
            }],
            access: "view admin",
            dropdown: !0
        }, {
            title: "Human Resource",
            icon: "mdi-account-network",
            link: [{
                title: "Attendance",
                icon: "mdi-text-account",
                link: "/hr/attendance",
                access: "view admin"
            }],
            access: "view admin",
            dropdown: !0
        }, {
            title: "Masters",
            icon: "mdi-account-group",
            link: [{
                title: "Fabric Master",
                icon: "mdi-account-tie",
                link: "/masters/fabric",
                access: "view fabric-master"
            }, {
                title: "Trim / Item Master",
                icon: "mdi-scissors-cutting",
                link: "/masters/trims",
                access: "view trims-master"
            }, {
                title: "Dropdown/Lookups",
                icon: "mdi-eye",
                link: "/masters/lookups",
                access: "view lookups-master"
            }, {
                title: "Sample Priority Limit",
                icon: "mdi-sitemap",
                link: "/masters/sample-proirity-limit",
                access: "view sample-priority-limit"
            }],
            access: "view mastersmenu",
            dropdown: !0
        }, {
            title: "VG Order Master",
            icon: "mdi-link-box",
            link: "/design/vg-order-master",
            access: "view vg_order_master"
        }]
    }, {
        title: "Gate Pass",
        icon: "mdi-credit-card",
        link: [{
            title: "InWard",
            icon: "mdi-bulletin-board",
            link: "/gate-pass/inward",
            access: "view admin"
        }, {
            title: "OutWard",
            icon: "mdi-bulletin-board",
            link: "/gate-pass/outward",
            access: "view admin"
        }],
        access: "view admin",
        dropdown: !0
    }, {
        title: "Report a Bug",
        icon: "mdi-bug",
        link: "/report-bug/list",
        access: "view admin"
    }],
    xe = "1.2.3",
    Si = [{
        version: "1.2.3",
        date: "April 2026",
        sections: [{
            title: "Task Manager - Style Image Updates",
            icon: "mdi-image-multiple-outline",
            badge: {
                label: "Improved",
                color: "teal"
            },
            description: "The new Image column now loads thumbnails efficiently and supports quick preview in a popup.",
            blocks: [{
                type: "list",
                label: "Image Enhancements",
                items: [{
                    icon: "mdi-image-outline",
                    color: "indigo-8",
                    title: "Image Column Added",
                    desc: "Style thumbnails are now shown in a compact Image column for faster visual identification."
                }, {
                    icon: "mdi-lightning-bolt-outline",
                    color: "teal-8",
                    title: "Lazy + Batched Fetch",
                    desc: "Thumbnails are fetched only for visible rows and grouped into a single batched API call using an ourrefs array."
                }, {
                    icon: "mdi-magnify-plus-outline",
                    color: "blue-8",
                    title: "Click to Preview",
                    desc: "Clicking a thumbnail opens a larger popup preview so the style image can be seen clearly."
                }]
            }],
            tips: ["Scroll the table to progressively load thumbnails only for rows you view.", "Click any thumbnail in the Image column to open a full preview."]
        }]
    }, {
        version: "1.2.2",
        date: "April 2026",
        sections: [{
            title: "Task Manager — UI & Display Updates",
            icon: "mdi-clipboard-check-multiple-outline",
            badge: {
                label: "Improved",
                color: "teal"
            },
            description: "Visual consistency improvements across the Fabrics and Trims status avatars, delay day display, and the Status Info legend.",
            blocks: [{
                type: "list",
                label: "Visual Improvements",
                items: [{
                    icon: "mdi-palette-outline",
                    color: "teal-8",
                    title: "Fabrics & Trims Avatar Colors",
                    desc: "Status count avatars in the Fabrics and Trims columns now use solid dark colors (red-9, orange-9, green-9, teal-9, indigo-10) with white text — matching their tooltip chip colors for visual consistency."
                }, {
                    icon: "mdi-plus-minus-variant",
                    color: "blue-8",
                    title: "Delay Day Prefix",
                    desc: 'Upcoming (positive) delay day counts now display with a "+" prefix (e.g. +5) to clearly distinguish them from overdue negative values (e.g. -3).'
                }, {
                    icon: "mdi-information-outline",
                    color: "indigo-8",
                    title: "Status Info Legend Updated",
                    desc: 'The Status Info dialog now reflects the updated Fabrics & Trims color scheme and includes the "+" prefix in the upcoming days sample. A "Total" chip has also been added to the legend.'
                }]
            }],
            tips: ["Solid dark avatars make it easier to read counts at a glance — red means pending, green means PR completed, teal means PO completed.", 'A "+5" in a process cell means the task is 5 days ahead of its target date.', 'A "-3" means the task is 3 days overdue — act immediately.']
        }]
    }, {
        version: "1.2.1",
        date: "April 2026",
        sections: [{
            title: "Task Manager — Improvements",
            icon: "mdi-clipboard-check-multiple-outline",
            badge: {
                label: "Improved",
                color: "teal"
            },
            description: "Several usability improvements to the Fabrics, Trims, and FOB expand panels, plus a fix to the Buyer filter dropdown.",
            blocks: [{
                type: "list",
                label: "Per-Row Expand Panels",
                note: "Fabrics, Trims, and FOB detail panels are now expandable per individual order row — no more expanding all rows at once.",
                items: [{
                    icon: "mdi-chevron-down",
                    color: "blue-8",
                    title: "Row-Level Toggle Button",
                    desc: "A chevron button inside each Fabrics, Trims, and FOB cell opens or closes the detail panel for that specific row only. The icon flips up/down only when the button itself is clicked."
                }, {
                    icon: "mdi-cursor-pointer",
                    color: "teal-8",
                    title: "Status Avatar Click to Filter",
                    desc: "Click any colored count avatar (Non-Approved, Approved, PR Completed, PO Completed) in the Fabrics or Trims cell to open the detail panel filtered to that status. Clicking the same avatar again closes the panel."
                }, {
                    icon: "mdi-arrow-collapse-all",
                    color: "purple-8",
                    title: "Auto-Collapse Others",
                    desc: "Opening a Fabrics, Trims, or FOB panel on any row automatically closes any other open panel across all three types, keeping the table clean."
                }]
            }, {
                type: "list",
                label: "Bug Fixes",
                items: [{
                    icon: "mdi-bug-check-outline",
                    color: "green-8",
                    title: "Buyer Filter Fixed",
                    desc: 'The Buyer dropdown now loads all options immediately when opened (previously empty until typed into). The "ALL" option is always shown, and the selected buyer is correctly sent to the API when fetching orders.'
                }]
            }],
            tips: ["Click a count avatar (e.g. the red Non-Approved number) to instantly open and filter the detail panel to just those items.", "Click the same avatar again to close the panel without reaching for the chevron button.", "Only one detail panel can be open at a time — opening a new one closes the previous automatically."]
        }]
    }, {
        version: "1.2.0",
        date: "April 2026",
        sections: [{
            title: "Task Manager",
            icon: "mdi-clipboard-check-multiple-outline",
            badge: {
                label: "New",
                color: "blue"
            },
            description: "A centralized dashboard to track all production orders and their process statuses at a glance. Stay on top of every order from start to shipment.",
            blocks: [{
                type: "list",
                label: "Process Cell Statuses",
                note: 'Each process cell in the table uses a color-coded icon or number to show the current state at a glance. Click the "Status Info" chip at the top-left of the table to open the full legend at any time.',
                items: [{
                    icon: "mdi-check-decagram",
                    color: "green-8",
                    title: "Completed / Accepted",
                    desc: "Task is done or accepted by the relevant party. Shown as a green check icon."
                }, {
                    icon: "mdi-timer-outline",
                    color: "blue-8",
                    title: "In Progress / Dispatched",
                    desc: "Task has been initiated or dispatched and is awaiting the next step. Shown as a blue timer icon."
                }, {
                    icon: "mdi-timer-sand",
                    color: "orange-8",
                    title: "Upcoming — Days Remaining",
                    desc: "Task is not yet due. An orange number shows how many days remain until the target date."
                }, {
                    icon: "mdi-alert-circle-outline",
                    color: "red-8",
                    title: "Delayed — Overdue Days",
                    desc: 'Task is past its target date. A red negative number (e.g. -3) shows how many days overdue. Upcoming tasks show a "+" prefix (e.g. +5).'
                }]
            }, {
                type: "chips",
                label: "FOB Order Statuses",
                note: "The FOB column and its expanded detail table use the following statuses:",
                items: [{
                    label: "Pending",
                    color: "orange-2",
                    textColor: "orange-8"
                }, {
                    label: "Approval Pending",
                    color: "blue-2",
                    textColor: "blue-8"
                }, {
                    label: "Accepted",
                    color: "green-2",
                    textColor: "green-8"
                }, {
                    label: "Rejected",
                    color: "red-2",
                    textColor: "red-8"
                }, {
                    label: "Go-Ahead Received",
                    color: "teal-2",
                    textColor: "teal-8"
                }, {
                    label: "Go-Ahead Rejected",
                    color: "deep-orange-2",
                    textColor: "deep-orange-8"
                }]
            }, {
                type: "chips",
                label: "Fabrics & Trims Statuses",
                note: "The Fabrics and Trims expanded detail rows use the following statuses (rows are color-coded to match):",
                items: [{
                    label: "Pending / Non-Approved",
                    color: "red-9",
                    textColor: "white"
                }, {
                    label: "Approved",
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
                }]
            }, {
                type: "list",
                label: "Features",
                items: [{
                    icon: "mdi-sort-variant",
                    color: "blue-8",
                    title: "Sort By",
                    desc: "Sort orders by Delivery Date, Order Date, Target PFH/PCD, FOB Date, VG Linked Date, RA Date, Bulk Process/Emb. Date, PFH Accepted Date, R&D/SOP Date, or PPM Date. Defaults to Delivery Date."
                }, {
                    icon: "mdi-filter-outline",
                    color: "purple-8",
                    title: "Column Visibility",
                    desc: 'Toggle individual columns on or off from the "Columns" menu, organised by group. Your selection is saved automatically and persists across sessions.'
                }, {
                    icon: "mdi-magnify",
                    color: "green-8",
                    title: "Search",
                    desc: "Quickly filter orders by typing in the search box. Results update as you type (500 ms debounce) and search across order number, buyer, style, and other key fields."
                }, {
                    icon: "mdi-calendar-range",
                    color: "orange-8",
                    title: "Date Filter",
                    desc: 'Narrow down orders by delivery date using presets (This Week, Next 30/60/90 Days, etc.) or a custom date range picker. Defaults to "Next 90 Days".'
                }, {
                    icon: "mdi-table-large",
                    color: "teal-8",
                    title: "Paginated Table",
                    desc: "Displays 100 records per page with pagination controls showing the current range and total count."
                }, {
                    icon: "mdi-tooltip-text-outline",
                    color: "grey-7",
                    title: "Process Tooltips",
                    desc: "Hover over any process cell to see detailed information such as completion dates, accepted/rejected dates, and exact delay days."
                }, {
                    icon: "mdi-information-outline",
                    color: "indigo-8",
                    title: "Status Info Legend",
                    desc: 'Click the "Status Info" chip at the top-left of the table to open a reference dialog explaining every icon and colour used across the table.'
                }]
            }, {
                type: "chips",
                label: "Tracked Processes (Columns)",
                chipColor: "teal-1",
                chipTextColor: "teal-9",
                items: [{
                    label: "VG Linked"
                }, {
                    label: "Risk Analysis"
                }, {
                    label: "Fabrics"
                }, {
                    label: "Trims"
                }, {
                    label: "FOB"
                }, {
                    label: "Bulk Process"
                }, {
                    label: "Bulk Embroidery"
                }, {
                    label: "PFH"
                }, {
                    label: "R&D / SOP"
                }, {
                    label: "PPM"
                }]
            }, {
                type: "list",
                label: "Expandable Detail Panels",
                note: "Click the expand toggle on the Fabrics, Trims, or FOB column header to reveal a detailed breakdown per order row:",
                items: [{
                    icon: "mdi-table",
                    color: "teal-8",
                    title: "Fabrics Detail",
                    desc: "Shows a summary bar (Total, From Stocks, PO Completed, PR Completed, Approved, Non-Approved counts) and a full item table with columns: Item Code, Category, Description, Color, Size, Unit, Sourcing, Reqd Qty, Reqn Qty, PO Qty, Received, From Stock Qty, Rate, Currency, and PO Status. Rows are colour-coded by procurement stage."
                }, {
                    icon: "mdi-table",
                    color: "indigo-8",
                    title: "Trims Detail",
                    desc: "Identical structure to the Fabrics detail panel — summary bar plus a full item table covering all trim components for the order."
                }, {
                    icon: "mdi-table",
                    color: "purple-8",
                    title: "FOB Detail",
                    desc: "Shows a summary bar (Total Fabrics, Total Requests, Pending, Completed counts) and a request table with columns: Requested At, FOB Date, FOB Sent Date, Status, Greige Type (Stocked/Purchased Greige chips), Job Work Status (Embroidery / Handwork), Order Qty, Fabric details, and audit columns (Accepted/Rejected/Completed by & at). Each row can be further expanded to view FOB date + flow and all Bulk Flow entries."
                }]
            }],
            tips: ['Use "Next 90 Days" date filter (default) to focus on upcoming deliveries.', 'Sort by "Delivery Date" to prioritize orders closest to shipment.', 'Toggle off unused columns from the "Columns" menu to declutter the table for your workflow.', 'Click "Status Info" (top-left) to open the full legend of icons and colours used in the table.', "A red negative number (e.g. -3) in a process cell means the task is 3 days overdue — act immediately.", "Expand the Fabrics or Trims column to check procurement progress: red rows are Non-Approved, green are PR Completed, teal are PO Completed.", 'In the FOB detail panel, expand any row with the "Bulk Flow" chip to see the scheduled fabric flow dates and quantities.', "The SG and PG chips in the FOB detail indicate whether the greige fabric is Stocked Greige or Purchased Greige."]
        }]
    }],
    Et = {
        class: "row no-wrap"
    },
    Nt = {
        class: "q-pa-md",
        style: {
            "min-width": "300px"
        }
    },
    Vt = {
        class: "row items-center justify-between q-px-md q-py-sm bg-grey-1 rounded-borders"
    },
    $t = {
        class: "col-auto"
    },
    zt = {
        class: "text-h6 flex items-center q-gutter-sm"
    },
    Ut = {
        class: "col-auto"
    },
    jt = {
        class: "column items-end q-gutter-xs"
    },
    Gt = {
        style: {
            "min-width": "380px",
            "max-width": "380px"
        }
    },
    Ht = {
        class: "row no-wrap q-pa-md"
    },
    Jt = {
        class: "column",
        style: {
            width: "140px"
        }
    },
    Wt = {
        class: "q-ma-none text-primary"
    },
    Kt = {
        class: "column items-center"
    },
    Yt = ["src"],
    Xt = {
        class: "overlay"
    },
    Zt = {
        class: "text-subtitle1 text-center q-mt-sm q-mb-sm"
    },
    ei = {
        class: "text-caption"
    },
    ti = {
        class: "text-subtitle1 text-weight-medium"
    },
    ii = {
        class: "text-caption text-grey-6 q-mt-xs"
    },
    ai = {
        __name: "MainLayout",
        setup(e) {
            const r = me(() => fe(() =>
                    import ("./SetAvatar-vmK6MXek.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7]))),
                a = me(() => fe(() =>
                    import ("./ReleaseNoteDialog-B0uBf9qw.js"), __vite__mapDeps([8, 2, 3, 1, 9, 10, 11, 12, 5, 13, 14, 15, 16, 4, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 6, 27, 28, 29, 30]))),
                d = it(),
                l = gt(),
                u = d.user.user,
                m = _(""),
                f = Ce(St),
                k = _(!1);
            _("");
            const F = at(),
                w = ot(),
                T = _t(),
                R = xt();
            _([]);
            const y = _(!1),
                I = R.version,
                j = _(!1),
                M = _(null),
                B = _(!1),
                c = _(localStorage.getItem("release_note_seen_version") !== xe),
                P = u ? .designation ? .toLowerCase() === "merchandiser",
                De = () => {
                    c.value && P && (B.value = !0)
                },
                qe = () => {
                    localStorage.setItem("release_note_seen_version", xe), c.value = !1, B.value = !1
                },
                ne = s => {
                    const t = new Date,
                        p = new Date(s),
                        o = Math.floor((t - p) / 1e3);
                    if (o < 60) return "Just now";
                    const h = Math.floor(o / 60);
                    if (h < 60) return `${h} min ago`;
                    const D = Math.floor(h / 60);
                    if (D < 24) return `${D} hr ago`;
                    const ee = Math.floor(D / 24);
                    return `${ee} day${ee>1?"s":""} ago`
                };
            g(() => {
                const s = l.notifications;
                return Array.isArray(s) ? s : s ? [s] : []
            });
            const Q = _(localStorage.getItem("selectedTheme") || "Light");
            if (N(() => Q.value, s => {
                    if (localStorage.setItem("selectedTheme", s), s === "Light") w.dark.set(!1);
                    else if (s === "Dark") w.dark.set(!0);
                    else if (s === "System") {
                        const t = window.matchMedia("(prefers-color-scheme: dark)").matches;
                        w.dark.set(t)
                    } else console.warn("Invalid theme selected:", s)
                }, {
                    immediate: !0
                }), Q.value === "System") {
                const s = window.matchMedia("(prefers-color-scheme: dark)").matches;
                w.dark.set(s)
            } else w.dark.set(Q.value === "Dark");
            const Ie = () => {
                    d.logout()
                },
                Oe = () => {
                    w.fullscreen.isActive ? w.fullscreen.exit() : w.fullscreen.request()
                },
                Z = _(""),
                le = g(() => {
                    const t = JSON.parse(w.localStorage.getItem("userdata")).permission;
                    t.push("view all");
                    let p = _e.filter(o => t.includes(o.access));
                    return p = p.map(o => (o.dropdown && (o.link = o.link.filter(h => t.includes(h.access))), o)), p
                }),
                Fe = g(() => {
                    const s = m.value.trim().toLowerCase();
                    if (!s) return le.value;
                    const t = o => (o || "").toLowerCase().includes(s),
                        p = o => o.map(h => {
                            if (h.dropdown && Array.isArray(h.link)) {
                                const D = p(h.link);
                                return t(h.title) || D.length > 0 ? { ...h,
                                    link: D,
                                    dropdown: D.length > 0
                                } : null
                            }
                            return t(h.title) ? { ...h
                            } : null
                        }).filter(Boolean);
                    return p(le.value)
                }),
                Re = () => {
                    m.value = Z.value
                },
                se = g(() => JSON.parse(w.localStorage.getItem("userdata")).user.email);
            g(() => se.value.roles.some(s => s.name === "admin"));
            const re = g(() => JSON.parse(w.localStorage.getItem("userdata")).user.name),
                Me = g(() => {
                    let s = F.currentRoute.value.fullPath.split("?")[0];
                    return s = s.split(/[/]/).map(t => t.split("-").map(function(o) {
                        return o.charAt(0).toUpperCase() + o.slice(1)
                    }).join(" ")).filter(t => t != ""), s
                });
            nt(async () => {
                De(), l.getUserNotifications(), T.setBuyerList(), Le(), console.log("app version", R.version);
                const s = localStorage.getItem("userAvatar");
                s && (M.value = JSON.parse(s))
            });
            const Be = (s, t) => {
                    for (const p of s) {
                        if (p.link === t) return p.title;
                        if (Array.isArray(p.link)) {
                            for (const o of p.link)
                                if (o.link === t) return `${p.title}/${o.title}`
                        }
                    }
                    return null
                },
                Qe = g(() => Be(_e, F.currentRoute.value.fullPath));
            Lt(() => ({
                title: Qe.value
            }));

            function Le() {
                const t = JSON.parse(w.localStorage.getItem("userdata")).permission,
                    {
                        can: p,
                        rules: o
                    } = new At;
                t.forEach(h => {
                    const D = h.split(" ");
                    p(D[0], D[1])
                }), f.update(o)
            }
            _(!1);
            const G = _(!1);
            async function ce(s) {
                try {
                    if (s.read) return;
                    if (s.read = !0, s.sliding = !0, setTimeout(() => {
                            G.value = s, k.value = !0, s.sliding = !1
                        }, 1300), (await pe.post("v3/notification/read", {
                            item: s
                        })).status === 200) {
                        const o = (l.notifications ? .value || []).findIndex(h => h.id === s.id);
                        o !== -1 && l.notifications.value.splice(o, 1), l.getUserNotifications()
                    }
                } catch (t) {
                    console.error("Error marking the notification as read: ", t)
                }
            }
            async function Ee() {
                try {
                    if ((await pe.get("v3/notification/all-read")).status === 200) {
                        const p = (l.notifications ? .value || []).findIndex(o => o.id === item.id);
                        p !== -1 && l.notifications.value.splice(p, 1), l.getUserNotifications()
                    }
                } catch (s) {
                    console.error("Error marking the notification as read: ", s)
                }
            }
            const Ne = s => {
                    M.value = s
                },
                Ve = s => {
                    const p = `/design/${JSON.parse(s)?.design_id}/details`;
                    window.open(p, "_blank")
                };
            return (s, t) => {
                const p = Se("router-view");
                return b(), A(wt, {
                    view: "hHh LpR lFf"
                }, {
                    default: n(() => [i(Dt, null, {
                        default: n(() => [v("div", Et, [i(ft, null, {
                            default: n(() => [i(L, {
                                flat: "",
                                dense: "",
                                round: "",
                                icon: y.value ? "mdi-backburger" : "menu",
                                "aria-label": "Menu",
                                onClick: t[0] || (t[0] = o => y.value = !y.value)
                            }, null, 8, ["icon"]), i(Pt, {
                                gutter: "xs",
                                "active-color": "white",
                                class: "q-pl-md"
                            }, {
                                default: n(() => [i(be, {
                                    icon: "home"
                                }), (b(!0), V(K, null, Y(Me.value, (o, h) => (b(), A(be, {
                                    key: h,
                                    label: o
                                }, null, 8, ["label"]))), 128))]),
                                _: 1
                            }), i(vt, {
                                class: "text-right",
                                style: {
                                    overflow: "visible"
                                }
                            }, {
                                default: n(() => [i(L, {
                                    flat: "",
                                    dense: "",
                                    round: "",
                                    icon: "mdi-bell-outline"
                                }, {
                                    default: n(() => [q(l).unreadCount > 0 ? (b(), A(ae, {
                                        key: 0,
                                        color: "red",
                                        floating: "",
                                        style: {
                                            top: "-3px",
                                            right: "2px"
                                        }
                                    }, {
                                        default: n(() => [x(C(q(l).unreadCount), 1)]),
                                        _: 1
                                    })) : z("", !0), i(mt, {
                                        anchor: "bottom right",
                                        self: "top right",
                                        style: {
                                            "min-width": "300px"
                                        }
                                    }, {
                                        default: n(() => [v("div", Nt, [v("div", Vt, [v("div", $t, [v("div", zt, [t[13] || (t[13] = x(" 🔔 Notifications ", -1)), i(ae, {
                                            color: "blue-3",
                                            "text-color": "black",
                                            class: "q-px-sm q-py-xs"
                                        }, {
                                            default: n(() => [x(" Unread: " + C(q(l).unreadCount), 1)]),
                                            _: 1
                                        })])]), v("div", Ut, [v("div", jt, [v("span", {
                                            class: "text-primary text-caption text-bold cursor-pointer hover-underline q-px-sm",
                                            onClick: t[1] || (t[1] = o => q(F).push("/notification"))
                                        }, " All Notifications "), q(l).unreadCount > 0 ? (b(), A(L, {
                                            key: 0,
                                            color: "primary",
                                            size: "sm",
                                            dense: "",
                                            unelevated: "",
                                            class: "q-mt-xs q-px-sm",
                                            loading: s.marking,
                                            icon: "mdi-check-all",
                                            label: "Read All",
                                            onClick: Ee
                                        }, null, 8, ["loading"])) : z("", !0)])])]), v("div", Gt, [i(J, null, {
                                            default: n(() => [i(lt, {
                                                name: "slide-right",
                                                tag: "div"
                                            }, {
                                                default: n(() => [(b(!0), V(K, null, Y(q(l).notifications, o => (b(), V("div", {
                                                    key: o.id
                                                }, [de((b(), A($, {
                                                    clickable: "",
                                                    class: Te(["q-py-sm transition-item", {
                                                        "slide-right-active": o.sliding
                                                    }]),
                                                    onClick: h => ce(o)
                                                }, {
                                                    default: n(() => [i(S, null, {
                                                        default: n(() => [i(E, {
                                                            class: "text-subtitle2"
                                                        }, {
                                                            default: n(() => [x(C(o.title), 1)]),
                                                            _: 2
                                                        }, 1024), i(E, {
                                                            caption: "",
                                                            lines: "2"
                                                        }, {
                                                            default: n(() => [x(C(o.message), 1)]),
                                                            _: 2
                                                        }, 1024)]),
                                                        _: 2
                                                    }, 1024), i(S, {
                                                        side: "",
                                                        top: ""
                                                    }, {
                                                        default: n(() => [i(E, {
                                                            caption: "",
                                                            lines: "1"
                                                        }, {
                                                            default: n(() => [x(C(ne(o.created_at)), 1)]),
                                                            _: 2
                                                        }, 1024), i(U, {
                                                            name: o.read ? "mdi-email-open" : "mdi-email",
                                                            color: "primary",
                                                            onClick: st(h => ce(o), ["stop"])
                                                        }, null, 8, ["name", "onClick"])]),
                                                        _: 2
                                                    }, 1024)]),
                                                    _: 2
                                                }, 1032, ["class", "onClick"])), [
                                                    [ge]
                                                ]), i(ie)]))), 128))]),
                                                _: 1
                                            })]),
                                            _: 1
                                        })])])]),
                                        _: 1
                                    })]),
                                    _: 1
                                }), i(L, {
                                    flat: "",
                                    dense: "",
                                    round: "",
                                    icon: "mdi-newspaper-variant-outline",
                                    onClick: t[2] || (t[2] = o => B.value = !0)
                                }, {
                                    default: n(() => [c.value ? (b(), A(ae, {
                                        key: 0,
                                        color: "red",
                                        floating: "",
                                        style: {
                                            top: "-3px",
                                            right: "2px"
                                        }
                                    })) : z("", !0), i(pt, null, {
                                        default: n(() => t[14] || (t[14] = [x("What's New", -1)])),
                                        _: 1,
                                        __: [14]
                                    })]),
                                    _: 1
                                }), i(L, {
                                    icon: q(w).fullscreen.isActive ? "fullscreen_exit" : "fullscreen",
                                    onClick: Oe,
                                    flat: "",
                                    dense: ""
                                }, null, 8, ["icon"]), i(he, {
                                    label: `Welcome, ${re.value}`,
                                    flat: "",
                                    "no-caps": ""
                                }, {
                                    default: n(() => [v("div", Ht, [v("div", Jt, [t[19] || (t[19] = v("div", {
                                        class: "text-h6"
                                    }, "Settings", -1)), i(ve), i(J, null, {
                                        default: n(() => [i($, {
                                            dense: "",
                                            class: "q-pa-none"
                                        }, {
                                            default: n(() => [i(S, null, {
                                                default: n(() => t[15] || (t[15] = [x("Theme", -1)])),
                                                _: 1,
                                                __: [15]
                                            }), i(S, null, {
                                                default: n(() => [i(he, {
                                                    label: Q.value,
                                                    outline: "",
                                                    "no-caps": "",
                                                    size: "sm",
                                                    dense: ""
                                                }, {
                                                    default: n(() => [i(J, null, {
                                                        default: n(() => [i($, {
                                                            clickable: "",
                                                            onClick: t[3] || (t[3] = o => Q.value = "System")
                                                        }, {
                                                            default: n(() => [i(S, null, {
                                                                default: n(() => [i(E, null, {
                                                                    default: n(() => t[16] || (t[16] = [x("System", -1)])),
                                                                    _: 1,
                                                                    __: [16]
                                                                })]),
                                                                _: 1
                                                            })]),
                                                            _: 1
                                                        }), i($, {
                                                            clickable: "",
                                                            onClick: t[4] || (t[4] = o => Q.value = "Light")
                                                        }, {
                                                            default: n(() => [i(S, null, {
                                                                default: n(() => [i(E, null, {
                                                                    default: n(() => t[17] || (t[17] = [x("Light", -1)])),
                                                                    _: 1,
                                                                    __: [17]
                                                                })]),
                                                                _: 1
                                                            })]),
                                                            _: 1
                                                        }), i($, {
                                                            clickable: "",
                                                            onClick: t[5] || (t[5] = o => Q.value = "Dark")
                                                        }, {
                                                            default: n(() => [i(S, null, {
                                                                default: n(() => [i(E, null, {
                                                                    default: n(() => t[18] || (t[18] = [x("Dark", -1)])),
                                                                    _: 1,
                                                                    __: [18]
                                                                })]),
                                                                _: 1
                                                            })]),
                                                            _: 1
                                                        })]),
                                                        _: 1
                                                    })]),
                                                    _: 1
                                                }, 8, ["label"])]),
                                                _: 1
                                            })]),
                                            _: 1
                                        })]),
                                        _: 1
                                    }), i(ve), v("div", null, [v("p", Wt, "Version " + C(q(I)), 1)])]), i(ie, {
                                        vertical: "",
                                        inset: "",
                                        class: "q-mx-lg"
                                    }), v("div", Kt, [i(rt, {
                                        size: "72px",
                                        onClick: t[6] || (t[6] = o => j.value = !0),
                                        class: "image-container cursor-pointer"
                                    }, {
                                        default: n(() => [v("img", {
                                            src: M.value ? M.value.url : "https://cdn.quasar.dev/img/boy-avatar.png"
                                        }, null, 8, Yt), v("div", Xt, [i(U, {
                                            class: "edit-icon",
                                            name: "edit",
                                            size: "25px",
                                            color: "white"
                                        })])]),
                                        _: 1
                                    }), v("div", Zt, [x(C(re.value) + " ", 1), v("div", ei, "@" + C(se.value), 1)]), i(L, {
                                        color: "primary",
                                        label: "Logout",
                                        push: "",
                                        size: "sm",
                                        onClick: Ie
                                    })])])]),
                                    _: 1
                                }, 8, ["label"])]),
                                _: 1
                            })]),
                            _: 1
                        })])]),
                        _: 1
                    }), i(bt, {
                        modelValue: y.value,
                        "onUpdate:modelValue": t[9] || (t[9] = o => y.value = o),
                        "content-class": "bg-grey-1",
                        side: "left",
                        overlay: "",
                        elevated: ""
                    }, {
                        default: n(() => [i(J, null, {
                            default: n(() => [i(ct, {
                                class: "q-ma-sm",
                                modelValue: Z.value,
                                "onUpdate:modelValue": [t[7] || (t[7] = o => Z.value = o), t[8] || (t[8] = o => Re())],
                                placeholder: "Filter",
                                filled: "",
                                debounce: "1000",
                                dense: ""
                            }, {
                                append: n(() => [i(U, {
                                    name: "search"
                                })]),
                                _: 1
                            }, 8, ["modelValue"]), (b(!0), V(K, null, Y(Fe.value, o => (b(), A(Ot, Ae({
                                key: o.title
                            }, {
                                ref_for: !0
                            }, o), null, 16))), 128))]),
                            _: 1
                        })]),
                        _: 1
                    }, 8, ["modelValue"]), i(kt, null, {
                        default: n(() => [i(p)]),
                        _: 1
                    }), i(dt, {
                        modelValue: k.value,
                        "onUpdate:modelValue": t[11] || (t[11] = o => k.value = o),
                        persistent: "",
                        "transition-show": "fade",
                        "transition-hide": "fade"
                    }, {
                        default: n(() => [i(ut, {
                            class: "q-pa-none shadow-10",
                            style: {
                                width: "460px",
                                "max-width": "95vw",
                                "border-radius": "14px"
                            }
                        }, {
                            default: n(() => [i(ue, {
                                class: "row items-center justify-between bg-primary text-white q-py-sm q-px-md"
                            }, {
                                default: n(() => [t[20] || (t[20] = v("div", {
                                    class: "text-h6"
                                }, "🔔 Notifications", -1)), de(i(L, {
                                    icon: "close",
                                    flat: "",
                                    round: "",
                                    dense: ""
                                }, null, 512), [
                                    [ge]
                                ])]),
                                _: 1,
                                __: [20]
                            }), i(ue, {
                                class: "q-pa-md"
                            }, {
                                default: n(() => [i(S, null, {
                                    default: n(() => [v("div", ti, [x(C(G.value.message) + " ", 1), G.value.meta ? (b(), V("span", {
                                        key: 0,
                                        class: "text-blue text-caption cursor-pointer",
                                        onClick: t[10] || (t[10] = o => Ve(G.value.meta))
                                    }, "...View Details")) : z("", !0)]), v("div", ii, C(ne(G.value.created_at)), 1)]),
                                    _: 1
                                })]),
                                _: 1
                            }), i(ie)]),
                            _: 1
                        })]),
                        _: 1
                    }, 8, ["modelValue"]), i(q(r), {
                        open: j.value,
                        userAvatar: M.value,
                        onClose: t[12] || (t[12] = o => j.value = !1),
                        onSave: Ne
                    }, null, 8, ["open", "userAvatar"]), i(q(a), {
                        open: B.value,
                        onClose: qe
                    }, null, 8, ["open"])]),
                    _: 1
                })
            }
        }
    },
    oi = Pe(ai, [
        ["__scopeId", "data-v-5cb1d303"]
    ]),
    Ai = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: oi
    }, Symbol.toStringTag, {
        value: "Module"
    }));
export {
    Ai as M, Si as r
};