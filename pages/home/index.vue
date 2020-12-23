<template>
  <view>
    <view class="uni-padding-wrap">
      <view class="page-section swiper">
        <view class="page-section-spacing">
          <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <swiper-item>
              <view class="swiper-item" style="background-color: red; height: 100%;">A</view>
            </swiper-item>
            <swiper-item>
              <view class="swiper-item" style="background-color: green; height: 100%;">B</view>
            </swiper-item>
            <swiper-item>
              <view class="swiper-item" style="background-color: blue; height: 100%;">C</view>
            </swiper-item>
          </swiper>
        </view>
      </view>
      <van-button type="primary">默认按钮</van-button>
    </view>
  </view>
</template>

<script>
  import {
    getSystemInfo
  } from "@/api/user.js"
  export default {
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500
      }
    },
    onShow() {
      this.getSystemInfo()
    },
    methods: {
      async getSystemInfo() {
        const {
          data
        } = await getSystemInfo({
          test: 1
        })
        console.log(data)
      }
    }
  }
</script>

<style>
</style>
