<template>
      <div class="image-container">
        <img :src="category.image" />
      </div>
      <div class="product-details">
        <h3 class="title">
          {{ category.title }}
        </h3>
      </div>
      <ProductRate :rate="category?.rate" />
</template>

<script>
import ProductRate from './ProductRate.vue';

export default {
  name: 'CategoryCard',
  props: ['category'],
  components: {
    ProductRate,
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 300px;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
}
.product-details {
  width: 100;
}
.product-details .title {
  width: 100;
  font-size: 14px;
  text-transform: capitalize;
  margin-bottom: -10px;
  color: rgb(80, 80, 80);
}
</style>
