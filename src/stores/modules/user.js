export default {
  state: {
    username: "",
    isLoggedin: false,
    _id: null,
    todo: []
  },
  mutations: {
    set(state, data) {
      state.username = data.username;
      state.isLoggedin = true;
      if (!localStorage.auth_token)
        localStorage.setItem("auth_token", data.auth_token);
      state._id = data._id;
      state.todo = data.todo;
    },
    clear(state) {
      state.username = "";
      state.isLoggedin = false;
      localStorage.setItem("auth_token", "");
      state._id = null;
      state.todo = [];
    },
    updateTodo(state, data) {
      state.todo = data;
    }
  },
  getters: {
    USERNAME: state => {
      return state.username;
    },
    ID: state => {
      return state._id;
    },
    TODO: state => {
      return state.todo;
    },
    LOGIN: state => {
      return state.isLoggedin;
    }
  },
  actions: {}
};
