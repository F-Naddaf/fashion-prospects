<template>
  <div class="edit-delete-container">
    <div :class="`${error ? 'error' : 'hidden'}`">
      <p>{{ this.error }}</p>
    </div>
    <div :class="`${success ? 'success' : 'hidden'}`">
      <p>{{ this.success }}</p>
    </div>
    <div v-if="store.state.userInfo?.isAdmin" class="btns-container">
      <router-link :to="`/edit/${productId}`">
        <button class="edit-product btn">Edit</button>
      </router-link>
      <button @click="deleteProduct" class="delete-product btn">Delete</button>
    </div>
  </div>
</template>

<script>
import { onMounted, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'EditAndDeleteProduct',
  props: ['productId', 'category', 'subCategoryTitle', 'subCategoryId'],
  setup(props) {
    const router = useRouter();
    const store = inject('store');
    const success = ref('');
    const error = ref('');
    const open = ref(false);
    onMounted(() => {
      store.methods.load();
    });
    function close() {
      open.value = false;
    }
    function openEdit() {
      open.value = true;
    }
    function goBack() {
      router.push({
        path: `/category/${props.category}/${props.subCategoryTitle}/${props.subCategoryId}`,
      });
    }
    async function deleteProduct() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/delete/${props.productId}`,
          {
            method: 'DELETE',
            body: JSON.stringify(props.productId),
          },
        );
        const res = await response.json();
        if (res.success) {
          success.value = res.msg;
          setTimeout(() => {
            goBack();
          }, 3000);
        } else {
          error.value = res.msg;
        }
        store.commit('removeProduct', props.productId);
      } catch (error) {
        error.value = error.msg;
      }
    }
    return {
      deleteProduct,
      success,
      error,
      open,
      close,
      openEdit,
      store,
    };
  },
};
</script>

<style scoped>
.edit-delete-container {
  display: flex;
  flex-direction: column;
  width: 20%;
}
.hidden {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 50%;
  transform: translateY(-70px);
  transform: translateX(50%);
  width: 300px;
  height: 60px;
  background-color: white;
  border-bottom: 3px solid red;
}
.error {
  position: absolute;
  top: 80px;
  right: 50%;
  transform: translateY(80px);
  transform: translateX(50%);
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
  top: 80px;
  right: 50%;
  transform: translateY(80px);
  transform: translateX(50%);
  width: 300px;
  height: 60px;
  transition: 1s;
  font-size: 14px;
  color: red;
  background-color: white;
  border-bottom: 3px solid red;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.edit-delete-container p {
  font-size: 14px;
}
.btns-container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.btn {
  display: flex;
  width: 95%;
  justify-content: flex-end;
  align-self: flex-end;
}
a {
  text-decoration: none;
  width: 30%;
}
.edit-product {
  padding: 5px 30px;
  border: none;
  background-color: green;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  cursor: pointer;
}
.edit-product:hover {
  background-color: rgb(0, 102, 0);
}
.delete-product {
  display: flex;
  padding: 5px 30px;
  border: none;
  background-color: red;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  width: 30%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
.delete-product:hover {
  background-color: rgb(180, 0, 0);
}
</style>
