<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeBannerAPI } from '@/services/home'
import type { BannerItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const bannerLiist = ref<BannerItem[]>([])

const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerLiist.value = res.result
  console.log(res, 11111)
}
onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <!-- 导航栏 -->
  <custom-navbar />
  <!-- 轮播图 -->
  <SuSwiper :list="bannerLiist" />
  <!-- 分类 -->
  <CategoryPanel />
  <view class="index">index</view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
