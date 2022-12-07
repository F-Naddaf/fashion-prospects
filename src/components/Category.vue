<template>
  <main class="category-container">
    <div class="category-title">
      <h3>Categories</h3>
      <span></span>
    </div>
    <div class="category-images">
      <router-link to="/">
        <img alt="banner-image" src="../assets/men-clothing.png" />
      </router-link>
      <router-link to="/">
        <img alt="banner-image" src="../assets/women-clothing.png" />
      </router-link>
      <router-link to="/">
        <img alt="banner-image" src="../assets/jewelery.png" />
      </router-link>
      <router-link to="/">
        <img alt="banner-image" src="../assets/electronics.png" />
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Category',
};
</script>

<style scoped>
.category-container {
  display: flex;
  flex-direction: column;
  margin: 10% 0;
  width: 100%;
}
.category-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}
.category-title h3 {
  font-size: 22px;
  color: rgb(80, 80, 80);
}
.category-title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -15px 0 15px 0;
  background-color: #ff0084;
}
.category-images {
  display: flex;
  justify-content: space-evenly;
}
.category-images a {
  width: 100%;
}
.category-images a:hover {
  transform: translateY(-8px);
}
img {
  width: 70%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
