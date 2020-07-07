<template>
  <div>
    <div style="margin: 10px 0px" align="left">
      <el-button @click.native.prevent="modalOpen = true">Add</el-button>
      <el-dialog title="Add new Todo Item" :visible.sync="modalOpen">
        <el-form :model="todoForm">
          <el-form-item label="Subject" :label-width="'120px'">
            <el-input v-model="todoForm.Subject" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description" :label-width="'120px'">
            <el-input v-model="todoForm.Description" placeholder="Describe your Todo Item"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addRowCancel(todoForm)">Cancel</el-button>
          <el-button type="primary" @click="addRow(todoForm)">Confirm</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table :data="tableData" style="width: 100%;" max-height="100%" margin="auto">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="Subject" label="Subject" width="120"></el-table-column>
      <el-table-column prop="Description" label="Description" width="360"></el-table-column>
      <el-table-column label="Operations" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >Remove</el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editRow(scope.$index, tableData)"
          >Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserTodoTable",
  data() {
    return {
      tableData: [],
      modalOpen: false,
      todoForm: {
        Subject: "",
        Description: ""
      }
    };
  },
  methods: {
    addRowCancel(todoForm) {
      todoForm.Subject = "";
      todoForm.Description = "";
      this.modalOpen = false;
    },
    addRow(todoForm) {
      const newTodo = {
        Subject: todoForm.Subject,
        Description: todoForm.Description
      };

      todoForm.Subject = "";
      todoForm.Description = "";
      this.modalOpen = false;

      this.tableData.unshift(newTodo);
      this.$store.commit("updateTodo", this.tableData);
      this.$axios
        .post("/userTodo/addTodo", this.qs.stringify(newTodo), {
          headers: { auth_token: localStorage.auth_token }
        })
        .then(
          res => {
            this.$toast.open({
              message: "Item added SUCCESS!",
              position: "top-right"
            });
          },
          err => {
            this.$toast.err({
              message: err.toString(),
              position: "top-right"
            });
          }
        );
    },
    deleteRow(index, tableData) {
      tableData.splice(index, 1);
      this.$store.commit("updateTodo", tableData);
      this.$axios
        .post("/userTodo/updateTodo", this.qs.stringify({ todo: tableData }), {
          headers: { auth_token: localStorage.auth_token }
        })
        .then(res => {
          this.$toast.open({
            message: "Item deleted SUCCESS!",
            position: "top-right"
          });
          err => {
            this.$toast.err({
              message: err.toString(),
              position: "top-right"
            });
          };
        });
    },
    editRow(index, tableData) {
      this.$prompt("Please describe the todo item", tableData[index].Subject, {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          tableData[index].Description = value;
          this.$store.commit("updateTodo", tableData);

          this.$axios.post(
            "/userTodo/updateTodo/",
            this.qs.stringify({ todo: tableData }),
            { headers: { auth_token: localStorage.auth_token } }
          );
          this.$message({
            type: "success",
            message: "Description edited successfully"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Edit canceled"
          });
        });
    }
  },
  created() {
    this.tableData = this.$store.getters.TODO;
  }
};
</script>
