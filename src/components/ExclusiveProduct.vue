<template>
  <section>
    <div class="title">
      <h3>Exclusive Product</h3>
      <span></span>
    </div>
    <div class="exc-product-container">
      <aside class="exc-product-image">
        <img alt="banner-image" src="../assets/smart-watch.png" />
      </aside>
      <aside class="exc-product-title">
        <p class="title">Exclusively Available on Fashion Prospects</p>
        <h1>Smart Band 4</h1>
        <p class="description">
          This Mi Smart Band 4 features a 39.9% larger (than Mi Band 3) AMOLED
          color full-touch display with adjustable brightness, so everything is
          clear as can be.
        </p>
        <router-link to="/About">Buy Now</router-link>
      </aside>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ExclusiveProduct',
};
</script>

<style scoped>
section {
  margin-top: 8%;
  margin-bottom: 8%;
}
.exc-product-container {
  display: flex;

  align-items: center;
  justify-content: space-around;
  height: 50vh;
  width: 100%;
  background: radial-gradient(#fff, #ffcbe6);
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}
.title h3 {
  font-size: 22px;
  color: #01689c;
}
.title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 15px 0;
  background-color: #ff0084;
}
aside {
  width: 50%;
}
.exc-product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
img {
  height: 80%;
}
.exc-product-title {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.exc-product-title .title {
  font-size: 18px;
  font-weight: 500;
  margin-top: 15%;
  color: rgb(80, 80, 80);
}
.exc-product-title h1 {
  font-size: 30px;
  margin: 0;
  color: #01689c;
}
.exc-product-title .description {
  font-size: 14px;
  text-align: justify;
  width: 60%;
  color: rgb(80, 80, 80);
}
.exc-product-title a {
  text-decoration: none;
  background-color: #ff0084;
  font-size: 16px;
  margin-top: 30px;
  font-weight: 700;
  color: white;
  padding: 6px 15px;
  border-radius: 50px;
}
.exc-product-title a:hover {
  background-color: #911053;
}
</style>
