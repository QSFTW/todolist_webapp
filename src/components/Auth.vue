<template>
  <div style="padding:20px">
    <el-form
      style="width:600px; margin:auto; border:1px solid; padding:20px;"
      class="el-inner-bg"
      ref="form"
      :model="form"
      label-width="120px"
      form-width="600px"
    >
      <el-form-item
        prop="email"
        label="Email"
        :rules="[
    { required: true, message: 'Please input email address', trigger: 'blur' },
     { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item
        prop="password"
        label="Password"
        :rules="[
    { required: true, message: 'Please input password', trigger: 'blur'},
    ]"
      >
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Log in</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      // TODO: axios backend, get response
      this.$axios
        .post(
          "/user/login",
          this.qs.stringify({
            email: this.form.email,
            password: this.form.password
          })
        )
        .then(
          res => {
            this.$store.commit("set", res.data);
            this.$router.push("/");
            this.$toast.open({
              message: "Login SUCCESS!",
              position: "top-right",
              type: "success"
            });
          },
          err => {
            this.$toast.open({
              message: err,
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
.el-inner-bg .el-input__inner {
  background-color: #bdafa8;
  border-color: #d3cac5;
}

.el-button--primary {
  background-color: #82b52c;
  border-color: #82b52c;
}
</style>

