<template>
  <div class="about-container">
    <section class="hero-section">
      <p>Our vision</p>
      <h1>We build bridges</h1>
      <h1>between customers and</h1>
      <h1>online shops.</h1>
    </section>
    <section class="about-team">
      <h3>Leadership Team</h3>
      <span></span>
      <div class="team-card-container">
        <div class="team-card">
          <img alt="Fadi-image" src="../assets/Fadi.png" />
          <div class="info-container">
            <h3>Fadi Naddaf</h3>
            <p>Frontend Developer</p>
            <div class="team-links">
              <a
                href="https://www.linkedin.com/in/fadi-naddaf-a04ba7196/"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://github.com/F-Naddaf" target="_blank">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="team-card">
          <img alt="Ibrahim-image" src="../assets/Ibrahim.png" />
          <div class="info-container">
            <h3>Ibrahim Akancay</h3>
            <p>Backend Developer</p>
            <div class="team-links">
              <a
                href="https://www.linkedin.com/in/ibrahim-akancay-3817b1b2/"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://github.com/iakancay" target="_blank">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Contact',
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
  font-size: 30px;
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
.about-team h3 {
  font-size: 22px;
  color: #01689c;
}
.about-team span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 25px 0;
  background-color: #ff0084;
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
