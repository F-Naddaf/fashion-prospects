<template>
  <HeroSection />
  <category />
  <FeaturedProducts />
  <LatestProducts />
  <VisitedProducts userInfo="store.state.userInfo" />
  <ExclusiveProduct />
</template>

<script>
// @ is an alias to /src
import HeroSection from '@/components/HeroSection.vue';
import Category from '@/components/Category.vue';
import FeaturedProducts from '@/components/FeaturedProducts.vue';
import LatestProducts from '@/components/LatestProducts.vue';
import ExclusiveProduct from '@/components/ExclusiveProduct.vue';
import VisitedProducts from '@/components/VisitedProducts.vue';

import { onMounted, inject } from 'vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  setup() {

    const store = inject('store');
    onMounted(() => {
      store.methods.load();
    });
    return {
      store,
    };
  },
  components: {
    HeroSection,
    Category,
    FeaturedProducts,
    LatestProducts,
    ExclusiveProduct,
    VisitedProducts,
  },
};
</script>
