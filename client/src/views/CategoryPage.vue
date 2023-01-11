<template>
  <section class="categories-section">
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
        v-for="subCategory in SubCategories"
        :key="subCategory._id"
        class="category-images"
      >
        <li>
          <router-link
            :to="`/category/${categoryTitle}/${subCategory.title}/${subCategory._id}`"
          >
            <CategoryCard :category="subCategory" />
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
import CategoryCard from '@/components/CategoryCard.vue';

export default {
  name: 'CategoryPage',
  data() {
    return {
      SubCategories: [],
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
    this.categoryTitle = this.$route.params.category;
    try {
      const result = await fetch(
        `http://localhost:5000/api/subcategories/${this.categoryId}`,
      );
      const res = await result.json();
      this.SubCategories = res.result;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.error = { status: true, msg: 'Oops something went wrong!' };
    }
  },
  components: {
    LoadingSpinner,
    CategoryCard,
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
  justify-content: space-around;
  margin: 5% 0;
  width: 100%;
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
