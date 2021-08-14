define(["app"], (App) => {
    return (params) => {
        let video;
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
                        h("div", { class: "Content wh-100 flex-v", ref: "Content" }, [
                            h("video", {
                                class: "Video wh-100",
                                ref: "Video",
                            }),
                            h("div", { class: "corner-nw" }),
                            h("div", { class: "corner-no" }),
                            h("div", { class: "corner-so" }),
                            h("div", { class: "corner-sw" }),
                        ]),
                    ]
                );
            },
            mounted() {},
            destroyed() {
                this.stopScan();
            },
            methods: {
                onStart() {
                    this.themeDark();
                    this.startScan();
                },
                createPageOptions() {
                    let context = this;
                    let backgroundColor = "rgba(0,0,0,0.5)";
                    return {
                        statusBar: {
                            padding: false,
                            backgroundColor,
                        },
                        toolBar: {
                            show: false,
                            title: this.$t("QR_title"),
                            backgroundColor,
                        },
                        navigationBar: {
                            show: true,
                            padding: false,
                            backgroundColor,
                            options: {
                                right: this.$t("back"),
                                on: {
                                    keyPress: {
                                        softRight: () => {
                                            this.close();
                                        },
                                    },
                                },
                            },
                        },
                    };
                },
                startScan() {
                    navigator.getUserMedia =
                        navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                    if (navigator.getUserMedia) {
                        navigator.getUserMedia(
                            {
                                audio: false,
                                video: { width: 400, height: 400 },
                            },
                            (stream) => {
                                video = this.$refs.Video;
                                video.srcObject = stream;

                                video.onloadedmetadata = (e) => {
                                    video.play();

                                    var barcodeCanvas = document.createElement("canvas");
                                    let intv = setInterval(() => {
                                        barcodeCanvas.width = video.videoWidth;
                                        barcodeCanvas.height = video.videoHeight;
                                        var barcodeContext = barcodeCanvas.getContext("2d");
                                        var imageWidth = video.videoWidth,
                                            imageHeight = video.videoHeight;
                                        barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);

                                        var imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
                                        var idd = imageData.data;

                                        let code = jsQR(idd, imageWidth, imageHeight);

                                        if (code) {
                                            this.stopScan(true);
                                            params.callback(code.data);
                                        }
                                    }, 1000);
                                };
                            },
                            (err) => {
                                console.log("The following error occurred: " + err.name);
                            }
                        );
                    } else {
                        console.log("getUserMedia not supported");
                    }
                },
                stopScan(close = false) {
                    if (!video) {
                        close && this.close();
                        return;
                    }
                    const stream = video.srcObject;
                    const tracks = stream.getTracks();

                    tracks.forEach((track) => {
                        track.stop();
                        close && this.close();
                    });

                    video.srcObject = null;
                },
            },
        });
    };
});
