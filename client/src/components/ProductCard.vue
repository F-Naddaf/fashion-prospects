<template>
      <div class="image-container">
        <img :src="product.image" />
      </div>
      <div class="product-details">
        <p class="title">
          {{ product.title }}
        </p>
        <p v-if="product.price" class="price">€ {{ product?.price }}</p>
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
img {
  max-height: 200px;
  max-width: 90%;
}
li {
  display: flex;
  list-style: none;
  max-height: 100%;
}
a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
}
.product-details {
  width: 100;
}
.product-details .title {
  width: 100;
  font-size: 14px;
  margin-bottom: -10px;
  color: rgb(80, 80, 80);
}
.product-details .price {
  width: 100;
  color: #01689c;
  font-weight: 500;
}
</style>
