<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeMutliAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import HotPanel from './components/HotPanel.vue'
import type { SuGuessInstance } from '@/types/component'

//获取轮播图
const bannerLiist = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerLiist.value = res.result
  console.log(res, 11111)
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
// 到底了
const onScrolltolower = () => {
  console.log('daodile')
  guessRef.value?.getGuessData()
}
//猜你喜欢实例
const guessRef = ref<SuGuessInstance>()
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeMutliData()
})
</script>

<template>
  <!-- 导航栏 -->
  <custom-navbar />
  <scroll-view @scrolltolower="onScrolltolower" scroll-y class="scroll-view">
    <!-- 轮播图 -->
    <SuSwiper :list="bannerLiist" />
    <!-- 分类 -->
    <CategoryPanel :list="CategoryLiist" />
    <!-- 热门推荐 -->
    <HotPanel :list="HotLiist" />
    <!-- 猜你喜欢 -->
    <SuGuess ref="guessRef" />
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
