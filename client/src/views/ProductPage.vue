<template>
  <main class="categories-section">
    <router-link
      v-if="store.state.userInfo?.isAdmin"
      :to="`/category/${category}/${subCategoryTitle}/${subCategoryId}/create/`"
    >
      <button class="create">Create</button>
    </router-link>
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
import { onMounted, inject } from 'vue';

export default {
  name: 'ProductPage',
  setup() {
    const store = inject('store');
    onMounted(() => {
      store.methods.load();
    });
    return {
      store,
    };
  },
  data() {
    return {
      subCategories: [],
      isLoading: false,
      error: { status: false, msg: '' },
      success: { status: true, msg: '' },
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
        `https://fashion-server.onrender.com/api/products/filter-by-subcategory/${this.subCategoryId}`,
      );
      const res = await result.json();
      this.subCategories = res.result;
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
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 45px;
}
.create {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 30px;
  border: none;
  background-color: #01689c;
  border-radius: 8px;
  font-weight: 600;
  margin-right: 30px;
  cursor: pointer;
  color: white;
}
.create:hover {
  background-color: #00527a;
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
  flex-direction: column;
  list-style: none;
  max-height: 100%;
}
a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
  text-decoration: none;
}
</style>
