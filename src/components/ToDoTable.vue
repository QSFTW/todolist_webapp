<template>
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
        <el-button type="text" size="small" @click="editRow(scope.$index, tableData)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "ToDoTable",
  data() {
    return {
      tableData: [
        {
          Subject: "Tom",
          Description: "No. 189, Grove St, Los Angeles"
        },
        {
          Subject: "Jack",
          Description: "No. 189, Grove St, Los Angeles"
        },
        {
          Subject: "ABC",
          Description: "No. 189, Grove St, Los Angeles"
        },
        {
          Subject: "Despacito",
          Description: "No. 189, Grove St, Los Angeles"
        },
        {
          Subject: "Despacito",
          Description: "No. 189, Grove St, Los Angeles"
        },
        {
          Subject: "Despacito",
          Description: "No. 189, Grove St, Los Angeles"
        },
        {
          Subject: "Despacito",
          Description: "No. 189, Grove St, Los Angeles"
        }
      ]
    };
  },
  methods: {
    deleteRow: (index, tableData) => {
      tableData.splice(index, 1);
    },

    editRow(index, tableData) {
      this.$prompt("Please describe the todo item", tableData[index].Summary, {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          tableData[index].Description = value;
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
  }
};
</script>