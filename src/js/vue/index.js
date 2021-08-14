define(["js/vue/vue.runtime.min", "js/vue/vue-i18n.min", "js/locales"], (
    Vue,
    VueI18n,
    Locales
) => {
    const keep = (el) => {
        let attr = el.getAttribute("data-vue-keep-scroll");
        if (!attr) {
            return;
        }
        let scroll = attr.split("-");
        if (!scroll) {
            return;
        }
        el.scrollLeft = Number.parseInt(scroll[0]);
        el.scrollTop = Number.parseInt(scroll[1]);
    };
    Vue.directive("keep-scroll", {
        bind: (el, binding, vnode, oldVnode) => {
            el.addEventListener("scroll", (event) => {
                event.target.setAttribute(
                    "data-vue-keep-scroll",
                    event.target.scrollLeft + "-" + event.target.scrollTop
                );
            });
            vnode.context &&
                vnode.context.$on("onStart", () => {
                    keep(el);
                });
        },
    });
    Vue.use(VueI18n);
    const i18n = new VueI18n({
        locale: navigator.language,
        messages: Locales.messages,
    });
    return Vue.mixin({
        i18n,
    });
});
