import SuSwiper from './SuSwiper.vue'
import SuGuess from './SuGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    SuSwiper: typeof SuSwiper
    SuGuess: typeof SuGuess
  }
}
