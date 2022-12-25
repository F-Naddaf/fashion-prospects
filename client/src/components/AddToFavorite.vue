<template>
  <button @click="handleClick" class="add-to-fav">
    <i class="fa-solid fa-heart"></i>
  </button>
</template>

<script>
export default {
  name: 'AddToFavorite',
  methods: {
    async handleClick() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(
          'http://localhost:5000/api/users/add-favorite',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `accessToken ${token}`,
            },
            body: JSON.stringify({ productId: '63a0d3c84705d518384ed84e' }),
          },
        );
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
