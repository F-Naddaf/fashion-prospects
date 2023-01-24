<template>
  <section>
    <div class="footer-container">
      <aside class="overview-container">
        <p class="title">Overview</p>
        <router-link to="/profile">
          <p>Profile</p>
        </router-link>
        <router-link to="/favorite">
          <p>Favorites</p>
        </router-link>
        <router-link to="/About">
          <p>Order History</p>
        </router-link>
        <router-link to="/shopping">
          <p>Shopping Cart</p>
        </router-link>
      </aside>
      <aside class="logo-container">
        <div class="logo-section">
          <img alt="Vue logo" src="../assets/Logo.png" />
          <div class="logo-name">
            <h3 class="fashion">Fashion</h3>
            <h3><span class="logo-color">Pro</span>spects</h3>
          </div>
        </div>
        <p>
          Our Purpose is To sustainably Make the Pleasure and Benefits of
          Fashion Accessible to the Many.
        </p>
      </aside>
      <aside class="social-container">
        <p class="title">Follow Us</p>
        <router-link to="/About">
          <p>Facebook</p>
        </router-link>
        <router-link to="/About">
          <p>Twitter</p>
        </router-link>
        <router-link to="/About">
          <p>Instagram</p>
        </router-link>
        <router-link to="/About">
          <p>YouTube</p>
        </router-link>
      </aside>
    </div>
    <div class="copyright">
      <p>Copyright ©2022 - Fashion Prospects.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FooterCompo',
};
</script>

<style scoped>
section {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35vh;
  margin-bottom: -220px;
  background-color: black;
}
.footer-container {
  display: flex;
  height: 90%;
  width: 80%;
  margin: auto;
  justify-content: space-around;
  align-items: center;
}
.overview-container {
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
}
.overview-container .title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 20px;
}
.overview-container p {
  color: rgba(255, 255, 255, 0.5);
  margin-top: 40px;
  font-size: 14px;
  margin: 0;
}
.overview-container a {
  margin: 0;
}
.overview-container a p:hover {
  color: #ff0084;
}
a {
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.logo-container {
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
}
.logo-section {
  display: flex;
  margin-left: 20px;
}
.logo-container p {
  color: rgba(255, 255, 255, 0.5);
  margin-top: 40px;
  font-size: 14px;
}
.logo-container h3 {
  font-size: 22px;
}
img {
  height: 100px;
}
.logo-name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: -16px;
  margin-top: 26px;
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
.copyright {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 5px;
}
.copyright p {
  font-size: 12px;
  color: rgb(80, 80, 80);
}
.social-container {
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
}
.social-container .title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 20px;
}
.social-container p {
  color: rgba(255, 255, 255, 0.5);
  margin-top: 40px;
  font-size: 14px;
  margin: 0;
}
.social-container a {
  margin: 0;
}
.social-container a p:hover {
  color: #ff0084;
}
</style>
