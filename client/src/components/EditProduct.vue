<template>
  <main>
    <form @submit.prevent="handelSubmit" class="edit-profile-container">
      <i @click="$emit('close')" class="fa-solid fa-circle-xmark"></i>
      <div class="title">
        <h3>Edit Product</h3>
        <span></span>
      </div>
      <p v-show="error" class="error-message">{{ this.error }}</p>
      <p v-show="success" class="success-message">{{ this.success }}</p>
      <div class="input-container">
        <div class="input-field">
          <label>
            <h3>Title:</h3>
          </label>
          <input
            type="text"
            :placeholder="productDetail.title"
            v-model="product.title"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Price:</h3>
          </label>
          <input
            type="number"
            :placeholder="productDetail.price"
            v-model="product.price"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Details:</h3>
          </label>
          <input
            type="text"
            :placeholder="productDetail?.description?.details"
            v-model="details"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Maintenance:</h3>
          </label>
          <input
            type="text"
            :placeholder="productDetail?.description?.maintenance"
            v-model="maintenance"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Composition:</h3>
          </label>
          <input
            type="text"
            :placeholder="productDetail?.description?.composition"
            v-model="composition"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>inStock:</h3>
          </label>
          <input
            type="number"
            :placeholder="productDetail.inStock"
            v-model="product.inStock"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Sizes:</h3>
          </label>
          <input
            type="text"
            :placeholder="productDetail.size"
            v-model="product.size"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>colors:</h3>
          </label>
          <input
            type="text"
            :placeholder="productDetail.color"
            v-model="product.color"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>SubCategory:</h3>
          </label>
          <input
            type="text"
            :placeholder="subCategoryId"
            v-model="product.subCategory"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Brand:</h3>
          </label>
          <input
            type="text"
            :placeholder="productDetail.brand"
            v-model="product.brand"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Rate:</h3>
          </label>
          <input
            type="number"
            :placeholder="productDetail.rate"
            v-model="product.rate"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Images:</h3>
          </label>
          <h3>{{ subCategoryTitle }}</h3>
          <input
            type="text"
            :placeholder="productDetail.subCategory"
            v-model="product.subCategory"
          />
        </div>
      </div>
      <div class="btns">
        <button type="button" @click="$emit('close')" class="close">
          Cancel
        </button>
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
      productDetail: '',
      subCategoryTitle: '',
      subCategoryId: '',
      details: this.productDetail?.description?.details,
      maintenance: this.productDetail?.description?.maintenance,
      composition: this.productDetail?.description?.composition,
      product: {
        title: this.productDetail?.title,
        price: this.productDetail?.price,
        inStock: this.productDetail?.inStock,
        size: this.productDetail?.size,
        color: this.productDetail?.color,
        brand: this.productDetail?.brand,
        rate: this.productDetail?.rate,
      },
    };
  },
  async mounted() {
    this.productId = this.$route.params.id;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/product_detail/${this.productId}`,
      );
      const res = await response.json();
      this.productDetail = res.result;
      this.subCategoryTitle = res.result.subCategory.title;
      this.subCategoryId = res.result.subCategory._id;
      console.log(res.result);
    } catch (error) {
      this.error = error.msg;
    }
  },
  methods: {
    async handelSubmit() {
      console.log('hello', this.product);
      const updatedProduct = {
        title: this.product?.title,
        price: this.product?.price,
        inStock: this.product?.inStock,
        size: this.product?.size,
        color: this.product?.color,
        brand: this.product?.brand,
        rate: this.product?.rate,
        description: {
          details: this.details
            ? this.details
            : this.productDetail?.description?.details,
          maintenance: this.maintenance
            ? this.maintenance
            : this.productDetail?.description?.maintenance,
          composition: this.composition
            ? this.composition
            : this.productDetail?.description?.composition,
        },
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
        console.log('after', this.product);
        const res = await response.json();
        console.log(res);
        if (res.success) {
          this.success = 'You have updated the product successfully';
          this.close();
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
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
}

.edit-profile-container {
  position: relative;
  width: 80%;
  height: 80%;
  z-index: 20;
  background-color: white;
  border-radius: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.fa-circle-xmark {
  position: absolute;
  top: 7px;
  right: 7px;
  font-size: 25px;
  color: #ff0084;
  cursor: pointer;
}

.fa-circle-xmark:hover {
  color: #911053;
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
.error-message {
  position: absolute;
  top: 130px;
  width: 100%;
  padding: 0;
  font-size: 14px;
  color: red;
}
.success-message {
  position: absolute;
  top: 130px;
  width: 100%;
  padding: 0;
  font-size: 14px;
  color: green;
}

.input-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 40px;
}

.input-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: 100%;
}
.input-field input {
  width: 75%;
}

.input-field h3 {
  font-size: 16px;
  padding-right: 10px;
  font-weight: 500;
  color: #01689c;
  margin: 5px 10px;
}

.input-field p {
  font-size: 16px;
  padding-right: 10px;
  font-weight: 600;
}

.input-field input {
  padding: 2px;
  color: #ff0084;
}

.btns {
  display: flex;
  width: 75%;
  justify-content: space-between;
  align-self: flex-end;
  margin: 30px auto 0 auto;
}

.close {
  padding: 5px 30px;
  border: 1px solid #ff0084;
  background: none;
  border-radius: 8px;
  font-weight: 600;
  color: #ff0084;
  cursor: pointer;
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
  padding: 5px 30px;
  border: 1px solid #ff0084;
  background-color: #ff0084;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  cursor: pointer;
}
</style>
