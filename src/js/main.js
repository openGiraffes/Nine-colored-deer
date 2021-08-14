///<reference path="types/jquery.d.ts" />
///<reference path="types/vue/index.d.ts" />
///<reference path="types/App.d.ts" />

require.config({
    baseUrl: "./",
    paths: {
        jquery: "js/libs/jquery.min",
        text: "js/libs/text.min",
        R: "js/R",
        vue: "js/vue/index",
        i18n: "js/vue/vue-i18n.min",
        app: "js/app",
    },
});

require(["jquery", "app"], (jquery, App) => {
    focusable.distanceToCenter = true;
    focusable.findFocusType = 0;
    // this.$tv.offsetDistance = 50;
    focusable.initDis = 0;

    App.startPage({
        name: "Home",
    });
});
