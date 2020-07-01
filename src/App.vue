<template>
  <div id="app">
    <ToDoList userName="Alex"/>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import ToDoList from "./components/ToDoList.vue";
export default {
  name: "app",
  components: {
    ToDoList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: darkgray;
  margin-top: 60px;
}
</style>
