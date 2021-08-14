define(["app"], (App) => {
    return (params) => {
        return App.Page({
            data() {
                return {
                    pageOptions: this.createPageOptions(),
                    apps: [],
                    tabs: [],
                    tab: null,
                    items: [],
                    item: null,
                    focusType: null,
                    updateTime: null,
                    contributors: null,
                    keyword: null,
                    searchResult: null,
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
                        h("div", { class: "SearchLayout flex-h middle" }, [
                            h(
                                "input",
                                {
                                    class: "Search flex-h flex-1",
                                    ref: "Search",
                                    domProps: {
                                        placeholder: this.$t("search"),
                                        value: this.keyword,
                                    },
                                    attrs: { focusable: true },
                                    on: {
                                        input: (event) => {
                                            this.keyword = event.target.value;
                                        },
                                        onFocus: () => {
                                            this.focusType = "Search";
                                            this.$refs.Search.focus();
                                        },
                                        onBlur: () => {
                                            this.$refs.Search.blur();
                                        },
                                        click: () => {
                                            this.onSearch();
                                        },
                                    },
                                },
                                this.$t("search")
                            ),
                            h("img", {
                                class: "Scan",
                                domProps: { src: "img/icon_scan.png" },
                                attrs: { focusable: true },
                                on: {
                                    click: () => {
                                        App.startPage({
                                            name: "Scan",
                                            params: {
                                                callback: (str) => {
                                                    if (!str.startsWith(server_info.QR_header)) {
                                                        alert(this.$t("QR_invalid"));
                                                        return;
                                                    }
                                                    let slug = str.replace(server_info.QR_header, "");
                                                    let find = this.apps.find((o) => o.slug == slug);
                                                    if (!find) {
                                                        alert(this.$t("App_notfound"));
                                                        return;
                                                    }
                                                    App.startPage({
                                                        name: "AppDetails",
                                                        params: {
                                                            data: find.data,
                                                        },
                                                    });
                                                },
                                            },
                                        });
                                    },
                                },
                            }),
                        ]),
                        h(
                            "div",
                            {
                                class: "Tabs flex-h middle scroll-x",
                                ref: "Tabs",
                                directives: [
                                    { name: "show", value: !this.searchResult },
                                    { name: "keep-scroll", value: true },
                                ],
                                attrs: { focusable: true },
                                on: {
                                    onFocus: () => {
                                        this.$refs.Tab && focusable.requestFocus(this.$refs.Tab[this.tab]);
                                    },
                                },
                            },
                            this.tabs.map((item, index) => {
                                return h(
                                    "div",
                                    {
                                        class: "Item flex-h middle center",
                                        refInFor: true,
                                        ref: "Tab",
                                        attrs: {
                                            selected: index == this.tab,
                                            focusable: true,
                                        },
                                        on: {
                                            onFocus: () => {
                                                this.tab = index;
                                                this.focusType = "Tabs";
                                            },
                                        },
                                    },
                                    [h("div", { class: "Name" }, item.name)]
                                );
                            })
                        ),
                        h(
                            "div",
                            {
                                class: "Items flex-1 flex-v scroll-y",
                                ref: "Items",
                                directives: [{ name: "keep-scroll", value: true }],
                            },
                            (this.searchResult ? this.searchResult : this.items).map((item, index) => {
                                return h(
                                    "div",
                                    {
                                        class: "Item flex-h middle",
                                        attrs: {
                                            selected: index == this.item,
                                            focusable: true,
                                        },
                                        on: {
                                            onFocus: () => {
                                                this.item = index;
                                                this.focusType = "Items";
                                            },
                                            left: () => {
                                                let el = this.$refs.Tab[this.tab - 1];
                                                el && focusable.requestFocus(el);
                                            },
                                            right: () => {
                                                let el = this.$refs.Tab[this.tab + 1];
                                                el && focusable.requestFocus(el);
                                            },
                                            click: () => {
                                                App.startPage({
                                                    name: "AppDetails",
                                                    params: {
                                                        data: item.data,
                                                    },
                                                });
                                            },
                                        },
                                    },
                                    [
                                        h("img", {
                                            class: "Icon",
                                            domProps: { src: item.icon },
                                        }),
                                        h("div", { class: "Right flex-v flex-1" }, [
                                            h("div", { class: "Title ellipsis" }, item.name),
                                            h("div", { class: "Info ellipsis" }, item.tags),
                                            h(
                                                "div",
                                                {
                                                    class: "Subtitle ellipsis",
                                                },
                                                item.description
                                            ),
                                        ]),
                                    ]
                                );
                            })
                        ),
                    ]
                );
            },
            mounted() {
                this.loadData();
            },
            watch: {
                tab(value) {
                    this.items = [];
                    this.$nextTick(() => {
                        this.items = this.tabs[value].apps;
                    });
                },
            },
            methods: {
                onStart() {
                    this.themeLight();
                },
                createPageOptions() {
                    let context = this;
                    return {
                        statusBar: {
                            backgroundColor: "white",
                        },
                        toolBar: {
                            show: false,
                            title: this.$t("home"),
                        },
                        navigationBar: {
                            show: true,
                            options: {
                                get left() {
                                    if (context.searchResult) {
                                        return context.$t("search_clean");
                                    }
                                },
                                right: context.$t("about"),
                                get center() {
                                    switch (context.focusType) {
                                        case "Search":
                                            return context.$t("search");
                                        case "Items":
                                            return context.$t("select");
                                    }
                                },
                                on: {
                                    keyPress: {
                                        softRight: () => {
                                            App.startPage({
                                                name: "About",
                                                params: {
                                                    updateTime: this.updateTime,
                                                    contributors: this.contributors,
                                                },
                                            });
                                        },
                                        softLeft: () => {
                                            if (this.searchResult) {
                                                this.clearSearch();
                                            }
                                        },
                                    },
                                },
                            },
                        },
                    };
                },
                loadData() {
                    BackendApi.update()
                        .then(() => {
                            this.loadData_Set();
                        })
                        .catch((error) => {
                            console.log(error);
                            alert(this.$t("Data_geterror"));
                        });
                },
                loadData_Set() {
                    let contributors = [];

                    let data = BackendApi.getData();
                    // console.log(data);
                    let apps = data.apps;
                    apps = apps.map((item) => {
                        let item_author = item.author.toString();
                        let just_author_name = item_author.split("<")[0].trim();
                        if (contributors.indexOf(just_author_name) == -1) {
                            contributors.push(just_author_name);
                        }
                        return {
                            icon: item.icon,
                            name: item.name || "",
                            description: item.description || "",
                            tags: item.meta.tags || "",
                            categories: (item.meta && item.meta.categories) || [],
                            slug: item.slug,
                            data: item,
                        };
                    });
                    let categories = data.categories;
                    categories = Object.keys(categories).map((key) => {
                        let item = categories[key];
                        let name = item.name;
                        if (server_info.name === "opengiraffes") {
                            let locales_name =
                                item.locales && item.locales.length && item.locales.find((o) => o["zh-CN"]);
                            if (locales_name || navigator.language !== "en-US") {
                                name = locales_name[navigator.language];
                            } else {
                                name = item.name;
                            }
                        }
                        return {
                            name: name || item.name,
                            id: key,
                            apps: [],
                        };
                    });
                    let unkown = {
                        name: this.$t("Category_none"),
                        id: "unkown",
                        apps: [],
                    };
                    apps.forEach((item) => {
                        if (item.categories.length) {
                            item.categories.forEach((category) => {
                                let findIndex = categories.findIndex((o) => o.id == category);
                                if (findIndex != -1) {
                                    categories[findIndex].apps.push(item);
                                }
                            });
                        } else {
                            unkown.apps.push(item);
                        }
                    });
                    categories.push(unkown);
                    this.tabs = categories.filter((o) => o.apps.length);
                    if (this.tabs.length) {
                        this.tab = 0;
                        this.$nextTick(() => {
                            this.requestFocus(this.$refs.Tabs);
                        });
                    }

                    this.updateTime = new Date(data.generated_at).format("yyyy-MM-dd HH:mm");
                    //unique author list
                    this.contributors = contributors.sort().join(", ");

                    this.apps = apps;
                },
                onSearch() {
                    if (this.keyword) {
                        let keyword = this.keyword.toLowerCase();
                        this.searchResult = this.apps.filter((o) => {
                            return (
                                o.name.toLowerCase().includes(keyword) ||
                                o.description.toLowerCase().includes(keyword) ||
                                o.tags.toLowerCase().includes(keyword)
                            );
                        });
                    } else {
                        this.clearSearch();
                    }
                },
                clearSearch() {
                    this.searchResult = null;
                    this.keyword = null;
                },
            },
        });
    };
});
