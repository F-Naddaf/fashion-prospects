<template>
  <div>
    <h3>Featured Products</h3>
    <p v-if="isLoading">loading...</p>
    <ul v-for="product in featuredList" :key="product.id">
      <li>
        <router-link :to="`/${product.category} ${product.id}`">
          <img :src="`${product.image}`" />
          <p>{{ product.rate }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FeaturedProducts',
  data() {
    return {
      featuredList: [],
      // highRatedProducts: [],
      isLoading: false,
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
          category: product.category,
          description: product.description,
          image: product.image,
          price: product.price,
          rate: Math.ceil(product.rating.rate),
          quantity: product.rating.count,
        };
      });
      this.featuredList = highRated;

      console.log('highRated', highRated);
      console.log('topFourProducts', topFourProducts);

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },
};
</script>

<style></style>
