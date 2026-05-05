import {
    b as ge,
    aR as ke,
    aE as Se,
    aT as qe,
    j as Ae,
    aF as Be,
    aV as Ce,
    $ as Te,
    a0 as Q,
    a1 as Me,
    r as h,
    V as o,
    aX as $e,
    bi as xe,
    w as c,
    bj as De,
    n as ee,
    bk as _,
    i as Oe,
    k as _e,
    v as We,
    h as W,
    bl as te,
    _ as Le,
    d as Pe,
    ae as Ne
} from "./index-BA5ou0W-.js";
import {
    T as j
} from "./TouchPan-_lIrL9iK.js";
const ae = 150,
    Fe = ge({
        name: "QDrawer",
        inheritAttrs: !1,
        props: { ...qe,
            ...Se,
            side: {
                type: String,
                default: "left",
                validator: t => ["left", "right"].includes(t)
            },
            width: {
                type: Number,
                default: 300
            },
            mini: Boolean,
            miniToOverlay: Boolean,
            miniWidth: {
                type: Number,
                default: 57
            },
            noMiniAnimation: Boolean,
            breakpoint: {
                type: Number,
                default: 1023
            },
            showIfAbove: Boolean,
            behavior: {
                type: String,
                validator: t => ["default", "desktop", "mobile"].includes(t),
                default: "default"
            },
            bordered: Boolean,
            elevated: Boolean,
            overlay: Boolean,
            persistent: Boolean,
            noSwipeOpen: Boolean,
            noSwipeClose: Boolean,
            noSwipeBackdrop: Boolean
        },
        emits: [...ke, "onLayout", "miniState"],
        setup(t, {
            slots: S,
            emit: y,
            attrs: C
        }) {
            const w = Ae(),
                {
                    proxy: {
                        $q: v
                    }
                } = w,
                H = Be(t, v),
                {
                    preventBodyScroll: $
                } = De(),
                {
                    registerTimeout: L,
                    removeTimeout: U
                } = Ce(),
                a = Te(Me, Q);
            if (a === Q) return console.error("QDrawer needs to be child of QLayout"), Q;
            let r, f = null,
                s;
            const u = h(t.behavior === "mobile" || t.behavior !== "desktop" && a.totalWidth.value <= t.breakpoint),
                q = o(() => t.mini === !0 && u.value !== !0),
                l = o(() => q.value === !0 ? t.miniWidth : t.width),
                n = h(t.showIfAbove === !0 && u.value === !1 ? !0 : t.modelValue === !0),
                X = o(() => t.persistent !== !0 && (u.value === !0 || ne.value === !0));

            function K(e, i) {
                if (ie(), e !== !1 && a.animate(), m(0), u.value === !0) {
                    const d = a.instances[D.value];
                    d ? .belowBreakpoint === !0 && d.hide(!1), g(1), a.isContainer.value !== !0 && $(!0)
                } else g(0), e !== !1 && F(!1);
                L(() => {
                    e !== !1 && F(!0), i !== !0 && y("show", e)
                }, ae)
            }

            function G(e, i) {
                le(), e !== !1 && a.animate(), g(0), m(A.value * l.value), V(), i !== !0 ? L(() => {
                    y("hide", e)
                }, ae) : U()
            }
            const {
                show: P,
                hide: T
            } = $e({
                showing: n,
                hideOnRouteChange: X,
                handleShow: K,
                handleHide: G
            }), {
                addToHistory: ie,
                removeFromHistory: le
            } = xe(n, T, X), x = {
                belowBreakpoint: u,
                hide: T
            }, b = o(() => t.side === "right"), A = o(() => (v.lang.rtl === !0 ? -1 : 1) * (b.value === !0 ? 1 : -1)), J = h(0), B = h(!1), N = h(!1), Y = h(l.value * A.value), D = o(() => b.value === !0 ? "left" : "right"), I = o(() => n.value === !0 && u.value === !1 && t.overlay === !1 ? t.miniToOverlay === !0 ? t.miniWidth : l.value : 0), R = o(() => t.overlay === !0 || t.miniToOverlay === !0 || a.view.value.indexOf(b.value ? "R" : "L") !== -1 || v.platform.is.ios === !0 && a.isContainer.value === !0), M = o(() => t.overlay === !1 && n.value === !0 && u.value === !1), ne = o(() => t.overlay === !0 && n.value === !0 && u.value === !1), oe = o(() => "fullscreen q-drawer__backdrop" + (n.value === !1 && B.value === !1 ? " hidden" : "")), ue = o(() => ({
                backgroundColor: `rgba(0,0,0,${J.value*.4})`
            })), Z = o(() => b.value === !0 ? a.rows.value.top[2] === "r" : a.rows.value.top[0] === "l"), re = o(() => b.value === !0 ? a.rows.value.bottom[2] === "r" : a.rows.value.bottom[0] === "l"), se = o(() => {
                const e = {};
                return a.header.space === !0 && Z.value === !1 && (R.value === !0 ? e.top = `${a.header.offset}px` : a.header.space === !0 && (e.top = `${a.header.size}px`)), a.footer.space === !0 && re.value === !1 && (R.value === !0 ? e.bottom = `${a.footer.offset}px` : a.footer.space === !0 && (e.bottom = `${a.footer.size}px`)), e
            }), ce = o(() => {
                const e = {
                    width: `${l.value}px`,
                    transform: `translateX(${Y.value}px)`
                };
                return u.value === !0 ? e : Object.assign(e, se.value)
            }), de = o(() => "q-drawer__content fit " + (a.isContainer.value !== !0 ? "scroll" : "overflow-auto")), ve = o(() => `q-drawer q-drawer--${t.side}` + (N.value === !0 ? " q-drawer--mini-animate" : "") + (t.bordered === !0 ? " q-drawer--bordered" : "") + (H.value === !0 ? " q-drawer--dark q-dark" : "") + (B.value === !0 ? " no-transition" : n.value === !0 ? "" : " q-layout--prevent-focus") + (u.value === !0 ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${q.value===!0?"mini":"standard"}` + (R.value === !0 || M.value !== !0 ? " fixed" : "") + (t.overlay === !0 || t.miniToOverlay === !0 ? " q-drawer--on-top" : "") + (Z.value === !0 ? " q-drawer--top-padding" : ""))), fe = o(() => {
                const e = v.lang.rtl === !0 ? t.side : D.value;
                return [
                    [j, be, void 0, {
                        [e]: !0,
                        mouse: !0
                    }]
                ]
            }), me = o(() => {
                const e = v.lang.rtl === !0 ? D.value : t.side;
                return [
                    [j, p, void 0, {
                        [e]: !0,
                        mouse: !0
                    }]
                ]
            }), he = o(() => {
                const e = v.lang.rtl === !0 ? D.value : t.side;
                return [
                    [j, p, void 0, {
                        [e]: !0,
                        mouse: !0,
                        mouseAllDir: !0
                    }]
                ]
            });

            function z() {
                we(u, t.behavior === "mobile" || t.behavior !== "desktop" && a.totalWidth.value <= t.breakpoint)
            }
            c(u, e => {
                e === !0 ? (r = n.value, n.value === !0 && T(!1)) : t.overlay === !1 && t.behavior !== "mobile" && r !== !1 && (n.value === !0 ? (m(0), g(0), V()) : P(!1))
            }), c(() => t.side, (e, i) => {
                a.instances[i] === x && (a.instances[i] = void 0, a[i].space = !1, a[i].offset = 0), a.instances[e] = x, a[e].size = l.value, a[e].space = M.value, a[e].offset = I.value
            }), c(a.totalWidth, () => {
                (a.isContainer.value === !0 || document.qScrollPrevented !== !0) && z()
            }), c(() => t.behavior + t.breakpoint, z), c(a.isContainer, e => {
                n.value === !0 && $(e !== !0), e === !0 && z()
            }), c(a.scrollbarWidth, () => {
                m(n.value === !0 ? 0 : void 0)
            }), c(I, e => {
                k("offset", e)
            }), c(M, e => {
                y("onLayout", e), k("space", e)
            }), c(b, () => {
                m()
            }), c(l, e => {
                m(), E(t.miniToOverlay, e)
            }), c(() => t.miniToOverlay, e => {
                E(e, l.value)
            }), c(() => v.lang.rtl, () => {
                m()
            }), c(() => t.mini, () => {
                t.noMiniAnimation || t.modelValue === !0 && (ye(), a.animate())
            }), c(q, e => {
                y("miniState", e)
            });

            function m(e) {
                e === void 0 ? ee(() => {
                    e = n.value === !0 ? 0 : l.value, m(A.value * e)
                }) : (a.isContainer.value === !0 && b.value === !0 && (u.value === !0 || Math.abs(e) === l.value) && (e += A.value * a.scrollbarWidth.value), Y.value = e)
            }

            function g(e) {
                J.value = e
            }

            function F(e) {
                const i = e === !0 ? "remove" : a.isContainer.value !== !0 ? "add" : "";
                i !== "" && document.body.classList[i]("q-body--drawer-toggle")
            }

            function ye() {
                f !== null && clearTimeout(f), w.proxy && w.proxy.$el && w.proxy.$el.classList.add("q-drawer--mini-animate"), N.value = !0, f = setTimeout(() => {
                    f = null, N.value = !1, w ? .proxy ? .$el ? .classList.remove("q-drawer--mini-animate")
                }, 150)
            }

            function be(e) {
                if (n.value !== !1) return;
                const i = l.value,
                    d = _(e.distance.x, 0, i);
                if (e.isFinal === !0) {
                    d >= Math.min(75, i) === !0 ? P() : (a.animate(), g(0), m(A.value * i)), B.value = !1;
                    return
                }
                m((v.lang.rtl === !0 ? b.value !== !0 : b.value) ? Math.max(i - d, 0) : Math.min(0, d - i)), g(_(d / i, 0, 1)), e.isFirst === !0 && (B.value = !0)
            }

            function p(e) {
                if (n.value !== !0) return;
                const i = l.value,
                    d = e.direction === t.side,
                    O = (v.lang.rtl === !0 ? d !== !0 : d) ? _(e.distance.x, 0, i) : 0;
                if (e.isFinal === !0) {
                    Math.abs(O) < Math.min(75, i) === !0 ? (a.animate(), g(1), m(0)) : T(), B.value = !1;
                    return
                }
                m(A.value * O), g(_(1 - O / i, 0, 1)), e.isFirst === !0 && (B.value = !0)
            }

            function V() {
                $(!1), F(!0)
            }

            function k(e, i) {
                a.update(t.side, e, i)
            }

            function we(e, i) {
                e.value !== i && (e.value = i)
            }

            function E(e, i) {
                k("size", e === !0 ? t.miniWidth : i)
            }
            return a.instances[t.side] = x, E(t.miniToOverlay, l.value), k("space", M.value), k("offset", I.value), t.showIfAbove === !0 && t.modelValue !== !0 && n.value === !0 && t["onUpdate:modelValue"] !== void 0 && y("update:modelValue", !0), Oe(() => {
                y("onLayout", M.value), y("miniState", q.value), r = t.showIfAbove === !0;
                const e = () => {
                    (n.value === !0 ? K : G)(!1, !0)
                };
                if (a.totalWidth.value !== 0) {
                    ee(e);
                    return
                }
                s = c(a.totalWidth, () => {
                    s(), s = void 0, n.value === !1 && t.showIfAbove === !0 && u.value === !1 ? P(!1) : e()
                })
            }), _e(() => {
                s ? .(), f !== null && (clearTimeout(f), f = null), n.value === !0 && V(), a.instances[t.side] === x && (a.instances[t.side] = void 0, k("size", 0), k("offset", 0), k("space", !1))
            }), () => {
                const e = [];
                u.value === !0 && (t.noSwipeOpen === !1 && e.push(We(W("div", {
                    key: "open",
                    class: `q-drawer__opener fixed-${t.side}`,
                    "aria-hidden": "true"
                }), fe.value)), e.push(te("div", {
                    ref: "backdrop",
                    class: oe.value,
                    style: ue.value,
                    "aria-hidden": "true",
                    onClick: T
                }, void 0, "backdrop", t.noSwipeBackdrop !== !0 && n.value === !0, () => he.value)));
                const i = q.value === !0 && S.mini !== void 0,
                    d = [W("div", { ...C,
                        key: "" + i,
                        class: [de.value, C.class]
                    }, i === !0 ? S.mini() : Le(S.default))];
                return t.elevated === !0 && n.value === !0 && d.push(W("div", {
                    class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
                })), e.push(te("aside", {
                    ref: "content",
                    class: ve.value,
                    style: ce.value
                }, d, "contentclose", t.noSwipeClose !== !0 && u.value === !0, () => me.value)), W("div", {
                    class: "q-drawer-container"
                }, e)
            }
        }
    }),
    Ve = Pe("notification", () => {
        const t = h([]);
        h([]);
        const S = h(!1),
            y = h(null),
            C = h(null),
            w = h(null),
            v = async ({
                limit: a = 10
            } = {}) => {
                S.value = !0, y.value = null;
                try {
                    const {
                        data: r
                    } = await Ne.get("v3/notification/get-notification", {
                        params: {
                            limit: a
                        }
                    });
                    t.value = Array.isArray(r ? .notifications) ? r.notifications : [], C.value = r ? .unread_count ? ? 0, w.value = r ? .all_count ? ? 0
                } catch (r) {
                    console.error("Error fetching notifications:", r), y.value = r
                } finally {
                    S.value = !1
                }
            };
        return {
            notifications: t,
            loading: S,
            error: y,
            unreadCount: C,
            allCount: w,
            getUserNotifications: v,
            addNotification: a => {
                (Array.isArray(a) ? a : [a]).forEach(s => {
                    const u = s.id ? ? `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
                    t.value.some(l => l.id && l.id === u || l.meta ? .sent_at && l.title && l.message && l.meta.sent_at === s.meta ? .sent_at && l.title === s.title && l.message === s.message) || t.value.unshift({
                        id: u,
                        title: s.title ? ? "",
                        message: s.message ? ? "",
                        meta: s.meta ? ? {},
                        users: Array.isArray(s.users) ? s.users : [],
                        read: !1,
                        created_at: s.meta ? .sent_at ? ? new Date().toISOString()
                    })
                });
                const f = 200;
                t.value.length > f && (t.value.length = f), v()
            },
            markAsRead: a => {
                const r = t.value.find(f => f.id === a);
                r && (r.read = !0)
            },
            markAllRead: () => {
                t.value.forEach(a => a.read = !0)
            },
            removeNotification: a => {
                t.value = t.value.filter(r => r.id !== a)
            }
        }
    });
export {
    Fe as Q, Ve as u
};