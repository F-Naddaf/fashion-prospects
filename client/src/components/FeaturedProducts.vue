<template>
  <div class="featured-products">
    <div class="title">
      <h3>Featured Products</h3>
      <span></span>
    </div>
    <div v-if="isLoading"><LoadingSpinner /></div>
    <h3 class="error" v-if="error.status">
      {{ error.msg }}
    </h3>
    <section class="featured-products-container">
      <ul v-for="product in featuredList" :key="product.id">
        <li>
          <router-link
            :to="`/${product?.subCategory?.categoryTitle}/${product?.subCategory?.title}/${product?._id}`"
          >
            <ProductCard :product="product" />
          </router-link>
        </li>
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
      const getProduct = await fetch(
        'https://fashion-server.onrender.com//api/products',
      );
      const response = await getProduct.json();
      const products = response.result;
      const sortProductRate = products.sort((a, b) => {
        return b.rate - a.rate;
      });
      const topFourProducts = sortProductRate.slice(0, 4);
      const highRatedProducts = topFourProducts.map((product) => {
        return {
          images: [product.images],
          title: product.title,
          price: product.price,
          subCategory: product.subCategory,
          rate: Math.ceil(product.rate),
          _id: product._id,
        };
      });
      this.featuredList = highRatedProducts;
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
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}
ul {
  margin: 20px 0;
  padding: 0;
}
ul:hover {
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  transform: translateY(-5px);
}
li {
  display: flex;
  list-style: none;
  max-height: 100%;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
}
a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
}
</style>
