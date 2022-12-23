<template>
  <div>
    <div v-if="userInfo">
      <div v-for="product in userInfo.favorites" :key="product">
        {{ product }}
      </div>
    </div>
  </div>
</template>

<script>
import useUser from '../modules/user';
import { onMounted } from 'vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Favorite',
  setup() {
    const { userInfo, load } = useUser();

    onMounted(() => {
      load();
    });

    return {
      userInfo,
    };
  },
  components: {
  },
};
</script>

<style scoped>
div {
  display: block;
}
</style>
