define(["vue", "js/components/index"], (Vue) => {
    let PageId = 0;
    const createPageId = () => {
        return ++PageId;
    };
    let Pages = [];
    let css = [];
    let App = {};
    let LifeCycle = (context, name) => {
        if (context.$children && context.$children.length) {
            context.$children.forEach((child) => {
                if (child[name]) {
                    child[name]();
                }
            });
        }
    };
    App.startPage = (location) => {
        let name = location.name;
        if (!css.includes(name)) {
            $("<link>")
                .attr({
                    rel: "stylesheet",
                    type: "text/css",
                    href: `page/${name}.css`,
                })
                .appendTo("head");
            css.push(name);
        }
        require([`page/${name}`], (page) => {
            let vue = page(location.params || {});
            vue.$el.classList.add(name);
            vue.$el.style.zIndex = PageId * 1000;
        });
    };
    App.Page = (options) => {
        let extend = Vue.extend({
            mounted() {
                this._onStart();
            },
            destroyed() {
                // this._onStop();
            },
            methods: {
                getPageId() {
                    return this.$el.id;
                },
                close() {
                    let pageId = this.getPageId();
                    this._onStop();
                    this.$destroy();
                    Pages.splice(
                        Pages.findIndex((o) => o.id == pageId),
                        1
                    );
                    if (Pages.length) {
                        Pages[Pages.length - 1].vue._onStart(true);
                    }
                },
                startPage: App.startPage,
                requestFocus(el) {
                    if (el) {
                        focusable.requestFocus(el);
                    } else {
                        let firstEl = this.$el.querySelector("[focusable]");
                        firstEl && focusable.requestFocus(firstEl);
                    }
                },
                _onStart(restart = false) {
                    this.$el && $("#app").append(this.$el);
                    this.$emit("onStart", restart);
                    LifeCycle(this, "onStart");
                    if (this.$el) {
                        focusable.limitingEl = this.$el;
                        focusable.scrollEl = this.$el;
                    }
                    this.onStart();
                    // if (!restart) {
                    //     this.$nextTick(() => {
                    //         this.requestFocus();
                    //     });
                    // }
                },
                _onStop() {
                    LifeCycle(this, "onStop");
                    this.onStop();
                    this.$emit("onStop");
                    $("#" + pageId).remove();
                },
                onStart() {},
                onStop() {},
                themeDark() {
                    const meta = document.head.querySelector('meta[name="theme-color"]');
                    meta.setAttribute("content", "rgb(0, 0, 0)");
                },
                themeLight() {
                    const meta = document.head.querySelector('meta[name="theme-color"]');
                    meta.setAttribute("content", "rgb(255, 255, 255)");
                },
            },
        });
        if (Pages.length) {
            Pages[Pages.length - 1].vue._onStop();
        }
        let vue = new extend(options);
        vue.$mount();
        let pageId = "_Page_" + createPageId();
        vue.$el.id = pageId;
        Pages.push({ id: pageId, vue: vue });
        return vue;
    };

    App.closePage = (vue) => {
        let findIndex = Pages.findIndex((o) => o.id == pageId);
        if (findIndex == -1) {
            return;
        }
        let page = Pages.splice(findIndex, 1)[0];
        page.vue.$destroy();
        $("#" + pageId).remove();
    };
    return App;
});
