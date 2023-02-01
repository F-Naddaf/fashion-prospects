<template>
  <button @click="handleClick" class="add-to-fav">
    <i
      :class="`${
        isFavorite(store.state.userInfo?.favorites)
          ? 'fa-solid fa-heart'
          : 'fa-regular fa-heart'
      }`"
    ></i>
  </button>
</template>

<script>
import { onMounted, inject } from 'vue';

export default {
  name: 'AddToFavorite',
  props: ['productId'],
  setup(props) {
    const store = inject('store');
    onMounted(() => {
      store.methods.load();
    });
    function isFavorite(favoriteArray) {
      const getProductId = favoriteArray?.map((product) => {
        return {
          id: product.productId,
        };
      });
      const isExist = getProductId?.some((item) => item.id === props.productId);
      return isExist;
    }
    async function handleClick() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(
          `https://fashion-server.onrender.com//api/users/add-favorite/${props.productId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `accessToken ${token}`,
            },
          },
        );
        const newUser = await response.json();
        store.methods.updateUser(newUser.result);
      } catch (error) {
        console.log(error);
      }
    }
    return {
      store,
      isFavorite,
      handleClick,
    };
  },
};
</script>

<style>
.add-to-fav {
  display: flex;
}

.fa-heart {
  font-size: 20px;
  color: #ff0084;
}

.fa-regular {
  font-size: 20px;
  color: #ff0084;
}

.add-to-fav {
  height: 30px;
  font-size: 18px;
  border: none;
  color: #ff0084;
  background: none;
  cursor: pointer;
}

.add-to-fav:hover {
  transform: scale(0.9);
  color: #911053;
}
</style>
