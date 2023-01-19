<template>
  <main>
    <div class="profile-title">
      <h3>Personal Profile</h3>
      <span></span>
    </div>
    <div class="personal-info-container">
      <div class="image-container">
        <div class="user-icon">
          <i class="fa-solid fa-user"></i>
        </div>
        <button class="edit-image">Upload Image</button>
      </div>
      <div class="form-container">
        <div class="personal-info">
          <h3>User Name:</h3>
          <p>{{ store.state.userInfo?.userName }}</p>
        </div>
        <div class="personal-info">
          <h3>Full Name:</h3>
          <p>
            {{ store.state.userInfo?.fullName?.first }}
            {{ store.state.userInfo?.fullName?.last }}
          </p>
        </div>
        <div class="personal-info">
          <h3>Email:</h3>
          <p>{{ store.state.userInfo?.email }}</p>
        </div>
        <div class="personal-info">
          <h3>Address:</h3>
          <p>{{ store.state.userInfo?.address }}</p>
        </div>
        <div class="personal-info">
          <h3>PostCode:</h3>
          <p>{{ store.state.userInfo?.postCode }}</p>
        </div>
        <div class="personal-info">
          <h3>Phone Number:</h3>
          <p>{{ store.state.userInfo?.phone }}</p>
        </div>
        <button @click="openEdit" class="edit-info">Edit Profile</button>
        <EditProfile v-if="open" @close="close" :close="close" />
      </div>
    </div>
    <div class="visited">
      <VisitedProducts />
    </div>
  </main>
</template>

<script>
import { onMounted, inject, ref } from 'vue';
import EditProfile from '../components/EditProfile.vue';
import VisitedProducts from '@/components/VisitedProducts.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  setup() {
    const store = inject('store');
    const isLoading = ref(false);
    const error = ref(false);
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
    return {
      store,
      isLoading,
      error,
      open,
      close,
      openEdit,
    };
  },
  components: {
    EditProfile,
    VisitedProducts,
  },
};
</script>

<style scoped>
.profile-title h3 {
  font-size: 22px;
  color: #01689c;
}

.profile-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 100px 0;
}

.profile-title span {
  width: 75px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 0 0;
  background-color: #ff0084;
}

.personal-info-container {
  display: flex;
  justify-content: space-around;
  margin: 40px auto;
  width: 90%;
}

.image-container {
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 20%;
}

.user-icon {
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  background-color: #2c3e50;
  border-radius: 100px;
}

.fa-user {
  font-size: 160px;
  align-self: center;
  padding-bottom: 15px;
  color: #f3f5f6;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 20%;
}

.personal-info {
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
}

.personal-info span {
  color: #ff0084;
  padding-right: 10px;
}

.personal-info h3 {
  font-size: 16px;
  padding-right: 10px;
  font-weight: 500;
  color: #01689c;
}

.personal-info p {
  font-size: 16px;
  padding-right: 10px;
}

.edit-info {
  width: 95px;
  text-decoration: underline;
  color: #ff0084;
  border: none;
  background: none;
  cursor: pointer;
  align-self: flex-end;
  font-size: 12px;
  margin: 10px 50px;
  bottom: -20px;
  right: 0;
}

.edit-image {
  position: absolute;
  width: 95px;
  text-decoration: underline;
  color: #ff0084;
  border: none;
  background: none;
  cursor: pointer;
  align-self: flex-end;
  font-size: 12px;
  bottom: 0;
  right: -35px;
}
</style>
