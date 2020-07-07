<template>
  <div>
    <h3 v-if="!this.$store.getters.LOGIN">Please login to access your personal Todo List</h3>
    <el-container v-if="this.$store.getters.LOGIN">
      <el-header>
        <h1>Todo List of {{this.$store.getters.USERNAME}}</h1>
      </el-header>
      <el-main>
        <h3>This is your own Todo list! Only you can edit it!</h3>
        <div class="center">
          <UserTodoTable/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserTodoTable from "./UserTodoTable.vue";
export default {
  name: "UserTodoList",
  data() {
    return {
      username: "",
      auth: false
    };
  },
  components: {
    UserTodoTable
  },
  mounted() {
    this.auth = localStorage.auth_token;
  }
};
</script>

<style>
.center {
  margin: 0 auto;
  width: 70%;
}
</style>
