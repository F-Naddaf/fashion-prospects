<template>
  <main>
    <form @submit.prevent="handelSubmit" class="edit-product-container">
      <div class="title">
        <h3>Create New SubCategory</h3>
        <span></span>
      </div>
      <div :class="`${error ? 'error' : 'hidden'}`">
        <p>{{ this.error }}</p>
      </div>
      <div :class="`${success ? 'success' : 'hidden'}`">
        <p>{{ this.success }}</p>
      </div>
      <div class="main-container">
        <div class="input-field">
          <label>
            <h3>Title:</h3>
          </label>
          <input
            type="text"
            placeholder="Add the title here"
            v-model="product.title"
            required
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Image: <span>*main</span></h3>
          </label>
          <input
            type="text"
            placeholder="Add the image URL: https://www.image.jpg"
            v-model="product.mainImage"
            required
          />
        </div>
      </div>
      <div class="btns">
        <router-link :to="`/category/${category}/${categoryId}`">
          <button type="button" class="close">Cancel</button>
        </router-link>
        <button type="submit" class="submit">Submit</button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: 'CreateSubCategory',
  props: ['close'],
  data() {
    return {
      error: '',
      success: '',
      category: this.$route.params.category,
      categoryId: this.$route.params.id,
      product: {
        title: '',
        mainImage: '',
      },
    };
  },
  methods: {
    async handelSubmit() {
      const CreateProduct = {
        title: this.product.title,
        image: this.product.mainImage,
        category: this.$route.params.id,
        categoryTitle: this.$route.params.category,
      };
      try {
        const response = await fetch(
          `http://localhost:5000/api/subcategories/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(CreateProduct),
          },
        );
        const res = await response.json();
        if (res.success) {
          this.success = 'You have updated the product successfully';
          setTimeout(() => {
            this.$router.push(`/category/${this.category}/${this.categoryId}`);
          }, 2000);
        } else {
          this.error = res.msg;
        }
      } catch (error) {
        this.error = error.msg;
      }
    },
  },
};
</script>

<style scoped>
main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  height: 80%;
  margin: 20px auto 20% auto;
}
.edit-product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  margin: auto;
}
.title h3 {
  font-size: 22px;
  color: #01689c;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title span {
  width: 75px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 40px 0;
  background-color: #ff0084;
}
.hidden {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  transform: translateY(-90px);
  width: 300px;
  height: 60px;
  background-color: white;
  border-bottom: 3px solid red;
}
.error {
  position: absolute;
  top: -90px;
  right: 0;
  transform: translateY(80px);
  width: 300px;
  height: 60px;
  transition: 1s;
  font-size: 14px;
  color: red;
  background-color: white;
  border-bottom: 3px solid red;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.success {
  position: absolute;
  top: -90px;
  right: 0;
  transform: translateY(80px);
  width: 300px;
  height: 60px;
  transition: 1s;
  font-size: 14px;
  color: green;
  background-color: white;
  border-bottom: 3px solid green;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 95%;
  margin-top: 40px;
}
.input-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: 80%;
}
label span {
  font-size: 10px;
  color: red;
}
.input-field input,
textarea {
  width: 85%;
}
.input-field h3 {
  display: flex;
  font-size: 16px;
  font-weight: 500;
  color: #01689c;
  margin: 5px 10px;
}
.input-field input {
  padding: 2px;
  color: #ff0084;
}
.btns {
  display: flex;
  width: 75%;
  justify-content: flex-end;
  align-self: flex-end;
  margin: 50px auto 0 auto;
}
.close {
  padding: 5px 30px;
  border: 1px solid #01689c;
  background: none;
  border-radius: 8px;
  font-weight: 600;
  margin-right: 30px;
  cursor: pointer;
  color: #01689c;
}
.submit {
  padding: 5px 30px;
  border: none;
  background-color: #ff0084;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  cursor: pointer;
}
.submit:hover {
  background-color: #911053;
}
.close:hover {
  border: 1px solid #01689c;
  background-color: #01689c;
  color: white;
  cursor: pointer;
}
@media screen and (min-width: 1024px) {
  .input-field {
    width: 90%;
  }
  .btns {
    width: 85%;
  }
}
</style>
