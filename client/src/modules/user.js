import { reactive } from 'vue';

const state = reactive({
  error: null,
  userInfo: null,
});
const methods = {
  async load() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const userResponse = await fetch(
          'https://fashion-server.onrender.com//api/users',
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await userResponse.json();
        state.userInfo = result.user;
      } catch (error) {
        state.error = error.msg;
      }
    }
  },
  logout() {
    state.userInfo = null;
    localStorage.clear();
  },
  login(data) {
    state.userInfo = data;
  },
  updateUser(data) {
    state.userInfo = data;
  },
};
export default {
  state,
  methods,
};
