<template>
  <main>
    <form @submit.prevent="handelSubmit" class="edit-profile-container">
      <i @click="close" class="fa-solid fa-circle-xmark"></i>
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
          <label><h3>Email:</h3></label>
          <p>{{ userInfo?.email }}</p>
        </div>
        <div class="input-field">
          <label><h3>User Name:</h3></label>
          <input
            type="text"
            :placeholder="
              userInfo && userInfo?.userName ? userInfo?.userName : 'User Name'
            "
            v-model="user.userName"
          />
        </div>
        <div class="input-field">
          <label><h3>First Name:</h3></label>
          <input
            type="text"
            :placeholder="
              userInfo && userInfo?.fullName?.first
                ? userInfo?.fullName?.first
                : 'First Name'
            "
            v-model="user.fullName.first"
          />
        </div>
        <div class="input-field">
          <label><h3>Last Name:</h3></label>
          <input
            type="text"
            :placeholder="
              userInfo && userInfo?.fullName?.last
                ? userInfo?.fullName?.last
                : 'Last Name'
            "
            v-model="user.fullName.last"
          />
        </div>
        <div class="input-field">
          <label><h3>Phone Number:</h3></label>
          <input
            type="text"
            :placeholder="
              userInfo && userInfo?.phone ? userInfo?.phone : 'Phone Number'
            "
            v-model="user.phone"
          />
        </div>
        <div class="input-field">
          <label><h3>Address:</h3></label>
          <input
            type="text"
            :placeholder="
              userInfo && userInfo?.address
                ? userInfo?.address
                : 'Street name and number'
            "
            v-model="user.address"
          />
        </div>
        <div class="input-field">
          <label><h3>PostCode:</h3></label>
          <input
            type="text"
            :placeholder="
              userInfo && userInfo?.postCode
                ? userInfo?.postCode
                : 'PostCode, City'
            "
            v-model="user.postCode"
          />
        </div>
      </div>
      <div class="btns">
        <button type="button" @click="close" class="close">Cancel</button>
        <button type="submit" class="submit">Submit</button>
      </div>
    </form>
  </main>
</template>

<script>
import useUser from '../modules/user';
import { onMounted } from 'vue';

export default {
  name: 'EditProfile',
  data() {
    return {
      errors: [],
      success: '',
    };
  },
  setup() {
    const { userInfo, load } = useUser();
    console.log(userInfo);
    onMounted(() => {
      load();
    });
    return {
      user: {
        userName: userInfo?.userName,
        fullName: {
          first: userInfo?.fullName?.first,
          last: userInfo?.fullName?.last,
        },
        phone: userInfo?.phone,
        address: userInfo?.address,
        postCode: userInfo?.postCode,
      },
      userInfo,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async handelSubmit() {
      const token = localStorage.getItem('accessToken');
      this.errors = [];

      try {
        if (!this.validateEditForm()) {
          console.log('not Validated');
          console.log(this.errors);
          return;
        }
        console.log('validated');
        const userResponse = await fetch('http://localhost:5000/api/users', {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(this.user),
        });
        const result = await userResponse.json();
        console.log('edit-user', result);
        if (result.success) {
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
          this.success = 'You have edit your profile successfully';
        } else {
          this.errors.push(result.msg);
        }
      } catch (error) {
        this.errors.push('Sorry something went wrong');
      }
    },
    validateEditForm() {
      if (this.user.userName) {
        if (!this.validUserName(this.user.userName)) {
          this.errors.push(
            'User name must be at least 5 characters include 1 number, 1 capital character!',
          );
        }
      }
      if (this.user.phone) {
        if (!this.validPhone(this.user.phone)) {
          this.errors.push('Phone number should be contain only Numbers!');
        }
      }
      if (this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    validUserName(userName) {
      const validation = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{5,10}/;
      return validation.test(userName);
    },
    validPhone(phone) {
      const validation = /^\d{10}$/;
      return validation.test(phone);
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
}
.edit-profile-container {
  position: relative;
  width: 50%;
  height: 50%;
  z-index: 20;
  background-color: white;
  border-radius: 20px;
  margin: 150px auto;
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
  top: 80px;
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
  top: 80px;
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
  margin: 30px auto 0 auto;
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
</style>
