<template>
      <div>
        <p v-if="userInfo">
          {{ userInfo.email }}
        </p>
      </div>
</template>

<script>
import useUser from '../modules/user';
import { onMounted } from 'vue';

export default {
  setup() {
    const { userInfo, load } = useUser();

    onMounted(() => {
      load();
    });

    return {
      userInfo,
    };
  },
};
</script>

<style></style>
