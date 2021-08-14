define(["vue"], function (Vue) {
    Vue.component("navigation-bar", {
        props: {
            options: {
                default: () => {
                    return {};
                },
            },
        },
        data() {
            return {
                mEventAdded: false,
                mKeyEvents: [],
            };
        },
        render(h) {
            return h(
                "div",
                {
                    class: "NavigationBar",
                },
                [
                    h(
                        "div",
                        {
                            class: "Left button",
                            on: { click: this.onClick_Left },
                        },
                        this.left.text
                    ),
                    h(
                        "div",
                        {
                            class: "Center button",
                            on: { click: this.onClick_Center },
                        },
                        this.center.text
                    ),
                    h(
                        "div",
                        {
                            class: "Right button",
                            on: { click: this.onClick_Right },
                        },
                        this.right.text
                    ),
                ]
            );
        },
        // template: `
        //     <div class="NavigationBar">
        //         <div class="Left button" @click="onClick_Left">{{left.text}}</div>
        //         <div class="Center button" @click="onClick_Center">{{center.text}}</div>
        //         <div class="Right button" @click="onClick_Right">{{right.text}}</div>
        //     </div>
        // `,
        computed: {
            left() {
                return this.item(this.options.left);
            },
            center() {
                return this.item(this.options.center);
            },
            right() {
                return this.item(this.options.right);
            },
        },
        methods: {
            onStart() {
                this.addEventListener();
            },
            onStop() {
                this.removeEventListener();
            },
            addEventListener() {
                if (this.mEventAdded) {
                    return;
                }
                document.addEventListener("keydown", this.onKeyDown);
                document.addEventListener("keyup", this.onKeyUp);
                this.mEventAdded = true;
            },
            removeEventListener() {
                if (!this.mEventAdded) {
                    return;
                }
                this.mKeyEvents.forEach((o) => {
                    clearTimeout(o.timer);
                });
                this.mKeyEvents = [];
                document.removeEventListener("keydown", this.onKeyDown);
                document.removeEventListener("keyup", this.onKeyUp);
                this.mEventAdded = false;
            },
            item(key) {
                if (!key) {
                    return {};
                }
                return typeof key === "string"
                    ? {
                          text: key,
                      }
                    : key;
            },
            onKeyDown(e) {
                if (!e.repeat) {
                    let t = setTimeout(() => {
                        clearTimeout(t);
                        this.mKeyEvents.splice(
                            this.mKeyEvents.findIndex((o) => o.key == e.key),
                            1
                        );
                        this.on("keyLongPress", {
                            key: e.key,
                        });
                    }, 500);
                    this.mKeyEvents.push({
                        key: e.key,
                        timer: t,
                    });
                }
                this.on("keyDown", e);
            },
            onKeyUp(e) {
                this.on("keyUp", e);
                let key = this.mKeyEvents.splice(
                    this.mKeyEvents.findIndex((o) => o.key == e.key),
                    1
                );
                if (key.length) {
                    clearTimeout(key[0].timer);
                    this.on("keyPress", {
                        key: e.key,
                    });
                }
            },
            on(eventType, e) {
                if (this.options.disable) {
                    return;
                }
                let event = this.options.on && this.options.on[eventType];
                if (!event) {
                    return;
                }
                switch (e.key) {
                    case "SoftLeft":
                    case "F1":
                        event.softLeft && event.softLeft();
                        break;
                    case "Enter":
                        event.enter && event.enter();
                        break;
                    case "SoftRight":
                    case "F2":
                        event.softRight && event.softRight();
                        break;
                    case "ArrowUp":
                        event.arrowUp && event.arrowUp();
                        break;
                    case "ArrowDown":
                        event.arrowDown && event.arrowDown();
                        break;
                    case "ArrowLeft":
                        event.arrowLeft && event.arrowLeft();
                        break;
                    case "ArrowRight":
                        event.arrowRight && event.arrowRight();
                        break;
                    default:
                        if (e.key in event) {
                            event[e.key]();
                        }
                        break;
                }
            },
            onClick_Left() {
                this.options.on &&
                    this.options.on.keyPress &&
                    this.options.on.keyPress.softLeft &&
                    this.options.on.keyPress.softLeft();
            },
            onClick_Center() {
                this.options.on &&
                    this.options.on.keyPress &&
                    this.options.on.keyPress.enter &&
                    this.options.on.keyPress.enter();
            },
            onClick_Right() {
                this.options.on &&
                    this.options.on.keyPress &&
                    this.options.on.keyPress.softRight &&
                    this.options.on.keyPress.softRight();
            },
        },
    });
});
