<template>
  <div class="edit-delete-container">
    <p class="error">{{ error }}</p>
    <p class="success">{{ success }}</p>
    <div v-if="store.state.userInfo?.isAdmin" class="btns-container">
      <button @click="openEdit" class="edit-product btn">Edit</button>
      <button @click="deleteProduct" class="delete-product btn">Delete</button>
      <EditProduct v-if="open" @close="close" :close="close" />
    </div>
  </div>
</template>

<script>
import { onMounted, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import EditProduct from './EditProduct.vue';

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
        setTimeout(() => {
          goBack();
        }, 2000);
        if (res.success) {
          success.value = res.msg;
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
  components: { EditProduct },
};
</script>

<style scoped>
.edit-delete-container {
  display: flex;
  flex-direction: column;
  width: 20%;
}
.error {
  color: red;
}
.success {
  color: green;
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
  width: 30%;
  margin-bottom: 10px;
  border: none;
  color: #f3f5f6;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}
.edit-product {
  background-color: green;
}
.delete-product {
  background-color: red;
}
</style>
