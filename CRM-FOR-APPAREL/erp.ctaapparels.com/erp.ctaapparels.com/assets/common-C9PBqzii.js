import {
    d as p,
    r as i,
    ae as n
} from "./index-BA5ou0W-.js";
const v = p("common", () => {
    const o = i([]),
        g = ["Pcs", "Cone", "Cone-T50", "Box", "Epic Box", "Ltr", "Kgs", "Nos", "Gross", "Pkt", "Set", "Mtrs", "Rim", "Yds"],
        s = i({
            finishingQcDefectList: []
        }),
        r = i([]),
        c = i([]),
        l = i([]);
    async function u() {
        const a = await n.get("Lookup/master/buyer");
        o.value = a.data.map(e => e.value1)
    }
    async function m() {
        if (s.value.finishingQcDefectList.length > 0) return;
        const a = await n.get("Lookup/field_dropdown/finising-qc-defect-list");
        s.value.finishingQcDefectList = a.data.map(e => e.value1)
    }
    async function d() {
        await n.get("v3/designing/tailermaster").then(a => {
            r.value = a.data.map(e => ({
                label: `${e.name} - ${e.designation} (${e.Assigned})`,
                value: e.id,
                name: e.name
            }))
        })
    }
    async function f() {
        try {
            const {
                data: a
            } = await n.get("/v3/designing/sample-masters"), e = a.data;
            c.value = e.filter(t => t.job === "Cutting").map(t => ({
                label: `${t.name} - ${t.designation} (${t.Assigned}) / (${t.TotalQty?t.TotalQty:0})`,
                value: t.id,
                name: t.name
            })), l.value = e.filter(t => t.job === "Stitching").map(t => ({
                label: `${t.name} - (${t.seat_code}) - ${t.designation} (${t.Assigned}) / (${t.TotalQty?t.TotalQty:0})`,
                value: t.id,
                name: t.name,
                seat_code: t.seat_code
            }))
        } catch (a) {
            console.error("Error fetching sampling tailors:", a)
        }
    }
    return {
        setBuyerList: u,
        buyerList: o,
        purchaseOrderUnitOptions: g,
        setFinishingQcDefectList: m,
        finishingQc: s,
        cuttingMasterList: c,
        stitchingMasterList: l,
        fetchSamplingTailors: f,
        masterList: r,
        fetchMasterlist: d
    }
}, {
    persist: !0
});
export {
    v as u
};