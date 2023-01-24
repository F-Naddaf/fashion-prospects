<template>
  <main>
    <form @submit.prevent="handelSubmit" class="edit-product-container">
      <div class="title">
        <h3>Edit Product</h3>
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
              :placeholder="productDetail.title"
              v-model="title"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Price:</h3>
            </label>
            <input
              type="number"
              :placeholder="productDetail.price"
              v-model="price"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>inStock:</h3>
            </label>
            <input
              type="number"
              :placeholder="productDetail.inStock"
              v-model="inStock"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 1: <span>*main</span></h3>
            </label>
            <input
              type="text"
              :placeholder="mainImage"
              v-model="mainImage"
              required
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 2:</h3>
            </label>
            <input type="text" :placeholder="image1" v-model="image1" />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 3:</h3>
            </label>
            <input type="text" :placeholder="image2" v-model="image2" />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 4:</h3>
            </label>
            <input type="text" :placeholder="image3" v-model="image3" />
          </div>
          <div class="input-field">
            <label>
              <h3>Image 5:</h3>
            </label>
            <input type="text" :placeholder="image4" v-model="image4" />
          </div>
        </section>
        <section class="right-container">
          <div class="input-field">
            <label>
              <h3>Details:</h3>
            </label>
            <textarea
              rows="3"
              :placeholder="details"
              v-model="details"
            ></textarea>
          </div>
          <div class="input-field">
            <label>
              <h3>Maintenance:</h3>
            </label>
            <textarea
              rows="2"
              :placeholder="maintenance"
              v-model="maintenance"
            ></textarea>
          </div>
          <div class="input-field">
            <label>
              <h3>Composition:</h3>
            </label>
            <input
              type="text"
              :placeholder="composition"
              v-model="composition"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Sizes:</h3>
            </label>
            <input
              type="text"
              :placeholder="productDetail.size"
              v-model="size"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>colors:</h3>
            </label>
            <input
              type="text"
              :placeholder="productDetail.color"
              v-model="color"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Brand:</h3>
            </label>
            <input
              type="text"
              :placeholder="productDetail.brand"
              v-model="brand"
            />
          </div>
          <div class="input-field">
            <label>
              <h3>Rate:</h3>
            </label>
            <input
              type="text"
              :placeholder="productDetail.rate"
              v-model="rate"
            />
          </div>
        </section>
      </div>
      <div class="btns">
        <router-link
          :to="`/${productDetail?.subCategory?.categoryTitle}/${productDetail?.subCategory?.title}/${productId}`"
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
  name: 'EditProduct',
  props: ['close'],
  data() {
    return {
      error: '',
      success: '',
      productId: '',
      title: '',
      price: '',
      inStock: '',
      size: '',
      color: '',
      brand: '',
      rate: '',
      productDetail: '',
      subCategoryTitle: '',
      subCategoryId: '',
      mainImage: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      details: '',
      maintenance: '',
      composition: '',
      product: {
        title: this.productDetail?.title,
        price: this.productDetail?.price,
        inStock: this.productDetail?.inStock,
        size: this.productDetail?.size,
        color: this.productDetail?.color,
        brand: this.productDetail?.brand,
        rate: this.productDetail?.rate,
        images: this.productDetail?.images,
      },
    };
  },
  async mounted() {
    this.productId = this.$route.params.productId;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/product_detail/${this.productId}`,
      );
      const res = await response.json();
      this.productDetail = res.result;
      this.subCategoryTitle = res.result.subCategory.title;
      this.subCategoryId = res.result.subCategory._id;
      this.title = res.result.title;
      this.price = res.result.price;
      this.inStock = res.result.inStock;
      this.size = res.result.size;
      this.color = res.result.color;
      this.brand = res.result.brand;
      this.rate = res.result.rate;
      this.details = res.result.description?.details;
      this.maintenance = res.result.description?.maintenance;
      this.composition = res.result.description?.composition;
      this.mainImage = res.result.images[0];
      this.image1 = res.result.images[1];
      this.image2 = res.result.images[2];
      this.image3 = res.result.images[3];
      this.image4 = res.result.images[4];
    } catch (error) {
      this.error = error.msg;
    }
  },
  methods: {
    async handelSubmit() {
      const updatedProduct = {
        title: this.title === '' ? this.productDetail?.title : this.title,
        price:
          this.price === '' || this.product?.price <= 0
            ? this.productDetail?.price
            : this.price,
        inStock:
          this.inStock === '' ? this.productDetail?.inStock : this.inStock,
        size: this.size === '' ? this.productDetail?.size : this.size,
        color: this.color === '' ? this.productDetail?.color : this.color,
        brand: this.brand === '' ? this.productDetail?.brand : this.brand,
        rate: this.rate === '' ? this.productDetail?.rate : this.rate,
        description: {
          details:
            this.details === ''
              ? this.productDetail?.description?.details
              : this.details,
          maintenance:
            this.maintenance === ''
              ? this.productDetail?.description?.maintenance
              : this.maintenance,
          composition:
            this.composition === ''
              ? this.productDetail?.description?.composition
              : this.composition,
        },
        images: [
          this.mainImage ? this.mainImage : this.productDetail?.images[0],
          this.image1 ? this.image1 : this.productDetail?.images[1],
          this.image2 ? this.image2 : this.productDetail?.images[2],
          this.image3 ? this.image3 : this.productDetail?.images[3],
          this.image4 ? this.image4 : this.productDetail?.images[4],
        ],
      };
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/update/${this.productId}`,
          {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
          },
        );
        const res = await response.json();
        if (res.success) {
          this.success = 'You have updated the product successfully';
          setTimeout(() => {
            this.$router.push(
              `/${this.productDetail.subCategory.categoryTitle}/${this.productDetail.subCategory.title}/${this.productId}`,
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
  margin: auto;
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
</style>
