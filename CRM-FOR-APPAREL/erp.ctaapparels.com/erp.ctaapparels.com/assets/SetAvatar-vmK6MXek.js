import {
    Q as _
} from "./QBadge-Cw-oJzeN.js";
import {
    r as u,
    w as C,
    l as c,
    m as o,
    p as s,
    q as t,
    G as y,
    K as b,
    s as d,
    D as Q,
    a4 as V,
    a5 as k,
    ab as x,
    M as w,
    J as B,
    aa as S,
    ar as h,
    v as D,
    x as m,
    ac as N
} from "./index-BA5ou0W-.js";
import {
    Q as O
} from "./QSpace-BjbyB_LR.js";
import {
    C as z
} from "./ClosePopup-CgV1_utH.js";
import {
    _ as I
} from "./_plugin-vue_export-helper-DlAUqK2U.js";
const Y = "/assets/astronaut-Cg7WVYIp.png",
    j = "/assets/bear-Fs7W4Gr7.png",
    q = "/assets/girl-D01O0LYb.png",
    F = "/assets/hippopotamus-B3ndpzNT.png",
    G = "/assets/woman-Df8fYAbm.png",
    J = "/assets/man-MgOUmZVh.png",
    L = "/assets/man2-C_VrbPV3.png",
    M = "/assets/polar-bear-DyyT-sZ2.png",
    P = {
        class: "row q-gutter-md justify-center"
    },
    T = ["src", "alt"],
    U = {
        __name: "SetAvatar",
        props: {
            open: {
                type: Boolean,
                default: !1
            },
            userAvatar: {
                type: Object,
                default: () => {}
            }
        },
        emits: ["close", "save"],
        setup(v, {
            emit: f
        }) {
            const l = v,
                n = f,
                i = u(l.open),
                e = u(l.userAvatar);
            C(() => l.open, p => {
                i.value = p
            });
            const g = u([{
                id: 1,
                name: "Avatar 1",
                url: Y
            }, {
                id: 2,
                name: "Avatar 2",
                url: j
            }, {
                id: 3,
                name: "Avatar 3",
                url: q
            }, {
                id: 4,
                name: "Avatar 4",
                url: F
            }, {
                id: 5,
                name: "Avatar 5",
                url: G
            }, {
                id: 6,
                name: "Avatar 6",
                url: J
            }, {
                id: 7,
                name: "Avatar 7",
                url: L
            }, {
                id: 8,
                name: "Avatar 8",
                url: M
            }]);

            function A() {
                e.value && (localStorage.setItem("userAvatar", JSON.stringify(e.value)), n("save", e.value), n("close"))
            }
            return (p, r) => (o(), c(N, {
                modelValue: i.value,
                "onUpdate:modelValue": r[1] || (r[1] = a => i.value = a),
                persistent: ""
            }, {
                default: s(() => [t(y, {
                    style: {
                        width: "600px"
                    }
                }, {
                    default: s(() => [t(b, null, {
                        default: s(() => [d("div", P, [(o(!0), Q(V, null, k(g.value, a => (o(), c(x, {
                            key: a.id,
                            size: "80px",
                            class: "cursor-pointer relative-position",
                            onClick: W => e.value = a
                        }, {
                            default: s(() => [d("img", {
                                class: B({
                                    "border-primary": e.value ? .id === a.id
                                }),
                                src: a.url,
                                alt: a.name
                            }, null, 10, T), e.value ? .id === a.id ? (o(), c(_, {
                                key: 0,
                                floating: "",
                                color: "primary",
                                rounded: "",
                                label: "✓",
                                style: {
                                    top: "-6px",
                                    right: "-6px"
                                }
                            })) : w("", !0)]),
                            _: 2
                        }, 1032, ["onClick"]))), 128))])]),
                        _: 1
                    }), t(S), t(h, null, {
                        default: s(() => [D(t(m, {
                            flat: "",
                            dense: "",
                            label: "Close",
                            "no-caps": "",
                            color: "grey",
                            onClick: r[0] || (r[0] = a => n("close"))
                        }, null, 512), [
                            [z]
                        ]), t(O), t(m, {
                            dense: "",
                            label: "Save",
                            "no-caps": "",
                            color: "primary",
                            disable: !e.value,
                            onClick: A
                        }, null, 8, ["disable"])]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            }, 8, ["modelValue"]))
        }
    },
    R = I(U, [
        ["__scopeId", "data-v-9625e853"]
    ]);
export {
    R as
    default
};