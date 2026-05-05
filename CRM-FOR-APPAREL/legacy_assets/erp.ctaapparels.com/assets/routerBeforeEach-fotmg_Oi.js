import {
    b as i,
    e as l,
    f as p,
    h as f,
    P as a
} from "./index-BA5ou0W-.js";
const c = '<defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"><stop stop-color="currentColor" stop-opacity="0" offset="0%"></stop><stop stop-color="currentColor" stop-opacity=".631" offset="63.146%"></stop><stop stop-color="currentColor" offset="100%"></stop></linearGradient></defs><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></path><circle fill="currentColor" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></circle></g>',
    u = i({
        name: "QSpinnerTail",
        props: l,
        setup(e) {
            const {
                cSize: t,
                classes: r
            } = p(e);
            return () => f("svg", {
                class: r.value,
                width: t.value,
                height: t.value,
                viewBox: "0 0 38 38",
                xmlns: "http://www.w3.org/2000/svg",
                innerHTML: c
            })
        }
    }),
    h = ({
        router: e,
        app: t
    }) => {
        e.beforeEach((r, m, o) => {
            a.show({
                spinner: u
            });
            const s = t.config.globalProperties.$store.useAuthStore;
            r.matched.some(n => n.meta.auth) ? s.isLogged ? o() : o({
                path: "/",
                query: {
                    redirect: r.fullPath
                }
            }) : o()
        }), e.afterEach(() => {
            a.hide()
        })
    };
export {
    h as
    default
};