<template>
  <div v-if="userInfo" class="visited-products">
    <div class="title">
      <h3>Recently visited articles</h3>
      <span></span>
    </div>
    <section class="visited-container">
      <div v-if="isLoading"><LoadingSpinner /></div>
      <h3 class="error" v-if="error.status">
        {{ error.msg }}
      </h3>
      <ul v-for="visitedProduct in visitedProducts" :key="visitedProduct._id">
        <!-- :to="`/${category}/${subCategoryTitle}/${visitedProduct._id}`" -->
        <li>
          <router-link :to="`/`">
            <ProductCard :product="visitedProduct" />
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import LoadingSpinner from './Spinner.vue';

export default {
  name: 'VisitedProducts',
  props: ['userInfo'],
  data() {
    return {
      visitedProducts: [],
      subcategoryList: [],
      isLoading: false,
      error: false,
    };
  },
  async mounted() {
    const token = localStorage.getItem('accessToken');
    this.isLoading = true;
    try {
      const result = await fetch(
        'http://localhost:5000/api/products/recent-views',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await result.json();
      this.visitedProducts = res.result;
      console.log('visited', res.result);
      this.isLoading = false;
    } catch (error) {
      this.error = true;
    }
  },
  components: {
    LoadingSpinner,
    ProductCard,
  },
};
</script>

<style scoped>
.visited-products {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10% 0 0 0;
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
  width: 70px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 15px 8px;
  background-color: #ff0084;
}
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
.visited-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.04);
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
  border: 2px solid white;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
}
a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
}
</style>
