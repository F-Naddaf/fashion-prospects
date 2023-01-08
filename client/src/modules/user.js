import { reactive, toRefs } from 'vue';

export default function useUser() {
  const state = reactive({
    error: null,
    userInfo: null,
  });

  const load = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const userResponse = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await userResponse.json();
        state.userInfo = result.user;
      } catch (error) {
        state.error = error.msg;
      }
    }
  };
  const logout = () => {
    state.userInfo = null;
    localStorage.clear();
  };
  const login = (data) => {
    state.userInfo = data;
  };
  return { ...toRefs(state), load, logout, login };
}
