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
  props: ['productId', 'color', 'size'],
  setup(props) {
    const store = inject('store');
    async function handleClick() {
      const token = localStorage.getItem('accessToken');
      if (!props.color || !props.size) {
        return;
      }
      try {
        const response = await fetch(
          `https://fashion-server.onrender.com//api/users/shopping-cart/add-to-cart/${props.productId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `accessToken ${token}`,
            },
            body: JSON.stringify({ color: props.color, size: props.size }),
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
