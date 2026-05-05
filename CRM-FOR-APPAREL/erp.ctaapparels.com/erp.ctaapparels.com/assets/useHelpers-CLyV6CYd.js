import {
    F as f
} from "./FileSaver.min-BZowWFmT.js";
import "./index-BA5ou0W-.js";

function h(t) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(t)
}

function g(t) {
    if (!t ? .response) return JSON.stringify(t);
    if (t.response ? .status === 422) {
        let n = t.response.data.errors,
            s = `<div>${t.response.data.message}</div>`;
        s += '<ul class="text-left">';
        for (const [o, e] of Object.entries(n)) console.log(o, e), s += `<li>${e}</li>`;
        return s += "</ul>", s
    } else return t.response ? .data.message || JSON.stringify(t.response ? .data)
}

function w(t, n = !0) {
    console.log(t ? .headers);
    const s = t ? .headers["content-disposition"] || t ? .headers["Content-Disposition"] || null,
        o = t.headers["content-type"];
    let e;
    s && (s.split(";").forEach(i => {
        i.trim().startsWith("filename") ? e = i.split("=")[1].trim().replace(/['"]/g, "") : i.trim().startsWith("type") && i.split("=")[1].trim().replace(/['"]/g, "")
    }), console.log("Filename:", e), console.log("Filetype:", o));
    const a = new Blob([t.data], {
        type: o
    });
    if (n) f.saveAs(a, e);
    else {
        const i = window.screen.height,
            l = window.screen.width / 2 - 800 / 2,
            c = window.screen.height / 2 - i / 2,
            d = `width=800,height=${i},left=${l},top=${c}`,
            u = URL.createObjectURL(a);
        window.open(u, "_blank", d)
    }
}

function $(t) {
    var n = Math.round(t);
    return Math.abs(n - t) < .01 ? parseInt(n).toLocaleString("en-IN") : parseFloat(t).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

function y(t) {
    function n(s) {
        const o = new Date().getFullYear(),
            e = `${o-1}|${o}|${o+1}`;
        return new RegExp(`^(0[1-9]|[1-2][0-9]|30)-(0[13-9]|1[0-2])-(${e})$|^(31)-(0[13578]|10|12)-(${e})$|^(29)-(02)-(${e-1}|${o+1})$|^(0[1-9]|1[0-9]|2[0-8])-(02)-(${e})$`).test(s)
    }
    return n(t)
}
export {
    g as a, h as b, w as d, $ as f, y as v
};