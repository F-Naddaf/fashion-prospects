<template>
  <div v-if="isLoading"><LoadingSpinner /></div>
  <h3 class="error" v-if="error.status">
    {{ error.msg }}
  </h3>
  <div class="product-route">
    <p>
      <router-link to="/" class="product-home-route">Home</router-link>
    </p>
    <span> > </span>
    <p>
      <router-link
        :to="`/category/${category}`"
        class="product-category-route"
        >{{ productDetails.category }}</router-link
      >
    </p>
    <span> > </span>
    <p>
      <router-link :to="`/${category}/${productDetails.id}`">
        {{ titleRoute }}
      </router-link>
    </p>
  </div>
  <div class="product-details">
    <aside class="product-image">
      <div class="main-image">
        <img :src="displayImage" />
      </div>
      <div class="slid-images">
        <button class="small-images active">
          <img @click="changeImageURL" :src="productDetails.image" />
        </button>
        <button class="small-images">
          <img @click="changeImageURL" src="../assets/electronics.png" />
        </button>
        <button class="small-images">
          <img @click="changeImageURL" src="../assets/jewelery.png" />
        </button>
        <button class="small-images">
          <img @click="changeImageURL" src="../assets/men-clothing.png" />
        </button>
        <button class="small-images">
          <img @click="changeImageURL" src="../assets/women-clothing.png" />
        </button>
      </div>
    </aside>
    <aside class="product-info">
      <h2>{{ productDetails.title }}</h2>
      <div class="price-section">
        <p class="price">€{{ productDetails.price }}</p>
        <p class="in-stock" v-if="inStock"><span></span>In Stock</p>
        <p class="almost-out" v-else-if="almostSoldOut">
          <span></span>Almost sold out
        </p>
        <p class="out-of-stock" v-else><span></span>Out of Stock</p>
      </div>
      <div class="rate">
        <p>Item rate</p>
        <div class="rate-compo">
          <ProductRate :rate="rate" />
        </div>
      </div>
      <div class="description">
        <h3>Product description:</h3>
        <p>{{ productDetails.description }}</p>
      </div>
      <div class="btn">
        <button class="add-to-cart">
          <p>Add to cart</p>
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
        <AddToFavorite />
      </div>
    </aside>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
import ProductRate from '@/components/ProductRate.vue';
import AddToFavorite from '@/components/AddToFavorite.vue';

export default {
  name: 'ProductDetails',
  data() {
    return {
      displayImage: '',
      inStock: false,
      outOfStock: false,
      almostSoldOut: false,
      category: '',
      rate: '',
      titleRoute: '',
      productDetails: {},
      isLoading: false,
      error: { status: false, msg: '' },
    };
  },
  async mounted() {
    window.scroll(0, 0);
    this.isLoading = true;
    try {
      const result = await fetch(
        `https://fakestoreapi.com/products/${this.$route.params.id}`,
      );
      const res = await result.json();
      this.rate = Math.ceil(res.rating.rate);
      this.productDetails = res;
      const getQuantity = res.rating.count;
      this.inStock = getQuantity > 10;
      this.outOfStock = getQuantity === 0;
      this.almostSoldOut = getQuantity <= 10 && getQuantity >= 1;
      this.category = res.category;
      const titleLength = res.title.length;
      this.displayImage = res.image;
      this.titleRoute =
        titleLength > 14
          ? res.title.substring(0, 14).trim() + '...'
          : res.title;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.error = { status: true, msg: 'Oops something went wrong!' };
    }
  },
  methods: {
    changeImageURL(e) {
      this.displayImage = e.target.src;
    },
  },
  components: {
    LoadingSpinner,
    ProductRate,
    AddToFavorite,
  },
};
</script>

<style scoped>
.product-route {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
a {
  text-decoration: none;
  color: #0091dc;
}
.product-route p {
  font-size: 14px;
  text-transform: capitalize;
  padding: 0 5px;
}
.product-route p:hover {
  text-decoration: underline;
}
.product-details {
  width: 90%;
  display: flex;
  justify-content: center;
  margin: 40px auto;
}
.product-image {
  width: 40%;
}
.main-image {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5vh 0;
  border: 1px solid rgb(80, 80, 80);
  border-radius: 20px;
  background-color: white;
  height: 35vh;
}
.slid-images {
  display: flex;
}
.small-images {
  display: flex;
  border: 1px solid rgb(80, 80, 80);
  height: 60px;
  width: 60px;
  margin: 10px auto;
  background-color: white;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
}
.small-images:hover {
  opacity: 1;
}
.small-images:hover {
  opacity: 1;
}
.active {
  opacity: 1;
}
.main-image img {
  height: 100%;
}
.small-images img {
  width: 70%;
}
.small-images:hover {
  cursor: pointer;
}
.product-info {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 80px;
  height: 45vh;
}
.product-info h2 {
  color: rgb(80, 80, 80);
  margin: 0;
  text-align: left;
}
.price-section {
  display: flex;
  width: 100%;
  margin: 20px auto;
  justify-content: space-between;
}
.price {
  font-weight: 700;
  font-size: 18px;
  color: #0091dc;
}
.in-stock {
  display: flex;
  align-items: center;
  color: green;
  font-weight: 600;
}
.in-stock span {
  width: 10px;
  background-color: green;
  height: 10px;
  border-radius: 10px;
  margin-right: 5px;
}
.almost-out {
  display: flex;
  align-items: center;
  color: #ff0084;
  font-weight: 600;
}
.almost-out span {
  width: 10px;
  background-color: #ff0084;
  height: 10px;
  border-radius: 10px;
  margin-right: 5px;
}
.out-of-stock {
  display: flex;
  align-items: center;
  color: #ff0084;
  font-weight: 600;
}
.out-of-stock span {
  width: 10px;
  background-color: #ff0084;
  height: 10px;
  border-radius: 10px;
  margin-right: 5px;
}
.rate {
  display: flex;
  width: 100%;
  margin: 0 auto;
}
.rate p {
  font-size: 16px;
  font-weight: 700;
  color: rgb(80, 80, 80);
  margin: 0 10px 0 0;
}
.rate-compo {
  margin: 0;
}
.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -20px;
}
.description h3 {
  color: rgb(80, 80, 80);
  font-size: 18px;
}
.description p {
  text-align: justify;
  margin-top: -10px;
  font-size: 14px;
}
.btn {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
.add-to-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 30px;
  font-size: 16px;
  border: none;
  background-color: #0091dc;
  color: white;
  cursor: pointer;
}
.add-to-cart p {
  font-size: 14px;
  margin-right: 10px;
}
.add-to-fav {
  width: 8%;
  height: 30px;
  font-size: 16px;
  border: none;
  background-color: #ff0084;
  color: white;
  cursor: pointer;
}
</style>
