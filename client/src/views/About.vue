<template>
  <div class="about-container">
    <section class="hero-section">
      <p>Our vision</p>
      <h1>We build bridges</h1>
      <h1>between customers and</h1>
      <h1>online shops.</h1>
    </section>
    <section class="about-team">
      <h1>The Fashion Prospects Leadership Team</h1>
      <div class="team-card-container">
        <div class="team-card">
          <img alt="Fadi-image" src="../assets/Fadi.png" />
          <div class="info-container">
            <h3>Fadi Naddaf</h3>
            <p>Frontend Developer</p>
            <div class="team-links">
              <router-link to="/">
                <i class="fa-brands fa-linkedin"></i>
              </router-link>
              <router-link to="/">
                <i class="fa-brands fa-github"></i>
              </router-link>
            </div>
          </div>
        </div>
        <div class="team-card">
          <img alt="Ibrahim-image" src="../assets/Ibrahim.png" />
          <div class="info-container">
            <h3>Ibrahim Akancay</h3>
            <p>Backend Developer</p>
            <div class="team-links">
              <router-link to="/">
                <i class="fa-brands fa-linkedin"></i>
              </router-link>
              <router-link to="/">
                <i class="fa-brands fa-github"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'About',
  components: {},
};
</script>
<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 100%;
  background: radial-gradient(#fff, #ffcbe6);
}
.hero-section p {
  font-size: 16px;
  font-weight: 700;
  color: rgb(80, 80, 80);
}
.hero-section h1 {
  font-size: 44px;
  width: 50%;
  color: #ff0084;
  margin: 0;
}
.about-team {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about-team h1 {
  margin-top: 20px;
  font-size: 30px;
  color: rgb(80, 80, 80);
}
.team-card-container {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 80px;
}
.team-card {
  display: flex;
  width: 40%;
  background-color: white;
  /* border: 1px solid rgb(80, 80, 80); */
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 20px;
}
.team-card img {
  width: 40%;
  border-radius: 20px;
}
.info-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 30px;
}
.info-container h3 {
  color: #01689c;
  font-size: 22px;
  margin-bottom: 0;
}
.info-container p {
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
}
.team-links {
  margin-top: 10px;
}
.team-links a {
  width: 20px;
  font-size: 18px;
  margin-right: 25px;
  color: rgb(80, 80, 80);
  color: #01689c;
  color: black;
}
</style>
