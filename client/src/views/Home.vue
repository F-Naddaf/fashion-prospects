<template>
  <HeroSection />
  <category />
  <FeaturedProducts />
  <LatestProducts />
  <ExclusiveProduct />
</template>

<script>
// @ is an alias to /src
import HeroSection from '@/components/HeroSection.vue';
import Category from '@/components/Category.vue';
import FeaturedProducts from '@/components/FeaturedProducts.vue';
import LatestProducts from '@/components/LatestProducts.vue';
import ExclusiveProduct from '@/components/ExclusiveProduct.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    HeroSection,
    Category,
    FeaturedProducts,
    LatestProducts,
    ExclusiveProduct,
  },
};
</script>
