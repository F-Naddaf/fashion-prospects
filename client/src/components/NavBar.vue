<template>
  <nav>
    <div class="logo-container">
      <router-link to="/">
        <img alt="Vue logo" src="../assets/Logo.png" />
        <div class="logo-name">
          <h3 class="fashion">Fashion</h3>
          <h3><span class="logo-color">Pro</span>spects</h3>
        </div>
      </router-link>
    </div>
    <aside class="nav-right-container">
      <ul class="menu-container">
        <router-link to="/">
          <li>Home</li>
          <span> |</span>
        </router-link>
        <li class="products-list">
          <router-link to="/" class="title"> Products </router-link>
          <ul class="drop-down">
            <li
              class="category-list"
              v-for="category in categoryList"
              :key="category._id"
            >
              <router-link
                @mouseover="getSubcategories(category._id)"
                :to="`/category/${category.title}/${category._id}`"
                class="drop-down-link"
              >
                {{ category.title }}
              </router-link>
              <ul class="subcategory-drop-down">
                <span
                  v-if="subcategoryList"
                  :class="`${subcategoryList.length > 0 ? 'arrow' : 'empty'}`"
                ></span>
                <li
                  v-for="subcategory in subcategoryList"
                  :key="subcategory._id"
                >
                  <router-link
                    :to="`/category/${category.title}/${subcategory.title}/${subcategory._id}`"
                    class="drop-down-link"
                  >
                    {{ subcategory.title }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <span> |</span>
        <router-link to="/about">
          <li>About</li>
          <span> |</span>
        </router-link>
        <router-link to="/contact">
          <li>Contact</li>
        </router-link>
      </ul>
      <div class="user-container">
        <ul class="user-btn">
          <router-link to="/auth">
            <i class="fa-solid fa-user"></i>
          </router-link>
          <ul class="user-drop-down">
            <div v-if="isLoading">
              <LoadingSpinner />
            </div>
            <p class="error" v-if="error">
              Oops something went wrong!
              <span>Error 404</span>
            </p>
            <li v-if="store.state.userInfo">
              <router-link :to="`/profile`" class="user-drop-down-link">
                Profile
              </router-link>
            </li>
            <li v-if="store.state.userInfo">
              <router-link
                :to="`/`"
                @click="store.methods.logout"
                class="user-drop-down-link"
              >
                Logout
              </router-link>
            </li>
            <li v-else>
              <router-link :to="`/auth`" class="user-drop-down-link">
                Login
              </router-link>
            </li>
          </ul>
          <p class="user-name">{{ store.state.userInfo?.userName }}</p>
        </ul>
        <router-link to="/favorite">
          <i class="fa-solid fa-heart"></i>
        </router-link>
        <router-link to="/shopping" class="shopping-cart-container">
          <i class="fa-solid fa-bag-shopping"></i>
          <h4 class="items">
            {{ store.state.userInfo?.shoppingCart?.length }}
          </h4>
        </router-link>
      </div>
    </aside>
  </nav>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';

import { onMounted, inject, ref } from 'vue';

export default {
  name: 'NavBar',
  setup() {
    const store = inject('store');
    const categoryList = ref([]);
    const subcategoryList = ref([]);
    const isLoading = ref(false);
    const error = ref(false);
    const itemsInShoppingCart = ref('');
    onMounted(() => {
      store.methods.load();
    });
    onMounted(async () => {
      try {
        const result = await fetch(
          'https://fashion-server.onrender.com/api/categories',
        );
        const res = await result.json();
        categoryList.value = res.result;
      } catch (error) {
        error.value = true;
      }
    });
    async function getSubcategories(id) {
      isLoading.value = true;
      try {
        const result = await fetch(
          `https://fashion-server.onrender.com/api/subcategories/${id}`,
        );
        const res = await result.json();
        subcategoryList.value = res.result;
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    }
    return {
      store,
      getSubcategories,
      categoryList,
      subcategoryList,
      isLoading,
      error,
      itemsInShoppingCart,
    };
  },
  components: {
    LoadingSpinner,
  },
};
</script>

<style scoped>
.user-btn {
  display: flex;
  align-items: center;
}
.user-name {
  color: white;
  font-size: 14px;
}
nav {
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
  height: 7vh;
  z-index: 10;
  background-color: black;
}
a {
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.logo-container {
  display: flex;
  margin-left: 20px;
}
img {
  height: 90%;
}
.logo-name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: -12px;
}
.logo-color {
  color: #ff0084;
}
.fashion {
  margin-bottom: -5px;
}
h3 {
  color: #0091dc;
  margin: 0;
}
.menu-container {
  display: flex;
  align-items: center;
  position: relative;
}
.menu-container a {
  height: 7vh;
  display: flex;
  margin: 0;
  justify-content: center;
  color: #0091dc;
}
.menu-container li:hover,
a:hover {
  color: #ff0084;
}
.menu-container li {
  position: relative;
  list-style: none;
  justify-content: center;
  color: #0091dc;
}
.menu-container h3 {
  font-size: 16px;
}
.menu-container span {
  color: #ff0084;
  margin: 0 15px;
}
.menu-container ul {
  padding-left: 0;
}
.nav-right-container {
  display: flex;
  align-items: center;
}
.products-list:hover .drop-down {
  display: block;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  height: fit-content;
  top: 7vh;
  left: -40px;
  align-items: center;
  background-color: #0091dc;
  border-top: 4px solid #ff0084;
  z-index: 10;
}
.drop-down li,
.subcategory-drop-down li {
  color: white;
}
.drop-down {
  display: none;
}
.drop-down::before {
  content: '';
  top: -15px;
  left: 60px;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #ff0084;
}
.category-list:hover .subcategory-drop-down {
  display: block;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  height: fit-content;
  top: 0;
  right: 144px;
  align-items: center;
  background-color: #0091dc;
  border-right: 4px solid #ff0084;
  z-index: 10;
}
.subcategory-drop-down .arrow {
  top: 15px;
  right: -25px;
  position: absolute;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 10px solid #ff0084;
}
.empty {
  display: none;
}
.subcategory-drop-down {
  display: none;
}
.subcategory-drop-down li {
  color: white;
}
.error {
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 10px;
  align-self: center;
}
.error span {
  color: white;
}
.drop-down a,
.user-drop-down a {
  display: flex;
  justify-content: center;
  color: white;
  height: 45px;
  padding: 0 40px;
  margin: 0;
}
.user-drop-down button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 45px;
  width: 100%;
  font-size: 14px;
  padding: 0 40px;
  margin: 0;
}
.user-drop-down button:hover {
  cursor: pointer;
}
.drop-down-link,
.user-drop-down-link {
  text-transform: capitalize;
  background: none;
  border: none;
}
.drop-down-link:hover,
.user-drop-down-link:hover {
  background-color: #ff0084;
}
.user-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.user-container li {
  list-style: none;
  position: relative;
}
.user-container ul {
  position: relative;
}
.user-btn:hover .user-drop-down {
  display: block;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  height: fit-content;
  top: 7vh;
  padding: 0;
  right: -30px;
  align-items: center;
  background-color: #0091dc;
  border-top: 4px solid #ff0084;
  z-index: 10;
}
.user-drop-down li {
  color: white;
  display: flex;
  flex-direction: column;
}
.user-btn {
  padding: 0;
}
.user-drop-down {
  display: none;
}
.user-drop-down::before {
  content: '';
  top: -15px;
  left: 50px;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #ff0084;
}
.fa-solid {
  margin: 0 20px;
  display: flex;
  height: 7vh;
  align-items: center;
}
.fa-user {
  color: #0091dc;
  font-size: 22px;
}
.fa-heart {
  color: #ff0084;
  font-size: 22px;
}
.fa-bag-shopping {
  color: #ff0084;
  font-size: 22px;
  margin: 0;
}
.shopping-cart-container {
  display: flex;
  position: relative;
  align-items: flex-end;
}
.shopping-cart-container .items {
  color: #ff0084;
  margin-bottom: 15px;
  position: absolute;
  font-size: 12px;
  right: 0;
  top: 2px;
}
@media screen and (min-width: 1024px) {
  .logo-name h3 {
    font-size: 12px;
    margin-left: 4px;
  }
  .menu-container li {
    font-size: 12px;
  }
  .drop-down::before {
    left: 55px;
  }
  .category-list:hover .subcategory-drop-down {
    right: 130px;
  }
  .user-drop-down a {
    margin-left: 0px;
    font-size: 12px;
  }
  .user-btn:hover .user-drop-down {
    right: -35px;
  }
  .user-drop-down::before {
    left: 48px;
  }
  .user-name {
    font-size: 12px;
  }
  .fa-user {
    font-size: 16px;
  }
  .fa-heart {
    font-size: 16px;
  }
  .fa-bag-shopping {
    font-size: 16px;
  }
  .fa-solid {
    margin: 0 10px;
  }
  .shopping-cart-container .items {
    top: 12px;
  }
}
@media screen and (min-width: 1440px) {
  .logo-name h3 {
    font-size: 16px;
    margin-left: 4px;
  }
  .menu-container li {
    font-size: 16px;
  }
  .drop-down::before {
    left: 60px;
  }
  .category-list:hover .subcategory-drop-down {
    right: 144px;
  }
  .user-drop-down a {
    font-size: 16px;
  }
  .user-btn:hover .user-drop-down {
    right: -30px;
  }
  .user-drop-down::before {
    left: 52px;
  }
  .user-name {
    font-size: 14px;
  }
  .fa-user {
    font-size: 18px;
  }
  .fa-heart {
    font-size: 18px;
  }
  .fa-bag-shopping {
    font-size: 18px;
  }
  .fa-solid {
    margin: 0 20px;
  }
  .shopping-cart-container .items {
    right: 10px;
    top: 12px;
  }
}
</style>
