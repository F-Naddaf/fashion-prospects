<template>
  <div class="featured-products">
    <div class="title">
      <h3>Featured Products</h3>
      <span></span>
    </div>
    <section class="featured-products-container">
      <div v-if="isLoading"><LoadingSpinner /></div>
      <h3 class="error" v-if="error.status">
        {{ error.msg }}
      </h3>
      <ul v-for="product in featuredList" :key="product.id">
        <ProductCard :product="product" />
      </ul>
    </section>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
import ProductCard from './ProductCard.vue';

export default {
  name: 'FeaturedProducts',
  data() {
    return {
      featuredList: [],
      isLoading: false,
      error: { status: false, msg: '' },
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const result = await fetch('https://fakestoreapi.com/products');
      const res = await result.json();
      const productsRate = res.filter((rate) => rate.rating);
      const sortProductRate = productsRate.sort((a, b) => {
        return b.rating.rate - a.rating.rate;
      });
      const topFourProducts = sortProductRate.slice(0, 4);
      const highRated = topFourProducts.map((product) => {
        return {
          id: product.id,
          category: product.category.split(' ').join(''),
          title: product.title.slice(0, 35),
          image: product.image,
          price: product.price,
          rate: Math.ceil(product.rating.rate),
          quantity: product.rating.count,
        };
      });
      this.featuredList = highRated;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.error = { status: true, msg: 'Oops something went wrong!' };
    }
  },
  components: {
    LoadingSpinner,
    ProductCard,
  },
};
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  color: #ff0084;
  font-weight: 700;
  font-size: 22px;
  padding: 10px;
  align-self: center;
}
.error span {
  color: #ff0084;
}
.featured-products {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5% 0;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}
.title h3 {
  font-size: 22px;
  color: #01689c;
}
.title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 15px 0;
  background-color: #ff0084;
}
.featured-products-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
ul:hover {
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  transform: translateY(-15px);
}
</style>
