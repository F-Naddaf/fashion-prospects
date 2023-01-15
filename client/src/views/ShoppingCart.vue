<template>
  <main class="shopping-container">
    <div class="shopping-title">
      <h3>Shopping Basket</h3>
      <span></span>
    </div>
    <div class="products-container">
      <aside v-if="store.state.userInfo" class="shopping-cart-section">
        <ul v-for="item in store.state.userInfo?.shoppingCart" :key="item._id" class="shopping-images">
          <li>
            <ProductShoppingCart :product="item.productId" />
          </li>
        </ul>
      </aside>
      <aside class="overview">
        <h3>Overview:</h3>
        <div class="price-container">
          <div class="order-value">
            <p>Order value:</p>
            <p>€{{ subTotal }}</p>
          </div>
          <div class="order-value">
            <p>Delivery Cost:</p>
            <p>€{{ delivery }}</p>
          </div>
          <span></span>
          <div class="total-value">
            <p>Total:</p>
            <p>€ {{ total }}</p>
          </div>
          <p class="about-shipping">
            Prices and shipping costs are confirmed at checkout.
          </p>
          <p class="payment">We accept:</p>
          <img class="payment-icons" src="../assets/payment-icons.png" alt="payment-icons" />
          <button class="check-out">Go to checkout</button>
        </div>
      </aside>
    </div>
  </main>
</template>

<script>

import { onMounted, inject } from 'vue';
import ProductShoppingCart from '@/components/ProductShoppingCart.vue';

export default {
  name: 'ShoppingCart',
  data() {
    return {
      delivery: 3.99,
    };
  },
  setup() {

    const store = inject('store');
    onMounted(() => {
      store.methods.load();
    });
    return {
      store,
    };
  },

  computed: {
    subTotal() {
      let subCost = 0;
      for (let items in this.store.state.userInfo?.shoppingCart) {
        let individualItem = this.store.state.userInfo?.shoppingCart[items];
        subCost += individualItem.productId.price;
      }
      return Math.round(subCost * 100) / 100;
    },
    total() {
      return Math.round((this.subTotal + this.delivery) * 100) / 100;
    },
  },
  components: {
    ProductShoppingCart,
  },
};
</script>

<style scoped>
.shopping-container {
  display: flex;
  flex-direction: column;
  margin-top: 45px;
}

.shopping-title h3 {
  font-size: 22px;
  color: #01689c;
}

.shopping-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shopping-title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 0 0;
  background-color: #ff0084;
}

.products-container {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  margin: 5% auto;
}

.shopping-cart-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-right: 40px;
}

.overview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20%;
  border: 1px solid rgb(189 189 189);
}

.overview h3 {
  color: #01689c;
  margin-left: 10px;
}

.price-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.price-container span {
  height: 2px;
  width: 90%;
  background-color: #707070;
  margin: 30px 0 10px 0;
}

.order-value,
.total-value {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.order-value p {
  font-size: 14px;
  margin: 5px;
  color: #707070;
}

.total-value p {
  font-size: 16px;
  font-weight: 700;
}

.about-shipping {
  color: #707070;
  font-size: 12px;
}

.payment {
  color: #707070;
  font-size: 12px;
  align-self: flex-start;
  padding-left: 10px;
}

.payment-icons {
  width: 80%;
}

.check-out {
  width: 90%;
  height: 40px;
  font-size: 18px;
  background-color: #01689c;
  color: white;
  font-weight: 700;
  border: none;
  margin: 30px 0;
  cursor: pointer;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  list-style: none;
  max-height: 100%;
}
</style>
