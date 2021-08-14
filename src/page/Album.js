define(["app"], (App) => {
    return (params) => {
        return App.Page({
            data() {
                return {
                    pageOptions: this.createPageOptions(),
                    items: params.items,
                    index: params.index,
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
                        h("img", {
                            class: "Image flex-1 flex-v center",
                            ref: "Image",
                            domProps: { src: this.items[this.index] },
                        }),
                        h(
                            "div",
                            { class: "Indicator flex-h center middle" },
                            this.items.map((item, index) => {
                                return h(
                                    "div",
                                    {
                                        class: "Item flex-h center middle",
                                        attrs: {
                                            selected: index == this.index,
                                        },
                                    },
                                    index + 1
                                );
                            })
                        ),
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
                            title: "Album",
                            show: false,
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
                                        arrowLeft: () => {
                                            if (this.index - 1 >= 0) {
                                                this.index -= 1;
                                            }
                                        },
                                        arrowRight: () => {
                                            if (this.index + 1 < this.items.length) {
                                                this.index += 1;
                                            }
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
