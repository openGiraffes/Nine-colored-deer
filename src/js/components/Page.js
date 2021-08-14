define(["vue", "R"], function (Vue, R) {
    const deepObjectMerge = (FirstOBJ, SecondOBJ) => {
        // 深度合并对象
        for (var key in SecondOBJ) {
            FirstOBJ[key] =
                FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]"
                    ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
                    : (FirstOBJ[key] = SecondOBJ[key]);
        }
        return FirstOBJ;
    };

    Vue.component("page", {
        props: {
            options: {},
        },
        data() {
            return {};
        },
        render(h) {
            return h(
                "div",
                {
                    class: "Page flex-v wh-100",
                },
                [
                    this.$slots.root,
                    h(
                        "div",
                        {
                            class: "PageContent flex-v",
                            style: this.style_Content,
                        },
                        this.$slots.default
                    ),
                    h(
                        "div",
                        {
                            class: "StatusBar w-100",
                            style: this.style_StatusBar,
                            directives: [
                                {
                                    name: "show",
                                    value: this.mOptions.statusBar.show,
                                },
                            ],
                            show: this.mOptions.statusBar.show,
                        },
                        []
                    ),
                    h(
                        "tool-bar",
                        {
                            class: "ToolBar w-100",
                            style: this.style_ToolBar,
                            directives: [
                                {
                                    name: "show",
                                    value: this.mOptions.toolBar.show,
                                },
                            ],
                            props: {
                                title: this.mOptions.toolBar.title,
                            },
                        },
                        []
                    ),
                    h(
                        "navigation-bar",
                        {
                            class: "NavigationBar w-100",
                            ref: "NavigationBar",
                            style: this.style_NavigationBar,
                            directives: [
                                {
                                    name: "show",
                                    value: this.mOptions.navigationBar.show,
                                },
                            ],
                            props: {
                                options: this.mOptions.navigationBar.options,
                            },
                        },
                        []
                    ),
                ]
            );
        },
        // template: `
        //     <div class="Page flex-v wh-100">
        //         <slot name="root"></slot>
        //         <div class="Content flex-v" :style="style_Content">
        //             <slot></slot>
        //         </div>
        //         <div v-show="mOptions.statusBar.show" class="StatusBar w-100"
        //             :style="style_StatusBar"></div>
        //         <tool-bar v-show="mOptions.toolBar.show" class="ToolBar w-100"
        //             :title="mOptions.toolBar.title" :style="style_ToolBar"></tool-bar>
        //         <navigation-bar v-show="mOptions.navigationBar.show" class="NavigationBar w-100"
        //             :options="mOptions.navigationBar.options" :style="style_NavigationBar"></navigation-bar>
        //     </div>
        // `,
        computed: {
            mOptions() {
                return deepObjectMerge(
                    {
                        statusBar: {
                            show: true,
                            padding: true,
                        },
                        toolBar: {
                            show: true,
                            title: "",
                            padding: true,
                        },
                        navigationBar: {
                            show: false,
                            padding: true,
                        },
                    },
                    this.options
                );
            },
            style_Content() {
                return {
                    top:
                        (this.mOptions.statusBar.show && this.mOptions.statusBar.padding
                            ? R.dimen.statusBarHeight
                            : 0) +
                        (this.mOptions.toolBar.show && this.mOptions.toolBar.padding ? R.dimen.toolBarHeight : 0) +
                        "px",
                    bottom:
                        (this.mOptions.navigationBar.show && this.mOptions.navigationBar.padding
                            ? R.dimen.navigationBarHeight
                            : 0) + "px",
                };
            },
            style_StatusBar() {
                return {
                    backgroundColor: this.mOptions.statusBar && this.mOptions.statusBar.backgroundColor,
                };
            },
            style_ToolBar() {
                return {
                    backgroundColor: this.mOptions.toolBar && this.mOptions.toolBar.backgroundColor,
                };
            },
            style_NavigationBar() {
                return {
                    backgroundColor: this.mOptions.navigationBar && this.mOptions.navigationBar.backgroundColor,
                };
            },
        },
        methods: {
            onStart() {
                this.$refs.NavigationBar.onStart();
            },
            onStop() {
                this.$refs.NavigationBar.onStop();
            },
        },
    });
});
