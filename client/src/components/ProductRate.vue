<template>
  <div class="product-rate">
    <span v-for="star in stars" :key="star[0]">
      <i
        v-if="rate"
        :class="`${star < rate ? ' ' : 'fa-dark'} fa-star fa-solid`"
      ></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProductRate',
  props: ['rate'],
  data() {
    return {
      stars: [0, 1, 2, 3, 4],
    };
  },
};
</script>

<style scoped>
i {
  font-size: 12px;
  padding-bottom: 15px;
}
.fa-star {
  color: gold;
}
.fa-dark {
  color: darkgray;
}
</style>
