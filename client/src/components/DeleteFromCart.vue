<template>
  <button @click="handleDelete" class="remove-from-cart">
    <i class="fa-solid fa-trash"></i>
  </button>
</template>

<script>
export default {
  name: 'DeleteFromCart',
  props: ['productId'],
  methods: {
    async handleDelete() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/shopping-cart/delete-item/${this.productId}`,
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

<style scoped>
.remove-from-cart {
  background: none;
  border: none;
  height: fit-content;
}
.fa-trash {
  color: #9c9c9c;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
}
.fa-trash:hover {
  transform: scale(0.9);
  color: #911053;
}
</style>
