<template>
  <main>
    <div class="category-title">
      <h3>{{ category }}</h3>
      <span></span>
    </div>
    <div v-if="isLoading"><LoadingSpinner /></div>
    <h3 class="error" v-if="error.status">
      {{ error.msg }}
    </h3>
    <div>
      <ProductCard :products="products" />
    </div>
  </main>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'CategoryPage',
  data() {
    return {
      products: [],
      isLoading: false,
      error: { status: false, msg: '' },
      renderComponent: true,
    };
  },
  async mounted() {
    this.isLoading = true;
    this.category = this.$route.params.category;
    try {
      const result = await fetch(
        `https://fakestoreapi.com/products/category/${this.category}`,
      );
      const res = await result.json();
      const data = res.map((product) => {
        return {
          id: product.id,
          category: product.category.split(' ').join(''),
          title: product.title.slice(0, 35),
          image: product.image,
          price: product.price,
          rate: Math.ceil(product.rating.rate),
        };
      });
      this.products = data;
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
.category-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 45px;
}
.category-title h3 {
  text-transform: capitalize;
  font-size: 22px;
  color: #01689c;
}
.category-title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 15px 0;
  background-color: #ff0084;
}
ul {
  margin: 0 30px;
}
</style>
