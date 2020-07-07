<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#a19a97"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-menu-item index="/public">Home</el-menu-item>
    <el-menu-item index="/personal">Personal Workspace</el-menu-item>
    <el-menu-item v-show="!this.$store.getters.LOGIN" index="/login">Login</el-menu-item>
    <el-menu-item v-show="!this.$store.getters.LOGIN" index="/Register">Register</el-menu-item>
    <el-menu-item v-show="this.$store.getters.LOGIN" index="/" @click="logout">Logout</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu",

  methods: {
    logout() {
      this.$store.commit("clear");
    }
  }
};
</script>



