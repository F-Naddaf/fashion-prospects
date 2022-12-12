<template>
  <section>
    <ul v-for="product in products" :key="product.id">
      <li>
        <router-link :to="`/${product.category}/${product.id}`">
          <div class="image-container">
            <img :src="`${product.image}`" />
          </div>
          <div class="product-details">
            <p class="title">
              {{ product.title.slice(0, 35) }}
            </p>
            <p class="price">€ {{ product.price }}</p>
          </div>
          <ProductRate :rate="product.rate" />
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import ProductRate from './ProductRate.vue';

export default {
  name: 'ProductCard',
  props: ['products'],
  components: {
    ProductRate,
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
}
img {
  max-height: 200px;
  max-width: 90%;
}
ul {
  display: flex;
    width: 16%;
    height: 300px;
    margin: 2%;
    padding: 1%;
    background: white;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
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
ul:hover {
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  transform: translateY(-15px);
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
