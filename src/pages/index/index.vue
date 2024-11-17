<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeMutliAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import HotPanel from './components/HotPanel.vue'
import type { SuGuessInstance } from '@/types/component'
import PageSkeleton from './components/PageSkeleton.vue'

//获取轮播图
const bannerLiist = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerLiist.value = res.result
}
//分类
const CategoryLiist = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  CategoryLiist.value = res.result
}
//热门推荐
const HotLiist = ref<HotItem[]>([])
const getHomeMutliData = async () => {
  const res = await getHomeMutliAPI()
  HotLiist.value = res.result
}
//猜你喜欢实例
const guessRef = ref<SuGuessInstance>()
// 到底了
const onScrolltolower = () => {
  console.log('到底了')
  guessRef.value?.getGuessData()
}
const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeMutliData()])
  isLoading.value = false
})
const isTrigger = ref(false)
const onRefresherrefresh = async () => {
  isTrigger.value = true
  console.log('下拉刷新了')
  // getHomeBannerData()
  // getHomeCategoryData()
  // getHomeMutliData()
  guessRef.value?.resData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeMutliData(),
    guessRef.value?.getGuessData(),
  ])
  isTrigger.value = false
}
</script>

<template>
  <!-- 导航栏 -->
  <custom-navbar />
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTrigger"
    @scrolltolower="onScrolltolower"
    scroll-y
    class="scroll-view"
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 轮播图 -->
      <SuSwiper :list="bannerLiist" />
      <!-- 分类 -->
      <CategoryPanel :list="CategoryLiist" />
      <!-- 热门推荐 -->
      <HotPanel :list="HotLiist" />
      <!-- 猜你喜欢 -->
      <SuGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
