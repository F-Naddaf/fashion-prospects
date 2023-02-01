<template>
  <section class="latest-products">
    <div class="title">
      <h3>Latest Products</h3>
      <span></span>
    </div>
    <div v-if="isLoading"><LoadingSpinner /></div>
    <h3 class="error" v-if="error.status">
      {{ error.msg }}
    </h3>
    <div class="latest-products-container">
      <carousel
        @next="next"
        @prev="prev"
        :visibleSlide="visibleSlide"
        :latestProducts="latestProducts"
      >
        <carousel-slide
          v-for="(product, index) in latestProducts"
          :key="product.id"
          :index="index"
          :visibleSlide="visibleSlide"
          class="carousel-slider"
        >
          <router-link
            :to="`/${product.subCategory.categoryTitle}/${product.subCategory.title}/${product._id}`"
          >
            <ProductCard :product="product" />
          </router-link>
        </carousel-slide>
      </carousel>
    </div>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
import ProductCard from './ProductCard.vue';
import Carousel from '@/components/Carousel.vue';
import CarouselSlide from '@/components/CarouselSlide.vue';

export default {
  name: 'LatestProducts',
  data() {
    return {
      latestProducts: [],
      visibleSlide: [0, 1, 2, 3, 4],
      isLoading: false,
      error: { status: false, msg: '' },
    };
  },
  computed: {
    productLength() {
      return this.latestProducts.length;
    },
  },
  methods: {
    next() {
      if (
        this.visibleSlide[this.visibleSlide.length - 1] >=
        this.productLength - 1
      ) {
        return;
      } else {
        const newValue = this.visibleSlide[this.visibleSlide.length - 1] + 1;
        const newArray = this.visibleSlide.slice(1);
        newArray.push(newValue);
        this.visibleSlide = newArray;
      }
    },
    prev() {
      if (this.visibleSlide[0] > 0) {
        const newValue = this.visibleSlide[this.visibleSlide.length - 1] - 5;
        const newArray = this.visibleSlide.slice(0, 4);
        newArray.unshift(newValue);
        this.visibleSlide = newArray;
      } else {
        return;
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    try {
      const result = await fetch(
        'https://fashion-server.onrender.com/api/products',
      );
      const res = await result.json();
      const topEightProducts = res.result.slice(0, 10);
      this.latestProducts = topEightProducts;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.error = { status: true, msg: 'Oops something went wrong!' };
    }
  },
  components: {
    ProductCard,
    LoadingSpinner,
    Carousel,
    CarouselSlide,
  },
};
</script>

<style scoped>
.latest-products {
  margin-bottom: 40px;
}
.error {
  display: flex;
  flex-direction: column;
  color: #ff0084;
  font-weight: 700;
  font-size: 22px;
  padding: 10px;
  align-self: center;
}
.error span {
  color: #ff0084;
}
.latest-products-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(0, 0, 0, 0.04);
  height: 420px;
}
.featured-products {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5% 0;
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
.carousel-slider {
  display: flex;
  margin: 20px 0;
  border: 2px solid white;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  flex-direction: column;
  align-items: center;
}
.carousel-slider a {
  text-decoration: none;
}
.carousel-slider:hover {
  transform: scale(1.02);
}
.left-enter-active {
  animation: leftInAnimation 0.5s ease-in;
}
.carousel {
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 400px;
  align-items: center;
}
@media screen and (min-width: 1024px) {
  .latest-products-container {
    width: 100vw;
    overflow: hidden;
    justify-content: flex-start;
  }
  .carousel {
    width: 100%;
    justify-content: space-between;
  }
  .carousel-slider {
    margin: 20px 20px;
  }
  .btn {
    margin: 5px 10px;
    color: rgb(238 121 179);
  }
}
@media screen and (min-width: 1440px) {
  .latest-products-container {
    width: 100vw;
    overflow: hidden;
    justify-content: flex-start;
  }
  .carousel {
    width: 100%;
    justify-content: space-between;
  }
  .carousel-slider {
    margin: 20px 20px;
  }
  .btn {
    margin: 5px 10px;
    color: rgb(238 121 179);
  }
}
</style>
