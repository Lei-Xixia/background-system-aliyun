<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table
      v-loading="listLoading"
      :data="data"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <!-- 序号 -->
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <!-- 项目名称 -->
      <el-table-column align="center" label="项目名称" width="150">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="proName">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>
      <!-- 项目描述 -->
      <el-table-column align="center" label="项目描述">
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>
      <!-- 预览图 -->
      <el-table-column align="center" label="预览图" width="150px">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.thumb"
            style="width: 120px"
            :preview-src-list="srcList"
          >
          </el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="Github"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="iconfont icon-github"
              circle
              class="github"
              size="mini"
              @click="openGitHubHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      title="请编辑该项目的名称"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <!-- 项目名称 -->
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 项目描述 -->
        <el-form-item label="项目描述(每一项描述以英文逗号分隔)">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- 项目链接 -->
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <!-- github地址 -->
        <el-form-item label="github地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <!-- 预览图 -->
        <el-form-item label="预览图">
          <Upload v-model="form.thumb" />
        </el-form-item>
        <!-- 排序等级 -->
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 确认和取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditProjectHandle"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProject,
  addProject,
  setProject,
  delProject,

} from "@/api/projects.js";
// import { server_URL } from "@/urlConfig.js";
import Upload from "@/components/Upload.vue";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [], // 存储数据
      listLoading: false,
      srcList: [], // 预览图链接数组
      dialogFormVisible: false,
      form: {
        description: "",
        name: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getProject().then(({ data }) => {
        this.listLoading = false;
        this.data = data;
        // console.log(data);
        // for (let i of this.data) {
        //   i.thumb2 = server_URL + i.thumb;
        //   this.srcList.push(i.thumb2);
        // }
      });
    },
    // fetchData() {
    //   const data = getProject().data;
    //   this.data = data;
    //   // console.log(data);
    //   for (let i of this.data) {
    //     i.thumb2 = server_URL + i.thumb;
    //     this.srcList.push(i.thumb2);
    //   }
    // },
    openGitHubHandle(projectInfo) {
      window.open(projectInfo.github)
    },
    // 编辑按钮
    editProjectHandle(projectInfo) {
      // console.log(projectInfo);
      this.dialogFormVisible = true;
      this.form = { ...projectInfo, description: projectInfo.description.toString() };
    },
    // 删除按钮
    deleteProjectHandle(projectInfo) {
      this.$confirm("确定要删除此项目吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProject(projectInfo.id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    confirmEditProjectHandle() {
      // console.log(this.form);
      let obj = {...this.form};
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.order);

      // console.log(obj);
      setProject(obj.id, obj).then(() => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success('修改成功')
      })
    },
  },
};
</script>

<style scoped lang="scss">
.proName:hover {
  color: rgb(163, 163, 163);
}
.github {
  border: 1px solid rgb(163, 163, 163);
  background-color: rgb(163, 163, 163);
}
</style>
