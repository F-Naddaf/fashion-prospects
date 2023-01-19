<template>
  <div v-if="store.state.userInfo" class="visited-products">
    <div class="title">
      <h3>Recently visited articles</h3>
      <span></span>
    </div>
    <section class="visited-container">
      <ul v-for="visitedProduct in store.state.userInfo.recentViews" :key="visitedProduct._id">
        <li>
          <router-link
            :to="`/${visitedProduct.category}/${visitedProduct.subCategory}/${visitedProduct.productId._id}`">
            <ProductCard :product="visitedProduct.productId" />
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { inject, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';


export default {
  name: 'VisitedProducts',

  setup() {

    const store = inject('store');
    onMounted(() => {
      store.methods.load();

    });
    return {
      store,
    };
  },

  components: {

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
