define(["app"], (App) => {
    return (params) => {
        return App.Page({
            data() {
                return {
                    pageOptions: this.createPageOptions(),
                    focusType: null,
                    tab: null,
                    screenshots: null,
                    data: params.data,
                    depend_temp: [],
                    locales_temp: [],
                    data1: {
                        name: "KaiAuth",
                        description: "Simple Google Authenticator alternative",
                        icon: "/icons/icon.png",
                        screenshots: [
                            "/icons/icon.png",
                            "/icons/icon.png",
                            "/icons/icon.png",
                            "/icons/icon.png",
                            "/icons/icon.png",
                            "/icons/icon.png",
                        ],
                        website: "https://kaiauth.zjyl1994.com",
                        git_repo: "https://github.com/zjyl1994/KaiAuth",
                        download: {
                            url:
                                "https://git.yumenaka.net/https://github.com/zjyl1994/KaiAuth/releases/download/v1.1.1/kaiauth-v1.1.1-omnisd.zip",
                            version: "1.1.1",
                        },
                        type: "privileged",
                        locales: ["中文(简体)", "中文(繁體)", "English"],
                        license: "MIT",
                        author: ["zjyl1994 <me@zjyl1994.com>"],
                        maintainer: ["zjyl1994 <me@zjyl1994.com>"],
                        dependencies: [],
                        donation: "https://www.buymeacoffee.com/zjyl1994",
                        has_ads: false,
                        has_tracking: false,
                        meta: {
                            tags: "2fa; totp; authenticator",
                            categories: ["utility"],
                        },
                        slug: "kaiauth",
                    },
                    after_installation: false,
                    installing: false,
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
                                class: "Content wh-100 flex-v center scroll-y",
                                ref: "Content",
                            },
                            [
                                h("img", {
                                    class: "Icon",
                                    domProps: { src: this.data.icon },
                                }),
                                h("div", { class: "Name" }, this.data.name),
                                h("div", { class: "Tags flex-h" }, [
                                    h(
                                        "div",
                                        {
                                            class: `Item ${this.data.has_ads && "Warning"}`,
                                        },
                                        this.data.has_ads ? this.$t("Ad_has") : this.$t("Ad_no")
                                    ),
                                    h(
                                        "div",
                                        {
                                            class: `Item ${this.data.has_tracking && "Warning"}`,
                                        },
                                        this.data.has_tracking ? this.$t("Tracking_has") : this.$t("Tracking_no")
                                    ),
                                ]),
                                h(
                                    "div",
                                    {
                                        class: "Tabs w-100 flex-h middle ",
                                        ref: "Tabs",
                                        attrs: { focusable: true },
                                        on: {
                                            onFocus: () => {
                                                focusable.requestFocus(this.$refs.Tab[this.tab || 0]);
                                            },
                                        },
                                    },
                                    [
                                        h(
                                            "div",
                                            {
                                                class: "Item flex-h middle center",
                                                refInFor: true,
                                                ref: "Tab",
                                                attrs: {
                                                    selected: true,
                                                    focusable: true,
                                                },
                                                on: {
                                                    onFocus: () => {
                                                        this.tab = 0;
                                                        this.focusType = "Tabs";
                                                    },
                                                },
                                            },
                                            this.$t("description")
                                        ),
                                    ]
                                ),
                                h("div", { class: "Details Part w-100" }, [
                                    this.data.screenshots && this.data.screenshots.length
                                        ? h(
                                              "div",
                                              {
                                                  class: "ScreenshotsLayout flex-h scroll-x",
                                                  ref: "ScreenshotsLayout",
                                                  attrs: { focusable: true },
                                                  on: {
                                                      onFocus: () => {
                                                          focusable.requestFocus(
                                                              this.$refs.Screenshots[this.screenshots || 0]
                                                          );
                                                      },
                                                  },
                                              },
                                              this.data.screenshots.map((o, index) => {
                                                  return h("img", {
                                                      class: "Item",
                                                      domProps: { src: o },
                                                      attrs: {
                                                          focusable: true,
                                                      },
                                                      refInFor: true,
                                                      ref: "Screenshots",
                                                      on: {
                                                          onFocus: () => {
                                                              this.screenshots = index;
                                                              this.focusType = "Screenshots";
                                                          },
                                                          click: () => {
                                                              App.startPage({
                                                                  name: "Album",
                                                                  params: {
                                                                      items: this.data.screenshots,
                                                                      index: index,
                                                                  },
                                                              });
                                                          },
                                                      },
                                                  });
                                              })
                                          )
                                        : null,
                                    h(
                                        "div",
                                        {
                                            class: "Description",
                                            attrs: { focusable: true },
                                        },
                                        this.data.description
                                    ),
                                    h(
                                        "div",
                                        {
                                            class: "Tags",
                                            attrs: { focusable: true },
                                        },
                                        [this.$t("App_tags"), this.data.meta.tags].join("：")
                                    ),
                                    h(
                                        "div",
                                        {
                                            class: "VersionLayout flex-h w-100",
                                            attrs: { focusable: true },
                                        },
                                        [
                                            h(
                                                "div",
                                                { class: "Version" },
                                                [this.$t("App_version"), this.data.download.version].join("：")
                                            ),
                                            h(
                                                "div",
                                                { class: "Type" },
                                                [this.$t("App_type"), this.data.type].join("：")
                                            ),
                                        ]
                                    ),
                                    h(
                                        "div",
                                        {
                                            class: "Author",
                                            attrs: { focusable: true },
                                        },
                                        [this.$t("App_author"), this.data.author.join(", ")].join("：")
                                    ),
                                    h(
                                        "div",
                                        {
                                            class: "Maintainer",
                                            attrs: { focusable: true },
                                        },
                                        [this.$t("App_maintainer"), this.data.maintainer.join(", ")].join("：")
                                    ),
                                    h(
                                        "div",
                                        {
                                            class: "Dependencies",
                                            attrs: { focusable: true },
                                        },
                                        [this.$t("App_dependencies"), this.depend_temp.join(", ")].join("：")
                                    ),
                                    h(
                                        "div",
                                        {
                                            class: "Locales",
                                            attrs: { focusable: true },
                                        },
                                        [this.$t("App_locale"), this.locales_temp.join(", ")].join("：")
                                    ),
                                    h(
                                        "div",
                                        {
                                            class: "License",
                                            attrs: { focusable: true },
                                        },
                                        [this.$t("App_license"), this.data.license].join("：")
                                    ),
                                ]),
                            ]
                        ),
                    ]
                );
            },
            mounted() {},
            methods: {
                onStart() {
                    this.themeLight();
                    focusable.scrollEl = this.$refs.Content;
                    this.requestFocus();
                    if (!this.data.locales || this.data.locales.length === 0) {
                        this.locales_temp = ["Unknown"];
                    } else {
                        this.data.locales.forEach((loc) => {
                            this.locales_temp.push(loc);
                        });
                    }
                    if (!this.data.dependencies || this.data.dependencies.length === 0) {
                        this.depend_temp = ["(None)"];
                    } else {
                        this.data.dependencies.forEach((depend) => {
                            this.depend_temp.push(depend.name);
                        });
                    }
                },
                createPageOptions() {
                    let context = this;
                    return {
                        statusBar: {
                            backgroundColor: "white",
                        },
                        toolBar: {
                            show: false,
                            title: this.$t("App_description"),
                        },
                        navigationBar: {
                            show: true,
                            options: {
                                get disable() {
                                    return context.installing;
                                },
                                get left() {
                                    if (context.installing) {
                                        return context.$t("App_installing");
                                    }
                                    return context.after_installation
                                        ? context.$t("App_open")
                                        : context.$t("App_install");
                                },
                                right: this.$t("back"),
                                on: {
                                    keyPress: {
                                        softLeft: () => {
                                            if (this.after_installation) {
                                                this.launch_app();
                                            } else {
                                                this.download_file(this.data.download.url);
                                            }
                                        },
                                        softRight: () => {
                                            this.close();
                                        },
                                    },
                                },
                            },
                        },
                    };
                },
                download_file(url, app_slug) {
                    var xhttp = new XMLHttpRequest({ mozSystem: true });
                    this.installing = true;
                    xhttp.open("GET", url, true);
                    xhttp.withCredentials = true;
                    xhttp.responseType = "blob";

                    xhttp.onload = () => {
                        this.installing = false;
                        if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
                            let blob = xhttp.response;
                            let file = new Blob([blob], {
                                type: "application/zip",
                            });
                            this.installPkg(file);
                        } else {
                            alert(this.$t("App_download_failed"));
                        }
                    };

                    xhttp.onerror = () => {
                        this.installing = false;
                        alert(this.$t("App_download_failed"));
                        // toaster(" status: " + xhttp.status + xhttp.getAllResponseHeaders(), 3000);
                    };

                    xhttp.send(null);
                },
                installPkg(packageFile) {
                    if (!navigator.mozApps.mgmt.import()) {
                        alert(this.$t("App_mgmt_support_error"));
                        return false;
                    }
                    navigator.mozApps.mgmt
                        .import(packageFile)
                        .then((e) => {
                            this.after_installation = true;
                            alert(this.$t("App_mgmt_install_success"));
                        })
                        .catch((error) => {
                            if (error.name === "noMetadata") {
                                alert(this.$t("App_mgmt_install_error_nometa"));
                            }
                            if (error.name === "AppAlreadyInstalled") {
                                alert(this.$t("App_mgmt_install_error_already_installed"));
                            }

                            if (error.name === "InvalidPrivilegeLevel") {
                                alert(this.$t("App_mgmt_install_error_no_priviliged"));
                                // TODO open an guide that explains it, with links to a backup guide.
                            }
                        });
                },
                launch_app() {
                    var request = window.navigator.mozApps.mgmt.getAll();
                    request.onerror = (e) => {
                        console.log("Error calling getInstalled: " + request.error.name);
                    };
                    request.onsuccess = (e) => {
                        var appsRecord = request.result;
                        appsRecord[appsRecord.length - 1].launch();
                    };
                },
            },
        });
    };
});
