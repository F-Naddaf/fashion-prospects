<template>
  <main>
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
          :to="`/category/${category}/${subCategoryTitle}/${subCategoryId}`"
        >
          {{ subCategoryTitle }}
        </router-link>
      </p>
      <span> > </span>
      <p>
        <router-link :to="`/${category}/${subCategoryTitle}/${productId}`">
          {{ titleRoute }}
        </router-link>
      </p>
    </div>
    <div class="admin-container">
      <EditAndDeleteProduct
        :productId="productId"
        :category="category"
        :subCategoryTitle="subCategoryTitle"
        :subCategoryId="subCategoryId"
      />
    </div>
    <div class="product-details">
      <aside class="product-image">
        <div class="main-image">
          <img :src="displayImage" />
        </div>
        <div class="slid-image-container">
          <div class="slid-images" v-for="image in images" :key="image.index">
            <button class="small-images active">
              <img @click="changeImageURL" :src="image" />
            </button>
          </div>
        </div>
      </aside>
      <aside class="product-info">
        <h2>{{ productInfo.title }}</h2>
        <div class="price-section">
          <p class="price">€{{ productInfo.price }}</p>
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
        <div class="size-container">
          <label>Sizes</label>
          <select name="size" id="size-select">
            <option value="">Please select your size</option>
            <option
              v-for="size in sizes"
              :key="size.index"
              :value="size"
              class="available-sizes"
            >
              {{ size }}
            </option>
          </select>
        </div>
        <div class="color-container">
          <label>Colors</label>
          <select name="color" id="color-select">
            <option value="">Please select your color</option>
            <option
              v-for="color in colors"
              :key="color.index"
              :value="color"
              class="available-colors"
            >
              {{ color }}
            </option>
          </select>
        </div>
        <div class="btn">
          <AddToShoppingCart :productId="productInfo?._id" />
          <AddToFavorite :productId="productInfo?._id" />
        </div>
      </aside>
    </div>
    <div class="description-container">
      <div class="product-description">
        <h3>Product description:</h3>
        <p>{{ productDetails }}</p>
      </div>
      <div class="product-extra-details">
        <h4>Composition:</h4>
        <p>{{ productComposition }}</p>
        <h4 v-if="maintenanceInstructions">maintenance instructions:</h4>
        <p>{{ maintenanceInstructions }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
import ProductRate from '@/components/ProductRate.vue';
import AddToFavorite from '@/components/AddToFavorite.vue';
import AddToShoppingCart from '@/components/AddToShoppingCart.vue';
import EditAndDeleteProduct from '@/components/EditAndDeleteProduct.vue';

export default {
  name: 'ProductDetails',
  data() {
    return {
      productInfo: {},
      productDetails: '',
      sizes: [],
      colors: [],
      productComposition: '',
      maintenanceInstructions: '',
      displayImage: [],
      images: [],
      titleRoute: '',
      rate: '',
      inStock: false,
      outOfStock: false,
      almostSoldOut: false,
      subCategoryTitle: '',
      subCategoryId: '',
      category: '',
      productId: '',
      isLoading: false,
      error: { status: false, msg: '' },
    };
  },
  async mounted() {
    window.scroll(0, 0);
    this.isLoading = true;
    this.subCategoryTitle = this.$route.params.item;
    this.category = this.$route.params.category;
    this.productId = this.$route.params.id;
    const token = localStorage.getItem('accessToken');
    try {
      await fetch(
        `http://localhost:5000/api/users/add-to-recent/${this.productId}`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category: this.category,
            subCategory: this.subCategoryTitle,
          }),
        },
      );
      const result = await fetch(
        `http://localhost:5000/api/products/product_detail/${this.productId}`,
      );
      const res = await result.json();
      const getQuantity = res.result.inStock;
      this.productInfo = res.result;
      this.sizes = res.result.size;
      this.colors = res.result.color;
      this.productDetails = res.result.description.details;
      this.productComposition = res.result.description.composition;
      this.maintenanceInstructions = res.result.description.maintenance;
      this.rate = Math.ceil(res.result.rate);
      this.subCategoryId = res.result.subCategory._id;
      this.images = res.result.images;
      this.inStock = getQuantity > 10;
      this.outOfStock = getQuantity === 0;
      this.almostSoldOut = getQuantity <= 10 && getQuantity >= 1;
      this.displayImage = res.result.images[0];
      const titleLength = res.result.title.length;
      this.titleRoute =
        titleLength > 14
          ? res.result.title.substring(0, 14).trim() + '....'
          : res.result.title;
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
    AddToShoppingCart,
    EditAndDeleteProduct,
  },
};
</script>

<style scoped>
main {
  height: 100%;
  width: 100%;
}
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
.admin-container {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.product-details {
  width: 90%;
  height: 480px;
  display: flex;
  justify-content: center;
  margin: 40px auto 60px auto;
}
.product-image {
  width: 40%;
}
.main-image {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(80, 80, 80);
  border-radius: 20px;
  background-color: #f4f4f4;
  height: 80%;
}
.slid-image-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 20%;
  margin: auto;
  align-items: flex-end;
}
.slid-images {
  display: flex;
}
.small-images {
  display: flex;
  border: 1px solid rgb(80, 80, 80);
  height: 60px;
  width: 60px;
  margin: 10px auto 0 auto;
  background-color: #f4f4f4;
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
  height: 100%;
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
  height: 490px;
}
.product-info h2 {
  color: rgb(80, 80, 80);
  margin: 0;
  text-align: left;
  text-transform: capitalize;
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
  margin: 0 auto 20px auto;
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
.size-container,
.color-container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.color-container label,
.size-container label {
  font-size: 16px;
  font-weight: 700;
  color: rgb(80, 80, 80);
  margin-bottom: 5px;
}
#size-select,
#color-select {
  width: 100%;
  padding: 5px;
}
.available-sizes,
.available-colors {
  color: #ff0084;
  padding: 5px 20px;
  border: 1px solid #ff0084;
  font-size: 14px;
  cursor: pointer;
}
.description-container {
  display: flex;
  width: 85%;
  margin: 100px auto;
  align-items: center;
  justify-content: space-around;
}
.product-description,
.product-extra-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
}
.product-description h3,
.product-extra-details h3 {
  color: rgb(80, 80, 80);
  font-size: 18px;
}
.product-description p,
.product-extra-details p {
  text-align: justify;
  margin-top: -10px;
  font-size: 14px;
}
.btn {
  display: flex;
  justify-content: space-between;
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
.add-to-cart:hover {
  background-color: #016da3;
}
.add-to-fav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8%;
  height: 30px;
  font-size: 16px;
  border: 2px solid #ff0084;
  cursor: pointer;
}
.fa-heart {
  font-size: 20px;
  color: white;
}

.fa-regular {
  font-size: 20px;
  color: white;
}
@media screen and (min-width: 1024px) {
  .product-info {
    height: 450px;
  }
  .product-details {
    width: 90%;
    height: 450px;
  }
  .price-section {
    margin: 0 auto;
  }
  .rate {
    margin: 0 auto 0 auto;
  }
  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }
}
@media screen and (min-width: 1440px) {
  .product-info {
    height: 480px;
  }
  .product-details {
    width: 90%;
    height: 480px;
  }
  .price-section {
    margin: 0 auto;
  }
  .rate {
    margin: 0 auto 20px auto;
  }
  h4 {
    display: block;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
