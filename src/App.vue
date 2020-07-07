<template>
  <div id="app">
    <NavMenu/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";
export default {
  name: "app",
  components: {
    NavMenu
  },
  mounted() {
    if (localStorage.auth_token && localStorage.auth_token !== "") {
      this.$axios
        .get("/user/auth", { headers: { auth_token: localStorage.auth_token } })
        .then(
          res => {
            this.$store.commit("set", res.data);
          },
          err => {
            this.$toast.open({
              message: err.toString(),
              position: "top-right",
              type: "error"
            });
          }
        );
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-text-fill-color: #24310c;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #a19a97;
  margin-top: 60px;
}
</style>
