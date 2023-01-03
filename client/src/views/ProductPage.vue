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
          <router-link
            :to="`/category/${subCategoryTitle}/${item.title}/${item._id}`"
          >
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
    };
  },  
  async mounted() {
    this.isLoading = true;
    this.subCategoryId = this.$route.params.id;
    this.subCategoryTitle = this.$route.params.item;
    try {
      const result = await fetch(
        `http://localhost:5000/api/products/filter-by-subcategory/${this.subCategoryId}`,
      );
      const res = await result.json();
      this.subCategories = res.result;
      console.log('res', res);
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
h3 {
  color: red;
}
</style>
