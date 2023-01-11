<template>
  <div class="image-container">
    <img :src="product.images" />
  </div>
  <div class="product-details">
    <p class="title">
      {{ product?.title }}
    </p>
    <p v-if="product?.price" class="price">€ {{ product?.price }}</p>
  </div>
  <ProductRate :rate="product?.rate" />
</template>

<script>
import ProductRate from './ProductRate.vue';

export default {
  name: 'ProductCard',
  props: ['product'],
  components: {
    ProductRate,
  },
};
</script>

<style scoped>
.image-container {
  width: 240px;
}
img {
  width: 100%;
  height: 300px;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
}
.product-details .title {
  font-size: 14px;
  margin-bottom: -10px;
  color: rgb(80, 80, 80);
  margin-bottom: 0;
}
.product-details .price {
  color: #01689c;
  font-weight: 500;
  margin: 0;
}
</style>
