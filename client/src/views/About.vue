<template>
  <div class="about-container">
    <section class="hero-section">
      <h1>Shop the Latest Styles with Us,</h1>
      <h1>Your Go-To Destination for</h1>
      <h1>Fashion and Accessories</h1>
    </section>
    <section class="about-team">
      <h3>About Us</h3>
      <span></span>
      <p>
        "Welcome to Product Prospects, your one-stop destination for all your
        fashion needs. We understand the importance of looking and feeling your
        best, which is why we strive to provide you with the latest and greatest
        in clothing and accessories. From everyday essentials to statement
        pieces, our curated collection has something for everyone. Our team is
        dedicated to providing excellent customer service and ensuring that your
        shopping experience is seamless and enjoyable. Thank you for choosing
        Product Prospects for all your fashion needs. Happy shopping!"
      </p>
    </section>
  </div>
</template>
<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'About',
};
</script>
<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 100%;
  background: radial-gradient(#fff, #ffcbe6);
}
.hero-section h1 {
  font-size: 30px;
  width: 50%;
  color: #ff0084;
  margin: 0;
}
.about-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  width: 50%;
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
</style>
