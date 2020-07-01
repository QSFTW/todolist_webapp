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
  name: "ToDoTable",
  data() {
    return {
      modalOpen: false,
      todoForm: {
        id: -1,
        Subject: "",
        Description: ""
      },
      tableData: []
    };
  },
  created() {
    this.$axios.get("/getAll").then(
      res => {
        this.tableData = res.data;
      },
      err => {
        alert(err);
      }
    );
  },

  methods: {
    deleteRow(index, tableData) {
      let removedData = tableData[index];
      tableData.splice(index, 1);
      // axios post to remove data in database
      this.$axios.get("/delete", { params: { id: removedData.id } }).then(
        res => {
          // console.log(res);
        },
        err => {
          alert(err);
        }
      );
    },

    editRow(index, tableData) {
      this.$prompt("Please describe the todo item", tableData[index].Subject, {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          tableData[index].Description = value;
          const itemId = tableData[index].id;
          this.$axios
            .post(
              "/editDescription",
              this.qs.stringify({ id: itemId, Description: value })
            )
            .then(
              res => {},
              err => {
                alert(err);
              }
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
    },
    addRowCancel(todoForm) {
      todoForm.Subject = "";
      todoForm.Description = "";
      this.modalOpen = false;
    },
    addRow(todoForm) {
      const sub = todoForm.Subject;
      const des = todoForm.Description;
      this.tableData.unshift({
        Subject: sub,
        Description: des
      });
      todoForm.Subject = "";
      todoForm.Description = "";
      this.modalOpen = false;
      this.$axios
        .post("/add", this.qs.stringify({ Subject: sub, Description: des }))
        .then(
          res => {
            // console.log(res);
          },
          err => {
            alert(err);
          }
        );
    }
  }
};
</script>