<template>
  <div class="product-rate">
    <div v-for="star in stars" :key="star[0]" class="star">
      <i
        v-if="rate"
        :class="`${star < rate ? ' ' : 'fa-dark'} fa-star fa-solid`"
      ></i>
    </div>
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
.product-rate {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.star {
  display: flex;
}
i {
  font-size: 12px;
  padding: 0;
}
.fa-star {
  color: gold;
}
.fa-dark {
  color: darkgray;
}
</style>
