import {
    g as Et,
    r as b,
    z as St,
    w as te,
    V as I,
    j as xt,
    bc as zt,
    i as Yt,
    n as ga,
    h as d,
    k as Dn,
    v as Ot,
    T as $t
} from "./index-BA5ou0W-.js";
/*!
 * @quasar/quasar-ui-qcalendar v4.1.2
 * (c) 2025 Jeff Galbraith <jeff@quasar.dev>
 * Released under the MIT License.
 */
const ka = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?([^\d]+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?(.(\d{1,3}))?$/,
    Ga = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?/,
    Wa = /(\d\d?)(:(\d\d?)|)(:(\d\d?)|)/,
    Aa = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Ea = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Tt = {
        MILLISECONDS_IN: {
            SECOND: 1e3,
            MINUTE: 6e4,
            HOUR: 36e5,
            DAY: 864e5,
            WEEK: 6048e5
        },
        SECONDS_IN: {
            MINUTE: 60,
            HOUR: 3600,
            DAY: 86400,
            WEEK: 604800
        },
        MINUTES_IN: {
            MINUTE: 1,
            HOUR: 60,
            DAY: 1440,
            WEEK: 10080
        },
        HOURS_IN: {
            DAY: 24,
            WEEK: 168
        },
        DAYS_IN: {
            WEEK: 7
        }
    },
    Ja = 28,
    pa = 31,
    xa = 12,
    en = 1,
    Oa = 1,
    tn = 0;

function da(e) {
    return typeof e != "string" ? !1 : ka.test(e)
}

function le(e) {
    if (typeof e != "string") return null;
    const t = ka.exec(e);
    if (!t || !t[1] || !t[2]) return null;
    const u = parseInt(t[1], 10),
        l = parseInt(t[2], 10),
        i = parseInt(t[4] || "1", 10),
        h = parseInt(t[6] || "0", 10),
        _ = parseInt(t[8] || "0", 10);
    return {
        date: e,
        time: `${h.toString().padStart(2,"0")}:${_.toString().padStart(2,"0")}`,
        year: u,
        month: l,
        day: i,
        hour: h,
        minute: _,
        hasDay: !!t[4],
        hasTime: !0,
        past: !1,
        current: !1,
        future: !1,
        disabled: !1,
        weekday: 0,
        doy: 0,
        workweek: 0
    }
}

function Ma(e, t = !1) {
    if (!(e instanceof Date)) return null;
    const u = t ? "UTC" : "";
    return et({
        date: rt(e[`get${u}FullYear`](), 4) + "-" + rt(e[`get${u}Month`]() + 1, 2) + "-" + rt(e[`get${u}Date`](), 2),
        time: rt(e[`get${u}Hours`]() || 0, 2) + ":" + rt(e[`get${u}Minutes`]() || 0, 2),
        year: e[`get${u}FullYear`](),
        month: e[`get${u}Month`]() + 1,
        day: e[`get${u}Date`](),
        hour: e[`get${u}Hours`](),
        minute: e[`get${u}Minutes`](),
        weekday: 0,
        doy: 0,
        workweek: 0,
        hasDay: !0,
        hasTime: !0,
        past: !1,
        current: !1,
        future: !1,
        disabled: !1
    })
}

function rt(e, t) {
    let u = String(e);
    for (; u.length < t;) u = "0" + u;
    return u
}

function Ia(e) {
    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
}

function Vt(e, t) {
    return Ia(e) ? Ea[t] : Aa[t]
}

function ot(e) {
    const t = new Date(e.year, e.month - 1, e.day + 1);
    return et(Ua({ ...e,
        year: t.getFullYear(),
        month: t.getMonth() + 1,
        day: t.getDate()
    }))
}

function ia(e) {
    const t = new Date(e.year, e.month - 1, e.day - 1);
    return et(Ua({ ...e,
        year: t.getFullYear(),
        month: t.getMonth() + 1,
        day: t.getDate()
    }))
}

function ke() {
    const e = new Date,
        t = e.getMonth() + 1,
        u = e.getDate();
    return [e.getFullYear(), rt(t, 2), rt(u, 2)].join("-")
}

function bn(e) {
    return e === ke()
}

function Ct(e, t, u) {
    let l = re(e);
    if (!t) return l;
    if (l.day === 1 || l.weekday === 0)
        for (; !t.includes(Number(l.weekday));) l = ot(l);
    return l = Kt(l, t[0], ia), l = et(l), u && (l = gt(l, u, l.hasTime)), l
}

function kt(e, t, u) {
    let l = re(e);
    if (!t || !Array.isArray(t)) return l;
    if (Vt(l.year, l.month) === l.day || l.weekday === t[t.length - 1])
        for (; !t.includes(Number(l.weekday));) l = ia(l);
    return l = Kt(l, t[t.length - 1], ot), l = et(l), u && (l = gt(l, u, l.hasTime)), l
}

function Ht(e) {
    let t = re(e);
    return t.day = Oa, t = et(t), t
}

function wt(e) {
    let t = re(e);
    return t.day = Vt(t.year, t.month), t = et(t), t
}

function _a(e) {
    switch (Object.prototype.toString.call(e)) {
        case "[object Number]":
            return e;
        case "[object String]":
            {
                const u = Wa.exec(e);
                return u ? parseInt(u[1], 10) * 60 + parseInt(u[3] || "0", 10) : !1
            }
        case "[object Object]":
            return typeof e != "object" || typeof e.hour != "number" || typeof e.minute != "number" ? !1 : typeof e == "object" && "hour" in e && "minute" in e ? e.hour * 60 + e.minute : !1
    }
    return !1
}

function an(e, t) {
    return !e || !t ? !1 : e.year === t.year && e.month === t.month && e.day === t.day && e.hour === t.hour && e.minute === t.minute
}

function nn(e, t) {
    return Pt(e) === Pt(t)
}

function un(e, t) {
    return Wt(e) === Wt(t)
}

function rn(e, t) {
    return At(e) === At(t)
}

function We(e, t = null) {
    let u = le(e);
    return u ? (u = et(u), t && (u = gt(u, t, u.hasTime)), u) : null
}

function Z(e) {
    return (e.year ? ? 0) * 1e8 + (e.month ? ? 0) * 1e6 + (e.day ? ? 0) * 1e4
}

function bt(e) {
    return (e.hour ? ? 0) * 100 + (e.minute ? ? 0)
}

function vt(e) {
    return Z(e) + bt(e)
}

function Ra(e, t, u = !1) {
    const l = Date.UTC(e.year ? ? 0, (e.month ? ? 1) - 1, e.day ? ? 1, e.hour ? ? 0, e.minute ? ? 0),
        i = Date.UTC(t.year ? ? 0, (t.month ? ? 1) - 1, t.day ? ? 1, t.hour ? ? 0, t.minute ? ? 0);
    return u === !0 && i < l ? 0 : i - l
}

function gt(e, t, u = !1) {
    let l = re(e),
        i = Z(t),
        h = Z(l),
        _ = i === h;
    return l.hasTime && u && _ && (i = bt(t), h = bt(l), _ = i === h), l.past = h < i, l.current = _, l.future = h > i, l.currentWeekday = l.weekday === t.weekday, l
}

function La(e, t, u = null) {
    let l = re(e);
    return l.hasTime = !0, l.hour = Math.floor(t / Tt.MINUTES_IN.HOUR), l.minute = t % Tt.MINUTES_IN.HOUR, l.time = Wt(l), u && (l = gt(l, u, !0)), l
}

function ma(e) {
    let t = re(e);
    return t.weekday = ba(t), t
}

function Na(e) {
    let t = re(e);
    return t.doy = wa(t) || 0, t
}

function ln(e) {
    let t = re(e);
    return t.workweek = Da(t), t
}

function Ba(e, t, u, l, i) {
    let h = re(e);
    const _ = Z(h);
    if (t !== void 0) {
        const m = le(t);
        if (m) {
            const D = Z(m);
            _ <= D && (h.disabled = !0)
        }
    }
    if (h.disabled !== !0 && u !== void 0) {
        const m = le(u);
        if (m) {
            const D = Z(m);
            _ >= D && (h.disabled = !0)
        }
    }
    if (h.disabled !== !0 && Array.isArray(l) && l.length > 0) {
        for (const m in l)
            if (l[m] === h.weekday) {
                h.disabled = !0;
                break
            }
    }
    if (h.disabled !== !0 && Array.isArray(i) && i.length > 0)
        for (const m in i)
            if (Array.isArray(i[m]) && i[m].length === 2 && i[m][0] && i[m][1]) {
                const D = le(i[m][0]),
                    q = le(i[m][1]);
                if (D && q && Ka(h, D, q)) {
                    h.disabled = !0;
                    break
                }
            } else {
                const D = i[m];
                if (Array.isArray(D))
                    for (const q of D) {
                        const g = We(q);
                        if (g && Z(g) === _) {
                            h.disabled = !0;
                            break
                        }
                    } else if (D) {
                        const q = We(D);
                        q && Z(q) === _ && (h.disabled = !0)
                    }
            }
    return h
}

function et(e) {
    let t = re(e);
    return t.hasTime = !0, t.time = Wt(t), t.date = Pt(t), t.weekday = ba(t), t.doy = wa(t) || 0, t.workweek = Da(t), t
}

function wa(e) {
    if (e.year !== 0) return (Date.UTC(e.year, e.month - 1, e.day) - Date.UTC(e.year, 0, 0)) / 24 / 60 / 60 / 1e3
}

function Da(e) {
    let t = re(e);
    if (t.year === 0) {
        const _ = We(ke());
        _ && (t = _)
    }
    const u = new Date(Date.UTC(t.year, t.month - 1, t.day)),
        l = 4;
    u.setUTCDate(u.getUTCDate() - (u.getUTCDay() + 6) % 7 + l), u.setUTCDate(u.getUTCDate() + l - (u.getUTCDay() || 7));
    var i = new Date(Date.UTC(u.getUTCFullYear(), 0, 1)),
        h = Math.ceil(((u.valueOf() - i.valueOf()) / 864e5 + 1) / 7);
    return h
}

function ba(e) {
    let t = e.weekday;
    if (e.hasDay) {
        const u = Math.floor,
            l = e.day,
            i = (e.month + 9) % xa + 1,
            h = u(e.year / 100),
            _ = e.year % 100 - (e.month <= 2 ? 1 : 0);
        t = ((l + u(2.6 * i - .2) - 2 * h + _ + u(_ / 4) + u(h / 4)) % 7 + 7) % 7
    }
    return t ? ? 0
}

function re(e) {
    return { ...e
    }
}

function Pt(e) {
    let t = `${rt(e.year,4)}-${rt(e.month,2)}`;
    return e.hasDay && (t += `-${rt(e.day,2)}`), t
}

function Wt(e) {
    return e.hasTime ? `${rt(e.hour,2)}:${rt(e.minute,2)}` : ""
}

function At(e) {
    return Pt(e) + " " + (e.hasTime ? Wt(e) : "00:00")
}

function Ha(e, t = ot, u = 1, l = [0, 1, 2, 3, 4, 5, 6]) {
    const i = re(e);
    return Ft(i, t, u, l)
}

function Ft(e, t = ot, u = 1, l = [0, 1, 2, 3, 4, 5, 6]) {
    let i = re(e);
    for (!l.includes(Number(i.weekday)) && i.weekday === 0 && t === ot && ++u; --u >= 0;) i = t(i), l.length < 7 && !l.includes(Number(i.weekday)) && ++u;
    return i
}

function Kt(e, t, u = ot, l = 6) {
    let i = re(e);
    for (; i.weekday !== t && --l >= 0;) i = u(i);
    return i
}

function Ut(e, t, u, l = [0, 1, 2, 3, 4, 5, 6], i = void 0, h = void 0, _ = [], m = [], D = 42, q = 0) {
    const g = Z(e),
        B = Z(t),
        V = [];
    let U = re(e),
        p = 0,
        R = p === B;
    if (B < g) return V;
    for (;
        (!R || V.length < q) && V.length < D && (p = Z(U), R = R || p > B && V.length >= q, !R);) {
        if (!l.includes(Number(U.weekday))) {
            U = Ft(U, ot);
            continue
        }
        let C = re(U);
        C = et(C), C = gt(C, u), C = Ba(C, i, h, _, m), V.push(C), U = Ft(U, ot)
    }
    return V
}

function Va(e, t, u, l, i) {
    const h = [];
    for (let _ = 0; _ < l; ++_) {
        const m = (t + _) * u,
            D = re(e);
        h.push(La(D, m, i))
    }
    return h
}

function qt(e, t) {
    const u = () => "";
    return typeof Intl > "u" || typeof Intl.DateTimeFormat > "u" ? u : (l, i) => {
        try {
            return new Intl.DateTimeFormat(e || void 0, t(l, i)).format(Pa(l))
        } catch (h) {
            return console.error(`Intl.DateTimeFormat: ${h.message} -> ${At(l)}`), ""
        }
    }
}

function dn(e, t = !0) {
    return t ? new Date(Date.UTC(e.year, e.month - 1, e.day, 0, 0)) : new Date(e.year, e.month - 1, e.day, 0, 0)
}

function Pa(e, t = !0) {
    return t ? new Date(Date.UTC(e.year, e.month - 1, e.day, e.hour, e.minute)) : new Date(e.year, e.month - 1, e.day, e.hour, e.minute)
}

function Be(e) {
    return isFinite(Number(e))
}

function Fn(e, t = !1) {
    const u = t === !0 ? vt : Z;
    return e.reduce((l, i) => Math.max(u(l), u(i)) === u(l) ? l : i)
}

function qn(e, t = !1) {
    const u = t === !0 ? vt : Z;
    return e.reduce((l, i) => Math.min(u(l), u(i)) === u(l) ? l : i)
}

function Ka(e, t, u, l = !1) {
    const i = Z(e) + (l === !0 ? bt(e) : 0),
        h = Z(t) + (l === !0 ? bt(t) : 0),
        _ = Z(u) + (l === !0 ? bt(u) : 0);
    return i >= h && i <= _
}

function cn(e, t, u, l) {
    const i = Z(e),
        h = Z(t),
        _ = Z(u),
        m = Z(l);
    return i >= _ && i <= m || h >= _ && h <= m || _ >= i && h >= m
}

function Ke(e, t) {
    const u = re(e);
    return t.year && (u.year += t.year), t.month && (u.month += t.month), t.day && (u.day += t.day), t.hour && (u.hour += t.hour), t.minute && (u.minute += t.minute), et(Ua(u))
}

function Ua(e) {
    const t = new Date(e.year, e.month - 1, e.day, e.hour, e.minute);
    return { ...e,
        year: t.getFullYear(),
        month: t.getMonth() + 1,
        day: t.getDate(),
        hour: t.getHours(),
        minute: t.getMinutes()
    }
}

function za(e, t) {
    const u = Ra(e, t, !0);
    return Math.floor(u / Tt.MILLISECONDS_IN.DAY)
}

function on(e, t) {
    let u = re(e),
        l = re(t);
    return u = Kt(u, 0), l = Kt(l, 6), Math.ceil(za(u, l) / Tt.DAYS_IN.WEEK)
}
const sn = {
    Sun: new Date("2020-01-05T00:00:00.000Z"),
    Mon: new Date("2020-01-06T00:00:00.000Z"),
    Tue: new Date("2020-01-07T00:00:00.000Z"),
    Wed: new Date("2020-01-08T00:00:00.000Z"),
    Thu: new Date("2020-01-09T00:00:00.000Z"),
    Fri: new Date("2020-01-10T00:00:00.000Z"),
    Sat: new Date("2020-01-11T00:00:00.000Z")
};

function Ya() {
    const e = () => "",
        t = {
            long: {
                timeZone: "UTC",
                weekday: "long"
            },
            short: {
                timeZone: "UTC",
                weekday: "short"
            },
            narrow: {
                timeZone: "UTC",
                weekday: "narrow"
            }
        };
    if (typeof Intl > "u" || typeof Intl.DateTimeFormat > "u") return e;

    function u(l, i, h) {
        try {
            return new Intl.DateTimeFormat(h || void 0, t[i] || t.long).format(sn[l])
        } catch (_) {
            return _ instanceof Error && console.error(`Intl.DateTimeFormat: ${_.message} -> day of week: ${l}`), ""
        }
    }
    return u
}

function fn(e, t) {
    const u = Object.keys(sn),
        l = Ya();
    return u.map(i => String(l(i, e, t)))
}

function $a() {
    const e = () => "",
        t = {
            long: {
                timeZone: "UTC",
                month: "long"
            },
            short: {
                timeZone: "UTC",
                month: "short"
            },
            narrow: {
                timeZone: "UTC",
                month: "narrow"
            }
        };
    if (typeof Intl > "u" || typeof Intl.DateTimeFormat > "u") return e;

    function u(l, i, h) {
        try {
            const _ = new Intl.DateTimeFormat(h || void 0, t[i] || t.long),
                m = new Date;
            return m.setDate(1), m.setMonth(l), _.format(m)
        } catch (_) {
            return _ instanceof Error && console.error(`Intl.DateTimeFormat: ${_.message} -> month: ${l}`), ""
        }
    }
    return u
}

function vn(e, t) {
    const u = $a();
    return [...Array(12).keys()].map(l => u(l, e, t))
}
var Sn = {
        PARSE_DATETIME: ka,
        PARSE_DATE: Ga,
        PARSE_TIME: Wa,
        DAYS_IN_MONTH: Aa,
        DAYS_IN_MONTH_LEAP: Ea,
        DAYS_IN_MONTH_MIN: Ja,
        DAYS_IN_MONTH_MAX: pa,
        MONTH_MAX: xa,
        MONTH_MIN: en,
        DAY_MIN: Oa,
        TIME_CONSTANTS: Tt,
        FIRST_HOUR: tn,
        today: ke,
        getStartOfWeek: Ct,
        getEndOfWeek: kt,
        getStartOfMonth: Ht,
        getEndOfMonth: wt,
        parseTime: _a,
        validateTimestamp: da,
        parsed: le,
        parseTimestamp: We,
        parseDate: Ma,
        getDayIdentifier: Z,
        getTimeIdentifier: bt,
        getDayTimeIdentifier: vt,
        diffTimestamp: Ra,
        updateRelative: gt,
        updateMinutes: La,
        updateWeekday: ma,
        updateDayOfYear: Na,
        updateWorkWeek: ln,
        updateDisabled: Ba,
        updateFormatted: et,
        getDayOfYear: wa,
        getWorkWeek: Da,
        getWeekday: ba,
        isLeapYear: Ia,
        daysInMonth: Vt,
        copyTimestamp: re,
        padNumber: rt,
        getDate: Pt,
        getTime: Wt,
        getDateTime: At,
        nextDay: ot,
        prevDay: ia,
        relativeDays: Ft,
        findWeekday: Kt,
        createDayList: Ut,
        createIntervalList: Va,
        createNativeLocaleFormatter: qt,
        makeDate: dn,
        makeDateTime: Pa,
        validateNumber: Be,
        isBetweenDates: Ka,
        isOverlappingDates: cn,
        daysBetween: za,
        weeksBetween: on,
        addToDate: Ke,
        compareTimestamps: an,
        compareDate: nn,
        compareTime: un,
        compareDateTime: rn,
        getWeekdayFormatter: Ya,
        getWeekdayNames: fn,
        getMonthFormatter: $a,
        getMonthNames: vn
    },
    Cn = Object.freeze({
        __proto__: null,
        DAYS_IN_MONTH: Aa,
        DAYS_IN_MONTH_LEAP: Ea,
        DAYS_IN_MONTH_MAX: pa,
        DAYS_IN_MONTH_MIN: Ja,
        DAY_MIN: Oa,
        FIRST_HOUR: tn,
        MONTH_MAX: xa,
        MONTH_MIN: en,
        PARSE_DATE: Ga,
        PARSE_DATETIME: ka,
        PARSE_TIME: Wa,
        TIME_CONSTANTS: Tt,
        addToDate: Ke,
        compareDate: nn,
        compareDateTime: rn,
        compareTime: un,
        compareTimestamps: an,
        copyTimestamp: re,
        createDayList: Ut,
        createIntervalList: Va,
        createNativeLocaleFormatter: qt,
        daysBetween: za,
        daysInMonth: Vt,
        default: Sn,
        diffTimestamp: Ra,
        findWeekday: Kt,
        getDate: Pt,
        getDateTime: At,
        getDayIdentifier: Z,
        getDayOfYear: wa,
        getDayTimeIdentifier: vt,
        getEndOfMonth: wt,
        getEndOfWeek: kt,
        getMonthFormatter: $a,
        getMonthNames: vn,
        getStartOfMonth: Ht,
        getStartOfWeek: Ct,
        getTime: Wt,
        getTimeIdentifier: bt,
        getWeekday: ba,
        getWeekdayFormatter: Ya,
        getWeekdayNames: fn,
        getWorkWeek: Da,
        isBetweenDates: Ka,
        isLeapYear: Ia,
        isOverlappingDates: cn,
        isToday: bn,
        makeDate: dn,
        makeDateTime: Pa,
        maxTimestamp: Fn,
        minTimestamp: qn,
        moveRelativeDays: Ha,
        nextDay: ot,
        padNumber: rt,
        parseDate: Ma,
        parseTime: _a,
        parseTimestamp: We,
        parsed: le,
        prevDay: ia,
        relativeDays: Ft,
        today: ke,
        updateDayOfYear: Na,
        updateDisabled: Ba,
        updateFormatted: et,
        updateMinutes: La,
        updateRelative: gt,
        updateWeekday: ma,
        updateWorkWeek: ln,
        validateNumber: Be,
        validateTimestamp: da,
        weeksBetween: on
    });

function G(e, t = "px") {
    if (e) return isNaN(e) ? String(e) : e === "auto" ? e : `${Number(e)}${t}`
}

function yn(e, t) {
    for (let u = 0; u < e.length; u++)
        if (t(e[u], u) === !0) return u;
    return -1
}

function Mt(e, t) {
    return t === 0 ? e : e.slice(0, t)
}
var Tn = {
        convertToUnit: G,
        indexOf: yn,
        minCharWidth: Mt
    },
    Hn = Object.freeze({
        __proto__: null,
        convertToUnit: G,
        default: Tn,
        indexOf: yn,
        minCharWidth: Mt
    });
const yt = {
    mounted(e, t) {
        if (typeof t.value != "function") return;
        const l = {
            callback: t.value,
            size: {
                width: 0,
                height: 0
            },
            observer: new ResizeObserver(i => {
                const h = i[0].contentRect;
                (h.width !== l.size.width || h.height !== l.size.height) && (l.size.width = h.width, l.size.height = h.height, l.debounceTimeout && clearTimeout(l.debounceTimeout), l.debounceTimeout = setTimeout(() => {
                    l.callback(l.size), l.debounceTimeout = void 0
                }, 100))
            })
        };
        l.observer.observe(e), e.__onResizeObserver = l
    },
    beforeUnmount(e) {
        if (!e.__onResizeObserver) return;
        const {
            observer: t,
            debounceTimeout: u
        } = e.__onResizeObserver;
        u && clearTimeout(u), t.unobserve(e), delete e.__onResizeObserver
    }
};

function Zt(e, t, {
    scrollArea: u,
    pane: l
}) {
    if (!t) {
        const g = "[error: renderCalendar] no renderFunc has been supplied to useCalendar";
        throw console.error(g), new Error(g)
    }
    const i = St({
            width: 0,
            height: 0
        }),
        h = b(null);

    function _({
        width: g,
        height: B
    }) {
        i.width = g, i.height = B
    }
    const m = I(() => e.noScroll !== !0 && u.value && l.value && i.height ? u.value.offsetWidth - l.value.offsetWidth : 0);

    function D() {}

    function q() {
        const g = {
            ref: h,
            role: "complementary",
            lang: e.locale,
            class: `q-calendar ${e.dark?"q-calendar--dark":""} ${e.bordered?"q-calendar__bordered":""}`
        };
        return Ot(d("div", { ...g
        }, [t()]), [
            [yt, _]
        ])
    }
    return {
        rootRef: h,
        scrollWidth: m,
        __initCalendar: D,
        __renderCalendar: q
    }
}
const Wn = e => e.every(t => ["day", "date", "weekday", "interval", "time", "resource", "task"].includes(t)),
    It = {
        modelValue: {
            type: String,
            default: ke(),
            validator: e => e === "" || da(e)
        },
        weekdays: {
            type: Array,
            default: () => [0, 1, 2, 3, 4, 5, 6]
        },
        dateType: {
            type: String,
            default: "round",
            validator: e => ["round", "rounded", "square"].includes(e)
        },
        weekdayAlign: {
            type: String,
            default: "center",
            validator: e => ["left", "center", "right"].includes(e)
        },
        dateAlign: {
            type: String,
            default: "center",
            validator: e => ["left", "center", "right"].includes(e)
        },
        bordered: Boolean,
        dark: Boolean,
        noAria: Boolean,
        noActiveDate: Boolean,
        noHeader: Boolean,
        noScroll: Boolean,
        shortWeekdayLabel: Boolean,
        noDefaultHeaderText: Boolean,
        noDefaultHeaderBtn: Boolean,
        minWeekdayLabel: {
            type: [Number, String],
            default: 1
        },
        weekdayBreakpoints: {
            type: Array,
            default: () => [75, 35],
            validator: e => e.length === 2
        },
        locale: {
            type: String,
            default: "en-US"
        },
        animated: Boolean,
        transitionPrev: {
            type: String,
            default: "slide-right"
        },
        transitionNext: {
            type: String,
            default: "slide-left"
        },
        disabledDays: Array,
        disabledBefore: String,
        disabledAfter: String,
        disabledWeekdays: {
            type: Array,
            default: () => []
        },
        dragEnterFunc: Function,
        dragOverFunc: Function,
        dragLeaveFunc: Function,
        dropFunc: Function,
        selectedDates: {
            type: [Array, Set],
            default: () => []
        },
        selectedStartEndDates: {
            type: Array,
            default: () => []
        },
        hoverable: Boolean,
        focusable: Boolean,
        focusType: {
            type: Array,
            default: () => ["date"],
            validator: Wn
        }
    };

function jt(e, {
    startDate: t,
    endDate: u,
    times: l
}) {
    const i = I(() => We(t.value)),
        h = I(() => u.value === "0000-00-00" ? kt(i.value, e.weekdays, l.today) : We(u.value) || i.value),
        _ = I(() => qt(e.locale, () => ({
            timeZone: "UTC",
            day: "numeric"
        }))),
        m = I(() => qt(e.locale, (R, C) => ({
            timeZone: "UTC",
            weekday: C ? "short" : "long"
        }))),
        D = I(() => qt(e.locale, () => ({
            timeZone: "UTC",
            dateStyle: "full"
        })));

    function q(R, C) {
        return R && R.length > 0 && R.includes(C.date)
    }

    function g(R, C) {
        const z = {
            firstDay: !1,
            betweenDays: !1,
            lastDay: !1
        };
        if (R.length === 2) {
            const M = Z(C),
                x = Z(le(R[0])),
                P = Z(le(R[1]));
            z.firstDay = x === M, z.lastDay = P === M, z.betweenDays = x < M && P > M
        }
        return z
    }

    function B(R, C = !1, z = [], M = [], x = !1) {
        const P = q(z, R),
            {
                firstDay: Ee,
                lastDay: fe,
                betweenDays: ge
            } = g(M, R);
        return {
            "q-past-day": !Ee && !ge && !fe && !P && !C && !!R.past,
            "q-future-day": !Ee && !ge && !fe && !P && !C && !!R.future,
            "q-outside": C,
            "q-current-day": !!R.current,
            "q-selected": P,
            "q-range-first": Ee,
            "q-range": ge,
            "q-range-last": fe,
            "q-range-hover": x && (Ee || fe || ge),
            "q-disabled-day disabled": R.disabled === !0
        }
    }

    function V(R) {
        return Ct(R, e.weekdays, l.today)
    }

    function U(R) {
        return kt(R, e.weekdays, l.today)
    }

    function p() {
        return {}
    }
    return {
        parsedStart: i,
        parsedEnd: h,
        dayFormatter: _,
        weekdayFormatter: m,
        ariaDateFormatter: D,
        arrayHasDate: q,
        checkDays: g,
        getRelativeClasses: B,
        startOfWeek: V,
        endOfWeek: U,
        dayStyleDefault: p
    }
}

function Xa(e, t) {
    e instanceof Window ? e.scrollTo({
        top: t,
        behavior: "instant"
    }) : e.scrollTop = t
}

function An(e) {
    return e instanceof Window ? e.scrollY : e.scrollTop
}

function hn(e, t, u = 500, l = performance.now(), i = An(e)) {
    if (u <= 0 || i === t) {
        Xa(e, t);
        return
    }
    requestAnimationFrame(h => {
        const _ = h - l,
            m = Math.min(_ / u, 1),
            D = g => g < .5 ? 2 * g * g : -1 + (4 - 2 * g) * g,
            q = i + (t - i) * D(m);
        Xa(e, q), m < 1 && hn(e, t, u, l, i)
    })
}

function En(e, t, u = 500) {
    const l = e.scrollLeft,
        i = t - l;
    let h = null;

    function _(m) {
        h === null && (h = m);
        const D = m - h,
            q = Math.min(D / u, 1),
            g = B => B < .5 ? 2 * B * B : -1 + (4 - 2 * B) * B;
        e.scrollLeft = l + i * g(q), D < u && requestAnimationFrame(_)
    }
    requestAnimationFrame(_)
}
const Za = {
        view: {
            type: String,
            validator: e => ["day", "week", "month", "month-interval"].includes(e),
            default: "day"
        },
        shortIntervalLabel: Boolean,
        intervalHeight: {
            type: [Number, String],
            default: 40,
            validator: Be
        },
        intervalMinutes: {
            type: [Number, String],
            default: 60,
            validator: Be
        },
        intervalStart: {
            type: [Number, String],
            default: 0,
            validator: Be
        },
        intervalCount: {
            type: [Number, String],
            default: 24,
            validator: Be
        },
        intervalStyle: {
            type: Function,
            default: null
        },
        intervalClass: {
            type: Function,
            default: null
        },
        weekdayStyle: {
            type: Function,
            default: null
        },
        weekdayClass: {
            type: Function,
            default: null
        },
        showIntervalLabel: {
            type: Function,
            default: null
        },
        hour24Format: Boolean,
        timeClicksClamped: Boolean,
        dateHeader: {
            type: String,
            default: "stacked",
            validator: e => ["stacked", "inline", "inverted"].includes(e)
        }
    },
    _n = {
        view: {
            type: String,
            validator: e => ["day", "week", "month", "month-interval"].includes(e),
            default: "day"
        },
        modelResources: {
            type: Array
        },
        resourceKey: {
            type: String,
            default: "id"
        },
        resourceLabel: {
            type: String,
            default: "label"
        },
        resourceHeight: {
            type: [Number, String],
            default: 0,
            validator: Be
        },
        resourceMinHeight: {
            type: [Number, String],
            default: 70,
            validator: Be
        },
        resourceStyle: {
            type: Function,
            default: null
        },
        resourceClass: {
            type: Function,
            default: null
        },
        weekdayStyle: {
            type: Function,
            default: null
        },
        weekdayClass: {
            type: Function,
            default: null
        },
        dayStyle: {
            type: Function,
            default: null
        },
        dayClass: {
            type: Function,
            default: null
        },
        dateHeader: {
            type: String,
            default: "stacked",
            validator: e => ["stacked", "inline", "inverted"].includes(e)
        }
    },
    xn = {
        view: {
            type: String,
            validator: e => ["day", "week", "month", "month-interval"].includes(e),
            default: "day"
        },
        leftColumnOptions: {
            type: Array
        },
        rightColumnOptions: {
            type: Array
        },
        columnOptionsId: {
            type: String
        },
        columnOptionsLabel: {
            type: String
        },
        weekdayStyle: {
            type: Function,
            default: null
        },
        weekdayClass: {
            type: Function,
            default: null
        },
        dayStyle: {
            type: Function,
            default: null
        },
        dayClass: {
            type: Function,
            default: null
        },
        dateHeader: {
            type: String,
            default: "stacked",
            validator: e => ["stacked", "inline", "inverted"].includes(e)
        },
        dayHeight: {
            type: [Number, String],
            default: 0,
            validator: Be
        },
        dayMinHeight: {
            type: [Number, String],
            default: 40,
            validator: Be
        }
    },
    mn = {
        modelResources: {
            type: Array
        },
        resourceKey: {
            type: String,
            default: "id"
        },
        resourceLabel: {
            type: String,
            default: "label"
        },
        resourceHeight: {
            type: [Number, String],
            default: 0,
            validator: Be
        },
        resourceMinHeight: {
            type: [Number, String],
            default: 70,
            validator: Be
        },
        resourceStyle: {
            type: Function,
            default: null
        },
        resourceClass: {
            type: Function,
            default: null
        },
        cellWidth: {
            type: [Number, String],
            default: 100
        },
        intervalHeaderHeight: {
            type: [Number, String],
            default: 20,
            validator: Be
        },
        noSticky: Boolean
    };

function Fa(e, {
    times: t,
    scrollArea: u,
    parsedStart: l,
    parsedEnd: i,
    maxDays: h,
    size: _,
    headerColumnRef: m
}) {
    const D = I(() => parseInt(String(e.intervalStart), 10)),
        q = I(() => parseInt(String(e.intervalMinutes), 10)),
        g = I(() => parseInt(String(e.intervalCount), 10)),
        B = I(() => parseFloat(String(e.intervalHeight))),
        V = I(() => {
            let T = 0;
            const K = Number(e.columnCount);
            return e.cellWidth ? T = Number(e.cellWidth) : _.width > 0 && m.value && (T = m.value.offsetWidth / (K > 1 ? K : h.value)), T
        }),
        U = I(() => D.value * q.value),
        p = I(() => g.value * B.value),
        R = I(() => g.value * V.value),
        C = I(() => P(l.value)),
        z = I(() => Ee(i.value)),
        M = I(() => Ut(l.value, i.value, t.today, e.weekdays, e.disabledBefore, e.disabledAfter, e.disabledWeekdays, e.disabledDays, h.value)),
        x = I(() => M.value.map(T => Va(T, D.value, q.value, g.value, t.now)));

    function P(T) {
        return Ct(T, e.weekdays, t.today)
    }

    function Ee(T) {
        return kt(T, e.weekdays, t.today)
    }

    function fe(T, K) {
        return T && T.length > 0 && T.includes(At(K))
    }

    function ge(T, K) {
        const Y = {
            firstDay: !1,
            betweenDays: !1,
            lastDay: !1
        };
        if (T && T.length === 2) {
            const he = vt(K),
                $ = vt(le(T[0])),
                _e = vt(le(T[1]));
            Y.firstDay = $ === he, Y.lastDay = _e === he, Y.betweenDays = $ < he && _e > he
        }
        return Y
    }

    function v(T, K = [], Y = []) {
        const he = fe(K, T),
            {
                firstDay: $,
                lastDay: _e,
                betweenDays: Q
            } = ge(Y, T);
        return {
            "q-selected": he,
            "q-range-first": $ === !0,
            "q-range": Q === !0,
            "q-range-last": _e === !0,
            "q-disabled-interval disabled": T.disabled === !0
        }
    }

    function j(T, K, Y) {
        return []
    }
    const J = I(() => {
            const T = {
                    timeZone: "UTC",
                    hour12: !e.hour24Format,
                    hour: "2-digit",
                    minute: "2-digit"
                },
                K = {
                    timeZone: "UTC",
                    hour12: !e.hour24Format,
                    hour: "numeric",
                    minute: "2-digit"
                },
                Y = {
                    timeZone: "UTC",
                    hour12: !e.hour24Format,
                    hour: "numeric"
                };
            return qt(e.locale, (he, $) => $ ? he.minute === 0 ? Y : K : T)
        }),
        Ae = I(() => {
            const T = {
                timeZone: "UTC",
                dateStyle: "full",
                timeStyle: "short"
            };
            return qt(e.locale, () => T)
        });

    function pe(T) {
        const K = x.value[0][0];
        return !(K.hour === T.hour && K.minute === T.minute) && T.minute === 0
    }

    function Ue(T) {}

    function Ye(T) {
        return {}
    }

    function Qe(T, K, Y = !1, he) {
        let $ = re(K);
        if (!T.currentTarget) return $;
        const _e = T.currentTarget.getBoundingClientRect(),
            Q = T,
            ve = T,
            Fe = Q.changedTouches || Q.touches,
            Te = ((Fe && Fe[0] ? Fe[0].clientY : ve.clientY) - _e.top) / B.value,
            Ie = Math.floor((Y ? Math.floor(Te) : Te) * q.value);
        return Ie !== 0 && ($ = Ke($, {
            minute: Ie
        })), he && ($ = gt($, he, !0)), $
    }

    function tt(T, K, Y = !1, he) {
        let $ = re(K);
        const _e = T.currentTarget.getBoundingClientRect(),
            Q = T,
            ve = T,
            Fe = Q.changedTouches || Q.touches,
            Te = ((Fe && Fe[0] ? Fe[0].clientY : ve.clientY) - _e.top) / B.value,
            Ie = Math.floor((Y ? Math.floor(Te) : Te) * q.value);
        return Ie !== 0 && ($ = Ke($, {
            minute: Ie
        })), he && ($ = gt($, he, !0)), $
    }

    function Ge(T, K, Y = !1, he) {
        let $ = re(K);
        if (!T.currentTarget) return $;
        const _e = T.currentTarget.getBoundingClientRect(),
            Q = T,
            ve = T,
            Fe = Q.changedTouches || Q.touches,
            Te = ((Fe && Fe[0] ? Fe[0].clientX : ve.clientX) - _e.left) / V.value,
            Ie = Math.floor((Y ? Math.floor(Te) : Te) * q.value);
        return Ie !== 0 && ($ = Ke($, {
            minute: Ie
        })), he && ($ = gt($, he, !0)), $
    }

    function Je(T, K) {
        const Y = {
            timestamp: T,
            timeStartPos: ie,
            timeDurationHeight: Oe
        };
        return K !== void 0 && (Y.columnIndex = K), Y
    }

    function Ce(T, K) {
        const Y = {
            timestamp: re(T),
            timeStartPosX: X,
            timeDurationWidth: Me
        };
        return K !== void 0 && (Y.index = K), Y
    }

    function xe(T, K = 0) {
        const Y = ie(T);
        return Y === !1 || !u.value ? !1 : (hn(u.value, Y, K), !0)
    }

    function Le(T, K = 0) {
        const Y = X(T);
        return Y === !1 || !u.value ? !1 : (En(u.value, Y, K), !0)
    }

    function Oe(T) {
        return T / q.value * B.value
    }

    function Me(T) {
        return T / q.value * V.value
    }

    function we(T) {
        return T * q.value / B.value
    }

    function oe(T) {
        return T * q.value / V.value
    }

    function ie(T, K = !0) {
        const Y = _a(T);
        if (Y === !1) return !1;
        const he = U.value,
            $ = g.value * q.value;
        let Q = (Y - he) / $ * p.value;
        return K && (Q < 0 && (Q = 0), Q > p.value && (Q = p.value)), Q
    }

    function X(T, K = !0) {
        const Y = _a(T);
        if (Y === !1) return !1;
        const he = U.value,
            $ = g.value * q.value;
        let Q = (Y - he) / $ * R.value;
        return K && (Q < 0 && (Q = 0), Q > R.value && (Q = R.value)), Q
    }
    return {
        parsedIntervalStart: D,
        parsedIntervalMinutes: q,
        parsedIntervalCount: g,
        parsedIntervalHeight: B,
        parsedCellWidth: V,
        parsedStartMinute: U,
        bodyHeight: p,
        bodyWidth: R,
        parsedWeekStart: C,
        parsedWeekEnd: z,
        days: M,
        intervals: x,
        intervalFormatter: J,
        ariaDateTimeFormatter: Ae,
        arrayHasDateTime: fe,
        checkIntervals: ge,
        getIntervalClasses: v,
        getResourceClasses: j,
        showIntervalLabelDefault: pe,
        showResourceLabelDefault: Ue,
        styleDefault: Ye,
        getTimestampAtEventInterval: Qe,
        getTimestampAtEvent: tt,
        getTimestampAtEventX: Ge,
        getScopeForSlot: Je,
        getScopeForSlotX: Ce,
        scrollToTime: xe,
        scrollToTimeX: Le,
        timeDurationHeight: Oe,
        timeDurationWidth: Me,
        heightToMinutes: we,
        widthToMinutes: oe,
        timeStartPos: ie,
        timeStartPosX: X
    }
}
const qa = {
        columnCount: {
            type: [Number, String],
            default: 0,
            validator: Be
        },
        columnIndexStart: {
            type: [Number, String],
            default: 0,
            validator: Be
        }
    },
    ca = {
        maxDays: {
            type: Number,
            default: 1
        }
    },
    Rt = {
        now: {
            type: String,
            validator: e => e === "" || da(e),
            default: ""
        }
    };

function Xt(e) {
    const t = St({
            now: We("0000-00-00 00:00"),
            today: We("0000-00-00")
        }),
        u = I(() => e.now ? We(e.now) : h());
    te(u, () => i());

    function l() {
        t.now && t.today && (t.now.current = t.today.current = !0, t.now.past = t.today.past = !1, t.now.future = t.today.future = !1)
    }

    function i() {
        const D = u.value || h();
        _(D, t.now), m(D, t.now), _(D, t.today)
    }

    function h() {
        return Ma(new Date)
    }

    function _(D, q) {
        D.date !== q.date && (q.year = D.year, q.month = D.month, q.day = D.day, q.weekday = D.weekday, q.date = D.date)
    }

    function m(D, q) {
        D.time !== q.time && (q.hour = D.hour, q.minute = D.minute, q.time = D.time)
    }
    return {
        times: t,
        parsedNow: u,
        setCurrent: l,
        updateCurrent: i,
        getNow: h,
        updateDay: _,
        updateTime: m
    }
}

function Qt(e, {
    parsedView: t,
    parsedValue: u,
    times: l
}) {
    return {
        renderValues: I(() => {
            const h = u.value;
            let _ = e.maxDays,
                m = h,
                D = h;
            switch (t.value) {
                case "month":
                    m = Ht(h), D = wt(h), _ = Vt(m.year, m.month);
                    break;
                case "week":
                case "week-agenda":
                case "week-scheduler":
                    m = Ct(h, e.weekdays, l.today), D = kt(m, e.weekdays, l.today), _ = e.weekdays.length;
                    break;
                case "day":
                case "scheduler":
                case "agenda":
                    D = Ha(re(D), ot, _ > 1 ? _ - 1 : _, e.weekdays), D = et(D);
                    break;
                case "month-interval":
                case "month-scheduler":
                case "month-agenda":
                    m = Ht(h), D = wt(h), D = et(D), _ = Vt(m.year, m.month);
                    break;
                case "resource":
                    _ = 1, D = Ha(re(D), ot, _, e.weekdays), D = et(D);
                    break
            }
            return {
                start: m,
                end: D,
                maxDays: _
            }
        })
    }
}
const On = e => e.replace(/(-\w)/g, t => t[1].toUpperCase());

function gn(e, t, u, l) {
    const i = {};
    for (const h in u) {
        const _ = u[h],
            m = On("on-" + h);
        if (!t.value) return console.warn("$listeners has not been set up"), {};
        if (t.value[m] === void 0) continue;
        const D = "on" + _.event.charAt(0).toUpperCase() + _.event.slice(1),
            q = g => ((_.button === void 0 || "buttons" in g && g.buttons > 0 && g.button === _.button) && (_.prevent && g.preventDefault(), _.stop && g.stopPropagation(), e(h, l(g, h))), _.result);
        D in i ? Array.isArray(i[D]) ? i[D].push(q) : i[D] = [i[D], q] : i[D] = q
    }
    return i
}

function Mn(e, t, u, l) {
    return gn(e, t, ja(u), l)
}

function ja(e) {
    return {
        ["click" + e]: {
            event: "click"
        },
        ["contextmenu" + e]: {
            event: "contextmenu",
            prevent: !0,
            result: !1
        },
        ["mousedown" + e]: {
            event: "mousedown"
        },
        ["mousemove" + e]: {
            event: "mousemove"
        },
        ["mouseup" + e]: {
            event: "mouseup"
        },
        ["mouseenter" + e]: {
            event: "mouseenter"
        },
        ["mouseleave" + e]: {
            event: "mouseleave"
        },
        ["touchstart" + e]: {
            event: "touchstart"
        },
        ["touchmove" + e]: {
            event: "touchmove"
        },
        ["touchend" + e]: {
            event: "touchend"
        }
    }
}

function Se(e) {
    return Object.keys(ja(e))
}

function Gt(e, t) {
    return {
        getMouseEventHandlers: (u, l) => gn(e, t, u, l),
        getDefaultMouseEventHandlers: (u, l) => Mn(e, t, u, l),
        getMouseEventName: ja,
        getRawMouseEvents: Se
    }
}
const Jt = ["moved"];

function pt(e, {
    parsedView: t,
    parsedValue: u,
    direction: l,
    maxDays: i,
    times: h,
    emittedValue: _,
    emit: m
}) {
    function D(q = 1) {
        if (q === 0) {
            _.value = ke();
            return
        }
        let g = re(u.value);
        const B = wt(g),
            V = q > 0,
            U = V ? ot : ia,
            p = V ? B.day : 1;
        let R = V ? q : -q;
        l.value = V ? "next" : "prev";
        const C = e.weekdays.length;
        for (; --R >= 0;) switch (t.value) {
            case "month":
                for (g.day = p, g = U(g), g = ma(g); !e.weekdays.includes(Number(g.weekday));) g = Ke(g, {
                    day: V ? 1 : -1
                });
                break;
            case "week":
            case "week-agenda":
            case "week-scheduler":
                g = Ft(g, U, C, e.weekdays);
                break;
            case "day":
            case "scheduler":
            case "agenda":
                g = Ft(g, U, i.value, e.weekdays);
                break;
            case "month-interval":
            case "month-agenda":
            case "month-scheduler":
                g.day = p, g = U(g);
                break;
            case "resource":
                g = Ft(g, U, i.value, e.weekdays);
                break
        }
        g = ma(g), g = et(g), g = Na(g), g = gt(g, h.now), _.value = g.date, m("moved", g)
    }
    return {
        move: D
    }
}
const In = /^on[A-Z]/;

function ea(e = xt()) {
    return {
        emitListeners: I(() => {
            const t = {};
            return e ? .vnode ? .props && Object.keys(e.vnode.props).forEach(u => {
                In.test(u) && (t[u] = !0)
            }), t
        })
    }
}

function Xe() {
    return [d("span", {
        "aria-hidden": "true",
        class: "q-calendar__focus-helper"
    })]
}

function oa() {
    function e({
        focusable: t,
        focusType: u
    }, l, i) {
        const h = t && u.includes("date");
        return d("button", { ...l,
            tabindex: h ? 0 : -1
        }, [i, h && Xe()])
    }
    return {
        renderButton: e
    }
}
const ta = {
    cellWidth: [Number, String]
};

function Sa(e) {
    return {
        isSticky: I(() => e.cellWidth !== void 0)
    }
}
const aa = ["change"];

function na(e, {
    days: t,
    lastStart: u,
    lastEnd: l
}) {
    function i() {
        const h = t.value;
        if (h.length === 0) return !1;
        const _ = h[0].date,
            m = h[h.length - 1].date;
        return !u.value || !l.value || _ !== u.value || m !== l.value ? (u.value = _, l.value = m, e("change", {
            start: _,
            end: m,
            days: h
        }), !0) : !1
    }
    return {
        checkChange: i
    }
}

function Lt() {
    function e(t, u) {
        return (Array.isArray(u) ? u : [u]).includes(t.keyCode)
    }
    return {
        isKeyCode: e
    }
}
const {
    isKeyCode: Qa
} = Lt(), Nt = {
    useNavigation: Boolean
};

function ua(e, {
    rootRef: t,
    focusRef: u,
    focusValue: l,
    datesRef: i,
    parsedView: h,
    emittedValue: _,
    direction: m,
    times: D
}) {
    let q = !1;
    Dn(() => {
        B()
    }), te(() => e.useNavigation, v => {
        v === !0 ? g() : B()
    }), e.useNavigation === !0 && g();

    function g() {
        q || document && (q = !0, document.addEventListener("keyup", R), document.addEventListener("keydown", p))
    }

    function B() {
        document && (document.removeEventListener("keyup", R), document.removeEventListener("keydown", p), q = !1)
    }

    function V(v) {
        if (!v) return !1;
        if (document) {
            const j = document.activeElement;
            if (j !== document.body && t.value ? .contains(j)) return !0
        }
        return !1
    }

    function U() {
        let v = 0;
        const j = window.setInterval(() => {
            const J = i.value[u.value];
            J ? (J.focus(), (++v === 50 || document.activeElement === J) && window.clearInterval(j)) : window.clearInterval(j)
        }, 250)
    }

    function p(v) {
        V(v) && Qa(v, [33, 34, 35, 36, 37, 38, 39, 40]) && (v.stopPropagation(), v.preventDefault())
    }

    function R(v) {
        V(v) && Qa(v, [33, 34, 35, 36, 37, 38, 39, 40]) && {
            33: P,
            34: Ee,
            35: ge,
            36: fe,
            37: M,
            38: C,
            39: x,
            40: z
        }[v.keyCode] ? .()
    }

    function C() {
        let v = re(l.value);
        if (h.value === "month") {
            if (v = Ke(v, {
                    day: -7
                }), l.value.month !== v.month) {
                m.value = "prev", _.value = v.date;
                return
            }
        } else v = Ke(v, {
            minute: Number(e.intervalMinutes)
        });
        m.value = "prev", u.value = v.date
    }

    function z() {
        let v = re(l.value);
        if (h.value === "month") {
            if (v = Ke(v, {
                    day: 7
                }), l.value.month !== v.month) {
                m.value = "next", _.value = v.date;
                return
            }
        } else v = Ke(v, {
            minute: Number(e.intervalMinutes)
        });
        m.value = "next", u.value = v.date
    }

    function M() {
        let v = re(l.value);
        m.value = "prev";
        do v = Ke(v, {
            day: -1
        }); while (!e.weekdays.includes(Number(v.weekday)));
        u.value = v.date
    }

    function x() {
        let v = re(l.value);
        m.value = "next";
        do v = Ke(v, {
            day: 1
        }); while (!e.weekdays.includes(Number(v.weekday)));
        u.value = v.date
    }

    function P() {
        let v = re(l.value);
        v = h.value === "month" ? Ke(v, {
            month: -1
        }) : Ke(v, {
            day: -7
        }), m.value = "prev", u.value = v.date
    }

    function Ee() {
        let v = re(l.value);
        v = h.value === "month" ? Ke(v, {
            month: 1
        }) : Ke(v, {
            day: 7
        }), m.value = "next", u.value = v.date
    }

    function fe() {
        let v = re(l.value);
        for (v = h.value === "month" ? Ht(v) : Ct(v, e.weekdays || [], D.today); !e.weekdays.includes(Number(v.weekday));) v = Ke(v, {
            day: -1
        });
        u.value = v.date
    }

    function ge() {
        let v = re(l.value);
        for (v = h.value === "month" ? wt(v) : kt(v, e.weekdays || [], D.today); !e.weekdays.includes(Number(v.weekday));) v = Ke(v, {
            day: -1
        });
        u.value = v.date
    }
    return {
        startNavigation: g,
        endNavigation: B,
        tryFocus: U
    }
}
const {
    renderButton: Rn
} = oa();
var sa = Et({
    name: "QCalendarAgenda",
    directives: {
        ResizeObserver: yt
    },
    props: { ...It,
        ...xn,
        ...qa,
        ...ca,
        ...Rt,
        ...ta,
        ...Nt
    },
    emits: ["update:model-value", ...aa, ...Jt, ...Se("-date"), ...Se("-head-day"), ...Se("-time")],
    setup(e, {
        slots: t,
        emit: u,
        expose: l
    }) {
        const i = b(null),
            h = b(null),
            _ = b(null),
            m = b(e.modelValue || ke()),
            D = b(le(e.modelValue || ke())),
            q = b({}),
            g = b(),
            B = b(),
            V = b("next"),
            U = b(e.modelValue || ke()),
            p = b("0000-00-00"),
            R = b(0),
            C = b(e.modelValue),
            z = St({
                width: 0,
                height: 0
            }),
            M = b(""),
            x = b(null),
            P = b(null);
        te(() => e.view, () => {
            R.value = 0
        });
        const Ee = I(() => e.view === "month" ? "month-interval" : e.view),
            fe = xt();
        if (fe === null) throw new Error("current instance is null");
        const {
            emitListeners: ge
        } = ea(fe), {
            isSticky: v
        } = Sa(e);
        te(v, () => {});
        const {
            times: j,
            setCurrent: J,
            updateCurrent: Ae
        } = Xt(e);
        Ae(), J();
        const {
            parsedStart: pe,
            parsedEnd: Ue,
            dayFormatter: Ye,
            weekdayFormatter: Qe,
            ariaDateFormatter: tt,
            dayStyleDefault: Ge,
            getRelativeClasses: Je
        } = jt(e, {
            startDate: U,
            endDate: p,
            times: j
        }), Ce = I(() => We(e.modelValue, j.now) || pe.value || j.today);
        D.value = Ce.value, m.value = Ce.value.date;
        const {
            renderValues: xe
        } = Qt(e, {
            parsedView: Ee,
            parsedValue: Ce,
            times: j
        }), {
            rootRef: Le,
            scrollWidth: Oe,
            __renderCalendar: Me
        } = Zt(e, qe, {
            scrollArea: i,
            pane: h
        }), {
            days: we,
            parsedCellWidth: oe,
            getScopeForSlot: ie
        } = Fa(e, {
            times: j,
            scrollArea: i,
            parsedStart: pe,
            parsedEnd: Ue,
            maxDays: R,
            size: z,
            headerColumnRef: _
        }), {
            move: X
        } = pt(e, {
            parsedView: Ee,
            parsedValue: Ce,
            direction: V,
            maxDays: R,
            times: j,
            emittedValue: C,
            emit: u
        }), {
            getDefaultMouseEventHandlers: T
        } = Gt(u, ge), {
            checkChange: K
        } = na(u, {
            days: we,
            lastStart: x,
            lastEnd: P
        }), {
            isKeyCode: Y
        } = Lt(), {
            tryFocus: he
        } = ua(e, {
            rootRef: Le,
            focusRef: m,
            focusValue: D,
            datesRef: q,
            parsedView: Ee,
            emittedValue: C,
            direction: V,
            times: j
        }), $ = I(() => we.value.length + (_e.value === !0 ? e.leftColumnOptions.length : 0) + (Q.value === !0 ? e.rightColumnOptions.length : 0) + we.value.length === 1 && parseInt(String(e.columnCount), 10) > 0 ? parseInt(String(e.columnCount), 10) : 0), _e = I(() => e.leftColumnOptions !== void 0 && Array.isArray(e.leftColumnOptions)), Q = I(() => e.rightColumnOptions !== void 0 && Array.isArray(e.rightColumnOptions)), ve = I(() => {
            if (Le.value) {
                const s = z.width || Le.value.getBoundingClientRect().width;
                if (s && $.value) return (s - Oe.value) / $.value + "px"
            }
            return 100 / $.value + "%"
        });
        te([we], K, {
            deep: !0,
            immediate: !0
        }), te(() => e.modelValue, (s, W) => {
            if (C.value !== s) {
                if (e.animated === !0) {
                    const r = Z(le(s)),
                        o = Z(le(W));
                    V.value = r >= o ? "next" : "prev"
                }
                C.value = s
            }
            m.value = s
        }), te(C, (s, W) => {
            if (C.value !== e.modelValue) {
                if (e.animated === !0) {
                    const r = Z(le(s)),
                        o = Z(le(W));
                    V.value = r >= o ? "next" : "prev"
                }
                u("update:model-value", s)
            }
        }), te(m, s => {
            s && (D.value = We(s))
        }), te(D, () => {
            m.value && q.value[m.value] ? q.value[m.value].focus() : he()
        }), te(() => e.maxDays, s => {
            R.value = s
        }), zt(() => {
            q.value = {}
        }), Yt(() => {});

        function Fe() {
            C.value = ke()
        }

        function at(s = 1) {
            X(s)
        }

        function Te(s = 1) {
            X(-s)
        }

        function Ie({
            width: s,
            height: W
        }) {
            z.width = s, z.height = W
        }

        function ze(s) {
            return s.date === C.value
        }

        function Re(s, W) {
            const r = t["head-column"],
                o = {
                    column: s,
                    index: W,
                    days: we.value
                },
                H = v.value === !0 ? e.cellWidth : ve.value,
                a = e.focusable === !0 && e.focusType.includes("weekday"),
                f = e.columnOptionsId !== void 0 ? s[e.columnOptionsId] : "id",
                k = {
                    maxWidth: H,
                    width: H
                };
            return d("div", {
                key: f,
                tabindex: a === !0 ? 0 : -1,
                class: {
                    "q-calendar-agenda__head--day": !0, "q-column-day": !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": a === !0
                },
                style: k,
                onDragenter: n => {
                    e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(n, "head-column", {
                        scope: o
                    }) === !0 ? M.value = f : M.value = "")
                },
                onDragover: n => {
                    e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(n, "head-column", {
                        scope: o
                    }) === !0 ? M.value = f : M.value = "")
                },
                onDragleave: n => {
                    e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(n, "head-column", {
                        scope: o
                    }) === !0 ? M.value = f : M.value = "")
                },
                onDrop: n => {
                    e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(n, "head-column", {
                        scope: o
                    }) === !0 ? M.value = f : M.value = "")
                },
                ...T("-head-column", n => ({
                    scope: {
                        column: s,
                        index: W
                    },
                    event: n
                }))
            }, [e.noDefaultHeaderText !== !0 && ht(s), r && r(o), Xe()])
        }

        function ht(s) {
            const W = t["head-column-label"],
                r = {
                    column: s
                },
                o = e.columnOptionsLabel !== void 0 ? s[e.columnOptionsLabel] : s.label,
                H = d("div", {
                    class: {
                        "q-calendar-agenda__head--weekday": !0, ["q-calendar__" + e.weekdayAlign]: !0, ellipsis: !0
                    },
                    style: {
                        alignSelf: "center"
                    }
                }, [W && W({
                    scope: r
                }), !W && d("span", {
                    class: "ellipsis"
                }, o)]);
            return e.dateHeader === "stacked" ? H : d("div", {
                class: "q-calendar__header--inline",
                style: {
                    height: "100%"
                }
            }, [H])
        }

        function $e() {
            return d("div", {
                roll: "presentation",
                class: {
                    "q-calendar-agenda__head": !0, "q-calendar__sticky": v.value === !0
                },
                style: {
                    marginRight: Oe.value + "px"
                }
            }, [lt()])
        }

        function lt() {
            return d("div", {
                ref: _,
                class: {
                    "q-calendar-agenda__head--days__column": !0
                }
            }, [dt(), nt()])
        }

        function dt() {
            return d("div", {
                class: {
                    "q-calendar-agenda__head--days__weekdays": !0
                }
            }, it())
        }

        function nt() {
            const s = t["head-days-events"];
            return ga(() => {
                if (B.value && e.columnCount === 0 && window) try {
                    const W = window.getComputedStyle(B.value);
                    g.value && g.value.parentElement && (g.value.parentElement.style.height = W.height, g.value.style.height = W.height)
                } catch {}
            }), d("div", {
                class: {
                    "q-calendar-agenda__head--days__event": !0
                }
            }, [s && d("div", {
                ref: g,
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    overflow: "hidden",
                    zIndex: 1
                }
            }, [s({
                scope: {
                    days: we.value,
                    ref: B
                }
            })]), ...st()])
        }

        function it() {
            const s = parseInt(String(e.columnCount), 10),
                W = parseInt(String(e.columnIndexStart), 10);
            return we.value.length === 1 && s > 0 ? [_e.value === !0 ? e.leftColumnOptions.map((r, o) => Re(r, o)) : [], ...Array.apply(null, new Array(s)).map((r, o) => o + W).map(r => ft(we.value[0], r)), Q.value === !0 ? e.rightColumnOptions.map((r, o) => Re(r, o)) : []].flat() : [_e.value === !0 ? e.leftColumnOptions.map((r, o) => Re(r, o)) : [], ...we.value.map(r => ft(r)), Q.value === !0 ? e.rightColumnOptions.map((r, o) => Re(r, o)) : []].flat()
        }

        function st() {
            const s = parseInt(String(e.columnCount), 10);
            return we.value.length === 1 && s > 0 ? [...Array.apply(null, new Array(parseInt(String(e.columnCount), 10))).map((W, r) => r + s).map(W => ut(we.value[0], W))] : we.value.map(W => ut(W, 0))
        }

        function ft(s, W) {
            const r = t["head-day"],
                o = t["head-date"],
                H = e.noActiveDate !== !0 && ze(s),
                a = ie(s, W ? ? 0);
            a.activeDate = H, a.droppable = M.value === s.date, a.disabled = e.disabledWeekdays ? e.disabledWeekdays.includes(Number(s.weekday)) : !1;
            const f = v.value === !0 ? e.cellWidth : ve.value,
                k = e.weekdayStyle || Ge,
                n = {
                    width: f,
                    maxWidth: f,
                    ...k({
                        scope: a
                    })
                };
            v.value === !0 && (n.minWidth = f);
            const y = typeof e.weekdayClass == "function" ? e.weekdayClass({
                    scope: a
                }) : {},
                w = e.focusable === !0 && e.focusType.includes("weekday"),
                F = {
                    key: s.date + (W !== void 0 ? "-" + W : ""),
                    ref: O => {
                        q.value[s.date] = O
                    },
                    tabindex: w === !0 ? 0 : -1,
                    class: {
                        "q-calendar-agenda__head--day": !0, ...y, ...Je(s), "q-active-date": H, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": w === !0
                    },
                    style: n,
                    onDragenter: O => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(O, "head-day", {
                            scope: a
                        }) === !0 ? M.value = s.date : M.value = "")
                    },
                    onDragover: O => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(O, "head-day", {
                            scope: a
                        }) === !0 ? M.value = s.date : M.value = "")
                    },
                    onDragleave: O => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(O, "head-day", {
                            scope: a
                        }) === !0 ? M.value = s.date : M.value = "")
                    },
                    onDrop: O => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(O, "head-day", {
                            scope: a
                        }) === !0 ? M.value = s.date : M.value = "")
                    },
                    onFocus: () => {
                        w === !0 && (m.value = s.date)
                    },
                    ...T("-head-day", O => ({
                        scope: a,
                        event: O
                    }))
                };
            return d("div", F, [r !== void 0 && r({
                scope: a
            }), r === void 0 && _t(s), r === void 0 && o && o({
                scope: a
            }), Xe()])
        }

        function _t(s) {
            if (e.dateHeader === "stacked") return [e.noDefaultHeaderText !== !0 && Ze(s), e.noDefaultHeaderBtn !== !0 && be(s)].filter(W => W !== !1);
            if (e.dateHeader === "inline") return e.weekdayAlign === "left" && e.dateAlign === "right" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && Ze(s), e.noDefaultHeaderBtn !== !0 && be(s)]) : e.weekdayAlign === "right" && e.dateAlign === "left" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && Ze(s), e.noDefaultHeaderBtn !== !0 && be(s)]) : d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && Ze(s), e.noDefaultHeaderBtn !== !0 && be(s)]);
            if (e.dateHeader === "inverted") return e.weekdayAlign === "left" && e.dateAlign === "right" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && be(s), e.noDefaultHeaderText !== !0 && Ze(s)]) : e.weekdayAlign === "right" && e.dateAlign === "left" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && be(s), e.noDefaultHeaderText !== !0 && Ze(s)]) : d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && be(s), e.noDefaultHeaderText !== !0 && Ze(s)])
        }

        function ut(s, W) {
            const r = t["head-day-event"],
                o = e.noActiveDate !== !0 && ze(s),
                H = ie(s, W);
            H.activeDate = o, H.disabled = e.disabledWeekdays ? e.disabledWeekdays.includes(Number(s.weekday)) : !1;
            const a = v.value === !0 ? e.cellWidth : ve.value,
                f = {
                    width: a,
                    maxWidth: a
                };
            return v.value === !0 && (f.minWidth = a), d("div", {
                key: "event-" + s.date + (W !== void 0 ? "-" + W : ""),
                class: {
                    "q-calendar-agenda__head--day__event": !0, ...Je(s), "q-active-date": o
                },
                style: f
            }, [r && r({
                scope: H
            })])
        }

        function Ze(s) {
            const W = t["head-weekday-label"],
                r = ie(s, 0);
            r.shortWeekdayLabel = e.shortWeekdayLabel;
            const o = {
                class: {
                    "q-calendar-agenda__head--weekday": !0, ["q-calendar__" + e.weekdayAlign]: !0, "q-calendar__ellipsis": !0
                }
            };
            return d("div", o, W && W({
                scope: r
            }) || ct(s, e.shortWeekdayLabel))
        }

        function ct(s, W) {
            const r = Qe.value(s, W || e.weekdayBreakpoints[0] > 0 && oe.value <= e.weekdayBreakpoints[0]);
            return d("span", {
                class: "q-calendar__ellipsis"
            }, e.weekdayBreakpoints[1] > 0 && oe.value <= e.weekdayBreakpoints[1] ? Mt(r, Number(e.minWeekdayLabel)) : r)
        }

        function be(s) {
            const W = {
                class: {
                    "q-calendar-agenda__head--date": !0, ["q-calendar__" + e.dateAlign]: !0
                }
            };
            return d("div", W, mt(s))
        }

        function mt(s) {
            const W = e.noActiveDate !== !0 && ze(s),
                r = Ye.value(s, !1),
                o = t["head-day-label"],
                H = t["head-day-button"],
                a = {
                    dayLabel: r,
                    timestamp: s,
                    activeDate: W,
                    disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(s.weekday)) : !1
                },
                f = {
                    class: {
                        "q-calendar-agenda__head--day__label": !0, "q-calendar__button": !0, "q-calendar__button--round": e.dateType === "round", "q-calendar__button--rounded": e.dateType === "rounded", "q-calendar__button--bordered": s.current === !0, "q-calendar__focusable": !0
                    },
                    disabled: s.disabled,
                    onKeydown: k => {
                        s.disabled !== !0 && Y(k, [13, 32]) && (k.stopPropagation(), k.preventDefault())
                    },
                    onKeyup: k => {
                        s.disabled !== !0 && Y(k, [13, 32]) && (C.value = s.date, ge.value.onClickDate !== void 0 && u("click-date", {
                            scope: a
                        }))
                    },
                    ...T("-date", (k, n) => ((n === "click-date" || n === "contextmenu-date") && (C.value = s.date, n === "click-date" && k.preventDefault()), {
                        scope: a,
                        event: k
                    }))
                };
            return e.noAria !== !0 && (f.ariaLabel = tt.value(s, !1)), H ? H({
                scope: a
            }) : Rn(e, f, o ? o({
                scope: a
            }) : r)
        }

        function Ne() {
            return d("div", {
                class: "q-calendar-agenda__body"
            }, [A()])
        }

        function A() {
            return v.value === !0 ? d("div", {
                ref: i,
                class: {
                    "q-calendar-agenda__scroll-area": !0, "q-calendar__scroll": !0
                }
            }, [de()]) : e.noScroll === !0 ? ne() : d("div", {
                ref: i,
                class: {
                    "q-calendar-agenda__scroll-area": !0, "q-calendar__scroll": !0
                }
            }, [ne()])
        }

        function ne() {
            return d("div", {
                ref: h,
                class: "q-calendar-agenda__pane"
            }, [de()])
        }

        function de() {
            const s = t["day-container"];
            return d("div", {
                class: "q-calendar-agenda__day-container"
            }, [v.value === !0 && e.noHeader !== !0 && $e(), d("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    height: "100%"
                }
            }, [...ce() || []].flat()), s && s({
                scope: {
                    days: we.value
                }
            })])
        }

        function ce() {
            const s = parseInt(String(e.columnCount), 10),
                W = parseInt(String(e.columnIndexStart), 10);
            return we.value.length === 1 && s > 0 ? [_e.value === !0 ? e.leftColumnOptions.map((r, o) => me(r, o)) : [], ...Array.apply(null, new Array(s)).map((r, o) => o + W).map(r => He(we.value[0], 0, r)), Q.value === !0 ? e.rightColumnOptions.map((r, o) => me(r, o)) : []].flat() : [_e.value === !0 ? e.leftColumnOptions.map((r, o) => me(r, o)) : [], ...we.value.map((r, o) => He(r, o, 0)), Q.value === !0 ? e.rightColumnOptions.map((r, o) => me(r, o)) : []].flat()
        }

        function me(s, W) {
            const r = t.column,
                o = {
                    column: s,
                    days: we.value,
                    index: W
                },
                H = v.value === !0 ? e.cellWidth : ve.value,
                a = e.focusable === !0 && e.focusType.includes("day"),
                f = e.columnOptionsId !== void 0 ? s[e.columnOptionsId] : void 0;
            return d("div", {
                key: f,
                tabindex: a === !0 ? 0 : -1,
                class: {
                    "q-calendar-agenda__day": !0, "q-column-day": !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": a === !0
                },
                style: {
                    maxWidth: H,
                    width: H
                },
                onDragenter: k => {
                    e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(k, "column", {
                        scope: o
                    }) === !0 ? M.value = f : M.value = "")
                },
                onDragover: k => {
                    e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(k, "column", {
                        scope: o
                    }) === !0 ? M.value = f : M.value = "")
                },
                onDragleave: k => {
                    e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(k, "column", {
                        scope: o
                    }) === !0 ? M.value = f : M.value = "")
                },
                onDrop: k => {
                    e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(k, "column", {
                        scope: o
                    }) === !0 ? M.value = f : M.value = "")
                },
                ...T("-column", k => ({
                    scope: o,
                    event: k
                }))
            }, [r && r({
                scope: o
            })])
        }

        function He(s, W, r) {
            const o = parseInt(String(e.dayHeight), 10),
                H = parseInt(String(e.dayMinHeight), 10),
                a = t.day,
                f = ie(s, r),
                k = v.value === !0 ? e.cellWidth : ve.value,
                n = {
                    width: k,
                    maxWidth: k
                };
            return v.value === !0 && (n.minWidth = k), n.height = o > 0 ? G(o) : "auto", H > 0 && (n.minHeight = G(H)), d("div", {
                key: s.date + (r !== void 0 ? ":" + r : ""),
                class: {
                    "q-calendar-agenda__day": !0, ...Je(s)
                },
                style: n
            }, [a && a({
                scope: f
            })])
        }

        function qe() {
            const {
                start: s,
                end: W,
                maxDays: r
            } = xe.value;
            (U.value !== s.date || p.value !== W.date || R.value !== r) && (U.value = s.date, p.value = W.date, R.value = r);
            const o = z.width > 0,
                H = Ot(d("div", {
                    class: "q-calendar-agenda",
                    key: U.value
                }, [o === !0 && v.value !== !0 && e.noHeader !== !0 && $e(), o === !0 && Ne()]), [
                    [yt, Ie]
                ]);
            if (e.animated === !0) {
                const a = "q-calendar--" + (V.value === "prev" ? e.transitionPrev : e.transitionNext);
                return d($t, {
                    name: a,
                    appear: !0
                }, () => H)
            }
            return H
        }
        return l({
            prev: Te,
            next: at,
            move: X,
            moveToToday: Fe,
            updateCurrent: Ae
        }), () => Me()
    }
});
const {
    renderButton: Ln
} = oa();
var la = Et({
    name: "QCalendarDay",
    directives: {
        ResizeObserver: yt
    },
    props: { ...It,
        ...Za,
        ...qa,
        ...ca,
        ...Rt,
        ...ta,
        ...Nt
    },
    emits: ["update:model-value", ...aa, ...Jt, ...Se("-date"), ...Se("-interval"), ...Se("-head-intervals"), ...Se("-head-day"), ...Se("-time")],
    setup(e, {
        slots: t,
        emit: u,
        expose: l
    }) {
        const i = b(null),
            h = b(null),
            _ = b(null),
            m = b(e.modelValue || ke()),
            D = b(le(e.modelValue || ke())),
            q = b({}),
            g = b(),
            B = b(),
            V = b("next"),
            U = b(e.modelValue || ke()),
            p = b("0000-00-00"),
            R = b(0),
            C = b(e.modelValue || ke()),
            z = St({
                width: 0,
                height: 0
            }),
            M = b(""),
            x = b(0),
            P = b(null),
            Ee = b(null);
        te(() => e.view, () => {
            R.value = 0
        });
        const fe = I(() => e.view === "month" ? "month-interval" : e.view),
            ge = xt();
        if (ge === null) throw new Error("current instance is null");
        const {
            emitListeners: v
        } = ea(ge), {
            isSticky: j
        } = Sa(e), {
            times: J,
            setCurrent: Ae,
            updateCurrent: pe
        } = Xt(e);
        pe(), Ae();
        const {
            parsedStart: Ue,
            parsedEnd: Ye,
            dayFormatter: Qe,
            weekdayFormatter: tt,
            ariaDateFormatter: Ge,
            dayStyleDefault: Je,
            getRelativeClasses: Ce
        } = jt(e, {
            startDate: U,
            endDate: p,
            times: J
        }), xe = I(() => We(e.modelValue, J.now) || Ue.value || J.today);
        D.value = xe.value, m.value = xe.value.date;
        const {
            renderValues: Le
        } = Qt(e, {
            parsedView: fe,
            parsedValue: xe,
            times: J
        }), {
            rootRef: Oe,
            scrollWidth: Me,
            __renderCalendar: we
        } = Zt(e, ae, {
            scrollArea: i,
            pane: h
        }), {
            days: oe,
            intervals: ie,
            intervalFormatter: X,
            ariaDateTimeFormatter: T,
            parsedCellWidth: K,
            getIntervalClasses: Y,
            showIntervalLabelDefault: he,
            styleDefault: $,
            getTimestampAtEventInterval: _e,
            getTimestampAtEvent: Q,
            getScopeForSlot: ve,
            scrollToTime: Fe,
            heightToMinutes: at,
            timeDurationHeight: Te,
            timeStartPos: Ie
        } = Fa(e, {
            times: J,
            scrollArea: i,
            parsedStart: Ue,
            parsedEnd: Ye,
            maxDays: R,
            size: z,
            headerColumnRef: _
        }), {
            move: ze
        } = pt(e, {
            parsedView: fe,
            parsedValue: xe,
            direction: V,
            maxDays: R,
            times: J,
            emittedValue: C,
            emit: u
        }), {
            getDefaultMouseEventHandlers: Re
        } = Gt(u, v), {
            checkChange: ht
        } = na(u, {
            days: oe,
            lastStart: P,
            lastEnd: Ee
        }), {
            isKeyCode: $e
        } = Lt(), {
            tryFocus: lt
        } = ua(e, {
            rootRef: Oe,
            focusRef: m,
            focusValue: D,
            datesRef: q,
            parsedView: fe,
            emittedValue: C,
            direction: V,
            times: J
        }), dt = I(() => {
            const c = parseInt(String(e.columnCount), 10);
            return fe.value === "day" && c > 1 ? c : fe.value === "day" && e.maxDays && e.maxDays > 1 ? e.maxDays : oe.value.length
        }), nt = I(() => Oe.value ? parseInt(window.getComputedStyle(Oe.value).getPropertyValue("--calendar-intervals-width"), 10) : 0), it = I(() => {
            if (Oe.value) {
                const c = z.width || Oe.value.getBoundingClientRect().width;
                if (c && nt.value && dt.value) return (c - Me.value - nt.value) / dt.value + "px"
            }
            return 100 / dt.value + "%"
        });
        te([oe], ht, {
            deep: !0,
            immediate: !0
        }), te(() => e.modelValue, (c, L) => {
            if (C.value !== e.modelValue) {
                if (e.animated === !0) {
                    const S = Z(le(c)),
                        ee = Z(le(L));
                    V.value = S >= ee ? "next" : "prev"
                }
                C.value = c
            }
            m.value = c
        }), te(C, (c, L) => {
            if (C.value !== e.modelValue) {
                if (e.animated === !0) {
                    const S = Z(le(c)),
                        ee = Z(le(L));
                    V.value = S >= ee ? "next" : "prev"
                }
                u("update:model-value", c)
            }
        }), te(m, c => {
            c && (D.value = We(c))
        }), te(D, () => {
            m.value && q.value[m.value] ? q.value[m.value].focus() : lt()
        }), te(() => e.maxDays, c => {
            R.value = c
        }), zt(() => {
            q.value = {}, g.value = void 0, B.value = void 0
        }), Yt(() => {});

        function st() {
            C.value = ke()
        }

        function ft(c = 1) {
            ze(c)
        }

        function _t(c = 1) {
            ze(-c)
        }

        function ut({
            width: c,
            height: L
        }) {
            z.width = c, z.height = L
        }

        function Ze(c) {
            return c.date === C.value
        }

        function ct() {
            return d("div", {
                roll: "presentation",
                class: {
                    "q-calendar-day__head": !0, "q-calendar__sticky": j.value === !0
                },
                style: {
                    marginRight: Me.value + "px"
                }
            }, [be(), mt()])
        }

        function be() {
            const c = t["head-intervals"],
                L = {
                    timestamps: oe.value,
                    days: oe.value,
                    date: e.modelValue
                };
            return d("div", {
                class: {
                    "q-calendar-day__head--intervals": !0, "q-calendar__sticky": j.value === !0
                },
                ...Re("-head-intervals", S => ({
                    scope: L,
                    event: S
                }))
            }, [c && c({
                scope: L
            })])
        }

        function mt() {
            return d("div", {
                ref: _,
                class: {
                    "q-calendar-day__head--days__column": !0
                }
            }, [Ne(), A()])
        }

        function Ne() {
            return d("div", {
                class: {
                    "q-calendar-day__head--days__weekdays": !0
                }
            }, [...ne()])
        }

        function A() {
            const c = t["head-days-events"],
                L = parseInt(String(e.columnCount), 10);
            return ga(() => {
                if (B.value && L === 0 && window) try {
                    const S = window.getComputedStyle(B.value);
                    g.value && g.value.parentElement && (g.value.parentElement.style.height = S.height, g.value.style.height = S.height)
                } catch {}
            }), d("div", {
                class: {
                    "q-calendar-day__head--days__event": !0
                }
            }, [c && d("div", {
                ref: g,
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    overflow: "hidden",
                    zIndex: 1
                }
            }, [c({
                scope: {
                    days: oe.value,
                    ref: B
                }
            })]), ...de()])
        }

        function ne() {
            const c = parseInt(String(e.columnCount), 10),
                L = parseInt(String(e.columnIndexStart), 10);
            return oe.value.length === 1 && c > 0 ? Array.apply(null, new Array(c)).map((S, ee) => ee + L).map(S => ce(oe.value[0], S)) : oe.value.map(S => ce(S, 0))
        }

        function de() {
            const c = parseInt(String(e.columnCount), 10),
                L = parseInt(String(e.columnIndexStart), 10);
            return oe.value.length === 1 && c > 0 ? Array.apply(null, new Array(c)).map((S, ee) => ee + L).map(S => He(oe.value[0], S)).filter(S => S !== void 0) : oe.value.map(S => He(S, 0)).filter(S => S !== void 0)
        }

        function ce(c, L) {
            const S = t["head-day"],
                ee = t["head-date"],
                N = e.noActiveDate !== !0 && Ze(c),
                ue = ve(c, L);
            ue.activeDate = N, ue.droppable = M.value === c.date, ue.disabled = e.disabledWeekdays ? e.disabledWeekdays.includes(Number(c.weekday)) : !1;
            const Ve = j.value === !0 ? e.cellWidth : it.value,
                De = e.weekdayStyle || Je,
                Dt = {
                    width: Ve,
                    maxWidth: Ve,
                    minWidth: Ve,
                    ...De({
                        scope: ue
                    })
                };
            j.value === !0 && (Dt.minWidth = Ve);
            const Ca = typeof e.weekdayClass == "function" ? e.weekdayClass({
                    scope: ue
                }) : {},
                Bt = e.focusable === !0 && e.focusType.includes("weekday"),
                ra = c.date + (L !== void 0 ? "-" + L : ""),
                je = {
                    key: ra,
                    ref: Pe => {
                        q.value[ra] = Pe
                    },
                    tabindex: Bt === !0 ? 0 : -1,
                    class: {
                        "q-calendar-day__head--day": !0, ...Ca, ...Ce(c), "q-active-date": N, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": Bt === !0
                    },
                    style: Dt,
                    onFocus: () => {
                        Bt === !0 && (m.value = ra)
                    },
                    onKeydown: Pe => {
                        c.disabled !== !0 && $e(Pe, [13, 32]) && (Pe.stopPropagation(), Pe.preventDefault())
                    },
                    onKeyup: Pe => {
                        c.disabled !== !0 && $e(Pe, [13, 32]) && (C.value = c.date)
                    },
                    ...Re("-head-day", Pe => ({
                        scope: ue,
                        event: Pe
                    })),
                    onDragenter: Pe => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(Pe, "head-day", {
                            scope: ue
                        }) === !0 ? M.value = c.date : M.value = "")
                    },
                    onDragover: Pe => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(Pe, "head-day", {
                            scope: ue
                        }) === !0 ? M.value = c.date : M.value = "")
                    },
                    onDragleave: Pe => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(Pe, "head-day", {
                            scope: ue
                        }) === !0 ? M.value = c.date : M.value = "")
                    },
                    onDrop: Pe => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(Pe, "head-day", {
                            scope: ue
                        }) === !0 ? M.value = c.date : M.value = "")
                    }
                };
            return d("div", je, [S !== void 0 && S({
                scope: ue
            }), S === void 0 && o(c, L), S === void 0 && me(c), S === void 0 && ee && ee({
                scope: ue
            }), S === void 0 && H(c, L), Xe()])
        }

        function me(c) {
            if (e.dateHeader === "stacked") return [e.noDefaultHeaderText !== !0 ? qe(c) : [], e.noDefaultHeaderBtn !== !0 ? W(c) : []].filter(L => L !== void 0);
            if (e.dateHeader === "inline") return e.weekdayAlign === "left" && e.dateAlign === "right" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && qe(c), e.noDefaultHeaderBtn !== !0 && W(c)]) : e.weekdayAlign === "right" && e.dateAlign === "left" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && qe(c), e.noDefaultHeaderBtn !== !0 && W(c)]) : d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && qe(c), e.noDefaultHeaderBtn !== !0 && W(c)]);
            if (e.dateHeader === "inverted") return e.weekdayAlign === "left" && e.dateAlign === "right" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && W(c), e.noDefaultHeaderText !== !0 && qe(c)]) : e.weekdayAlign === "right" && e.dateAlign === "left" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && W(c), e.noDefaultHeaderText !== !0 && qe(c)]) : d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && W(c), e.noDefaultHeaderText !== !0 && qe(c)])
        }

        function He(c, L) {
            const S = t["head-day-event"],
                ee = e.noActiveDate !== !0 && Ze(c),
                N = ve(c, L);
            N.activeDate = ee, N.disabled = e.disabledWeekdays ? e.disabledWeekdays.includes(Number(c.weekday)) : !1;
            const ue = j.value === !0 ? G(K.value) : it.value,
                Ve = {
                    width: ue,
                    maxWidth: ue,
                    minWidth: ue
                };
            return j.value === !0 && (Ve.minWidth = ue), d("div", {
                key: "event-" + c.date + (L !== void 0 ? "-" + L : ""),
                class: {
                    "q-calendar-day__head--day__event": !0, ...Ce(c), "q-active-date": ee
                },
                style: Ve
            }, [S && S({
                scope: N
            })])
        }

        function qe(c) {
            const L = t["head-weekday-label"],
                S = e.shortWeekdayLabel === !0,
                ee = ve(c, 0);
            ee.shortWeekdayLabel = e.shortWeekdayLabel, ee.disabled = e.disabledWeekdays ? e.disabledWeekdays.includes(Number(c.weekday)) : !1;
            const N = {
                class: {
                    "q-calendar-day__head--weekday": !0, ["q-calendar__" + e.weekdayAlign]: !0, "q-calendar__ellipsis": !0
                }
            };
            return d("div", N, L && L({
                scope: ee
            }) || s(c, S))
        }

        function s(c, L) {
            const S = tt.value(c, L || e.weekdayBreakpoints[0] > 0 && K.value <= e.weekdayBreakpoints[0]);
            return d("span", {
                class: "q-calendar-day__head--weekday-label q-calendar__ellipsis"
            }, e.weekdayBreakpoints[1] > 0 && K.value <= e.weekdayBreakpoints[1] ? Mt(S, Number(e.minWeekdayLabel)) : S)
        }

        function W(c) {
            const L = {
                class: {
                    "q-calendar-day__head--date": !0, ["q-calendar__" + e.dateAlign]: !0
                }
            };
            return d("div", L, r(c))
        }

        function r(c) {
            const L = e.noActiveDate !== !0 && Ze(c),
                S = Qe.value(c, !1),
                ee = t["head-day-label"],
                N = t["head-day-button"],
                ue = {
                    dayLabel: S,
                    timestamp: c,
                    activeDate: L,
                    disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(c.weekday)) : !1
                },
                Ve = {
                    class: {
                        "q-calendar-day__head--day__label": !0, "q-calendar__button": !0, "q-calendar__button--round": e.dateType === "round", "q-calendar__button--rounded": e.dateType === "rounded", "q-calendar__button--bordered": c.current === !0, "q-calendar__focusable": !0
                    },
                    disabled: c.disabled,
                    onKeydown: De => {
                        c.disabled !== !0 && $e(De, [13, 32]) && (De.stopPropagation(), De.preventDefault())
                    },
                    onKeyup: De => {
                        c.disabled !== !0 && $e(De, [13, 32]) && (C.value = c.date, v.value.onClickDate !== void 0 && u("click-date", {
                            scope: ue
                        }))
                    },
                    ...Re("-date", (De, Dt) => ((Dt === "click-date" || Dt === "contextmenu-date") && (C.value = c.date, Dt === "click-date" && De.preventDefault()), {
                        scope: ue,
                        event: De
                    }))
                };
            return e.noAria !== !0 && (Ve.ariaLabel = Ge.value(c, !1)), N ? N({
                scope: ue
            }) : Ln(e, Ve, ee ? ee({
                scope: ue
            }) : S)
        }

        function o(c, L) {
            const S = t["column-header-before"];
            if (S) return d("div", {
                class: "q-calendar-day__column-header--before"
            }, [S({
                scope: {
                    timestamp: c,
                    columnIndex: L
                }
            })])
        }

        function H(c, L) {
            const S = t["column-header-after"];
            if (S) return d("div", {
                class: "q-calendar-day__column-header--after"
            }, [S({
                scope: {
                    timestamp: c,
                    columnIndex: L
                }
            })])
        }

        function a() {
            return d("div", {
                class: "q-calendar-day__body"
            }, [f()])
        }

        function f() {
            return j.value === !0 ? d("div", {
                ref: i,
                class: {
                    "q-calendar-day__scroll-area": !0, "q-calendar__scroll": !0
                }
            }, [j.value !== !0 && E(), n()]) : e.noScroll === !0 ? k() : d("div", {
                ref: i,
                class: {
                    "q-calendar-day__scroll-area": !0, "q-calendar__scroll": !0
                }
            }, [k()])
        }

        function k() {
            return d("div", {
                ref: h,
                class: "q-calendar-day__pane"
            }, [E(), n()])
        }

        function n() {
            const c = t["day-container"];
            return d("div", {
                class: "q-calendar-day__day-container"
            }, [j.value === !0 && e.noHeader !== !0 && ct(), d("div", {
                style: {
                    display: "flex",
                    flexDirection: "row"
                }
            }, [j.value === !0 && E(), ...y()]), c && c({
                scope: {
                    days: oe.value
                }
            })])
        }

        function y() {
            const c = parseInt(String(e.columnCount), 10),
                L = parseInt(String(e.columnIndexStart), 10);
            return oe.value.length === 1 && c > 0 ? Array.apply(null, new Array(c)).map((S, ee) => ee + L).map(S => w(oe.value[0], 0, S)) : oe.value.map((S, ee) => w(S, ee, 0))
        }

        function w(c, L, S) {
            const ee = t["day-body"],
                N = ve(c, S),
                ue = j.value === !0 ? e.cellWidth : it.value,
                Ve = {
                    width: ue,
                    maxWidth: ue,
                    minWidth: ue
                };
            return j.value === !0 && (Ve.minWidth = ue), d("div", {
                key: c.date + (S !== void 0 ? ":" + S : ""),
                class: {
                    "q-calendar-day__day": !0, ...Ce(c)
                },
                style: Ve
            }, [...F(L, S), ee && ee({
                scope: N
            })])
        }

        function F(c, L) {
            return ie.value[c].map(S => O(S, L))
        }

        function O(c, L) {
            const S = G(e.intervalHeight),
                ee = e.intervalStyle || $,
                N = t["day-interval"],
                ue = ve(c, L);
            ue.droppable = x.value === vt(c);
            const Ve = typeof e.intervalClass == "function" ? e.intervalClass({
                    scope: ue
                }) : {},
                De = e.focusable === !0 && e.focusType.includes("interval"),
                Dt = At(c),
                Ca = {
                    height: S,
                    ...ee({
                        scope: ue
                    })
                },
                Bt = {
                    key: Dt,
                    tabindex: De === !0 ? 0 : -1,
                    class: {
                        "q-calendar-day__day-interval": c.minute === 0, "q-calendar-day__day-interval--section": c.minute !== 0, ...Ve, ...Y(c, Array.from(e.selectedDates), e.selectedStartEndDates), "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": De === !0
                    },
                    style: Ca,
                    onDragenter: je => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(je, "interval", {
                            scope: ue
                        }) === !0 ? x.value = vt(c) : x.value = 0)
                    },
                    onDragover: je => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(je, "interval", {
                            scope: ue
                        }) === !0 ? x.value = vt(c) : x.value = 0)
                    },
                    onDragleave: je => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(je, "interval", {
                            scope: ue
                        }) === !0 ? x.value = vt(c) : x.value = 0)
                    },
                    onDrop: je => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(je, "interval", {
                            scope: ue
                        }) === !0 ? x.value = vt(c) : x.value = 0)
                    },
                    onKeydown: je => {
                        $e(je, [13, 32]) && (je.stopPropagation(), je.preventDefault())
                    },
                    onKeyup: je => {
                        if ($e(je, [13, 32])) {
                            const Pe = ve(c, L);
                            C.value = Pe.timestamp.date, v.value.onClickTime !== void 0 && u("click-time", {
                                scope: Pe,
                                event: je
                            })
                        }
                    },
                    ...Re("-time", je => ({
                        scope: ve(_e(je, c, e.timeClicksClamped, J.now), L),
                        event: je
                    }))
                };
            e.noAria !== !0 && (Bt.ariaLabel = T.value(c, !1));
            const ra = N ? N({
                scope: ue
            }) : void 0;
            return d("div", Bt, [ra, Xe()])
        }

        function E() {
            const c = {
                ariaHidden: "true",
                class: {
                    "q-calendar-day__intervals-column": !0, "q-calendar__ellipsis": !0, "q-calendar__sticky": j.value === !0
                },
                ...Re("-interval", L => ({
                    scope: {
                        timestamp: Q(L, Ue.value, e.timeClicksClamped, J.now)
                    },
                    event: L
                }))
            };
            return d("div", c, se())
        }

        function se() {
            return ie.value[0].map(c => ye(c))
        }

        function ye(c) {
            const L = t["interval-label"],
                S = G(e.intervalHeight),
                ee = e.shortIntervalLabel ? ? !1,
                Ve = (e.showIntervalLabel || he)(c) ? X.value(c, ee) : void 0;
            return d("div", {
                key: c.time,
                class: {
                    "q-calendar-day__interval": c.minute === 0, "q-calendar-day__interval--section": c.minute !== 0
                },
                style: {
                    height: S
                }
            }, [d("div", {
                class: "q-calendar-day__interval--text q-calendar__overflow-wrap"
            }, [L ? L({
                scope: {
                    timestamp: c,
                    label: Ve
                }
            }) : Ve])])
        }

        function ae() {
            const {
                start: c,
                end: L,
                maxDays: S
            } = Le.value;
            (U.value !== c.date || p.value !== L.date || R.value !== S) && (U.value = c.date, p.value = L.date, R.value = S);
            const ee = z.width > 0,
                N = Ot(d("div", {
                    key: U.value,
                    class: "q-calendar-day"
                }, [ee === !0 && j.value !== !0 && e.noHeader !== !0 && ct(), ee && a()]), [
                    [yt, ut]
                ]);
            if (e.animated === !0) {
                const ue = "q-calendar--" + (V.value === "prev" ? e.transitionPrev : e.transitionNext);
                return d($t, {
                    name: ue,
                    appear: !0
                }, () => N)
            }
            return N
        }
        return l({
            prev: _t,
            next: ft,
            move: ze,
            moveToToday: st,
            updateCurrent: pe,
            timeStartPos: Ie,
            timeDurationHeight: Te,
            heightToMinutes: at,
            scrollToTime: Fe
        }), () => we()
    }
});
const kn = {
    dayHeight: {
        type: [Number, String],
        default: 0,
        validator: e => Be(e)
    },
    dayMinHeight: {
        type: [Number, String],
        default: 0,
        validator: e => Be(e)
    },
    dayStyle: Function,
    dayClass: Function,
    weekdayStyle: Function,
    weekdayClass: Function,
    dayPadding: String,
    minWeeks: {
        type: [Number, String],
        default: 1,
        validator: e => Be(e)
    },
    shortMonthLabel: Boolean,
    showWorkWeeks: Boolean,
    showMonthLabel: {
        type: Boolean,
        default: !0
    },
    showDayOfYearLabel: Boolean,
    enableOutsideDays: Boolean,
    noOutsideDays: Boolean,
    hover: Boolean,
    miniMode: {
        type: [Boolean, String],
        validator: e => [!0, !1, "auto"].includes(e)
    },
    breakpoint: {
        type: [Number, String],
        default: "md",
        validator: e => ["xs", "sm", "md", "lg", "xl"].includes(e) || Be(e)
    },
    monthLabelSize: {
        type: String,
        default: "sm",
        validator: e => ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"].includes(e) || !!e && e.length > 0
    }
};

function Nn(e, t, {
    times: u,
    parsedStart: l,
    parsedEnd: i,
    size: h,
    headerColumnRef: _
}) {
    const m = I(() => parseInt(e.minWeeks, 10)),
        D = I(() => m.value * e.weekdays.length),
        q = I(() => x(Ee(l.value))),
        g = I(() => P(fe(i.value))),
        B = I(() => {
            let v = 0;
            return e.cellWidth ? v = Number(e.cellWidth) : h.width > 0 && _.value && (v = _.value.offsetWidth / e.weekdays.length), v
        }),
        V = I(() => Ut(q.value, g.value, u.today, e.weekdays, e.disabledBefore, e.disabledAfter, e.disabledWeekdays, e.disabledDays, Number.MAX_SAFE_INTEGER, D.value)),
        U = I(() => {
            const v = u.today,
                j = x(v),
                J = P(v);
            return Ut(j, J, v, e.weekdays, e.disabledBefore, e.disabledAfter, e.disabledWeekdays, e.disabledDays, e.weekdays.length, e.weekdays.length)
        }),
        p = I(() => qt(e.locale, (v, j) => ({
            timeZone: "UTC",
            month: j ? "short" : "long"
        }))),
        R = I(() => {
            switch (e.breakpoint) {
                case "xs":
                    return 300;
                case "sm":
                    return 350;
                case "md":
                    return 400;
                case "lg":
                    return 450;
                case "xl":
                    return 500;
                default:
                    return parseInt(e.breakpoint, 10)
            }
        }),
        C = I(() => {
            switch (e.monthLabelSize) {
                case "xxs":
                    return ".4em";
                case "xs":
                    return ".6em";
                case "sm":
                    return ".8em";
                case "md":
                    return "1.0em";
                case "lg":
                    return "1.2em";
                case "xl":
                    return "1.4em";
                case "xxl":
                    return "1.6em";
                default:
                    return e.monthLabelSize
            }
        });
    let z = !0;
    const M = I(() => {
        const v = e.miniMode === !0 || e.miniMode === "auto" && e.breakpoint !== void 0 && h.width < R.value;
        return z && (z = !1, t("mini-mode", v)), v
    });
    te(M, v => {
        t("mini-mode", v)
    });

    function x(v) {
        return Ct(v, e.weekdays, u.today)
    }

    function P(v) {
        return kt(v, e.weekdays, u.today)
    }

    function Ee(v) {
        return Ht(v)
    }

    function fe(v) {
        return wt(v)
    }

    function ge(v) {
        const j = Z(v);
        return j < Z(l.value) || j > Z(i.value)
    }
    return {
        parsedCellWidth: B,
        parsedMinWeeks: m,
        parsedMinDays: D,
        parsedMonthStart: q,
        parsedMonthEnd: g,
        parsedBreakpoint: R,
        parsedMonthLabelSize: C,
        days: V,
        todayWeek: U,
        isMiniMode: M,
        monthFormatter: p,
        isOutside: ge
    }
}
const {
    renderButton: Bn
} = oa();
var fa = Et({
        name: "QCalendarMonth",
        directives: {
            ResizeObserver: yt
        },
        props: { ...It,
            ...kn,
            ...Rt,
            ...ta,
            ...Nt
        },
        emits: ["update:model-value", ...aa, ...Jt, "mini-mode", ...Se("-date"), ...Se("-day"), ...Se("-head-workweek"), ...Se("-head-day"), ...Se("-workweek")],
        setup(e, {
            slots: t,
            emit: u,
            expose: l
        }) {
            const i = b(null),
                h = b(null),
                _ = b(null),
                m = b(e.modelValue || ke()),
                D = b(le(e.modelValue || ke())),
                q = b({}),
                g = b([]),
                B = b([]),
                V = b("next"),
                U = b(e.modelValue || ke()),
                p = b("0000-00-00"),
                R = b(0),
                C = b(e.modelValue),
                z = St({
                    width: 0,
                    height: 0
                }),
                M = b(),
                x = b(""),
                P = b(null),
                Ee = b(null),
                fe = I(() => "month"),
                ge = xt();
            if (ge === null) throw new Error("current instance is null");
            const {
                emitListeners: v
            } = ea(ge), {
                isSticky: j
            } = Sa(e);
            te(j, () => {});
            const {
                times: J,
                setCurrent: Ae,
                updateCurrent: pe
            } = Xt(e);
            pe(), Ae();
            const {
                parsedStart: Ue,
                parsedEnd: Ye,
                dayFormatter: Qe,
                weekdayFormatter: tt,
                ariaDateFormatter: Ge,
                dayStyleDefault: Je,
                getRelativeClasses: Ce
            } = jt(e, {
                startDate: U,
                endDate: p,
                times: J
            }), xe = I(() => We(e.modelValue, J.now) || Ue.value || J.today);
            D.value = xe.value, m.value = xe.value.date;
            const Le = I(() => {
                    const r = {};
                    return e.dayPadding !== void 0 && (r.padding = e.dayPadding), r.minWidth = Ie.value, r.maxWidth = Ie.value, r.width = Ie.value, r
                }),
                {
                    renderValues: Oe
                } = Qt(e, {
                    parsedView: fe,
                    times: J,
                    parsedValue: xe
                }),
                {
                    rootRef: Me,
                    __renderCalendar: we
                } = Zt(e, W, {
                    scrollArea: i,
                    pane: h
                }),
                {
                    days: oe,
                    todayWeek: ie,
                    isMiniMode: X,
                    parsedCellWidth: T,
                    parsedMonthLabelSize: K,
                    isOutside: Y,
                    monthFormatter: he
                } = Nn(e, u, {
                    times: J,
                    parsedStart: Ue,
                    parsedEnd: Ye,
                    size: z,
                    headerColumnRef: _
                }),
                {
                    move: $
                } = pt(e, {
                    parsedView: fe,
                    parsedValue: xe,
                    direction: V,
                    maxDays: R,
                    times: J,
                    emittedValue: C,
                    emit: u
                }),
                {
                    getDefaultMouseEventHandlers: _e
                } = Gt(u, v),
                {
                    checkChange: Q
                } = na(u, {
                    days: oe,
                    lastStart: P,
                    lastEnd: Ee
                }),
                {
                    isKeyCode: ve
                } = Lt(),
                {
                    tryFocus: Fe
                } = ua(e, {
                    rootRef: Me,
                    focusRef: m,
                    focusValue: D,
                    datesRef: q,
                    parsedView: fe,
                    emittedValue: C,
                    direction: V,
                    times: J
                }),
                at = I(() => Me.value && e.showWorkWeeks === !0 ? parseInt(window.getComputedStyle(Me.value).getPropertyValue(X.value === !0 ? "--calendar-mini-work-week-width" : "--calendar-work-week-width"), 10) : 0),
                Te = I(() => e.weekdays.length),
                Ie = I(() => {
                    if (Me.value) {
                        const r = z.width || Me.value.getBoundingClientRect().width;
                        if (r && Te.value) return (r - at.value) / Te.value + "px"
                    }
                    return 100 / Te.value + "%"
                }),
                ze = I(() => e.focusable === !0 && e.focusType.includes("day") && X.value !== !0),
                Re = I(() => e.focusable === !0 && e.focusType.includes("date") && ze.value !== !0);
            te([oe], Q, {
                deep: !0,
                immediate: !0
            }), te(() => e.modelValue, (r, o) => {
                if (C.value !== r) {
                    if (e.animated === !0) {
                        const H = Z(le(r)),
                            a = Z(le(o));
                        V.value = H >= a ? "next" : "prev"
                    }
                    C.value = r
                }
                m.value = r
            }), te(C, (r, o) => {
                if (C.value !== e.modelValue) {
                    if (e.animated === !0) {
                        const H = Z(le(r)),
                            a = Z(le(o));
                        V.value = H >= a ? "next" : "prev"
                    }
                    u("update:model-value", r)
                }
            }), te(m, r => {
                r && (D.value = We(r), C.value !== r && (C.value = r))
            }), te(D, () => {
                q.value[m.value] ? q.value[m.value].focus() : Fe()
            }), zt(() => {
                q.value = {}, g.value = [], B.value = [], ga(() => {
                    st()
                })
            }), Yt(() => {
                st()
            });

            function ht() {
                C.value = ke()
            }

            function $e(r = 1) {
                $(r)
            }

            function lt(r = 1) {
                $(-r)
            }

            function dt({
                width: r,
                height: o
            }) {
                z.width = r, z.height = o
            }

            function nt(r) {
                return r.date === C.value
            }

            function it(r) {
                for (let o = 0; o < r.length; ++o)
                    if (r[o].current === !0) return {
                        timestamp: r[o]
                    };
                return {
                    timestamp: !1
                }
            }

            function st() {
                if (!(X.value === !0 || e.dayHeight !== 0 || t.week === void 0) && window)
                    for (const o in g.value) {
                        const H = g.value[o];
                        if (H === void 0) continue;
                        const a = B.value[o];
                        if (a === void 0) continue;
                        const f = window.getComputedStyle(H),
                            k = parseFloat(f.marginTop) + parseFloat(f.marginBottom);
                        a.clientHeight + k > a.clientHeight && (a.style.height = H.clientHeight + k + "px")
                    }
            }

            function ft() {
                return d("div", {
                    class: "q-calendar-month__body"
                }, [...A()])
            }

            function _t() {
                return d("div", {
                    role: "presentation",
                    class: "q-calendar-month__head"
                }, [e.showWorkWeeks === !0 && Ze(), d("div", {
                    class: "q-calendar-month__head--wrapper"
                }, [ut()])])
            }

            function ut() {
                return d("div", {
                    ref: _,
                    class: {
                        "q-calendar-month__head--weekdays": !0
                    }
                }, [...ct()])
            }

            function Ze() {
                const r = t["head-workweek"],
                    o = {
                        start: Ue.value,
                        end: Ye.value,
                        miniMode: X.value
                    };
                return d("div", {
                    class: "q-calendar-month__head--workweek",
                    ..._e("-head-workweek", H => ({
                        scope: o,
                        event: H
                    }))
                }, r ? r({
                    scope: o
                }) : "#")
            }

            function ct() {
                return ie.value.map((r, o) => be(r, o))
            }

            function be(r, o) {
                const H = t["head-day"],
                    a = oe.value.filter(ye => ye.weekday === r.weekday),
                    f = a[0].weekday,
                    n = {
                        activeDate: e.noActiveDate !== !0 && nt(r),
                        weekday: f,
                        timestamp: r,
                        days: a,
                        index: o,
                        miniMode: X.value,
                        droppable: M.value === Number(r.weekday),
                        disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(r.weekday)) : !1
                    },
                    y = typeof e.weekdayClass == "function" ? e.weekdayClass({
                        scope: n
                    }) : {},
                    w = e.focusable === !0 && e.focusType.includes("weekday"),
                    F = Ie.value,
                    O = e.weekdayStyle || Je,
                    E = {
                        width: F,
                        maxWidth: F,
                        minWidth: F,
                        ...O({
                            scope: n
                        })
                    },
                    se = {
                        key: r.date + (o !== void 0 ? "-" + o : ""),
                        tabindex: w === !0 ? 0 : -1,
                        class: {
                            "q-calendar-month__head--weekday": !0, ...y, "q-disabled-day disabled": n.disabled === !0, ["q-calendar__" + e.weekdayAlign]: !0, "q-calendar__ellipsis": !0, "q-calendar__focusable": w === !0
                        },
                        style: E,
                        onDragenter: ye => {
                            e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(ye, "head-day", {
                                scope: n
                            }) === !0 ? M.value = Number(r.weekday) : M.value = -1)
                        },
                        onDragover: ye => {
                            e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(ye, "head-day", {
                                scope: n
                            }) === !0 ? M.value = Number(r.weekday) : M.value = -1)
                        },
                        onDragleave: ye => {
                            e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(ye, "head-day", {
                                scope: n
                            }) === !0 ? M.value = Number(r.weekday) : M.value = -1)
                        },
                        onDrop: ye => {
                            e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(ye, "head-day", {
                                scope: n
                            }) === !0 ? M.value = Number(r.weekday) : M.value = -1)
                        },
                        onFocus: () => {
                            w === !0 && (m.value = r.date)
                        },
                        ..._e("-head-day", ye => ({
                            scope: n,
                            event: ye
                        }))
                    };
                return e.noAria !== !0 && (se.ariaLabel = tt.value(r, !1)), d("div", se, [H === void 0 && Ne(r, e.shortWeekdayLabel || X.value), H !== void 0 && H({
                    scope: n
                }), mt(r, o), w === !0 && Xe()])
            }

            function mt(r, o) {
                const H = t["head-day-event"],
                    a = e.noActiveDate !== !0 && nt(r),
                    f = oe.value.filter(O => O.weekday === r.weekday),
                    n = {
                        weekday: f[0].weekday,
                        timestamp: r,
                        days: f,
                        index: o,
                        miniMode: X.value,
                        activeDate: a,
                        disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(r.weekday)) : !1
                    },
                    y = Ie.value,
                    w = e.weekdayStyle || Je,
                    F = {
                        width: y,
                        maxWidth: y,
                        minWidth: y,
                        ...w({
                            scope: n
                        })
                    };
                return d("div", {
                    key: "event-" + r.date + (o !== void 0 ? "-" + o : ""),
                    class: {
                        "q-calendar-month__head--event": !0
                    },
                    style: F
                }, [H !== void 0 && H({
                    scope: n
                })])
            }

            function Ne(r, o) {
                const H = tt.value(r, o || e.weekdayBreakpoints[0] > 0 && T.value <= e.weekdayBreakpoints[0]);
                return d("span", {
                    class: "q-calendar__ellipsis"
                }, X.value === !0 && e.shortWeekdayLabel === !0 || e.weekdayBreakpoints[1] > 0 && T.value <= e.weekdayBreakpoints[1] ? Mt(H, Number(e.minWeekdayLabel)) : H)
            }

            function A() {
                const r = e.weekdays.length,
                    o = [];
                for (let H = 0; H < oe.value.length; H += r) o.push(ne(oe.value.slice(H, H + r), H / r));
                return o
            }

            function ne(r, o) {
                const H = t.week,
                    a = e.weekdays,
                    f = {
                        week: r,
                        weekdays: a,
                        miniMode: X.value
                    },
                    k = {},
                    n = parseInt(String(e.dayHeight), 10),
                    y = parseInt(String(e.dayMinHeight), 10);
                k.height = n > 0 && X.value !== !0 ? G(n) : "auto", y > 0 && X.value !== !0 && (k.minHeight = G(y));
                const w = n === 0 && y === 0;
                return d("div", {
                    key: r[0].date,
                    ref: F => {
                        B.value[o] = F
                    },
                    class: {
                        "q-calendar-month__week--wrapper": !0, "q-calendar-month__week--auto-height": w
                    },
                    style: k
                }, [e.showWorkWeeks === !0 ? de(r) : void 0, d("div", {
                    class: "q-calendar-month__week"
                }, [d("div", {
                    class: "q-calendar-month__week--days"
                }, r.map(F => ce(F))), X.value !== !0 && H !== void 0 ? d("div", {
                    ref: F => {
                        g.value[o] = F
                    },
                    class: "q-calendar-month__week--events"
                }, H({
                    scope: f
                })) : void 0])])
            }

            function de(r) {
                const o = t.workweek,
                    H = r.length > 2 ? r[2] : r[0],
                    {
                        timestamp: a
                    } = it(r),
                    f = Number(H.workweek).toLocaleString(e.locale),
                    k = {
                        workweekLabel: f,
                        week: r,
                        miniMode: X.value
                    };
                return d("div", {
                    key: H.workweek,
                    class: {
                        "q-calendar-month__workweek": !0, ...Ce(a !== !1 ? a : H, !1)
                    },
                    ..._e("-workweek", n => ({
                        scope: k,
                        event: n
                    }))
                }, o ? o({
                    scope: k
                }) : f)
            }

            function ce(r) {
                const o = t.day,
                    H = e.dayStyle || Je,
                    a = Y(r),
                    f = e.noActiveDate !== !0 && xe.value.date === r.date,
                    k = a === !1 && e.showMonthLabel === !0 && oe.value.find(E => E.month === r.month) ? .day === r.day,
                    n = {
                        outside: a,
                        timestamp: r,
                        miniMode: X.value,
                        activeDate: f,
                        hasMonth: k,
                        droppable: x.value === r.date,
                        disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(r.weekday)) : !1
                    },
                    y = Object.assign({ ...Le.value
                    }, H({
                        scope: n
                    })),
                    w = typeof e.dayClass == "function" ? e.dayClass({
                        scope: n
                    }) : {},
                    F = {
                        key: r.date,
                        ref: E => {
                            ze.value === !0 && (q.value[r.date] = E)
                        },
                        tabindex: ze.value === !0 ? 0 : -1,
                        class: {
                            "q-calendar-month__day": !0, ...w, ...Ce(r, a, Array.from(e.selectedDates), e.selectedStartEndDates, e.hover), "q-active-date": f === !0, disabled: e.enableOutsideDays !== !0 && a === !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": ze.value === !0
                        },
                        style: y,
                        onFocus: () => {
                            ze.value === !0 && (m.value = r.date)
                        },
                        onKeydown: E => {
                            a !== !0 && r.disabled !== !0 && ve(E, [13, 32]) && (E.stopPropagation(), E.preventDefault())
                        },
                        onKeyup: E => {
                            a !== !0 && r.disabled !== !0 && ve(E, [13, 32]) && (E.stopPropagation(), E.preventDefault(), v.value.onClickDay !== void 0 && X.value !== !0 && u("click-day", {
                                scope: n,
                                e: E
                            }))
                        },
                        ..._e("-day", E => ({
                            scope: n,
                            event: E
                        }))
                    };
                return a !== !0 && Object.assign(F, {
                    onDragenter: E => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(E, "day", {
                            scope: n
                        }) === !0 ? x.value = r.date : x.value = "")
                    },
                    onDragover: E => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(E, "day", {
                            scope: n
                        }) === !0 ? x.value = r.date : x.value = "")
                    },
                    onDragleave: E => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(E, "day", {
                            scope: n
                        }) === !0 ? x.value = r.date : x.value = "")
                    },
                    onDrop: E => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(E, "day", {
                            scope: n
                        }) === !0 ? x.value = r.date : x.value = "")
                    }
                }), e.noAria !== !0 && (F.ariaLabel = Ge.value(r, !1)), d("div", F, [me(r, a, k), d("div", {
                    class: {
                        "q-calendar-month__day--content": !0
                    }
                }, o ? o({
                    scope: n
                }) : void 0), ze.value === !0 && Xe()])
            }

            function me(r, o, H) {
                let a, f;
                const k = [He(r, o)];
                X.value !== !0 && H === !0 && z.width > 340 && (f = s(r, o)), X.value !== !0 && e.showDayOfYearLabel === !0 && f === void 0 && z.width > 300 && (a = qe(r, o)), e.dateAlign === "left" ? (a !== void 0 && k.push(a), f !== void 0 && k.push(f)) : e.dateAlign === "right" ? (a !== void 0 && k.unshift(a), f !== void 0 && k.unshift(f)) : (a = void 0, f = void 0);
                const n = {
                    class: {
                        "q-calendar-month__day--label__wrapper": !0, "q-calendar__ellipsis": !0, ["q-calendar__" + e.dateAlign]: a === void 0 && f === void 0, "q-calendar__justify": a !== void 0 || f !== void 0
                    }
                };
                return d("div", n, k)
            }

            function He(r, o) {
                if (o === !0 && e.noOutsideDays === !0) return;
                const H = Qe.value(r, !1),
                    a = t["head-day-label"],
                    f = t["head-day-button"],
                    k = e.selectedDates && Array.from(e.selectedDates).length > 0 && Array.from(e.selectedDates).includes(r.date),
                    n = e.noActiveDate !== !0 && nt(r),
                    y = {
                        dayLabel: H,
                        timestamp: r,
                        outside: o,
                        activeDate: n,
                        selectedDate: k,
                        miniMode: X.value,
                        disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(r.weekday)) : !1
                    },
                    w = {
                        key: r.date,
                        ref: F => {
                            Re.value === !0 && (q.value[r.date] = F)
                        },
                        tabindex: Re.value === !0 ? 0 : -1,
                        class: {
                            "q-calendar-month__day--label": !0, "q-calendar__button": !0, "q-calendar__button--round": e.dateType === "round", "q-calendar__button--rounded": e.dateType === "rounded", "q-calendar__button--bordered": r.current === !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": Re.value === !0
                        },
                        disabled: r.disabled === !0 || e.enableOutsideDays !== !0 && o === !0,
                        onFocus: () => {
                            Re.value === !0 && (m.value = r.date)
                        },
                        onKeydown: F => {
                            o !== !0 && r.disabled !== !0 && ve(F, [13, 32]) && (F.stopPropagation(), F.preventDefault())
                        },
                        onKeyup: F => {
                            Re.value === !0 && o !== !0 && r.disabled !== !0 && ve(F, [13, 32]) && (F.stopPropagation(), F.preventDefault(), C.value = r.date, v.value.onClickDate !== void 0 && u("click-date", {
                                scope: y,
                                event: F
                            }))
                        },
                        ..._e("-date", (F, O) => (F.stopPropagation(), (O === "click-date" || O === "contextmenu-date") && (C.value = r.date), {
                            scope: y,
                            event: F
                        }))
                    };
                return e.noAria !== !0 && (w.ariaLabel = Ge.value(r, !1)), [f ? f({
                    scope: y
                }) : Bn(e, w, a ? a({
                    scope: y
                }) : H), Re.value === !0 && Xe()].filter(F => F !== !1)
            }

            function qe(r, o) {
                if (o === !0 && e.noOutsideDays === !0) return;
                const H = t["day-of-year"];
                return d("span", {
                    class: {
                        "q-calendar-month__day--day-of-year": !0, "q-calendar__ellipsis": !0
                    }
                }, H ? H({
                    scope: {
                        timestamp: r
                    }
                }) : r.doy)
            }

            function s(r, o) {
                if (o === !0 && e.noOutsideDays === !0) return;
                const H = t["month-label"],
                    a = he.value(r, e.shortMonthLabel || z.width < 500),
                    f = {
                        monthLabel: a,
                        timestamp: r,
                        miniMode: X.value
                    },
                    k = {};
                return X.value !== !0 && K.value !== void 0 && (k.fontSize = K.value), d("span", {
                    class: "q-calendar-month__day--month q-calendar__ellipsis",
                    style: k
                }, [H ? H({
                    scope: f
                }) : X.value !== !0 ? a : void 0])
            }

            function W() {
                const {
                    start: r,
                    end: o
                } = Oe.value;
                U.value = r.date, p.value = o.date;
                const H = z.width > 0,
                    a = Ot(d("div", {
                        class: {
                            "q-calendar-mini": X.value === !0, "q-calendar-month": !0
                        },
                        key: U.value
                    }, [H === !0 && e.noHeader !== !0 && _t(), H === !0 && ft()]), [
                        [yt, dt]
                    ]);
                if (e.animated === !0) {
                    const f = "q-calendar--" + (V.value === "prev" ? e.transitionPrev : e.transitionNext);
                    return d($t, {
                        name: f,
                        appear: !0
                    }, () => a)
                }
                return a
            }
            return l({
                prev: lt,
                next: $e,
                move: $,
                moveToToday: ht,
                updateCurrent: pe
            }), () => we()
        }
    }),
    va = Et({
        name: "QCalendarResource",
        props: { ...It,
            ...mn,
            ...Za,
            ...qa,
            ...ca,
            ...Rt,
            ...Nt
        },
        emits: ["update:model-value", "update:model-resources", "resource-expanded", ...aa, ...Jt, ...Se("-date"), ...Se("-interval"), ...Se("-head-day"), ...Se("-time"), ...Se("-head-resources"), ...Se("-resource")],
        setup(e, {
            slots: t,
            emit: u,
            expose: l
        }) {
            const i = b(null),
                h = b(null),
                _ = b(null),
                m = b(null),
                D = b(e.modelValue || ke()),
                q = b(le(e.modelValue || ke())),
                g = b({}),
                B = b({}),
                V = b("next"),
                U = b(e.modelValue || ke()),
                p = b("0000-00-00"),
                R = b(0),
                C = b(e.modelValue),
                z = St({
                    width: 0,
                    height: 0
                }),
                M = b(""),
                x = b(""),
                P = b(""),
                Ee = b(null),
                fe = b(null);
            te(() => e.view, () => {
                R.value = 0
            });
            const ge = I(() => e.view === "month" ? "month-interval" : e.view),
                v = I(() => parseInt(String(e.cellWidth), 10)),
                j = xt();
            if (j === null) throw new Error("current instance is null");
            const {
                emitListeners: J
            } = ea(j), {
                times: Ae,
                setCurrent: pe,
                updateCurrent: Ue
            } = Xt(e);
            Ue(), pe();
            const {
                parsedStart: Ye,
                parsedEnd: Qe,
                dayStyleDefault: tt
            } = jt(e, {
                startDate: U,
                endDate: p,
                times: Ae
            }), Ge = I(() => We(e.modelValue, Ae.now) || Ye.value || Ae.today);
            q.value = Ge.value, D.value = Ge.value.date;
            const {
                renderValues: Je
            } = Qt(e, {
                parsedView: ge,
                times: Ae,
                parsedValue: Ge
            }), {
                rootRef: Ce,
                __renderCalendar: xe
            } = Zt(e, Ne, {
                scrollArea: i,
                pane: h
            }), {
                days: Le,
                intervals: Oe,
                intervalFormatter: Me,
                styleDefault: we,
                scrollToTimeX: oe,
                timeDurationWidth: ie,
                timeStartPosX: X,
                widthToMinutes: T
            } = Fa(e, {
                times: Ae,
                scrollArea: i,
                parsedStart: Ye,
                parsedEnd: Qe,
                maxDays: R,
                size: z,
                headerColumnRef: m
            }), {
                move: K
            } = pt(e, {
                parsedView: ge,
                parsedValue: Ge,
                direction: V,
                maxDays: R,
                times: Ae,
                emittedValue: C,
                emit: u
            }), {
                getDefaultMouseEventHandlers: Y
            } = Gt(u, J), {
                checkChange: he
            } = na(u, {
                days: Le,
                lastStart: Ee,
                lastEnd: fe
            }), {
                isKeyCode: $
            } = Lt(), {
                tryFocus: _e
            } = ua(e, {
                rootRef: Ce,
                focusRef: D,
                focusValue: q,
                datesRef: g,
                parsedView: ge,
                emittedValue: C,
                direction: V,
                times: Ae
            }), Q = I(() => {
                const A = parseInt(String(e.resourceHeight), 10);
                return A === 0 ? "auto" : A
            }), ve = I(() => parseInt(String(e.resourceMinHeight), 10)), Fe = I(() => parseInt(String(e.intervalHeaderHeight), 10));
            te([Le], he, {
                deep: !0,
                immediate: !0
            }), te(() => e.modelValue, (A, ne) => {
                if (C.value !== A) {
                    if (e.animated === !0) {
                        const de = Z(le(A)),
                            ce = Z(le(ne));
                        V.value = de >= ce ? "next" : "prev"
                    }
                    C.value = A
                }
                D.value = A
            }), te(C, (A, ne) => {
                if (C.value !== e.modelValue) {
                    if (e.animated === !0) {
                        const de = Z(le(A)),
                            ce = Z(le(ne));
                        V.value = de >= ce ? "next" : "prev"
                    }
                    u("update:model-value", A)
                }
            }), te(D, A => {
                A && (q.value = We(A))
            }), te(q, () => {
                g.value[D.value] ? g.value[D.value].focus() : _e()
            }), zt(() => {
                g.value = {}, B.value = {}
            }), Yt(() => {});

            function at() {
                C.value = ke()
            }

            function Te(A = 1) {
                K(A)
            }

            function Ie(A = 1) {
                K(-A)
            }

            function ze({
                width: A,
                height: ne
            }) {
                z.width = A, z.height = ne
            }

            function Re(A) {
                return A.date === C.value
            }

            function ht() {
                const A = {
                    height: G(Fe.value)
                };
                return d("div", {
                    ref: _,
                    roll: "presentation",
                    class: {
                        "q-calendar-resource__head": !0, "q-calendar__sticky": e.noSticky !== !0
                    },
                    style: A
                }, [$e(), lt()])
            }

            function $e() {
                const A = t["head-resources"],
                    ne = G(Fe.value),
                    de = {
                        timestamps: Oe,
                        date: e.modelValue,
                        resources: e.modelResources
                    };
                return d("div", {
                    class: {
                        "q-calendar-resource__head--resources": !0, "q-calendar__sticky": e.noSticky !== !0
                    },
                    style: {
                        height: ne
                    },
                    ...Y("-head-resources", ce => ({
                        scope: de,
                        event: ce
                    }))
                }, [A && A({
                    scope: de
                })])
            }

            function lt() {
                return d("div", {
                    ref: m,
                    class: {
                        "q-calendar-resource__head--intervals": !0
                    }
                }, [Oe.value.map(A => A.map((ne, de) => dt(ne, de)))])
            }

            function dt(A, ne) {
                const de = t["interval-label"],
                    ce = e.noActiveDate !== !0 && Re(A),
                    me = G(v.value),
                    He = G(Fe.value),
                    qe = e.shortIntervalLabel,
                    s = Me.value(A, qe),
                    W = {
                        timestamp: A,
                        index: ne,
                        label: s,
                        droppable: M.value === s
                    },
                    r = e.intervalStyle || tt,
                    o = {
                        width: me,
                        maxWidth: me,
                        minWidth: me,
                        height: He,
                        ...r({
                            scope: W
                        })
                    },
                    H = typeof e.intervalClass == "function" ? e.intervalClass({
                        scope: W
                    }) : {},
                    a = e.focusable === !0 && e.focusType.includes("interval");
                return d("div", {
                    key: s,
                    tabindex: a === !0 ? 0 : -1,
                    class: {
                        "q-calendar-resource__head--interval": !0, ...H, "q-active-date": ce, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": a === !0
                    },
                    style: o,
                    onDragenter: f => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(f, "interval", {
                            scope: W
                        }) === !0 ? M.value = s : M.value = "")
                    },
                    onDragover: f => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(f, "interval", {
                            scope: W
                        }) === !0 ? M.value = s : M.value = "")
                    },
                    onDragleave: f => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(f, "interval", {
                            scope: W
                        }) === !0 ? M.value = s : M.value = "")
                    },
                    onDrop: f => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(f, "interval", {
                            scope: W
                        }) === !0 ? M.value = s : M.value = "")
                    },
                    onFocus: () => {
                        a === !0 && (D.value = s)
                    },
                    ...Y("-interval", f => ({
                        scope: W,
                        event: f
                    }))
                }, [de ? de({
                    scope: W
                }) : s, Xe()])
            }

            function nt() {
                return d("div", {
                    class: "q-calendar-resource__body"
                }, [it()])
            }

            function it() {
                return d("div", {
                    ref: i,
                    class: {
                        "q-calendar-resource__scroll-area": !0, "q-calendar__scroll": !0
                    }
                }, [ft()])
            }

            function st() {
                return d("div", {}, "No resources have been defined")
            }

            function ft() {
                return d("div", {
                    class: "q-calendar-resource__day--container"
                }, [ht(), e.modelResources === void 0 && st(), e.modelResources !== void 0 && _t()])
            }

            function _t() {
                return d("div", {
                    class: "q-calendar-resource__resources--body"
                }, ut())
            }

            function ut(A = void 0, ne = 0, de = !0) {
                return A === void 0 && (A = e.modelResources), A.map((ce, me) => Ze(ce, me, ne, ce.children !== void 0 ? ce.expanded : de)).filter(ce => !!ce)
            }

            function Ze(A, ne, de = 0, ce = !0) {
                const me = {};
                me.height = Q.value === "auto" ? Q.value : G(Q.value), ve.value > 0 && (me.minHeight = G(ve.value));
                const He = d("div", {
                    key: A[e.resourceKey] + "-" + ne,
                    class: {
                        "q-calendar-resource__resource--row": !0
                    },
                    style: me
                }, [ct(A, ne, de, ce), be(A, ne)]);
                return A.children !== void 0 ? [He, d("div", {
                    class: {
                        "q-calendar__child": !0, "q-calendar__child--expanded": ce === !0, "q-calendar__child--collapsed": ce !== !0
                    }
                }, [ut(A.children, de + 1, ce === !1 ? ce : A.expanded)])] : [He]
            }

            function ct(A, ne, de = 0, ce = !0) {
                const me = t["resource-label"],
                    He = {};
                He.height = A.height !== void 0 ? G(parseInt(A.height, 10)) : Q.value ? G(Q.value) : "auto", ve.value > 0 && (He.minHeight = G(ve.value));
                const qe = e.resourceStyle || we,
                    s = A[e.resourceLabel],
                    W = e.focusable === !0 && e.focusType.includes("resource") && ce === !0,
                    r = A[e.resourceKey],
                    o = {
                        resource: A,
                        timestamps: Oe,
                        resourceIndex: ne,
                        indentLevel: de,
                        label: s,
                        droppable: x.value === r
                    },
                    H = typeof e.resourceClass == "function" ? e.resourceClass({
                        scope: o
                    }) : {};
                return d("div", {
                    key: A[e.resourceKey] + "-" + ne,
                    ref: a => {
                        a instanceof HTMLElement && (B.value[A[e.resourceKey]] = a)
                    },
                    tabindex: W === !0 ? 0 : -1,
                    class: {
                        "q-calendar-resource__resource": de === 0, "q-calendar-resource__resource--section": de !== 0, ...H, "q-calendar__sticky": e.noSticky !== !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": W === !0
                    },
                    style: { ...He,
                        ...qe({
                            scope: o
                        })
                    },
                    onDragenter: a => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(a, "resource", {
                            scope: o
                        }) === !0 ? x.value = r : x.value = "")
                    },
                    onDragover: a => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(a, "resource", {
                            scope: o
                        }) === !0 ? x.value = r : x.value = "")
                    },
                    onDragleave: a => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(a, "resource", {
                            scope: o
                        }) === !0 ? x.value = r : x.value = "")
                    },
                    onDrop: a => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(a, "resource", {
                            scope: o
                        }) === !0 ? x.value = r : x.value = "")
                    },
                    onKeydown: a => {
                        $(a, [13, 32]) && (a.stopPropagation(), a.preventDefault())
                    },
                    onKeyup: a => {
                        $(a, [13, 32]) && J.value.onClickResource !== void 0 && u("click-resource", {
                            scope: o,
                            event: a
                        })
                    },
                    ...Y("-resource", a => ({
                        scope: o,
                        event: a
                    }))
                }, [
                    [d("div", {
                        class: {
                            "q-calendar__parent": A.children !== void 0, "q-calendar__parent--expanded": A.children !== void 0 && A.expanded === !0, "q-calendar__parent--collapsed": A.children !== void 0 && A.expanded !== !0
                        },
                        onClick: a => {
                            a.stopPropagation(), A.expanded = !A.expanded, u("resource-expanded", {
                                expanded: A.expanded,
                                scope: o
                            })
                        }
                    }), d("div", {
                        class: {
                            "q-calendar-resource__resource--text": !0, "q-calendar__ellipsis": !0
                        },
                        style: {
                            paddingLeft: 10 * de + 2 + "px"
                        }
                    }, [me ? me({
                        scope: o
                    }) : s]), Xe()]
                ])
            }

            function be(A, ne) {
                const de = t["resource-intervals"],
                    ce = {
                        resource: A,
                        timestamps: Oe,
                        resourceIndex: ne,
                        timeStartPosX: X,
                        timeDurationWidth: ie
                    };
                return d("div", {
                    class: "q-calendar-resource__resource--intervals"
                }, [Oe.value.map(me => me.map(He => mt(A, He, ne))), de && de({
                    scope: ce
                })])
            }

            function mt(A, ne, de) {
                const ce = t["resource-interval"],
                    me = e.noActiveDate !== !0 && Re(ne),
                    He = A[e.resourceKey],
                    qe = ne.time + "-" + He,
                    s = e.focusable === !0 && e.focusType.includes("time"),
                    W = {
                        activeDate: me,
                        resource: A,
                        timestamp: ne,
                        resourceIndex: de,
                        droppable: P.value === qe
                    },
                    r = e.intervalStyle || tt,
                    o = G(v.value),
                    H = {
                        width: o,
                        maxWidth: o,
                        minWidth: o,
                        ...r({
                            scope: W
                        })
                    };
                return H.height = A.height !== void 0 ? G(parseInt(A.height, 10)) : Q.value === "auto" ? Q.value : G(Q.value), ve.value > 0 && (H.minHeight = G(ve.value)), d("div", {
                    key: qe,
                    ref: a => {
                        a instanceof HTMLElement && (g.value[A[e.resourceKey]] = a)
                    },
                    tabindex: s === !0 ? 0 : -1,
                    class: {
                        "q-calendar-resource__resource--interval": !0, "q-active-date": me, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": s === !0
                    },
                    style: H,
                    onDragenter: a => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(a, "time", {
                            scope: W
                        }) === !0 ? P.value = qe : P.value = "")
                    },
                    onDragover: a => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(a, "time", {
                            scope: W
                        }) === !0 ? P.value = qe : P.value = "")
                    },
                    onDragleave: a => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(a, "time", {
                            scope: W
                        }) === !0 ? P.value = qe : P.value = "")
                    },
                    onDrop: a => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(a, "time", {
                            scope: W
                        }) === !0 ? P.value = qe : P.value = "")
                    },
                    onFocus: () => {
                        s === !0 && (D.value = qe)
                    },
                    ...Y("-time", a => ({
                        scope: W,
                        event: a
                    }))
                }, [ce && ce({
                    scope: W
                }), Xe()])
            }

            function Ne() {
                const {
                    start: A,
                    end: ne,
                    maxDays: de
                } = Je.value;
                (U.value !== A.date || p.value !== ne.date || R.value !== de) && (U.value = A.date, p.value = ne.date, R.value = de);
                const ce = z.width > 0,
                    me = Ot(d("div", {
                        class: "q-calendar-resource",
                        key: U.value
                    }, [ce === !0 && nt()]), [
                        [yt, ze]
                    ]);
                if (e.animated === !0) {
                    const He = "q-calendar--" + (V.value === "prev" ? e.transitionPrev : e.transitionNext);
                    return d($t, {
                        name: He,
                        appear: !0
                    }, () => me)
                }
                return me
            }
            return l({
                prev: Ie,
                next: Te,
                move: K,
                moveToToday: at,
                updateCurrent: Ue,
                timeStartPosX: X,
                timeDurationWidth: ie,
                widthToMinutes: T,
                scrollToTimeX: oe
            }), () => xe()
        }
    });
const {
    renderButton: Vn
} = oa();
var ya = Et({
    name: "QCalendarScheduler",
    directives: {
        ResizeObserver: yt
    },
    props: { ...It,
        ..._n,
        ...qa,
        ...ca,
        ...Rt,
        ...ta,
        ...Nt
    },
    emits: ["update:model-value", "update:model-resources", "resource-expanded", ...aa, ...Jt, ...Se("-date"), ...Se("-day-resource"), ...Se("-head-resources"), ...Se("-head-day"), ...Se("-resource")],
    setup(e, {
        slots: t,
        emit: u,
        expose: l
    }) {
        const i = b(null),
            h = b(null),
            _ = b(null),
            m = b(e.modelValue || ke()),
            D = b(le(e.modelValue || ke())),
            q = b({}),
            g = b({}),
            B = b(),
            V = b(),
            U = b("next"),
            p = b(e.modelValue || ke()),
            R = b("0000-00-00"),
            C = b(0),
            z = b(e.modelValue),
            M = St({
                width: 0,
                height: 0
            }),
            x = b(""),
            P = b(""),
            Ee = b(null),
            fe = b(null);
        te(() => e.view, () => {
            C.value = 0
        });
        const ge = I(() => e.view === "month" ? "month-interval" : e.view),
            v = xt();
        if (v === null) throw new Error("current instance is null");
        const {
            emitListeners: j
        } = ea(v), {
            isSticky: J
        } = Sa(e), {
            times: Ae,
            setCurrent: pe,
            updateCurrent: Ue
        } = Xt(e);
        Ue(), pe();
        const {
            parsedStart: Ye,
            parsedEnd: Qe,
            dayFormatter: tt,
            weekdayFormatter: Ge,
            ariaDateFormatter: Je,
            dayStyleDefault: Ce,
            getRelativeClasses: xe
        } = jt(e, {
            startDate: p,
            endDate: R,
            times: Ae
        }), Le = I(() => We(e.modelValue, Ae.now) || Ye.value || Ae.today);
        D.value = Le.value, m.value = Le.value.date;
        const {
            renderValues: Oe
        } = Qt(e, {
            parsedView: ge,
            parsedValue: Le,
            times: Ae
        }), {
            rootRef: Me,
            scrollWidth: we,
            __renderCalendar: oe
        } = Zt(e, k, {
            scrollArea: i,
            pane: h
        }), {
            days: ie,
            parsedCellWidth: X,
            styleDefault: T
        } = Fa(e, {
            times: Ae,
            scrollArea: i,
            parsedStart: Ye,
            parsedEnd: Qe,
            maxDays: C,
            size: M,
            headerColumnRef: _
        }), {
            move: K
        } = pt(e, {
            parsedView: ge,
            parsedValue: Le,
            direction: U,
            maxDays: C,
            times: Ae,
            emittedValue: z,
            emit: u
        }), {
            getDefaultMouseEventHandlers: Y
        } = Gt(u, j), {
            checkChange: he
        } = na(u, {
            days: ie,
            lastStart: Ee,
            lastEnd: fe
        }), {
            isKeyCode: $
        } = Lt(), {
            tryFocus: _e
        } = ua(e, {
            rootRef: Me,
            focusRef: m,
            focusValue: D,
            datesRef: q,
            parsedView: ge,
            emittedValue: z,
            direction: U,
            times: Ae
        }), Q = I(() => {
            const n = parseInt(String(e.columnCount), 10);
            return ge.value === "day" && n > 1 ? n : ge.value === "day" && e.maxDays && e.maxDays > 1 ? e.maxDays : ie.value.length
        }), ve = I(() => Me.value ? parseInt(window.getComputedStyle(Me.value).getPropertyValue("--calendar-resources-width"), 10) : 0), Fe = I(() => {
            const n = parseInt(String(e.resourceHeight), 10);
            return n === 0 ? "auto" : n
        }), at = I(() => parseInt(String(e.resourceMinHeight), 10)), Te = I(() => {
            if (Me.value) {
                const n = M.width || Me.value.getBoundingClientRect().width;
                if (n && ve.value && Q.value) return (n - we.value - ve.value) / Q.value + "px"
            }
            return 100 / Q.value + "%"
        });
        te([ie], he, {
            deep: !0,
            immediate: !0
        }), te(() => e.modelValue, (n, y) => {
            if (z.value !== e.modelValue) {
                if (e.animated === !0) {
                    const w = Z(le(n)),
                        F = Z(le(y));
                    U.value = w >= F ? "next" : "prev"
                }
                z.value = n
            }
            m.value = n
        }), te(z, (n, y) => {
            if (z.value !== e.modelValue) {
                if (e.animated === !0) {
                    const w = Z(le(n)),
                        F = Z(le(y));
                    U.value = w >= F ? "next" : "prev"
                }
                u("update:model-value", n)
            }
        }), te(m, n => {
            n && (D.value = We(n))
        }), te(D, () => {
            q.value[m.value] ? q.value[m.value].focus() : _e()
        }), te(() => e.maxDays, n => {
            C.value = n
        }), zt(() => {
            q.value = {}, B.value = void 0, V.value = void 0, g.value = {}
        }), Yt(() => {});

        function Ie() {
            z.value = ke()
        }

        function ze(n = 1) {
            K(n)
        }

        function Re(n = 1) {
            K(-n)
        }

        function ht({
            width: n,
            height: y
        }) {
            M.width = n, M.height = y
        }

        function $e(n) {
            return n.date === z.value
        }

        function lt() {
            return d("div", {
                roll: "presentation",
                class: {
                    "q-calendar-scheduler__head": !0, "q-calendar__sticky": J.value === !0
                },
                style: {
                    marginRight: we.value + "px"
                }
            }, [dt(), nt()])
        }

        function dt() {
            const n = t["head-resources"],
                y = {
                    days: ie.value,
                    timestamps: ie.value,
                    date: e.modelValue,
                    resources: e.modelResources
                };
            return d("div", {
                class: {
                    "q-calendar-scheduler__head--resources": !0, "q-calendar__sticky": J.value === !0
                },
                ...Y("-head-resources", w => ({
                    scope: y,
                    event: w
                }))
            }, [n && n({
                scope: y
            })])
        }

        function nt() {
            return d("div", {
                ref: _,
                class: {
                    "q-calendar-scheduler__head--days__column": !0
                }
            }, [it(), st()])
        }

        function it() {
            return d("div", {
                class: {
                    "q-calendar-scheduler__head--days__weekdays": !0
                }
            }, [...ft()])
        }

        function st() {
            const n = t["head-days-events"];
            return ga(() => {
                if (V.value && parseInt(String(e.columnCount), 10) === 0 && window) try {
                    const y = window.getComputedStyle(V.value);
                    B.value && B.value.parentElement && (B.value.parentElement.style.height = y.height, B.value.style.height = y.height)
                } catch {}
            }), d("div", {
                class: {
                    "q-calendar-scheduler__head--days__event": !0
                }
            }, [n && d("div", {
                ref: B,
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    overflow: "hidden",
                    zIndex: 1
                }
            }, [n({
                scope: {
                    timestamps: ie.value,
                    days: ie.value,
                    ref: V
                }
            })]), ..._t()])
        }

        function ft() {
            const n = parseInt(String(e.columnCount), 10),
                y = parseInt(String(e.columnIndexStart), 10);
            return ie.value.length === 1 && n > 0 ? Array.apply(null, new Array(n)).map((w, F) => F + y).map(w => ut(ie.value[0], w)) : ie.value.map(w => ut(w, 0))
        }

        function _t() {
            const n = parseInt(String(e.columnCount), 10),
                y = parseInt(String(e.columnIndexStart), 10);
            return ie.value.length === 1 && n > 0 ? Array.apply(null, new Array(n)).map((w, F) => F + y).map(w => ct(ie.value[0], w)) : ie.value.map(w => ct(w, 0))
        }

        function ut(n, y) {
            const w = t["head-day"],
                F = t["head-date"],
                O = e.noActiveDate !== !0 && $e(n),
                E = {
                    timestamp: n,
                    activeDate: O,
                    droppable: x.value === n.date,
                    disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(n.weekday)) : !1,
                    columnIndex: y ? ? 0
                },
                se = J.value === !0 ? G(X.value) : Te.value,
                ye = e.weekdayStyle || Ce,
                ae = {
                    width: se,
                    maxWidth: se,
                    minWidth: se,
                    ...ye({
                        scope: E
                    })
                };
            J.value === !0 && (ae.minWidth = se);
            const c = typeof e.weekdayClass == "function" ? e.weekdayClass({
                    scope: E
                }) : {},
                L = e.focusable === !0 && e.focusType.includes("weekday"),
                S = n.date + (y !== void 0 ? "-" + y : ""),
                ee = {
                    key: S,
                    ref: N => {
                        N !== null && (q.value[S] = N)
                    },
                    tabindex: L === !0 ? 0 : -1,
                    class: {
                        "q-calendar-scheduler__head--day": !0, ...c, ...xe(n), "q-active-date": O, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": L === !0
                    },
                    style: ae,
                    onFocus: () => {
                        L === !0 && (m.value = S)
                    },
                    onKeydown: N => {
                        n.disabled !== !0 && $(N, [13, 32]) && (N.stopPropagation(), N.preventDefault())
                    },
                    onKeyup: N => {
                        n.disabled !== !0 && $(N, [13, 32]) && (z.value = n.date)
                    },
                    ...Y("-head-day", N => ({
                        scope: E,
                        event: N
                    })),
                    onDragenter: N => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(N, "head-day", {
                            scope: E
                        }) === !0 ? x.value = n.date : x.value = "")
                    },
                    onDragover: N => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(N, "head-day", {
                            scope: E
                        }) === !0 ? x.value = n.date : x.value = "")
                    },
                    onDragleave: N => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(N, "head-day", {
                            scope: E
                        }) === !0 ? x.value = n.date : x.value = "")
                    },
                    onDrop: N => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(N, "head-day", {
                            scope: E
                        }) === !0 ? x.value = n.date : x.value = "")
                    }
                };
            return d("div", ee, [w !== void 0 && w({
                scope: E
            }), w === void 0 && ne(n, y), w === void 0 && Ze(n), w === void 0 && F && F({
                scope: E
            }), w === void 0 && de(n, y), Xe()])
        }

        function Ze(n) {
            if (e.dateHeader === "stacked") return [e.noDefaultHeaderText !== !0 ? be(n) : [], e.noDefaultHeaderBtn !== !0 ? Ne(n) : []].flat();
            if (e.dateHeader === "inline") return e.weekdayAlign === "left" && e.dateAlign === "right" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && be(n), e.noDefaultHeaderBtn !== !0 && Ne(n)]) : e.weekdayAlign === "right" && e.dateAlign === "left" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && be(n), e.noDefaultHeaderBtn !== !0 && Ne(n)]) : d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderText !== !0 && be(n), e.noDefaultHeaderBtn !== !0 && Ne(n)]);
            if (e.dateHeader === "inverted") return e.weekdayAlign === "left" && e.dateAlign === "right" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && Ne(n), e.noDefaultHeaderText !== !0 && be(n)]) : e.weekdayAlign === "right" && e.dateAlign === "left" ? d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && Ne(n), e.noDefaultHeaderText !== !0 && be(n)]) : d("div", {
                class: "q-calendar__header--inline"
            }, [e.noDefaultHeaderBtn !== !0 && Ne(n), e.noDefaultHeaderText !== !0 && be(n)])
        }

        function ct(n, y) {
            const w = t["head-day-event"],
                F = e.noActiveDate !== !0 && $e(n),
                O = {
                    timestamp: n,
                    activeDate: F,
                    droppable: x.value === n.date,
                    disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(n.weekday)) : !1,
                    columnIndex: y ? ? 0
                },
                E = J.value === !0 ? G(X.value) : Te.value,
                se = {
                    width: E,
                    maxWidth: E,
                    minWidth: E
                };
            return J.value === !0 && (se.minWidth = E), d("div", {
                key: "event-" + n.date + (y !== void 0 ? "-" + y : ""),
                class: {
                    "q-calendar-scheduler__head--day__event": !0, ...xe(n), "q-active-date": F
                },
                style: se
            }, [w && w({
                scope: O
            })])
        }

        function be(n) {
            const y = t["head-weekday-label"],
                w = e.shortWeekdayLabel === !0,
                F = {
                    timestamp: n,
                    shortWeekdayLabel: w
                },
                O = {
                    class: {
                        "q-calendar-scheduler__head--weekday": !0, ["q-calendar__" + e.weekdayAlign]: !0, "q-calendar__ellipsis": !0
                    }
                };
            return d("div", O, y && y({
                scope: F
            }) || mt(n, w))
        }

        function mt(n, y) {
            const w = Ge.value(n, y || e.weekdayBreakpoints[0] > 0 && X.value <= e.weekdayBreakpoints[0]);
            return d("span", {
                class: "q-calendar-scheduler__head--weekday-label q-calendar__ellipsis"
            }, e.weekdayBreakpoints[1] > 0 && X.value <= e.weekdayBreakpoints[1] ? Mt(w, Number(e.minWeekdayLabel)) : w)
        }

        function Ne(n) {
            const y = {
                class: {
                    "q-calendar-scheduler__head--date": !0, ["q-calendar__" + e.dateAlign]: !0
                }
            };
            return d("div", y, A(n))
        }

        function A(n) {
            const y = e.noActiveDate !== !0 && $e(n),
                w = tt.value(n, !1),
                F = t["head-day-label"],
                O = t["head-day-button"],
                E = {
                    dayLabel: w,
                    timestamp: n,
                    activeDate: y
                },
                se = {
                    class: {
                        "q-calendar-scheduler__head--day__label": !0, "q-calendar__button": !0, "q-calendar__button--round": e.dateType === "round", "q-calendar__button--rounded": e.dateType === "rounded", "q-calendar__button--bordered": n.current === !0, "q-calendar__focusable": !0
                    },
                    disabled: n.disabled,
                    onKeydown: ye => {
                        n.disabled !== !0 && $(ye, [13, 32]) && (ye.stopPropagation(), ye.preventDefault())
                    },
                    onKeyup: ye => {
                        n.disabled !== !0 && $(ye, [13, 32]) && (z.value = n.date, j.value.onClickDate !== void 0 && u("click-date", {
                            scope: E
                        }))
                    },
                    ...Y("-date", (ye, ae) => ((ae === "click-date" || ae === "contextmenu-date") && (z.value = n.date, ae === "click-date" && ye.preventDefault()), {
                        scope: E,
                        event: ye
                    }))
                };
            return e.noAria !== !0 && (se.ariaLabel = Je.value(n, !1)), O ? d("div", [O({
                scope: E
            })]) : Vn(e, se, F ? F({
                scope: E
            }) : w)
        }

        function ne(n, y) {
            const w = t["column-header-before"];
            if (w) return d("div", {
                class: "q-calendar-scheduler__column-header--before"
            }, [w({
                scope: {
                    timestamp: n,
                    columnIndex: y
                }
            })])
        }

        function de(n, y) {
            const w = t["column-header-after"];
            if (w) return d("div", {
                class: "q-calendar-scheduler__column-header--after"
            }, [w({
                scope: {
                    timestamp: n,
                    columnIndex: y
                }
            })])
        }

        function ce() {
            return d("div", {
                class: "q-calendar-scheduler__body"
            }, [me()])
        }

        function me() {
            return J.value === !0 ? d("div", {
                ref: i,
                class: {
                    "q-calendar-scheduler__scroll-area": !0, "q-calendar__scroll": !0
                }
            }, [J.value !== !0 && o(), qe()]) : e.noScroll === !0 ? He() : d("div", {
                ref: i,
                class: {
                    "q-calendar-scheduler__scroll-area": !0, "q-calendar__scroll": !0
                }
            }, [He()])
        }

        function He() {
            return d("div", {
                ref: h,
                class: "q-calendar-scheduler__pane"
            }, [qe()])
        }

        function qe() {
            return d("div", {
                class: "q-calendar-scheduler__day--container"
            }, [J.value === !0 && e.noHeader !== !0 && lt(), s()])
        }

        function s(n = void 0, y = 0, w = !0) {
            return n === void 0 && (n = e.modelResources), n.map((F, O) => W(F, O, y, F.children !== void 0 ? F.expanded : w)).flat()
        }

        function W(n, y, w = 0, F = !0) {
            const O = {};
            O.height = n.height !== void 0 ? G(parseInt(n.height, 10)) : Fe.value ? G(Fe.value) : "auto", at.value > 0 && (O.minHeight = G(at.value));
            const E = d("div", {
                key: n[e.resourceKey] + "-" + y,
                class: {
                    "q-calendar-scheduler__resource--row": !0
                },
                style: O
            }, [r(n, y, w, F), o(n, y, w, F)]);
            return n.children !== void 0 ? [E, d("div", {
                class: {
                    "q-calendar__child": !0, "q-calendar__child--expanded": F === !0, "q-calendar__child--collapsed": F !== !0
                }
            }, [s(n.children, w + 1, F === !1 ? F : n.expanded)])] : [E]
        }

        function r(n, y, w = 0, F = !0) {
            const O = t["resource-label"],
                E = parseInt(String(e.resourceMinHeight), 10),
                se = {};
            se.height = n.height !== void 0 ? G(parseInt(n.height, 10)) : Fe.value ? G(Fe.value) : "auto", E > 0 && (se.minHeight = G(E));
            const ye = e.resourceStyle || T,
                ae = n[e.resourceLabel],
                c = e.focusable === !0 && e.focusType.includes("resource") && F === !0,
                L = n[e.resourceKey],
                S = {
                    resource: n,
                    timestamps: ie.value,
                    days: ie.value,
                    resourceIndex: y,
                    indentLevel: w,
                    label: ae,
                    droppable: P.value === L
                },
                ee = typeof e.resourceClass == "function" ? e.resourceClass({
                    scope: S
                }) : {};
            return d("div", {
                key: n[e.resourceKey] + "-" + y,
                ref: N => {
                    N !== null && (g.value[n[e.resourceKey]] = N)
                },
                tabindex: c === !0 ? 0 : -1,
                class: {
                    "q-calendar-scheduler__resource": w === 0, "q-calendar-scheduler__resource--section": w !== 0, ...ee, "q-calendar__sticky": J.value === !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": c === !0
                },
                style: { ...se,
                    ...ye({
                        scope: S
                    })
                },
                onDragenter: N => {
                    e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(N, "resource", {
                        scope: S
                    }) === !0 ? P.value = L : P.value = "")
                },
                onDragover: N => {
                    e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(N, "resource", {
                        scope: S
                    }) === !0 ? P.value = L : P.value = "")
                },
                onDragleave: N => {
                    e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(N, "resource", {
                        scope: S
                    }) === !0 ? P.value = L : P.value = "")
                },
                onDrop: N => {
                    e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(N, "resource", {
                        scope: S
                    }) === !0 ? P.value = L : P.value = "")
                },
                onKeydown: N => {
                    $(N, [13, 32]) && (N.stopPropagation(), N.preventDefault())
                },
                onKeyup: N => {
                    $(N, [13, 32]) && j.value.onClickResource !== void 0 && u("click-resource", {
                        scope: S,
                        event: N
                    })
                },
                ...Y("-resource", N => ({
                    scope: S,
                    event: N
                }))
            }, [
                [d("div", {
                    class: {
                        "q-calendar__parent": n.children !== void 0, "q-calendar__parent--expanded": n.children !== void 0 && n.expanded === !0, "q-calendar__parent--collapsed": n.children !== void 0 && n.expanded !== !0
                    },
                    onClick: N => {
                        N.stopPropagation(), n.expanded = !n.expanded, u("resource-expanded", {
                            expanded: n.expanded,
                            scope: S
                        })
                    }
                }), d("div", {
                    class: {
                        "q-calendar-scheduler__resource--text": !0, "q-calendar__ellipsis": !0
                    },
                    style: {
                        paddingLeft: 10 * w + 2 + "px"
                    }
                }, [O ? O({
                    scope: S
                }) : ae]), Xe()]
            ])
        }

        function o(n, y, w = 0, F = !0) {
            const O = t["resource-days"],
                E = J.value === !0 ? G(X.value) : Te.value,
                se = {
                    resource: n,
                    resourceIndex: y,
                    indentLevel: w,
                    expanded: F,
                    cellWidth: E,
                    timestamps: ie.value,
                    days: ie.value
                },
                ye = {};
            return ye.height = parseInt(String(e.resourceHeight), 10) > 0 ? G(parseInt(String(e.resourceHeight), 10)) : "auto", parseInt(String(e.resourceMinHeight), 10) > 0 && (ye.minHeight = G(parseInt(String(e.resourceMinHeight), 10))), d("div", {
                class: "q-calendar-scheduler__resource--days",
                style: ye
            }, [...H(n, y, w, F), O && O({
                scope: se
            })])
        }

        function H(n, y, w = 0, F = !0) {
            return ie.value.length === 1 && parseInt(String(e.columnCount), 10) > 0 ? Array.apply(null, new Array(parseInt(String(e.columnCount), 10))).map((O, E) => E + parseInt(String(e.columnIndexStart), 10)).map(O => a(ie.value[0], O, n, y, w, F)) : ie.value.map(O => a(O, 0, n, y, w, F))
        }

        function a(n, y, w, F, O = 0, E = !0) {
            const se = t.day,
                ye = e.dayStyle || Ce,
                ae = e.noActiveDate !== !0 && Le.value.date === n.date,
                c = n.date + ":" + w[e.resourceKey] + (y !== void 0 ? ":" + y : ""),
                L = P.value === c,
                S = {
                    timestamp: n,
                    columnIndex: y,
                    resource: w,
                    resourceIndex: F,
                    indentLevel: O,
                    activeDate: ae,
                    droppable: L
                },
                ee = J.value === !0 ? G(X.value) : Te.value,
                N = {
                    width: ee,
                    maxWidth: ee,
                    ...ye({
                        scope: S
                    })
                };
            N.height = parseInt(String(e.resourceHeight), 10) > 0 ? G(parseInt(String(e.resourceHeight), 10)) : "auto", parseInt(String(e.resourceMinHeight), 10) > 0 && (N.minHeight = G(parseInt(String(e.resourceMinHeight), 10)));
            const ue = typeof e.dayClass == "function" ? e.dayClass({
                    scope: S
                }) : {},
                Ve = e.focusable === !0 && e.focusType.includes("day") && E === !0;
            return d("div", {
                key: n.date + (y !== void 0 ? ":" + y : ""),
                tabindex: Ve === !0 ? 0 : -1,
                class: {
                    "q-calendar-scheduler__day": O === 0, "q-calendar-scheduler__day--section": O !== 0, ...ue, ...xe(n), "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": Ve === !0
                },
                style: N,
                onDragenter: De => {
                    e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(De, "day", {
                        scope: S
                    }) === !0 ? P.value = c : P.value = "")
                },
                onDragover: De => {
                    e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(De, "day", {
                        scope: S
                    }) === !0 ? P.value = c : P.value = "")
                },
                onDragleave: De => {
                    e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(De, "day", {
                        scope: S
                    }) === !0 ? P.value = c : P.value = "")
                },
                onDrop: De => {
                    e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(De, "day", {
                        scope: S
                    }) === !0 ? P.value = c : P.value = "")
                },
                onKeydown: De => {
                    $(De, [13, 32]) && (De.stopPropagation(), De.preventDefault())
                },
                onKeyup: De => {
                    $(De, [13, 32]) && (z.value = S.timestamp.date, j.value.onClickResource !== void 0 && u("click-resource", {
                        scope: S,
                        event: De
                    }))
                },
                ...Y("-day-resource", De => ({
                    scope: S,
                    event: De
                }))
            }, [se && se({
                scope: S
            }), Xe()])
        }

        function f() {
            return d("div", {}, "No resources have been defined")
        }

        function k() {
            const {
                start: n,
                end: y,
                maxDays: w
            } = Oe.value;
            (p.value !== n.date || R.value !== y.date || C.value !== w) && (p.value = n.date, R.value = y.date, C.value = w);
            const F = M.width > 0,
                O = e.modelResources && e.modelResources.length > 0,
                E = Ot(d("div", {
                    key: p.value,
                    class: "q-calendar-scheduler"
                }, [F === !0 && O === !0 && J.value !== !0 && e.noHeader !== !0 && lt(), F === !0 && O === !0 && ce(), O === !1 && f()]), [
                    [yt, ht]
                ]);
            if (e.animated === !0) {
                const se = "q-calendar--" + (U.value === "prev" ? e.transitionPrev : e.transitionNext);
                return d($t, {
                    name: se,
                    appear: !0
                }, () => E)
            }
            return E
        }
        return l({
            prev: Re,
            next: ze,
            move: K,
            moveToToday: Ie,
            updateCurrent: Ue
        }), () => oe()
    }
});
const wn = {
    modelValue: {
        type: String,
        default: ke(),
        validator: e => e === "" || da(e)
    },
    modelTasks: {
        type: Array,
        default: () => []
    },
    modelTitle: {
        type: Array,
        default: () => []
    },
    modelFooter: {
        type: Array,
        default: () => []
    },
    taskKey: {
        type: [String, Number],
        default: "id"
    },
    weekdays: {
        type: Array,
        default: () => [0, 1, 2, 3, 4, 5, 6]
    },
    dateType: {
        type: String,
        default: "round",
        validator: e => ["round", "rounded", "square"].includes(e)
    },
    dateHeader: {
        type: String,
        default: "stacked",
        validator: e => ["stacked", "inline", "inverted"].includes(e)
    },
    weekdayAlign: {
        type: String,
        default: "center",
        validator: e => ["left", "center", "right"].includes(e)
    },
    dateAlign: {
        type: String,
        default: "center",
        validator: e => ["left", "center", "right"].includes(e)
    },
    dayHeight: {
        type: [Number, String],
        default: 0,
        validator: Be
    },
    dayMinHeight: {
        type: [Number, String],
        default: 40,
        validator: Be
    },
    weekdayStyle: {
        type: Function,
        default: null
    },
    weekdayClass: {
        type: Function,
        default: null
    },
    dayStyle: {
        type: Function,
        default: null
    },
    dayClass: {
        type: Function,
        default: null
    },
    footerDayClass: {
        type: Function,
        default: null
    },
    view: {
        type: String,
        validator: e => ["day", "week", "month"].includes(e)
    },
    viewCount: {
        type: Number,
        default: 1,
        validator: e => Be(e) && e > 0
    },
    taskWidth: {
        type: Number,
        default: 200,
        validator: e => Be(e) && e > 0
    }
};

function Pn(e, t, {
    times: u
}) {
    const l = I(() => {
            if (!e.modelValue) throw new Error("QCalendarTask: no modelValue provided");
            if (e.view === "day") return We(e.modelValue);
            if (e.view === "week") return Ct(We(e.modelValue), e.weekdays, u.today);
            if (e.view === "month") return Ht(We(e.modelValue));
            throw new Error(`QCalendarTask: unknown 'view' type (${e.view})`)
        }),
        i = I(() => {
            if (!e.modelValue) throw new Error("QCalendarTask: no modelValue provided");
            if (e.view === "day") {
                if (e.viewCount === 1) return l.value;
                let _ = re(l.value);
                return _ = Ke(_, {
                    day: e.viewCount - 1
                }), _
            } else if (e.view === "week") {
                if (e.viewCount === 1) return kt(We(e.modelValue), e.weekdays, u.today); {
                    let _ = re(l.value);
                    return _ = Ke(_, {
                        day: (e.viewCount - 1) * Tt.DAYS_IN.WEEK
                    }), kt(_, e.weekdays, u.today)
                }
            } else if (e.view === "month") {
                if (e.viewCount === 1) return wt(We(e.modelValue)); {
                    let _ = re(l.value);
                    return _ = Ke(_, {
                        month: e.viewCount
                    }), wt(_)
                }
            } else throw new Error(`QCalendarTask: unknown 'view' type (${e.view})`)
        });
    return {
        days: I(() => Ut(l.value, i.value, u.today, e.weekdays, e.disabledBefore, e.disabledAfter, e.disabledWeekdays || [], e.disabledDays || [], Number.MAX_SAFE_INTEGER)),
        parsedStartDate: l,
        parsedEndDate: i
    }
}
const {
    renderButton: Kn
} = oa();
var ha = Et({
        name: "QCalendarTask",
        directives: {
            ResizeObserver: yt
        },
        props: { ...Rt,
            ...Nt,
            ...ta,
            ...It,
            ...wn
        },
        emits: ["update:model-value", "update:model-tasks", "update:model-title", "update:model-footer", "task-expanded", ...aa, ...Jt, ...Se("-date"), ...Se("-day"), ...Se("-head-day")],
        setup(e, {
            slots: t,
            emit: u,
            expose: l
        }) {
            const i = b(null),
                h = b(null),
                _ = b("next"),
                m = b(e.modelValue || ke()),
                D = b("0000-00-00"),
                q = b(0),
                g = b(e.modelValue),
                B = b(e.modelValue || ke()),
                V = b(le(e.modelValue || ke())),
                U = b({}),
                p = St({
                    width: 0,
                    height: 0
                }),
                R = b(""),
                C = b(""),
                z = b(null),
                M = b(null);
            te(() => e.view, () => {
                q.value = 0
            });
            const x = I(() => e.view === "month" ? "month-interval" : e.view),
                P = xt();
            if (P === null) throw new Error("current instance is null");
            const {
                emitListeners: Ee
            } = ea(P), {
                times: fe,
                setCurrent: ge,
                updateCurrent: v
            } = Xt(e);
            v(), ge();
            const {
                parsedStart: j,
                dayFormatter: J,
                weekdayFormatter: Ae,
                ariaDateFormatter: pe,
                dayStyleDefault: Ue,
                getRelativeClasses: Ye
            } = jt(e, {
                startDate: m,
                endDate: D,
                times: fe
            }), Qe = I(() => We(e.modelValue, fe.now) || j.value || fe.today);
            V.value = Qe.value, B.value = Qe.value.date;
            const {
                renderValues: tt
            } = Qt(e, {
                parsedView: x,
                times: fe,
                parsedValue: Qe
            }), {
                rootRef: Ge,
                __renderCalendar: Je
            } = Zt(e, H, {
                scrollArea: i,
                pane: h
            }), {
                days: Ce,
                parsedStartDate: xe,
                parsedEndDate: Le
            } = Pn(e, u, {
                times: fe
            }), {
                move: Oe
            } = pt(e, {
                parsedView: x,
                parsedValue: Qe,
                direction: _,
                maxDays: q,
                times: fe,
                emittedValue: g,
                emit: u
            }), {
                getDefaultMouseEventHandlers: Me
            } = Gt(u, Ee), {
                checkChange: we
            } = na(u, {
                days: Ce,
                lastStart: z,
                lastEnd: M
            }), {
                isKeyCode: oe
            } = Lt(), {
                tryFocus: ie
            } = ua(e, {
                rootRef: Ge,
                focusRef: B,
                focusValue: V,
                datesRef: U,
                parsedView: x,
                emittedValue: g,
                direction: _,
                times: fe
            }), X = b(!0), T = I(() => e.cellWidth !== void 0 ? parseInt(String(e.cellWidth), 10) : 150), K = I(() => e.focusable === !0 && e.focusType.includes("day")), Y = I(() => e.focusable === !0 && e.focusType.includes("date") && K.value !== !0), he = I(() => e.focusable === !0 && e.focusType.includes("weekday")), $ = I(() => parseInt(String(e.dayHeight), 10)), _e = I(() => parseInt(String(e.dayMinHeight), 10));
            te([Ce], we, {
                deep: !0,
                immediate: !0
            }), te(() => e.modelValue, (a, f) => {
                if (g.value !== a) {
                    if (e.animated === !0) {
                        const k = Z(le(a)),
                            n = Z(le(f));
                        _.value = k >= n ? "next" : "prev"
                    }
                    g.value = a
                }
                B.value = a
            }), te(g, (a, f) => {
                if (g.value !== e.modelValue) {
                    if (e.animated === !0) {
                        const k = Z(le(a)),
                            n = Z(le(f));
                        _.value = k >= n ? "next" : "prev"
                    }
                    u("update:model-value", a)
                }
            }), te(B, a => {
                a && (V.value = We(a))
            }), te(V, () => {
                U.value[B.value] ? U.value[B.value].focus() : ie()
            }), zt(() => {
                U.value = {}
            }), Yt(() => {});

            function Q() {
                g.value = ke()
            }

            function ve(a = 1) {
                Oe(a)
            }

            function Fe(a = 1) {
                Oe(-a)
            }

            function at({
                width: a,
                height: f
            }) {
                p.width = a, p.height = f
            }

            function Te(a) {
                return a.date === g.value
            }

            function Ie(a, f, k) {
                const n = t.day,
                    y = e.dayStyle || Ue,
                    w = e.noActiveDate !== !0 && Qe.value.date === a.date,
                    F = f[e.taskKey],
                    O = {
                        timestamp: a,
                        task: f,
                        taskIndex: k,
                        activeDate: w,
                        droppable: C.value === F
                    },
                    E = G(T.value),
                    se = {
                        width: E,
                        minWidth: E,
                        maxWidth: E,
                        ...y({
                            scope: O
                        })
                    },
                    ye = typeof e.dayClass == "function" ? e.dayClass({
                        scope: O
                    }) : {};
                return d("div", {
                    tabindex: K.value === !0 ? 0 : -1,
                    class: {
                        "q-calendar-task__task--day": !0, ...ye, ...Ye(a), "q-active-date": w === !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": K.value === !0
                    },
                    style: se,
                    onFocus: () => {
                        K.value
                    },
                    ...Me("-day", ae => ({
                        scope: O,
                        event: ae
                    })),
                    onDragenter: ae => {
                        e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(ae, "day", {
                            scope: O
                        }) === !0 ? C.value = F : C.value = "")
                    },
                    onDragover: ae => {
                        e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(ae, "day", {
                            scope: O
                        }) === !0 ? C.value = F : C.value = "")
                    },
                    onDragleave: ae => {
                        e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(ae, "day", {
                            scope: O
                        }) === !0 ? C.value = F : C.value = "")
                    },
                    onDrop: ae => {
                        e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(ae, "day", {
                            scope: O
                        }) === !0 ? C.value = F : C.value = "")
                    }
                }, [n && n({
                    scope: O
                }), Xe()])
            }

            function ze(a, f) {
                return Ce.value.map(k => Ie(k, a, f))
            }

            function Re(a, f) {
                const k = t.days,
                    n = {
                        timestamps: Ce.value,
                        days: Ce.value,
                        task: a,
                        taskIndex: f,
                        cellWidth: T.value
                    };
                return d("div", {
                    class: "q-calendar-task__task--days-row"
                }, [ze(a, f), k && k({
                    scope: n
                })])
            }

            function ht(a, f, k = 0, n = !0) {
                const y = k === 0 ? t.task : t.subtask,
                    w = {
                        start: xe.value,
                        end: Le.value,
                        task: a,
                        taskIndex: f,
                        expanded: n
                    },
                    F = G(e.taskWidth),
                    O = {
                        width: F,
                        minWidth: F,
                        maxWidth: F
                    },
                    E = e.focusable === !0 && e.focusType.includes("task");
                return d("div", {
                    class: {
                        "q-calendar-task__task--item": !0, "q-calendar__sticky": X.value === !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": E === !0
                    },
                    style: O
                }, [d("div", {
                    style: {
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 10 + 10 * k + "px"
                    }
                }, [d("div", {
                    class: {
                        "q-calendar__parent": a.children !== void 0, "q-calendar__parent--expanded": a.children !== void 0 && a.expanded === !0, "q-calendar__parent--collapsed": a.children !== void 0 && a.expanded !== !0
                    },
                    onClick: se => {
                        se.stopPropagation(), a.expanded = !a.expanded, u("task-expanded", {
                            expanded: a.expanded,
                            scope: w
                        })
                    }
                })]), y && y({
                    scope: w
                }), Xe()])
            }

            function $e(a, f, k = 0, n = !0) {
                const y = a.height !== void 0 ? G(parseInt(a.height, 10)) : $.value > 0 ? G($.value) : "auto",
                    w = _e.value > 0 ? G(_e.value) : void 0,
                    F = {
                        height: y
                    };
                w !== void 0 && (F.minHeight = w);
                const O = d("div", {
                    key: a[e.taskKey] + "-" + f,
                    class: {
                        "q-calendar-task__task": k === 0, "q-calendar-task__task--section": k !== 0
                    },
                    style: F
                }, [ht(a, f, k, n), Re(a, f)]);
                return a.children !== void 0 ? [O, d("div", {
                    class: {
                        "q-calendar__child": !0, "q-calendar__child--expanded": n === !0, "q-calendar__child--collapsed": n !== !0
                    }
                }, [lt(a.children, k + 1, n === !1 ? n : a.expanded)])] : [O]
            }

            function lt(a = void 0, f = 0, k = !0) {
                return a === void 0 && (a = e.modelTasks), a.map((n, y) => $e(n, y, f, n.children !== void 0 ? n.expanded : k)).flat()
            }

            function dt() {
                return d("div", {
                    class: {
                        "q-calendar-task__task--container": !0, "q-calendar__sticky": X.value === !0
                    }
                }, [lt()])
            }

            function nt(a, f) {
                const k = t["footer-task"],
                    n = {
                        start: xe.value,
                        end: Le.value,
                        footer: a,
                        index: f
                    },
                    y = G(e.taskWidth),
                    w = {
                        width: y,
                        minWidth: y,
                        maxWidth: y
                    };
                return d("div", {
                    class: {
                        "q-calendar-task__footer--task": !0, "q-calendar__sticky": X.value === !0
                    },
                    style: w
                }, [k && k({
                    scope: n
                })])
            }

            function it(a, f, k) {
                const n = t["footer-day"],
                    y = {
                        timestamp: a,
                        footer: f,
                        index: k
                    },
                    w = G(T.value),
                    F = {
                        width: w,
                        minWidth: w,
                        maxWidth: w
                    },
                    O = typeof e.footerDayClass == "function" ? e.footerDayClass({
                        scope: y
                    }) : {};
                return d("div", {
                    class: {
                        "q-calendar-task__footer--day": !0, ...O, ...Ye(a), "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": K.value === !0
                    },
                    style: F
                }, [n && n({
                    scope: y
                })])
            }

            function st(a, f) {
                return d("div", {
                    class: "q-calendar-task__footer--day-wrapper"
                }, [Ce.value.map(k => it(k, a, f))])
            }

            function ft() {
                const a = e.focusable === !0 && e.focusType.includes("task");
                return e.modelFooter.map((f, k) => d("div", {
                    class: {
                        "q-calendar-task__footer--wrapper": !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": a === !0
                    }
                }, {
                    default: () => [nt(f, k), st(f, k)]
                }))
            }

            function _t() {
                return d("div", {
                    class: {
                        "q-calendar-task__footer": !0, "q-calendar__sticky": X.value === !0
                    }
                }, ft())
            }

            function ut() {
                return d("div", {
                    class: {
                        "q-calendar-task__container": !0
                    }
                }, [e.noHeader !== !0 && W(), dt(), _t()])
            }

            function Ze() {
                const a = t["head-tasks"],
                    f = {
                        start: xe.value,
                        end: Le.value
                    },
                    k = G(parseInt(String(e.taskWidth), 10)),
                    n = {
                        width: k,
                        minWidth: k,
                        maxWidth: k
                    };
                return d("div", {
                    class: {
                        "q-calendar-task__head--tasks": !0, "q-calendar__sticky": X.value === !0
                    },
                    style: n
                }, [a && a({
                    scope: f
                })])
            }

            function ct(a, f) {
                const k = t["title-task"],
                    n = G(parseInt(String(e.taskWidth), 10)),
                    y = {
                        width: n,
                        minWidth: n,
                        maxWidth: n
                    },
                    w = {
                        start: xe.value,
                        end: Le.value,
                        cellWidth: n,
                        title: a,
                        index: f
                    };
                return d("div", {
                    class: {
                        "q-calendar-task__title--task": !0, "q-calendar__sticky": X.value === !0
                    },
                    style: y
                }, [k && k({
                    scope: w
                })])
            }

            function be(a) {
                const f = t["head-weekday-label"],
                    n = {
                        activeDate: e.noActiveDate !== !0 && Te(a),
                        timestamp: a,
                        disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(a.weekday)) : !1
                    },
                    y = {
                        class: {
                            "q-calendar-task__head--weekday": !0, ["q-calendar__" + e.weekdayAlign]: !0, "q-calendar__ellipsis": !0
                        }
                    };
                return d("div", y, f && f({
                    scope: n
                }) || mt(a, e.shortWeekdayLabel))
            }

            function mt(a, f) {
                const k = Ae.value(a, f || e.weekdayBreakpoints[0] > 0 && T.value <= e.weekdayBreakpoints[0]);
                return d("span", {
                    class: "q-calendar__ellipsis"
                }, e.weekdayBreakpoints[1] > 0 && T.value <= e.weekdayBreakpoints[1] ? Mt(k, Number(e.minWeekdayLabel)) : k)
            }

            function Ne(a) {
                const f = {
                    class: {
                        "q-calendar-task__head--date": !0, ["q-calendar__" + e.dateAlign]: !0
                    }
                };
                return d("div", f, A(a))
            }

            function A(a) {
                const f = e.noActiveDate !== !0 && Te(a),
                    k = J.value(a, !1),
                    n = t["head-day-label"],
                    y = t["head-day-button"],
                    w = {
                        dayLabel: k,
                        timestamp: a,
                        activeDate: f
                    },
                    O = {
                        key: a.date,
                        tabindex: Y.value === !0 ? 0 : -1,
                        class: {
                            "q-calendar-task__head--day__label": !0, "q-calendar__button": !0, "q-calendar__button--round": e.dateType === "round", "q-calendar__button--rounded": e.dateType === "rounded", "q-calendar__button--bordered": a.current === !0, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": Y.value === !0
                        },
                        disabled: a.disabled,
                        onKeydown: E => {
                            a.disabled !== !0 && oe(E, [13, 32]) && (E.stopPropagation(), E.preventDefault())
                        },
                        onKeyup: E => {
                            a.disabled !== !0 && oe(E, [13, 32]) && (g.value = a.date, Ee.value.onClickDate !== void 0 && u("click-date", {
                                scope: w
                            }))
                        },
                        ...Me("-date", (E, se) => ((se === "click-date" || se === "contextmenu-date") && (g.value = a.date, se === "click-date" && E.preventDefault()), {
                            scope: w,
                            event: E
                        }))
                    };
                return e.noAria !== !0 && (O.ariaLabel = pe.value(a, !1)), y ? y({
                    scope: w
                }) : Kn(e, O, n ? n({
                    scope: w
                }) : k)
            }

            function ne(a) {
                if (e.dateHeader === "stacked") return [e.noDefaultHeaderText !== !0 && be(a), e.noDefaultHeaderBtn !== !0 && Ne(a)].filter(f => f !== !1);
                if (e.dateHeader === "inline") return e.weekdayAlign === "left" && e.dateAlign === "right" ? d("div", {
                    class: "q-calendar__header--inline"
                }, [e.noDefaultHeaderText !== !0 && be(a), e.noDefaultHeaderBtn !== !0 && Ne(a)]) : e.weekdayAlign === "right" && e.dateAlign === "left" ? d("div", {
                    class: "q-calendar__header--inline"
                }, [e.noDefaultHeaderText !== !0 && be(a), e.noDefaultHeaderBtn !== !0 && Ne(a)]) : d("div", {
                    class: "q-calendar__header--inline"
                }, [e.noDefaultHeaderText !== !0 && be(a), e.noDefaultHeaderBtn !== !0 && Ne(a)]);
                if (e.dateHeader === "inverted") return e.weekdayAlign === "left" && e.dateAlign === "right" ? d("div", {
                    class: "q-calendar__header--inline"
                }, [e.noDefaultHeaderBtn !== !0 && Ne(a), e.noDefaultHeaderText !== !0 && be(a)]) : e.weekdayAlign === "right" && e.dateAlign === "left" ? d("div", {
                    class: "q-calendar__header--inline"
                }, [e.noDefaultHeaderBtn !== !0 && Ne(a), e.noDefaultHeaderText !== !0 && be(a)]) : d("div", {
                    class: "q-calendar__header--inline"
                }, [e.noDefaultHeaderBtn !== !0 && Ne(a), e.noDefaultHeaderText !== !0 && be(a)])
            }

            function de(a, f, k) {
                const n = t["title-day"],
                    y = G(T.value),
                    w = {
                        width: y,
                        minWidth: y,
                        maxWidth: y
                    },
                    F = {
                        timestamp: a,
                        title: f,
                        index: k,
                        cellWidth: T.value
                    },
                    O = typeof e.dayClass == "function" ? e.dayClass({
                        scope: F
                    }) : {},
                    E = e.focusable === !0 && e.focusType.includes("day");
                return d("div", {
                    class: {
                        "q-calendar-task__title--day": !0, ...O, ...Ye(a), "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": E === !0
                    },
                    style: w
                }, [n && n({
                    scope: F
                }), Xe()])
            }

            function ce(a) {
                const f = t["head-day"],
                    k = t["head-date"],
                    n = e.noActiveDate !== !0 && Te(a),
                    y = {
                        timestamp: a,
                        activeDate: n,
                        droppable: R.value = a.date,
                        disabled: e.disabledWeekdays ? e.disabledWeekdays.includes(Number(a.weekday)) : !1
                    },
                    w = e.weekdayStyle || Ue,
                    F = typeof e.weekdayClass == "function" ? e.weekdayClass({
                        scope: y
                    }) : {},
                    O = G(T.value),
                    E = {
                        width: O,
                        minWidth: O,
                        maxWidth: O,
                        ...w({
                            scope: y
                        })
                    },
                    se = a.date,
                    ye = {
                        key: se,
                        ref: ae => {
                            U.value[se] = ae
                        },
                        tabindex: he.value === !0 ? 0 : -1,
                        class: {
                            "q-calendar-task__head--day": !0, ...F, ...Ye(a), "q-active-date": n, "q-calendar__hoverable": e.hoverable === !0, "q-calendar__focusable": he.value === !0
                        },
                        style: E,
                        onFocus: () => {
                            he.value === !0 && (B.value = se)
                        },
                        onKeydown: ae => {
                            a.disabled !== !0 && oe(ae, [13, 32]) && (ae.stopPropagation(), ae.preventDefault())
                        },
                        onKeyup: ae => {
                            a.disabled !== !0 && oe(ae, [13, 32]) && (g.value = a.date)
                        },
                        ...Me("-head-day", ae => ({
                            scope: y,
                            event: ae
                        })),
                        onDragenter: ae => {
                            e.dragEnterFunc !== void 0 && typeof e.dragEnterFunc == "function" && (e.dragEnterFunc(ae, "head-day", {
                                scope: y
                            }) === !0 ? R.value = a.date : R.value = "")
                        },
                        onDragover: ae => {
                            e.dragOverFunc !== void 0 && typeof e.dragOverFunc == "function" && (e.dragOverFunc(ae, "head-day", {
                                scope: y
                            }) === !0 ? R.value = a.date : R.value = "")
                        },
                        onDragleave: ae => {
                            e.dragLeaveFunc !== void 0 && typeof e.dragLeaveFunc == "function" && (e.dragLeaveFunc(ae, "head-day", {
                                scope: y
                            }) === !0 ? R.value = a.date : R.value = "")
                        },
                        onDrop: ae => {
                            e.dropFunc !== void 0 && typeof e.dropFunc == "function" && (e.dropFunc(ae, "head-day", {
                                scope: y
                            }) === !0 ? R.value = a.date : R.value = "")
                        }
                    };
                return d("div", ye, [f !== void 0 && f({
                    scope: y
                }), f === void 0 && ne(a), f === void 0 && k && k({
                    scope: y
                }), Xe()])
            }

            function me() {
                return Ce.value.map(a => ce(a))
            }

            function He(a, f) {
                return Ce.value.map(k => de(k, a, f))
            }

            function qe() {
                return d("div", {
                    class: {
                        "q-calendar-task__head--days": !0
                    }
                }, [...me()])
            }

            function s(a, f) {
                return d("div", {
                    class: {
                        "q-calendar-task__title--days": !0
                    }
                }, [...He(a, f)])
            }

            function W() {
                return d("div", {
                    roll: "presentation",
                    class: {
                        "q-calendar-task__head": !0, "q-calendar__sticky": X.value === !0
                    },
                    style: {}
                }, [d("div", {
                    style: {
                        position: "relative",
                        display: "flex"
                    }
                }, [Ze(), qe()]), e.modelTitle.map((a, f) => d("div", {
                    class: "q-calendar-task__title",
                    style: {
                        position: "relative",
                        display: "flex"
                    }
                }, [ct(a, f), s(a, f)]))])
            }

            function r() {
                return d("div", {
                    class: "q-calendar-task__body"
                }, [o()])
            }

            function o() {
                return d("div", {
                    ref: i,
                    class: {
                        "q-calendar-task__scroll-area": !0, "q-calendar__scroll": !0
                    }
                }, [ut()])
            }

            function H() {
                const {
                    start: a,
                    end: f
                } = tt.value;
                m.value = a.date, D.value = f.date;
                const k = p.width > 0,
                    n = Ot(d("div", {
                        key: m.value,
                        class: "q-calendar-task"
                    }, [k === !0 && r()]), [
                        [yt, at]
                    ]);
                if (e.animated === !0) {
                    const y = "q-calendar--" + (_.value === "prev" ? e.transitionPrev : e.transitionNext);
                    return d($t, {
                        name: y,
                        appear: !0
                    }, () => n)
                }
                return n
            }
            return l({
                prev: Fe,
                next: ve,
                move: Oe,
                moveToToday: Q,
                updateCurrent: v
            }), () => Je()
        }
    }),
    Ta = Et({
        name: "QCalendar",
        props: {
            mode: {
                type: String,
                validator: e => ["day", "month", "agenda", "resource", "scheduler", "task"].includes(e),
                default: "day"
            },
            ...It,
            ...kn,
            ...Rt,
            ...ta,
            ...Nt,
            ...Za,
            ..._n,
            ...mn,
            ...ca,
            ...wn
        },
        setup(e, {
            attrs: t,
            slots: u,
            expose: l
        }) {
            const i = b(),
                h = I(() => {
                    switch (e.mode) {
                        case "agenda":
                            return sa;
                        case "resource":
                            return va;
                        case "scheduler":
                            return ya;
                        case "month":
                            return fa;
                        case "day":
                            return la;
                        case "task":
                            return ha;
                        default:
                            return la
                    }
                });

            function _() {
                i.value && i.value.moveToToday()
            }

            function m(x = -1) {
                i.value && i.value.move(x)
            }

            function D(x = 1) {
                i.value && i.value.next(x)
            }

            function q(x = 1) {
                i.value && i.value.prev(x)
            }

            function g() {
                i.value && i.value.updateCurrent()
            }

            function B(x, P = !0) {
                if (i.value) return i.value.timeStartPos(x, P)
            }

            function V(x, P = !0) {
                if (i.value) return i.value.timeStartPosX(x, P)
            }

            function U(x) {
                if (i.value) return i.value.timeDurationWidth(x)
            }

            function p(x) {
                if (i.value) return i.value.timeDurationHeight(x)
            }

            function R(x) {
                if (i.value) return i.value.heightToMinutes(x)
            }

            function C(x) {
                if (i.value) return i.value.widthToMinutes(x)
            }

            function z(x, P = 0) {
                i.value && i.value.scrollToTime(x, P)
            }

            function M(x, P = 0) {
                i.value && i.value.scrollToTimeX(x, P)
            }
            return l({
                prev: q,
                next: D,
                move: m,
                moveToToday: _,
                updateCurrent: g,
                timeStartPos: B,
                timeStartPosX: V,
                timeDurationWidth: U,
                timeDurationHeight: p,
                heightToMinutes: R,
                widthToMinutes: C,
                scrollToTime: z,
                scrollToTimeX: M
            }), () => d(h.value, {
                ref: i,
                ...e,
                ...t
            }, u)
        }
    });
const Un = "4.1.2";
var Yn = {
    version: Un,
    QCalendar: Ta,
    QCalendarAgenda: sa,
    QCalendarDay: la,
    QCalendarMonth: fa,
    QCalendarResource: va,
    QCalendarScheduler: ya,
    QCalendarTask: ha,
    ...Cn,
    ...Hn,
    install(e) {
        e.component(String(Ta.name), Ta), e.component(String(sa.name), sa), e.component(String(la.name), la), e.component(String(fa.name), fa), e.component(String(va.name), va), e.component(String(ya.name), ya), e.component(String(ha.name), ha)
    }
};
export {
    Yn as P, fa as Q, Ke as a, le as b, ya as c, za as d, cn as i, We as p, ke as t
};