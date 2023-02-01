<template>
  <div class="main">
    <form @submit.prevent="handelSubmit" class="edit-profile-container">
      <i @click="$emit('close')" class="fa-solid fa-circle-xmark"></i>
      <div class="title">
        <h3>Edit Profile</h3>
        <span></span>
      </div>
      <ul class="error-container">
        <li v-for="(error, index) in errors" :key="index" class="error-section">
          {{ error }}
        </li>
      </ul>
      <p v-if="success" class="success-message">{{ this.success }}</p>
      <div class="input-container">
        <div class="input-field">
          <label>
            <h3>Email:</h3>
          </label>
          <p>{{ store.state.userInfo?.email }}</p>
        </div>
        <div class="input-field">
          <label>
            <h3>User Name:</h3>
          </label>
          <input
            type="text"
            :placeholder="
              store.state.userInfo && store.state.userInfo?.userName
                ? store.state.userInfo?.userName
                : 'User Name'
            "
            v-model="user.userName"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>First Name:</h3>
          </label>
          <input
            type="text"
            :placeholder="
              store.state.userInfo && store.state.userInfo?.fullName?.first
                ? store.state.userInfo?.fullName?.first
                : 'First Name'
            "
            v-model="first"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Last Name:</h3>
          </label>
          <input
            type="text"
            :placeholder="
              store.state.userInfo && store.state.userInfo?.fullName?.last
                ? store.state.userInfo?.fullName?.last
                : 'Last Name'
            "
            v-model="last"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Phone Number:</h3>
          </label>
          <input
            type="text"
            :placeholder="
              store.state.userInfo && store.state.userInfo?.phone
                ? store.state.userInfo?.phone
                : 'Phone Number'
            "
            v-model="user.phone"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>Address:</h3>
          </label>
          <input
            type="text"
            :placeholder="
              store.state.userInfo && store.state.userInfo?.address
                ? store.state.userInfo?.address
                : 'Street name and number'
            "
            v-model="user.address"
          />
        </div>
        <div class="input-field">
          <label>
            <h3>PostCode:</h3>
          </label>
          <input
            type="text"
            :placeholder="
              store.state.userInfo && store.state.userInfo?.postCode
                ? store.state.userInfo?.postCode
                : 'PostCode, City'
            "
            v-model="user.postCode"
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
  </div>
</template>

<script>
import { onMounted, inject, ref } from 'vue';

export default {
  name: 'EditProfile',
  props: ['close'],
  setup(props) {
    const store = inject('store');
    const errors = ref([]);
    const success = ref('');
    const user = ref({
      userName: store.state.userInfo?.userName,
      phone: store.state.userInfo?.phone,
      address: store.state.userInfo?.address,
      postCode: store.state.userInfo?.postCode,
    });
    const first = ref(store.state.userInfo?.fullName?.first);
    const last = ref(store.state.userInfo?.fullName?.last);

    onMounted(() => {
      store.methods.load();
    });

    async function handelSubmit() {
      const token = localStorage.getItem('accessToken');
      this.errors.length = 0;
      const firstName = this.first
        ? this.first
        : store.state.userInfo.fullName?.first;
      const lastName = this.last
        ? this.last
        : store.state.userInfo.fullName?.last;
      const requestData = {
        userName: this.user.userName,
        fullName: { first: firstName, last: lastName },
        phone: this.user.phone,
        address: this.user.address,
        postCode: this.user.postCode,
      };
      try {
        if (!validateEditForm()) {
          return;
        }
        const userResponse = await fetch(
          'https://fashion-server.onrender.com//api/users',
          {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
          },
        );
        const res = await userResponse.json();
        if (res.success) {
          success.value = 'You have edit your profile successfully';
          setTimeout(() => {
            props.close();
            store.methods.updateUser(res.result);
          }, 2000);
        } else {
          errors.value.push(res.msg);
        }
      } catch (error) {
        errors.value.push('Sorry something went wrong');
      }
    }
    function validateEditForm() {
      if (user.value.userName) {
        if (!validUserName(user.value.userName)) {
          errors.value.push(
            'User name must be at least 5 characters include 1 number, 1 capital character!',
          );
        }
      }
      if (user.value.phone) {
        if (!validPhone(user.value.phone)) {
          errors.value.push(
            'Phone number should be 10 digit and contains only Numbers!',
          );
        }
      }
      if (errors.value.length > 0) {
        return false;
      } else {
        return true;
      }
    }
    function validUserName(userName) {
      const validation = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{5,10}/;
      return validation.test(userName);
    }
    function validPhone(phone) {
      const validation = /^\d{9}$/;
      return validation.test(phone);
    }
    return {
      handelSubmit,
      errors,
      success,
      user,
      first,
      last,
      store,
    };
  },
};
</script>

<style scoped>
.main {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100vh;
}
.edit-profile-container {
  position: relative;
  width: 50%;
  height: 50%;
  z-index: 20;
  background-color: white;
  border-radius: 20px;
  margin: 100px auto;
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
.error-container {
  position: absolute;
  left: 60px;
  top: 120px;
  width: 100%;
  padding: 0;
}
.error-section {
  font-size: 14px;
  text-align: justify;
  color: red;
  padding-bottom: 10px;
  line-height: 1;
}
.success-message {
  position: absolute;
  top: 120px;
  width: 100%;
  padding: 0;
  font-size: 14px;
  color: green;
}
.input-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 40px;
}
.input-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: 100%;
}
.input-field h3 {
  font-size: 16px;
  padding-right: 10px;
  font-weight: 500;
  color: #01689c;
  margin: 5px 10px;
}
.input-field p {
  display: flex;
  width: 70%;
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
  margin: 30px auto 20px auto;
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
@media screen and (min-width: 1024px) {
  .edit-profile-container {
    width: 65%;
    height: 75%;
  }
  .input-container {
    width: 80%;
  }
  .input-field input {
    width: 70%;
  }
}
@media screen and (min-width: 1440px) {
  .edit-profile-container {
    width: 65%;
    height: 75%;
  }
  .input-container {
    width: 80%;
  }
  .input-field input {
    width: 70%;
  }
}
</style>
