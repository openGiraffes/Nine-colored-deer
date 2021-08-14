define(() => {
    const rgba_hex = (color, alpha = 1) => {
        let a = Math.floor(alpha * 255).toString(16);
        a.length == 1 && (a = "0" + a);
        return color + a;
    };
    let R = {
        dimen: {
            navigationBarHeight: 24,
            statusBarHeight: 26,
            toolBarHeight: 36,
        },
        color: {
            transparent: "transparent",
            primary: "#00aeff",
            primaryAlpha: function (alpha = 1) {
                return rgba_hex(this.primary, alpha);
            },
        },
    };
    return R;
});
