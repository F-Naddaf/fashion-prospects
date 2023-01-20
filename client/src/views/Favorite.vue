<template>
  <main class="favorite-container">
    <div class="favorite-title">
      <h3>Favorite</h3>
      <span></span>
    </div>
    <div v-if="isLoading">
      <LoadingSpinner />
    </div>
    <h3 class="error" v-if="error.status">
      {{ error.msg }}
    </h3>
    <div v-if="store.state.userInfo" class="favorite-card-section">
      <ul
        v-for="favorite in favorites"
        :key="favorite._id"
        class="favorite-images"
      >
        <li>
          <router-link
            :to="`/${favorite?.subCategory?.categoryTitle}/${favorite?.subCategory?.title}/${favorite._id}`"
          >
            <ProductCard :product="favorite" />
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { onMounted, inject, ref } from 'vue';
import LoadingSpinner from '@/components/Spinner.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Favorite',
  setup() {
    const store = inject('store');
    const favorites = ref('');
    const isLoading = ref(false);
    const error = ref(false);
    onMounted(async () => {
      isLoading.value = true
      store.methods.load();
      const token = localStorage.getItem('accessToken');
      try {
        const result = await fetch(
          'http://localhost:5000/api/products/favorites',
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const res = await result.json();
        favorites.value = res.result;
        isLoading.value = false
      } catch (error) {
        error.value = true;
      }
    });
    return {
      store,
      favorites,
      isLoading,
      error,
    };
  },
  components: {
    ProductCard,
    LoadingSpinner,
  },
};
</script>

<style scoped>
.favorite-container {
  display: flex;
  flex-direction: column;
  margin-top: 45px;
}

.favorite-title h3 {
  font-size: 22px;
  color: #01689c;
}

.favorite-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorite-title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 0 0;
  background-color: #ff0084;
}

.favorite-card-section {
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
