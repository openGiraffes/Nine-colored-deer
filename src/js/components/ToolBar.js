define(["vue"], function (Vue) {
    Vue.component("tool-bar", {
        props: {
            title: {},
        },
        data() {
            return {};
        },
        render(h) {
            return h(
                "div",
                {
                    class: "ToolBar flex-h middle",
                },
                [
                    h(
                        "div",
                        {
                            class: "Title",
                        },
                        this.title
                    ),
                ]
            );
        },
        // template: `
        //     <div class="ToolBar flex-h middle">
        //         <div class="Title">{{title}}</div>
        //     </div>
        // `,
        computed: {},
        methods: {},
    });
});
