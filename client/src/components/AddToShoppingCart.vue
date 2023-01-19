<template>
  <button @click="handleClick" class="add-to-cart">
    <p>Add to cart</p>
    <i class="fa-solid fa-cart-shopping"></i>
  </button>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'AddToShoppingCart',
  props: ['productId'],
  setup(props) {
    const store = inject('store');
    async function handleClick() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/shopping-cart/add-to-cart/${props.productId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `accessToken ${token}`,
            },
          },
        );
        const newUser = await response.json();
        store.methods.updateUser(newUser.result[0]);
      } catch (error) {
        console.log(error);
      }
    }
    return {
      store,
      handleClick,
    };
  },
};
</script>

<style scoped>
.add-to-cart p {
  padding-right: 10px;
}
</style>
