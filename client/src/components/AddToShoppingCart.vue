<template>
  <button @click="handleClick" class="add-to-cart">
    <p>Add to cart</p>
    <i class="fa-solid fa-cart-shopping"></i>
  </button>
</template>

<script>
export default {
  name: 'AddToShoppingCart',
  props: ['productId'],
  methods: {
    async handleClick() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/shopping-cart/add-to-cart/${this.productId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `accessToken ${token}`,
            },
          },
        );
        await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
