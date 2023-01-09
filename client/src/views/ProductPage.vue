<template>
  <main class="categories-section">
    <div class="category-title">
      <h3>{{ subCategoryTitle }}</h3>
      <span></span>
    </div>
    <div v-if="isLoading"><LoadingSpinner /></div>
    <h3 class="error" v-if="error.status">
      {{ error.msg }}
    </h3>
    <div class="category-container">
      <ul v-for="item in subCategories" :key="item._id" class="category-images">
        <li>
          <router-link :to="`/${category}/${subCategoryTitle}/${item._id}`">
            <ProductCard :product="item" />
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'ProductPage',
  data() {
    return {
      subCategories: [],
      isLoading: false,
      error: { status: false, msg: '' },
      renderComponent: true,
      subCategoryTitle: '',
      subCategoryId: '',
      category: '',
    };
  },
  async mounted() {
    this.isLoading = true;
    this.category = this.$route.params.category;
    this.subCategoryId = this.$route.params.id;
    this.subCategoryTitle = this.$route.params.item;
    try {
      const result = await fetch(
        `http://localhost:5000/api/products/filter-by-subcategory/${this.subCategoryId}`,
      );
      const res = await result.json();
      this.subCategories = res.result;
      console.log('product-page', res.result);
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
.categories-section {
  display: flex;
  flex-direction: column;
  margin-top: 45px;
}
.category-title h3 {
  font-size: 22px;
  color: #01689c;
}
.category-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.category-title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 0 0;
  background-color: #ff0084;
}
.category-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: 5% auto;
}
ul {
  margin: 20px 40px;
}
ul:hover {
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  transform: translateY(-15px);
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
</style>