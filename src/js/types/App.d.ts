import { ThisTypedComponentOptionsWithArrayProps } from "./vue/options";

interface RawLocation {
    name: string;
    params: any;
}

interface PageLifeCycle {
    methods: {
        onStart: () => void;
        onStop: () => void;
        close: () => void;
        getPageId: () => string;
        requestFocus: (el?: Element) => void;
        themeDark: () => void;
        themeLight: () => void;
    };
}

declare interface App {
    startPage: (location: RawLocation) => void;
    Page: (
        options?: ThisTypedComponentOptionsWithArrayProps<
            Vue,
            object,
            PageLifeCycle["methods"],
            object,
            never
        >
    ) => void;
    closePage: (vue: Vue) => void;
}

export = App;

export as namespace App;

declare global {
    const define: (require: string[], callback: (App: App) => any) => void;
}
