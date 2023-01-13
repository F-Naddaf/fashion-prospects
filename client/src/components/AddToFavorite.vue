<template>
  <button @click="handleClick" class="add-to-fav">
    <i
      :class="`${
        isFavorite(userInfo?.favorites)
          ? 'fa-solid fa-heart'
          : 'fa-regular fa-heart'
      }`"
    ></i>
  </button>
</template>

<script>
import useUser from '../modules/user';
import { onMounted } from 'vue';

export default {
  name: 'AddToFavorite',
  props: ['productId'],
  setup() {
    const { userInfo, load, logout } = useUser();
    onMounted(() => {
      load();
    });
    return {
      userInfo,
      logout,
    };
  },
  methods: {
    isFavorite(favoriteArray) {
      const getProductId = favoriteArray?.map((product) => {
        return {
          id: product.productId,
        };
      });
      const isExist = getProductId?.some((item) => item.id === this.productId);
      return isExist;
    },
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
