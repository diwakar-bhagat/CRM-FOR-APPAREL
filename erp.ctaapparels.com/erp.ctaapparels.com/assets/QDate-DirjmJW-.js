import {
    V as v,
    aD as I,
    b as ua,
    aE as ia,
    aA as sa,
    j as da,
    aF as va,
    aG as ca,
    r as C,
    aH as fa,
    w as Q,
    n as Fe,
    h as i,
    T as U,
    _ as ma,
    aC as ha,
    x as k
} from "./index-BA5ou0W-.js";
import {
    u as ya
} from "./use-render-cache-DLxPkVnQ.js";
import {
    t as ga,
    a as Ie,
    f as ba,
    g as _a,
    j as be,
    _ as Da
} from "./date-cIYipMv-.js";
const xa = ["gregorian", "persian"],
    Be = {
        mask: {
            type: String
        },
        locale: Object,
        calendar: {
            type: String,
            validator: n => xa.includes(n),
            default: "gregorian"
        },
        landscape: Boolean,
        color: String,
        textColor: String,
        square: Boolean,
        flat: Boolean,
        bordered: Boolean,
        readonly: Boolean,
        disable: Boolean
    },
    Ma = ["update:modelValue"];

function V(n) {
    return n.year + "/" + I(n.month) + "/" + I(n.day)
}

function wa(n, G) {
    const w = v(() => n.disable !== !0 && n.readonly !== !0),
        L = v(() => w.value === !0 ? 0 : -1),
        m = v(() => {
            const h = [];
            return n.color !== void 0 && h.push(`bg-${n.color}`), n.textColor !== void 0 && h.push(`text-${n.textColor}`), h.join(" ")
        });

    function ne() {
        return n.locale !== void 0 ? { ...G.lang.date,
            ...n.locale
        } : G.lang.date
    }

    function D(h) {
        const B = new Date,
            j = h === !0 ? null : 0;
        if (n.calendar === "persian") {
            const $ = ga(B);
            return {
                year: $.jy,
                month: $.jm,
                day: $.jd
            }
        }
        return {
            year: B.getFullYear(),
            month: B.getMonth() + 1,
            day: B.getDate(),
            hour: j,
            minute: j,
            second: j,
            millisecond: j
        }
    }
    return {
        editable: w,
        tabindex: L,
        headerClass: m,
        getLocale: ne,
        getCurrentDate: D
    }
}
const H = 20,
    qa = ["Calendar", "Years", "Months"],
    $e = n => qa.includes(n),
    _e = n => /^-?[\d]+\/[0-1]\d$/.test(n),
    z = " — ";

function S(n) {
    return n.year + "/" + I(n.month)
}
const Ya = ua({
    name: "QDate",
    props: { ...Be,
        ...sa,
        ...ia,
        modelValue: {
            required: !0,
            validator: n => typeof n == "string" || Array.isArray(n) === !0 || Object(n) === n || n === null
        },
        multiple: Boolean,
        range: Boolean,
        title: String,
        subtitle: String,
        mask: { ...Be.mask,
            default: "YYYY/MM/DD"
        },
        defaultYearMonth: {
            type: String,
            validator: _e
        },
        yearsInMonthView: Boolean,
        events: [Array, Function],
        eventColor: [String, Function],
        emitImmediately: Boolean,
        options: [Array, Function],
        navigationMinYearMonth: {
            type: String,
            validator: _e
        },
        navigationMaxYearMonth: {
            type: String,
            validator: _e
        },
        noUnset: Boolean,
        firstDayOfWeek: [String, Number],
        todayBtn: Boolean,
        minimal: Boolean,
        defaultView: {
            type: String,
            default: "Calendar",
            validator: $e
        }
    },
    emits: [...Ma, "rangeStart", "rangeEnd", "navigation"],
    setup(n, {
        slots: G,
        emit: w
    }) {
        const {
            proxy: L
        } = da(), {
            $q: m
        } = L, ne = va(n, m), {
            getCache: D
        } = ya(), {
            tabindex: h,
            headerClass: B,
            getLocale: j,
            getCurrentDate: $
        } = wa(n, m);
        let le;
        const Ae = ca(n),
            Ee = ha(Ae),
            oe = C(null),
            O = C(He()),
            f = C(j()),
            Re = v(() => He()),
            Ne = v(() => j()),
            q = v(() => $()),
            u = C(Ye(O.value, f.value)),
            _ = C(n.defaultView),
            De = v(() => m.lang.rtl === !0 ? "right" : "left"),
            K = C(De.value),
            re = C(De.value),
            ue = u.value.year,
            X = C(ue - ue % H - (ue < 0 ? H : 0)),
            b = C(null),
            ze = v(() => {
                const e = n.landscape === !0 ? "landscape" : "portrait";
                return `q-date q-date--${e} q-date--${e}-${n.minimal===!0?"minimal":"standard"}` + (ne.value === !0 ? " q-date--dark q-dark" : "") + (n.bordered === !0 ? " q-date--bordered" : "") + (n.square === !0 ? " q-date--square no-border-radius" : "") + (n.flat === !0 ? " q-date--flat no-shadow" : "") + (n.disable === !0 ? " disabled" : n.readonly === !0 ? " q-date--readonly" : "")
            }),
            T = v(() => n.color || "primary"),
            A = v(() => n.textColor || "white"),
            Z = v(() => n.emitImmediately === !0 && n.multiple !== !0 && n.range !== !0),
            ie = v(() => Array.isArray(n.modelValue) === !0 ? n.modelValue : n.modelValue !== null && n.modelValue !== void 0 ? [n.modelValue] : []),
            M = v(() => ie.value.filter(e => typeof e == "string").map(e => fe(e, O.value, f.value)).filter(e => e.dateHash !== null && e.day !== null && e.month !== null && e.year !== null)),
            E = v(() => {
                const e = a => fe(a, O.value, f.value);
                return ie.value.filter(a => fa(a) === !0 && a.from !== void 0 && a.to !== void 0).map(a => ({
                    from: e(a.from),
                    to: e(a.to)
                })).filter(a => a.from.dateHash !== null && a.to.dateHash !== null && a.from.dateHash < a.to.dateHash)
            }),
            p = v(() => n.calendar !== "persian" ? e => new Date(e.year, e.month - 1, e.day) : e => {
                const a = Ie(e.year, e.month, e.day);
                return new Date(a.gy, a.gm - 1, a.gd)
            }),
            se = v(() => n.calendar === "persian" ? V : (e, a, t) => ba(new Date(e.year, e.month - 1, e.day, e.hour, e.minute, e.second, e.millisecond), a === void 0 ? O.value : a, t === void 0 ? f.value : t, e.year, e.timezoneOffset)),
            W = v(() => M.value.length + E.value.reduce((e, a) => e + 1 + _a(p.value(a.to), p.value(a.from)), 0)),
            xe = v(() => {
                if (n.title !== void 0 && n.title !== null && n.title.length !== 0) return n.title;
                if (b.value !== null) {
                    const t = b.value.init,
                        l = p.value(t);
                    return f.value.daysShort[l.getDay()] + ", " + f.value.monthsShort[t.month - 1] + " " + t.day + z + "?"
                }
                if (W.value === 0) return z;
                if (W.value > 1) return `${W.value} ${f.value.pluralDay}`;
                const e = M.value[0],
                    a = p.value(e);
                return isNaN(a.valueOf()) === !0 ? z : f.value.headerTitle !== void 0 ? f.value.headerTitle(a, e) : f.value.daysShort[a.getDay()] + ", " + f.value.monthsShort[e.month - 1] + " " + e.day
            }),
            Le = v(() => M.value.concat(E.value.map(a => a.from)).sort((a, t) => a.year - t.year || a.month - t.month)[0]),
            We = v(() => M.value.concat(E.value.map(a => a.to)).sort((a, t) => t.year - a.year || t.month - a.month)[0]),
            Me = v(() => {
                if (n.subtitle !== void 0 && n.subtitle !== null && n.subtitle.length !== 0) return n.subtitle;
                if (W.value === 0) return z;
                if (W.value > 1) {
                    const e = Le.value,
                        a = We.value,
                        t = f.value.monthsShort;
                    return t[e.month - 1] + (e.year !== a.year ? " " + e.year + z + t[a.month - 1] + " " : e.month !== a.month ? z + t[a.month - 1] : "") + " " + a.year
                }
                return M.value[0].year
            }),
            ee = v(() => {
                const e = [m.iconSet.datetime.arrowLeft, m.iconSet.datetime.arrowRight];
                return m.lang.rtl === !0 ? e.reverse() : e
            }),
            we = v(() => n.firstDayOfWeek !== void 0 ? Number(n.firstDayOfWeek) : f.value.firstDayOfWeek),
            Je = v(() => {
                const e = f.value.daysShort,
                    a = we.value;
                return a > 0 ? e.slice(a, 7).concat(e.slice(0, a)) : e
            }),
            Y = v(() => {
                const e = u.value;
                return n.calendar !== "persian" ? new Date(e.year, e.month, 0).getDate() : be(e.year, e.month)
            }),
            Pe = v(() => typeof n.eventColor == "function" ? n.eventColor : () => n.eventColor),
            y = v(() => {
                if (n.navigationMinYearMonth === void 0) return null;
                const e = n.navigationMinYearMonth.split("/");
                return {
                    year: parseInt(e[0], 10),
                    month: parseInt(e[1], 10)
                }
            }),
            g = v(() => {
                if (n.navigationMaxYearMonth === void 0) return null;
                const e = n.navigationMaxYearMonth.split("/");
                return {
                    year: parseInt(e[0], 10),
                    month: parseInt(e[1], 10)
                }
            }),
            de = v(() => {
                const e = {
                    month: {
                        prev: !0,
                        next: !0
                    },
                    year: {
                        prev: !0,
                        next: !0
                    }
                };
                return y.value !== null && y.value.year >= u.value.year && (e.year.prev = !1, y.value.year === u.value.year && y.value.month >= u.value.month && (e.month.prev = !1)), g.value !== null && g.value.year <= u.value.year && (e.year.next = !1, g.value.year === u.value.year && g.value.month <= u.value.month && (e.month.next = !1)), e
            }),
            ae = v(() => {
                const e = {};
                return M.value.forEach(a => {
                    const t = S(a);
                    e[t] === void 0 && (e[t] = []), e[t].push(a.day)
                }), e
            }),
            qe = v(() => {
                const e = {};
                return E.value.forEach(a => {
                    const t = S(a.from),
                        l = S(a.to);
                    if (e[t] === void 0 && (e[t] = []), e[t].push({
                            from: a.from.day,
                            to: t === l ? a.to.day : void 0,
                            range: a
                        }), t < l) {
                        let o;
                        const {
                            year: d,
                            month: r
                        } = a.from, s = r < 12 ? {
                            year: d,
                            month: r + 1
                        } : {
                            year: d + 1,
                            month: 1
                        };
                        for (;
                            (o = S(s)) <= l;) e[o] === void 0 && (e[o] = []), e[o].push({
                            from: void 0,
                            to: o === l ? a.to.day : void 0,
                            range: a
                        }), s.month++, s.month > 12 && (s.year++, s.month = 1)
                    }
                }), e
            }),
            J = v(() => {
                if (b.value === null) return;
                const {
                    init: e,
                    initHash: a,
                    final: t,
                    finalHash: l
                } = b.value, [o, d] = a <= l ? [e, t] : [t, e], r = S(o), s = S(d);
                if (r !== x.value && s !== x.value) return;
                const c = {};
                return r === x.value ? (c.from = o.day, c.includeFrom = !0) : c.from = 1, s === x.value ? (c.to = d.day, c.includeTo = !0) : c.to = Y.value, c
            }),
            x = v(() => S(u.value)),
            Qe = v(() => {
                const e = {};
                if (n.options === void 0) {
                    for (let t = 1; t <= Y.value; t++) e[t] = !0;
                    return e
                }
                const a = typeof n.options == "function" ? n.options : t => n.options.includes(t);
                for (let t = 1; t <= Y.value; t++) {
                    const l = x.value + "/" + I(t);
                    e[t] = a(l)
                }
                return e
            }),
            Ue = v(() => {
                const e = {};
                if (n.events === void 0)
                    for (let a = 1; a <= Y.value; a++) e[a] = !1;
                else {
                    const a = typeof n.events == "function" ? n.events : t => n.events.includes(t);
                    for (let t = 1; t <= Y.value; t++) {
                        const l = x.value + "/" + I(t);
                        e[t] = a(l) === !0 && Pe.value(l)
                    }
                }
                return e
            }),
            Ge = v(() => {
                let e, a;
                const {
                    year: t,
                    month: l
                } = u.value;
                if (n.calendar !== "persian") e = new Date(t, l - 1, 1), a = new Date(t, l - 1, 0).getDate();
                else {
                    const o = Ie(t, l, 1);
                    e = new Date(o.gy, o.gm - 1, o.gd);
                    let d = l - 1,
                        r = t;
                    d === 0 && (d = 12, r--), a = be(r, d)
                }
                return {
                    days: e.getDay() - we.value - 1,
                    endDay: a
                }
            }),
            Ce = v(() => {
                const e = [],
                    {
                        days: a,
                        endDay: t
                    } = Ge.value,
                    l = a < 0 ? a + 7 : a;
                if (l < 6)
                    for (let r = t - l; r <= t; r++) e.push({
                        i: r,
                        fill: !0
                    });
                const o = e.length;
                for (let r = 1; r <= Y.value; r++) {
                    const s = {
                        i: r,
                        event: Ue.value[r],
                        classes: []
                    };
                    Qe.value[r] === !0 && (s.in = !0, s.flat = !0), e.push(s)
                }
                if (ae.value[x.value] !== void 0 && ae.value[x.value].forEach(r => {
                        const s = o + r - 1;
                        Object.assign(e[s], {
                            selected: !0,
                            unelevated: !0,
                            flat: !1,
                            color: T.value,
                            textColor: A.value
                        })
                    }), qe.value[x.value] !== void 0 && qe.value[x.value].forEach(r => {
                        if (r.from !== void 0) {
                            const s = o + r.from - 1,
                                c = o + (r.to || Y.value) - 1;
                            for (let P = s; P <= c; P++) Object.assign(e[P], {
                                range: r.range,
                                unelevated: !0,
                                color: T.value,
                                textColor: A.value
                            });
                            Object.assign(e[s], {
                                rangeFrom: !0,
                                flat: !1
                            }), r.to !== void 0 && Object.assign(e[c], {
                                rangeTo: !0,
                                flat: !1
                            })
                        } else if (r.to !== void 0) {
                            const s = o + r.to - 1;
                            for (let c = o; c <= s; c++) Object.assign(e[c], {
                                range: r.range,
                                unelevated: !0,
                                color: T.value,
                                textColor: A.value
                            });
                            Object.assign(e[s], {
                                flat: !1,
                                rangeTo: !0
                            })
                        } else {
                            const s = o + Y.value - 1;
                            for (let c = o; c <= s; c++) Object.assign(e[c], {
                                range: r.range,
                                unelevated: !0,
                                color: T.value,
                                textColor: A.value
                            })
                        }
                    }), J.value !== void 0) {
                    const r = o + J.value.from - 1,
                        s = o + J.value.to - 1;
                    for (let c = r; c <= s; c++) e[c].color = T.value, e[c].editRange = !0;
                    J.value.includeFrom === !0 && (e[r].editRangeFrom = !0), J.value.includeTo === !0 && (e[s].editRangeTo = !0)
                }
                u.value.year === q.value.year && u.value.month === q.value.month && (e[o + q.value.day - 1].today = !0);
                const d = e.length % 7;
                if (d > 0) {
                    const r = 7 - d;
                    for (let s = 1; s <= r; s++) e.push({
                        i: s,
                        fill: !0
                    })
                }
                return e.forEach(r => {
                    let s = "q-date__calendar-item ";
                    r.fill === !0 ? s += "q-date__calendar-item--fill" : (s += `q-date__calendar-item--${r.in===!0?"in":"out"}`, r.range !== void 0 && (s += ` q-date__range${r.rangeTo===!0?"-to":r.rangeFrom===!0?"-from":""}`), r.editRange === !0 && (s += ` q-date__edit-range${r.editRangeFrom===!0?"-from":""}${r.editRangeTo===!0?"-to":""}`), (r.range !== void 0 || r.editRange === !0) && (s += ` text-${r.color}`)), r.classes = s
                }), e
            }),
            Ke = v(() => n.disable === !0 ? {
                "aria-disabled": "true"
            } : {});
        Q(() => n.modelValue, e => {
            if (le === JSON.stringify(e)) le = 0;
            else {
                const a = Ye(O.value, f.value);
                R(a.year, a.month, a)
            }
        }), Q(_, () => {
            oe.value !== null && L.$el.contains(document.activeElement) === !0 && oe.value.focus()
        }), Q(() => u.value.year + "|" + u.value.month, () => {
            w("navigation", {
                year: u.value.year,
                month: u.value.month
            })
        }), Q(Re, e => {
            Te(e, f.value, "mask"), O.value = e
        }), Q(Ne, e => {
            Te(O.value, e, "locale"), f.value = e
        });

        function ve(e) {
            le = JSON.stringify(e)
        }

        function ke() {
            const {
                year: e,
                month: a,
                day: t
            } = q.value, l = { ...u.value,
                year: e,
                month: a,
                day: t
            }, o = ae.value[S(l)];
            (o === void 0 || o.includes(l.day) === !1) && he(l), ce(l.year, l.month)
        }

        function Xe(e) {
            $e(e) === !0 && (_.value = e)
        }

        function Ze(e, a) {
            ["month", "year"].includes(e) && (e === "month" ? Se : me)(a === !0 ? -1 : 1)
        }

        function ce(e, a) {
            _.value = "Calendar", R(e, a)
        }

        function pe(e, a) {
            if (n.range === !1 || !e) {
                b.value = null;
                return
            }
            const t = Object.assign({ ...u.value
                }, e),
                l = a !== void 0 ? Object.assign({ ...u.value
                }, a) : t;
            b.value = {
                init: t,
                initHash: V(t),
                final: l,
                finalHash: V(l)
            }, ce(t.year, t.month)
        }

        function He() {
            return n.calendar === "persian" ? "YYYY/MM/DD" : n.mask
        }

        function fe(e, a, t) {
            return Da(e, a, t, n.calendar, {
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0
            })
        }

        function Ye(e, a) {
            const t = Array.isArray(n.modelValue) === !0 ? n.modelValue : n.modelValue ? [n.modelValue] : [];
            if (t.length === 0) return Ve();
            const l = t[t.length - 1],
                o = fe(l.from !== void 0 ? l.from : l, e, a);
            return o.dateHash === null ? Ve() : o
        }

        function Ve() {
            let e, a;
            if (n.defaultYearMonth !== void 0) {
                const t = n.defaultYearMonth.split("/");
                e = parseInt(t[0], 10), a = parseInt(t[1], 10)
            } else {
                const t = q.value !== void 0 ? q.value : $();
                e = t.year, a = t.month
            }
            return {
                year: e,
                month: a,
                day: 1,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
                dateHash: e + "/" + I(a) + "/01"
            }
        }

        function Se(e) {
            let a = u.value.year,
                t = Number(u.value.month) + e;
            t === 13 ? (t = 1, a++) : t === 0 && (t = 12, a--), R(a, t), Z.value === !0 && te("month")
        }

        function me(e) {
            const a = Number(u.value.year) + e;
            R(a, u.value.month), Z.value === !0 && te("year")
        }

        function ea(e) {
            R(e, u.value.month), _.value = n.defaultView === "Years" ? "Months" : "Calendar", Z.value === !0 && te("year")
        }

        function aa(e) {
            R(u.value.year, e), _.value = "Calendar", Z.value === !0 && te("month")
        }

        function ta(e, a) {
            (ae.value[a] ? .includes(e.day) === !0 ? ye : he)(e)
        }

        function F(e) {
            return {
                year: e.year,
                month: e.month,
                day: e.day
            }
        }

        function R(e, a, t) {
            if (y.value !== null && e <= y.value.year && ((a < y.value.month || e < y.value.year) && (a = y.value.month), e = y.value.year), g.value !== null && e >= g.value.year && ((a > g.value.month || e > g.value.year) && (a = g.value.month), e = g.value.year), t !== void 0) {
                const {
                    hour: o,
                    minute: d,
                    second: r,
                    millisecond: s,
                    timezoneOffset: c,
                    timeHash: P
                } = t;
                Object.assign(u.value, {
                    hour: o,
                    minute: d,
                    second: r,
                    millisecond: s,
                    timezoneOffset: c,
                    timeHash: P
                })
            }
            const l = e + "/" + I(a) + "/01";
            l !== u.value.dateHash && (K.value = u.value.dateHash < l == (m.lang.rtl !== !0) ? "left" : "right", e !== u.value.year && (re.value = K.value), Fe(() => {
                X.value = e - e % H - (e < 0 ? H : 0), Object.assign(u.value, {
                    year: e,
                    month: a,
                    day: 1,
                    dateHash: l
                })
            }))
        }

        function je(e, a, t) {
            const l = e !== null && e.length === 1 && n.multiple === !1 ? e[0] : e,
                {
                    reason: o,
                    details: d
                } = Oe(a, t);
            ve(l), w("update:modelValue", l, o, d)
        }

        function te(e) {
            const a = M.value[0] !== void 0 && M.value[0].dateHash !== null ? { ...M.value[0]
            } : { ...u.value
            };
            Fe(() => {
                a.year = u.value.year, a.month = u.value.month;
                const t = n.calendar !== "persian" ? new Date(a.year, a.month, 0).getDate() : be(a.year, a.month);
                a.day = Math.min(Math.max(1, a.day), t);
                const l = N(a),
                    {
                        details: o
                    } = Oe("", a);
                ve(l), w("update:modelValue", l, e, o)
            })
        }

        function Oe(e, a) {
            return a.from !== void 0 ? {
                reason: `${e}-range`,
                details: { ...F(a.target),
                    from: F(a.from),
                    to: F(a.to)
                }
            } : {
                reason: `${e}-day`,
                details: F(a)
            }
        }

        function N(e, a, t) {
            return e.from !== void 0 ? {
                from: se.value(e.from, a, t),
                to: se.value(e.to, a, t)
            } : se.value(e, a, t)
        }

        function he(e) {
            let a;
            if (n.multiple === !0)
                if (e.from !== void 0) {
                    const t = V(e.from),
                        l = V(e.to),
                        o = M.value.filter(r => r.dateHash < t || r.dateHash > l),
                        d = E.value.filter(({
                            from: r,
                            to: s
                        }) => s.dateHash < t || r.dateHash > l);
                    a = o.concat(d).concat(e).map(r => N(r))
                } else {
                    const t = ie.value.slice();
                    t.push(N(e)), a = t
                }
            else a = N(e);
            je(a, "add", e)
        }

        function ye(e) {
            if (n.noUnset === !0) return;
            let a = null;
            if (n.multiple === !0 && Array.isArray(n.modelValue) === !0) {
                const t = N(e);
                e.from !== void 0 ? a = n.modelValue.filter(l => l.from !== void 0 ? l.from !== t.from && l.to !== t.to : !0) : a = n.modelValue.filter(l => l !== t), a.length === 0 && (a = null)
            }
            je(a, "remove", e)
        }

        function Te(e, a, t) {
            const l = M.value.concat(E.value).map(d => N(d, e, a)).filter(d => d.from !== void 0 ? d.from.dateHash !== null && d.to.dateHash !== null : d.dateHash !== null),
                o = (n.multiple === !0 ? l : l[0]) || null;
            ve(o), w("update:modelValue", o, t)
        }

        function na() {
            if (n.minimal !== !0) return i("div", {
                class: "q-date__header " + B.value
            }, [i("div", {
                class: "relative-position"
            }, [i(U, {
                name: "q-transition--fade"
            }, () => i("div", {
                key: "h-yr-" + Me.value,
                class: "q-date__header-subtitle q-date__header-link " + (_.value === "Years" ? "q-date__header-link--active" : "cursor-pointer"),
                tabindex: h.value,
                ...D("vY", {
                    onClick() {
                        _.value = "Years"
                    },
                    onKeyup(e) {
                        e.keyCode === 13 && (_.value = "Years")
                    }
                })
            }, [Me.value]))]), i("div", {
                class: "q-date__header-title relative-position flex no-wrap"
            }, [i("div", {
                class: "relative-position col"
            }, [i(U, {
                name: "q-transition--fade"
            }, () => i("div", {
                key: "h-sub" + xe.value,
                class: "q-date__header-title-label q-date__header-link " + (_.value === "Calendar" ? "q-date__header-link--active" : "cursor-pointer"),
                tabindex: h.value,
                ...D("vC", {
                    onClick() {
                        _.value = "Calendar"
                    },
                    onKeyup(e) {
                        e.keyCode === 13 && (_.value = "Calendar")
                    }
                })
            }, [xe.value]))]), n.todayBtn === !0 ? i(k, {
                class: "q-date__header-today self-start",
                icon: m.iconSet.datetime.today,
                "aria-label": m.lang.date.today,
                flat: !0,
                size: "sm",
                round: !0,
                tabindex: h.value,
                onClick: ke
            }) : null])])
        }

        function ge({
            label: e,
            type: a,
            key: t,
            dir: l,
            goTo: o,
            boundaries: d,
            cls: r
        }) {
            return [i("div", {
                class: "row items-center q-date__arrow"
            }, [i(k, {
                round: !0,
                dense: !0,
                size: "sm",
                flat: !0,
                icon: ee.value[0],
                "aria-label": a === "Years" ? m.lang.date.prevYear : m.lang.date.prevMonth,
                tabindex: h.value,
                disable: d.prev === !1,
                ...D("go-#" + a, {
                    onClick() {
                        o(-1)
                    }
                })
            })]), i("div", {
                class: "relative-position overflow-hidden flex flex-center" + r
            }, [i(U, {
                name: "q-transition--jump-" + l
            }, () => i("div", {
                key: t
            }, [i(k, {
                flat: !0,
                dense: !0,
                noCaps: !0,
                label: e,
                tabindex: h.value,
                ...D("view#" + a, {
                    onClick: () => {
                        _.value = a
                    }
                })
            })]))]), i("div", {
                class: "row items-center q-date__arrow"
            }, [i(k, {
                round: !0,
                dense: !0,
                size: "sm",
                flat: !0,
                icon: ee.value[1],
                "aria-label": a === "Years" ? m.lang.date.nextYear : m.lang.date.nextMonth,
                tabindex: h.value,
                disable: d.next === !1,
                ...D("go+#" + a, {
                    onClick() {
                        o(1)
                    }
                })
            })])]
        }
        const la = {
            Calendar: () => [i("div", {
                key: "calendar-view",
                class: "q-date__view q-date__calendar"
            }, [i("div", {
                class: "q-date__navigation row items-center no-wrap"
            }, ge({
                label: f.value.months[u.value.month - 1],
                type: "Months",
                key: u.value.month,
                dir: K.value,
                goTo: Se,
                boundaries: de.value.month,
                cls: " col"
            }).concat(ge({
                label: u.value.year,
                type: "Years",
                key: u.value.year,
                dir: re.value,
                goTo: me,
                boundaries: de.value.year,
                cls: ""
            }))), i("div", {
                class: "q-date__calendar-weekdays row items-center no-wrap"
            }, Je.value.map(e => i("div", {
                class: "q-date__calendar-item"
            }, [i("div", e)]))), i("div", {
                class: "q-date__calendar-days-container relative-position overflow-hidden"
            }, [i(U, {
                name: "q-transition--slide-" + K.value
            }, () => i("div", {
                key: x.value,
                class: "q-date__calendar-days fit"
            }, Ce.value.map(e => i("div", {
                class: e.classes
            }, [e.in === !0 ? i(k, {
                class: e.today === !0 ? "q-date__today" : "",
                dense: !0,
                flat: e.flat,
                unelevated: e.unelevated,
                color: e.color,
                textColor: e.textColor,
                label: e.i,
                tabindex: h.value,
                ...D("day#" + e.i, {
                    onClick: () => {
                        oa(e.i)
                    },
                    onMouseover: () => {
                        ra(e.i)
                    }
                })
            }, e.event !== !1 ? () => i("div", {
                class: "q-date__event bg-" + e.event
            }) : null) : i("div", "" + e.i)]))))])])],
            Months() {
                const e = u.value.year === q.value.year,
                    a = l => y.value !== null && u.value.year === y.value.year && y.value.month > l || g.value !== null && u.value.year === g.value.year && g.value.month < l,
                    t = f.value.monthsShort.map((l, o) => {
                        const d = u.value.month === o + 1;
                        return i("div", {
                            class: "q-date__months-item flex flex-center"
                        }, [i(k, {
                            class: e === !0 && q.value.month === o + 1 ? "q-date__today" : null,
                            flat: d !== !0,
                            label: l,
                            unelevated: d,
                            color: d === !0 ? T.value : null,
                            textColor: d === !0 ? A.value : null,
                            tabindex: h.value,
                            disable: a(o + 1),
                            ...D("month#" + o, {
                                onClick: () => {
                                    aa(o + 1)
                                }
                            })
                        })])
                    });
                return n.yearsInMonthView === !0 && t.unshift(i("div", {
                    class: "row no-wrap full-width"
                }, [ge({
                    label: u.value.year,
                    type: "Years",
                    key: u.value.year,
                    dir: re.value,
                    goTo: me,
                    boundaries: de.value.year,
                    cls: " col"
                })])), i("div", {
                    key: "months-view",
                    class: "q-date__view q-date__months flex flex-center"
                }, t)
            },
            Years() {
                const e = X.value,
                    a = e + H,
                    t = [],
                    l = o => y.value !== null && y.value.year > o || g.value !== null && g.value.year < o;
                for (let o = e; o <= a; o++) {
                    const d = u.value.year === o;
                    t.push(i("div", {
                        class: "q-date__years-item flex flex-center"
                    }, [i(k, {
                        key: "yr" + o,
                        class: q.value.year === o ? "q-date__today" : null,
                        flat: !d,
                        label: o,
                        dense: !0,
                        unelevated: d,
                        color: d === !0 ? T.value : null,
                        textColor: d === !0 ? A.value : null,
                        tabindex: h.value,
                        disable: l(o),
                        ...D("yr#" + o, {
                            onClick: () => {
                                ea(o)
                            }
                        })
                    })]))
                }
                return i("div", {
                    class: "q-date__view q-date__years flex flex-center"
                }, [i("div", {
                    class: "col-auto"
                }, [i(k, {
                    round: !0,
                    dense: !0,
                    flat: !0,
                    icon: ee.value[0],
                    "aria-label": m.lang.date.prevRangeYears(H),
                    tabindex: h.value,
                    disable: l(e),
                    ...D("y-", {
                        onClick: () => {
                            X.value -= H
                        }
                    })
                })]), i("div", {
                    class: "q-date__years-content col self-stretch row items-center"
                }, t), i("div", {
                    class: "col-auto"
                }, [i(k, {
                    round: !0,
                    dense: !0,
                    flat: !0,
                    icon: ee.value[1],
                    "aria-label": m.lang.date.nextRangeYears(H),
                    tabindex: h.value,
                    disable: l(a),
                    ...D("y+", {
                        onClick: () => {
                            X.value += H
                        }
                    })
                })])])
            }
        };

        function oa(e) {
            const a = { ...u.value,
                day: e
            };
            if (n.range === !1) {
                ta(a, x.value);
                return
            }
            if (b.value === null) {
                const t = Ce.value.find(o => o.fill !== !0 && o.i === e);
                if (n.noUnset !== !0 && t.range !== void 0) {
                    ye({
                        target: a,
                        from: t.range.from,
                        to: t.range.to
                    });
                    return
                }
                if (t.selected === !0) {
                    ye(a);
                    return
                }
                const l = V(a);
                b.value = {
                    init: a,
                    initHash: l,
                    final: a,
                    finalHash: l
                }, w("rangeStart", F(a))
            } else {
                const t = b.value.initHash,
                    l = V(a),
                    o = t <= l ? {
                        from: b.value.init,
                        to: a
                    } : {
                        from: a,
                        to: b.value.init
                    };
                b.value = null, he(t === l ? a : {
                    target: a,
                    ...o
                }), w("rangeEnd", {
                    from: F(o.from),
                    to: F(o.to)
                })
            }
        }

        function ra(e) {
            if (b.value !== null) {
                const a = { ...u.value,
                    day: e
                };
                Object.assign(b.value, {
                    final: a,
                    finalHash: V(a)
                })
            }
        }
        return Object.assign(L, {
            setToday: ke,
            setView: Xe,
            offsetCalendar: Ze,
            setCalendarTo: ce,
            setEditingRange: pe
        }), () => {
            const e = [i("div", {
                    class: "q-date__content col relative-position"
                }, [i(U, {
                    name: "q-transition--fade"
                }, la[_.value])])],
                a = ma(G.default);
            return a !== void 0 && e.push(i("div", {
                class: "q-date__actions"
            }, a)), n.name !== void 0 && n.disable !== !0 && Ee(e, "push"), i("div", {
                class: ze.value,
                ...Ke.value
            }, [na(), i("div", {
                ref: oe,
                class: "q-date__main col column",
                tabindex: -1
            }, e)])
        }
    }
});
export {
    Ya as Q, Ma as a, wa as b, V as g, Be as u
};