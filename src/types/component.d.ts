/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import type SuGuess from '@/components/SuGuess.vue'
import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    //
  }
}
//组件实例类型
export type SuGuessInstance = InstanceType<typeof SuGuess>
