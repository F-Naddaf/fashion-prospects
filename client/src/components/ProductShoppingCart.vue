<template>
  <section class="product-container">
    <aside class="left-container">
      <div class="image-container">
        <img :src="product.images" />
      </div>
      <div class="product-details">
        <h3 class="title">{{ product?.title }}</h3>
        <h3 class="price">
          € {{ product?.price }}
          <p class="in-stock" v-if="product?.inStock > 10">
            <span></span>In Stock
          </p>
          <p class="out-of-stock" v-else-if="product?.inStock === 0">
            <span></span>Out of Stock
          </p>
          <p class="almost-out" v-else><span></span>Almost sold out</p>
        </h3>
        <p class="product-id">Art.no.: {{ product?._id }}</p>
        <div class="rate">
          <p>Item rate:</p>
          <div class="rate-compo">
            <ProductRate :rate="product?.rate" />
          </div>
        </div>
        <p class="brand">Brand: {{ product?.brand }}</p>
      </div>
    </aside>
    <aside class="right-container">
      <div class="icons">
        <AddToFavorite :productId="product?._id" />
        <DeleteFromCart :productId="product?._id" />
      </div>
      <div class="selected-product">
        <p class="brand">
          Size: <span>{{ productSize }}</span>
        </p>
        <p class="brand">
          Color: <span>{{ productColor }}</span>
        </p>
      </div>
    </aside>
  </section>
</template>

<script>
import AddToFavorite from './AddToFavorite.vue';
import DeleteFromCart from './DeleteFromCart.vue';
import ProductRate from './ProductRate.vue';

export default {
  name: 'ProductShoppingCart',
  props: ['product', 'color', 'size'],
  data(props) {
    return {
      inStock: false,
      productColor: props.color,
      productSize: props.size,
    };
  },
  components: { ProductRate, AddToFavorite, DeleteFromCart },
};
</script>

<style scoped>
.product-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  border: 1px solid rgb(189 189 189);
  margin-bottom: 3%;
}
.left-container {
  display: flex;
  width: 70%;
}
.image-container {
  width: 140px;
}
img {
  width: 100%;
  height: 100%;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
}
.product-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin-left: 15px;
}
.title {
  font-size: 14px;
  color: #01689c;
  margin-bottom: 5px;
}
.price {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: green;
  margin: 0;
}
.in-stock {
  display: flex;
  align-items: center;
  color: green;
  font-weight: 600;
  font-size: 12px;
  padding-left: 40px;
}
.in-stock span {
  background-color: green;
  width: 8px;
  height: 8px;
  border-radius: 10px;
  margin-right: 5px;
}
.almost-out {
  display: flex;
  align-items: center;
  color: #ff0084;
  font-weight: 600;
  font-size: 12px;
  padding-left: 40px;
}
.almost-out span {
  background-color: #ff0084;
  width: 8px;
  height: 8px;
  border-radius: 10px;
  margin-right: 5px;
}
.out-of-stock {
  display: flex;
  align-items: center;
  color: #ff0084;
  font-weight: 600;
  font-size: 12px;
  padding-left: 40px;
}
.out-of-stock span {
  background-color: #ff0084;
  width: 8px;
  height: 8px;
  border-radius: 10px;
  margin-right: 5px;
}
.rate {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto 20px auto;
}
.rate p {
  font-size: 12px;
  font-weight: 600;
  color: #01689c;
  margin: 0 10px 0 0;
}
.rate-compo {
  margin: 0;
}
.product-id,
.brand {
  color: #01689c;
  font-weight: 600;
  font-size: 12px;
}
.right-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25%;
}
.icons {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}
.selected-product {
  display: flex;
  justify-content: space-around;
}
.brand span {
  color: #ff0084;
}
</style>
