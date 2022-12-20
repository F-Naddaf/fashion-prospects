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
          <ProductCard :product="product" />
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
      visibleSlide: [0, 1, 2, 3],
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
        const newValue = this.visibleSlide[this.visibleSlide.length - 1] - 4;
        const newArray = this.visibleSlide.slice(0, 3);
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
      const result = await fetch('https://fakestoreapi.com/products');
      const res = await result.json();
      const productsQuantity = res.filter((rate) => rate.rating);
      const sortProductQuantity = productsQuantity.sort((a, b) => {
        return b.rating.count - a.rating.count;
      });
      const topEightProducts = sortProductQuantity.slice(0, 8);
      const latestEightProducts = topEightProducts.map((product) => {
        return {
          id: product.id,
          category: product.category.split(' ').join(''),
          title: product.title.slice(0, 35),
          image: product.image,
          price: product.price,
          rate: Math.ceil(product.rating.rate),
          quantity: product.rating.count,
        };
      });
      this.latestProducts = latestEightProducts;
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
  position: relative;
  background-color: rgba(0, 0, 0, 0.05);
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
  width: 16%;
  height: 300px;
  margin: 2%;
  padding: 1%;
  background: white;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
}
.left-enter-active {
  animation: leftInAnimation 0.5s ease-in;
}
.carousel {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
