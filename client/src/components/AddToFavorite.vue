<template>
  <button @click="handleClick" class="add-to-fav">
    <i class="fa-solid fa-heart"></i>
  </button>
</template>

<script>
export default {
  name: 'AddToFavorite',
  props: ['productId'],
  methods: {
    async handleClick() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/add-favorite/${this.productId}`,
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
