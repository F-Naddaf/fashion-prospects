<template>
  <div class="carousel">
    <slot></slot>
    <button
      @click="next"
      class="btn"
      :class="`${
        visibleSlide[visibleSlide.length - 1] < latestProducts.length - 1
          ? ' '
          : 'btn-disabled'
      } btn-next`"
    >
      <i class="fa-solid fa-circle-chevron-right"></i>
    </button>
    <button
      @click="prev"
      class="btn"
      :class="`${visibleSlide[0] > 0 ? ' ' : 'btn-disabled'} btn-prev`"
    >
      <i class="fa-solid fa-circle-chevron-left"></i>
    </button>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Carousel',
  props: ['visibleSlide', 'latestProducts'],
  data() {
    return {};
  },
  methods: {
    next() {
      this.$emit('next');
    },
    prev() {
      this.$emit('prev');
    },
  },
};
</script>
<style scoped>
button {
  background: none;
  border: none;
}
.btn {
  padding: 5px 10px;
  margin: 5px 10px;
  color: lightgray;
  font-size: 40px;
  position: absolute;
  margin-top: -25px;
  z-index: 2;
}
.btn-next:hover,
.btn-prev:hover {
  cursor: pointer;
  color: rgba(255, 0, 132, 0.6);
}
.btn:focus {
  outline: none;
}
.btn-next {
  top: 50%;
  right: 0;
}
.btn-prev {
  top: 50%;
  left: 0;
}
.btn-disabled {
  color: lightgray;
}
.btn-disabled:hover {
  color: lightgray;
  cursor: default;
}
</style>
