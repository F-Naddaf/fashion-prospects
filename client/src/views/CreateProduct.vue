<template>
  <main>
    <form @submit.prevent="handelSubmit" class="edit-product-container">
      <div class="title">
        <h3>Create New Product</h3>
        <span></span>
      </div>
      <div :class="`${error ? 'error' : 'hidden'}`">
        <p>{{ this.error }}</p>
      </div>
      <div :class="`${success ? 'success' : 'hidden'}`">
        <p>{{ this.success }}</p>
      </div>
      <div class="main-container">
        <section class="left-container">
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
              <h3>Price:</h3>
            </label>
            <input
              type="number"
              placeholder="Add a price by Euro"
              v-model="product.price"
              required
            />
          </div>
          <div class="input-field">
            <label>
              <h3>inStock:</h3>
            </label>
            <input
              type="number"
              placeholder="Enter an available quantity "
              v-model="product.inStock"
              required
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 1: <span>*main</span></h3>
            </label>
            <input
              type="text"
              placeholder="Add the image URL: https://www.image.jpg"
              v-model="product.mainImage"
              required
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 2:</h3>
            </label>
            <input
              type="text"
              placeholder="Add the image URL: https://www.image.jpg"
              v-model="product.image1"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 3:</h3>
            </label>
            <input
              type="text"
              placeholder="Add the image URL: https://www.image.jpg"
              v-model="product.image2"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 4:</h3>
            </label>
            <input
              type="text"
              placeholder="Add the image URL: https://www.image.jpg"
              v-model="product.image3"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 5:</h3>
            </label>
            <input
              type="text"
              placeholder="Add the image URL: https://www.image.jpg"
              v-model="product.image4"
            />
          </div>
        </section>
        <section class="right-container">
          <div class="input-field">
            <label>
              <h3>Details:</h3>
            </label>
            <textarea
              rows="3"
              placeholder="Enter the product Details"
              v-model="product.details"
            ></textarea>
          </div>
          <div class="input-field">
            <label>
              <h3>Maintenance:</h3>
            </label>
            <textarea
              rows="2"
              placeholder="Add the product Maintenance"
              v-model="product.maintenance"
            ></textarea>
          </div>
          <div class="input-field">
            <label>
              <h3>Composition:</h3>
            </label>
            <input
              type="text"
              placeholder="Add the product Composition"
              v-model="product.composition"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Sizes:</h3>
            </label>
            <input
              type="text"
              placeholder="Enter the available sizes"
              v-model="product.size"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>colors:</h3>
            </label>
            <input
              type="text"
              placeholder="Add the product available colors"
              v-model="product.color"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Brand:</h3>
            </label>
            <input
              type="text"
              placeholder="What is the product brand?"
              v-model="product.brand"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Rate:</h3>
            </label>
            <input
              type="text"
              placeholder="Fill up the product rate"
              v-model="product.rate"
            />
          </div>
        </section>
      </div>
      <div class="btns">
        <router-link
          :to="`/category/${category}/${subCategoryTitle}/${subCategoryId}`"
        >
          <button type="button" class="close">Cancel</button>
        </router-link>
        <button type="submit" class="submit">Submit</button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: 'CreateProduct',
  props: ['close'],
  data() {
    return {
      error: '',
      success: '',
      category: this.$route.params.category,
      subCategoryTitle: this.$route.params.item,
      subCategoryId: this.$route.params.id,
      product: {
        title: '',
        price: '',
        inStock: '',
        size: '',
        color: '',
        brand: '',
        rate: '',
        details: '',
        maintenance: '',
        composition: '',
        mainImage: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
      },
    };
  },
  methods: {
    async handelSubmit() {
      const CreateProduct = {
        title: this.product.title,
        price: this.product.price,
        inStock: this.product.inStock,
        size: this.product.size,
        color: this.product.color,
        brand: this.product.brand,
        rate: this.product.rate,
        subCategory: this.subCategoryId,
        description: {
          details: this.product.details,
          maintenance: this.product.maintenance,
          composition: this.product.composition,
        },
        images: [
          this.product.mainImage,
          this.product.image1,
          this.product.image2,
          this.product.image3,
          this.product.image4,
        ],
      };
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/create`,
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
            this.$router.push(
              `/category/${this.category}/${this.subCategoryTitle}/${this.subCategoryId}`,
            );
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
  margin: 0 auto 10% auto;
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
  margin: -18px 0 0 0;
  background-color: #ff0084;
}
.hidden {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  transform: translateY(-70px);
  width: 300px;
  height: 60px;
  background-color: white;
  border-bottom: 3px solid red;
}
.error {
  position: absolute;
  top: -70px;
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
  top: -70px;
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
  justify-content: space-between;
  width: 95%;
  margin-top: 40px;
}
.left-container,
.right-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45%;
  height: 400px;
}
.input-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: 100%;
}
label span {
  font-size: 10px;
  color: red;
}
.input-field input,
textarea {
  width: 75%;
}
.input-field h3 {
  display: flex;
  font-size: 16px;
  font-weight: 500;
  color: #01689c;
  margin: 5px 10px;
}
.input-field p {
  font-size: 16px;
  padding-right: 10px;
  font-weight: 600;
}
.input-field input,
textarea {
  padding: 2px;
  color: #ff0084;
}
.btns {
  display: flex;
  width: 95%;
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
  main {
    width: 90%;
  }
  .input-field h3 {
    font-size: 14px;
    margin: 5px 5px;
  }
  .left-container,
  .right-container {
    width: 49%;
  }
}
@media screen and (min-width: 1440px) {
  main {
    width: 80%;
  }
  .input-field h3 {
    font-size: 16px;
    margin: 5px 10px;
  }
  .left-container,
  .right-container {
    width: 45%;
  }
}
</style>
