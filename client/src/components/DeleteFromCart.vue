<template>
  <button @click="handleDelete" class="remove-from-cart">
    <i class="fa-solid fa-trash"></i>
  </button>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'DeleteFromCart',
  props: ['productId'],
  setup(props) {
    const store = inject('store');
    async function handleDelete() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(
          `https://fashion-server.onrender.com//api/users/shopping-cart/delete-item/${props.productId}`,
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
      handleDelete,
    };
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
