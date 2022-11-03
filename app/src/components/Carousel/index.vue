<template>
  <el-carousel
    :height="bannerHeight + 'px'"
    arrow="hover"
    indicator-position="none"
    :autoplay="true"
  >
    <el-carousel-item v-for="carousel in list" :key="carousel.id">
      <img ref="bannerHeight" :src="carousel.imgUrl" @load="imgLoad" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "Carousel",
  props: ["list"],
  data() {
    return {
      bannerHeigeht: "",
    };
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.bannerHeight[0].height;
      });
    },
  },
  watch: {
    list: {
      immediate: true,
      handler(nwe, old) {
        this.$nextTick(() => {
          this.imgLoad();
        });
      },
    },
  },
};
</script>

<style></style>
