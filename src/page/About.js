define(["app"], (App) => {
    return (params) => {
        return App.Page({
            data() {
                return {
                    pageOptions: this.createPageOptions(),
                };
            },
            render(h) {
                return h(
                    "page",
                    {
                        props: {
                            options: this.pageOptions,
                        },
                    },
                    [
                        h(
                            "div",
                            {
                                class: "Content flex-1 flex-v center scroll-y",
                                ref: "Content",
                            },
                            [
                                h("div", {}, "openGiraffes Store"),
                                h("div", {}, this.$t("Based")),
                                h("div", {}, "Contributors"),
                                h("div", {}, params.contributors),
                                h("div", {}, "Respect"),
                                h(
                                    "div",
                                    {},
                                    "Respect the licenses of the apps, it would be nice if you use app more often to support the developer with a donation. Thanks!"
                                ),
                                h("div", {}, this.$t("Terms")),
                                h("div", {}, this.$t("Terms_see") + server_info.terms),
                            ]
                        ),
                        h("div", { class: "UpdateTime flex-h center" }, [
                            h("div", {}, this.$t("Update_time") + params.updateTime),
                        ]),
                    ]
                );
            },
            mounted() {},
            methods: {
                onStart() {
                    this.themeDark();
                },
                createPageOptions() {
                    let context = this;
                    return {
                        toolBar: {
                            title: this.$t("about"),
                        },
                        navigationBar: {
                            show: true,
                            options: {
                                right: this.$t("back"),
                                on: {
                                    keyPress: {
                                        softRight: () => {
                                            this.close();
                                        },
                                    },
                                    keyDown: {
                                        arrowDown: () => {
                                            this.$refs.Content.scrollBy({
                                                behavior: "smooth",
                                                top: 50,
                                            });
                                        },
                                        arrowUp: () => {
                                            this.$refs.Content.scrollBy({
                                                behavior: "smooth",
                                                top: -50,
                                            });
                                        },
                                    },
                                },
                            },
                        },
                    };
                },
            },
        });
    };
});
