<template>
  <div class="hero-container">
    <div class="slogan">
      <h3>Dress like you're already famous</h3>
      <p>
        Fashion is a form of self-expression and autonomy at a particular period
        and place and in a specific context.
      </p>
      <router-link to="/About">Explore Now</router-link>
    </div>
    <img alt="banner-image" src="../assets/Banner-image.png">
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
};
</script>

<style scoped>
.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80vh;
  width: 100%;
  background: radial-gradient(#fff, #ffcbe6);
}
.slogan {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 35%;
}
.slogan h3 {
  font-size: 30px;
  margin-bottom: 5px;
  text-align: justify;
  color: #01689c;
}
.slogan p {
  text-align: start;
  color: black;
  font-size: 14px;
}
.hero-container a {
  text-decoration: none;
  background-color: #ff0084;
  font-size: 16px;
  margin-top: 30px;
  font-weight: 700;
  color: white;
  padding: 6px 15px;
  border-radius: 50px;
}
.hero-container a:hover {
  background-color: #911053;
}
img {
  height: 75%;
  filter: drop-shadow(2px 5px 8px);
}
</style>
