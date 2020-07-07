<template>
  <el-container>
    <el-header>
      <h1>Public Todo List</h1>
    </el-header>
    <el-main>
      <h3>Everyone can add an item on this list!</h3>
      <div class="center">
        <ToDoTable/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ToDoTable from "./ToDoTable.vue";
export default {
  name: "ToDoList",
  components: {
    ToDoTable
  },
  props: {
    userName: String
  }
};
</script>

<style>
.center {
  margin: 0 auto;
  width: 70%;
}
</style>
