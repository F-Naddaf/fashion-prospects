<template>
  <div class="featured-products">
    <div class="title">
      <h3>Featured Products</h3>
      <span></span>
    </div>
    <article class="featured-products-container">
      <div v-if="isLoading"><LoadingSpinner /></div>
      <h3 class="error" v-if="error.status">
        {{ error.msg }}
      </h3>
      <ul v-for="product in featuredList" :key="product.id">
        <li>
          <router-link :to="`/${product.id}`">
          <!-- <router-link :to="`/${product.categoryURL}/${product.id}`"> -->
            <img :src="`${product.image}`" />
            <div class="product-details">
              <p class="title">
                {{ product.title }}
              </p>
              <p class="price">€ {{ product.price }}</p>
            </div>
            <div class="product-rate">
              <span v-for="star in stars" :key="star[0]">
                <i
                  :class="`${
                    star < product.rate ? ' ' : 'fa-dark'
                  } fa-star fa-solid`"
                ></i>
              </span>
            </div>
          </router-link>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
export default {
  name: 'FeaturedProducts',
  data() {
    return {
      featuredList: [],
      stars: [0, 1, 2, 3, 4],
      isLoading: false,
      error: { status: false, msg: '' },
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const result = await fetch('https://fakestoreapi.com/products');
      const res = await result.json();
      const productsRate = res.filter((rate) => rate.rating);
      const sortProductRate = productsRate.sort((a, b) => {
        return b.rating.rate - a.rating.rate;
      });
      const topFourProducts = sortProductRate.slice(0, 4);
      const highRated = topFourProducts.map((product) => {
        return {
          id: product.id,
          categoryURL: product.category.split(' ').join(''),
          title: product.title.slice(0, 35),
          image: product.image,
          price: product.price,
          rate: Math.floor(product.rating.rate),
          quantity: product.rating.count,
        };
      });
      this.featuredList = highRated;
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
.featured-products {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5% 0;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 45px;
}
.title h3 {
  font-size: 22px;
  color: #01689c;
}
.title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 15px 0;
  background-color: #ff0084;
}
.featured-products-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
img {
  max-height: 200px;
  max-width: 90%;
}
ul {
  padding: 0;
    display: flex;
    width: 18%;
    height: 300px;
    background: white;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
li {
  list-style: none;
}
a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
}
ul:hover {
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  transform: translateY(-15px);
}
.product-details {
  width: 100;
}
.product-details .title {
  width: 100;
  font-size: 14px;
  margin-bottom: -10px;
  color: rgb(80, 80, 80);
}
.product-details .price {
  width: 100;
  color: #01689c;
  font-weight: 500;
}
.product-rate {
  margin-top: -15px;
}
i {
  font-size: 12px;
  padding-bottom: 15px;
}
.fa-star {
  color: gold;
}
.fa-dark {
  color: darkgray;
}
</style>
