import {
    d as l,
    r as n
} from "./index-BA5ou0W-.js";
const s = l("general", () => {
    const e = n(null),
        a = n(!1);

    function t(i) {
        e.value = i
    }

    function u() {
        e.value && (clearInterval(e.value), e.value = null)
    }

    function r() {
        a.value = !a.value
    }
    return {
        dashboard_dhu_widget_timer: e,
        auditLanguageHindi: a,
        setTimer: t,
        clearTimer: u,
        changeAuditLanguageMutation: r
    }
}, {
    persist: !0
});
export {
    s as u
};