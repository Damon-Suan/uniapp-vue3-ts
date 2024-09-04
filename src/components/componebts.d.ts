import SuSwiper from "./SuSwiper.vue"

declare module 'vue' {
    export interface GlobalComponents {
        SuSwiper: typeof SuSwiper
    }
}