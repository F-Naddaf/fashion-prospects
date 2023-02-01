<template>
  <section class="categories-section">
    <div class="category-title">
      <h3>Categories</h3>
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
          <router-link :to="`/category/${category.title}/${category._id}`">
            <CategoryCard :category="category" />
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import CategoryCard from '@/components/CategoryCard.vue';
import LoadingSpinner from '@/components/Spinner.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Category',
  data() {
    return {
      categories: [],
      isLoading: false,
      error: { status: false, msg: '' },
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const result = await fetch(
        `https://fashion-server.onrender.com//api/categories`,
      );
      const res = await result.json();
      this.categories = res.result;
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
ul {
  padding: 0;
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
