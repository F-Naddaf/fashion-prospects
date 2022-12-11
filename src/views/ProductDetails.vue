<template>
  <NavBar />
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
      <router-link to="/" class="product-category-route">{{
        productDetails.category
      }}</router-link>
    </p>
    <span> > </span>
    <p>
      <router-link :to="`/${productDetails.category}/${productDetails.id}`">
        {{ titleRoute }}
      </router-link>
    </p>
  </div>
  <div class="product-details">
    <aside class="product-image">
      <div class="main-image">
        <img :src="`${productDetails.image}`" />
      </div>
      <button class="small-images">
        <img :src="`${productDetails.image}`" />
      </button>
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
      <div class="description">
        <h3>Product description:</h3>
        <p>{{ productDetails.description }}</p>
      </div>
      <div class="btn">
        <button class="add-to-cart">
          <p>Add to cart</p>
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
        <button class="add-to-fav">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
    </aside>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'productDeatils',
  data() {
    return {
      inStock: false,
      outOfStock: false,
      almostSoldOut: false,
      id: 0,
      titleRoute: '',
      productDetails: {},
      stars: [0, 1, 2, 3, 4],
      isLoading: false,
      error: { status: false, msg: '' },
    };
  },
  async mounted() {
    this.isLoading = true;
    this.id = this.$route.params.id;
    // this.id = parseInt(this.$route.params.id);
    const idNum = this.id;
    console.log('id', typeof idNum);
    try {
      const result = await fetch(`https://fakestoreapi.com/products/?${idNum}`);
      const res = await result.json();
      const productById = res.find((rate) => rate.id == this.$route.params.id);
      this.productDetails = productById;
      const getQuantity = productById.rating.count;
      this.inStock = getQuantity > 10;
      this.outOfStock = getQuantity === 0;
      this.almostSoldOut = getQuantity <= 10 && getQuantity >= 1;
      const titleLength = productById.title.length;
      this.titleRoute =
        titleLength > 14
          ? productById.title.substring(0, 14).trim() + '...'
          : productById.title;

      console.log('res', res);
      console.log(productById);

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.error = { status: true, msg: 'Oops something went wrong!' };
    }
  },
  components: {
    NavBar,
    LoadingSpinner,
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
  padding: 5vh 0;
  border: 1px solid rgb(80, 80, 80);
  border-radius: 20px;
  background-color: white;
  height: 35vh;
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
}
.main-image img {
  width: 50%;
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
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 80px;
  height: 45vh;
}
.product-info h2 {
  color: rgb(80, 80, 80);
  margin: 0;
}
.price-section {
  display: flex;
  width: 80%;
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
