<template>
  <main class="categories-section">
    <div class="category-title">
      <h3>{{ categoryTitle }}</h3>
      <span></span>
    </div>
    <div v-if="isLoading"><LoadingSpinner /></div>
    <h3 class="error" v-if="error.status">
      {{ error.msg }}
    </h3>
    <div class="category-container">
      <ul
        v-for="category in categories"
        :key="category._id"
        class="category-images"
      >
        <li>
          <router-link
            :to="`/category/${categoryTitle}/${category.title}/${category._id}`"
          >
            <CategoryCard :category="category" />
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';

export default {
  name: 'ProductPage',
  data() {
    return {
      categories: [],
      isLoading: false,
      error: { status: false, msg: '' },
      renderComponent: true,
      categoryTitle: '',
      categoryId: '',
    };
  },
  async mounted() {
    this.isLoading = true;
    this.categoryId = this.$route.params.id;
    this.categoryTitle = this.$route.params.item;
    try {
      const result = await fetch(
        `http://localhost:5000/api/products/filter-by-subcategory/${this.categoryId}`,
      );
      const res = await result.json();
      this.categories = res.result;
      console.log('res', res);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.error = { status: true, msg: 'Oops something went wrong!' };
    }
  },
  components: {
    LoadingSpinner,
  },
};
</script>

<style scoped>
h3 {
  color: red;
}
</style>
