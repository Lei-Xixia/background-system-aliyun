<template>
  <div class="app-container">
    <el-form :model="form">
      <!-- 项目名称 -->
      <div class="block">项目名称</div>
      <div style="margin-bottom: 15px">
        <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
      </div>
      <!-- 项目描述 -->
      <div class="block">项目描述(每一项描述以英文逗号分隔)</div>
      <div style="margin-bottom: 15px">
        <el-input
          v-model="form.description"
          placeholder="请输入项目描述,每一项描述以英文逗号分隔"
        ></el-input>
      </div>

      <!-- 项目链接 -->
      <div class="block">项目链接</div>
      <div style="margin-bottom: 15px">
        <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
      </div>
      <!-- github地址 -->
      <div class="block">github地址</div>
      <div style="margin-bottom: 15px">
        <el-input
          v-model="form.github"
          placeholder="请输入github地址"
        ></el-input>
      </div>

      <!-- 预览图 -->
      <div style="margin-bottom: 15px">
        <Upload v-model="form.thumb" uploadTitle="项目预览图" />
      </div>

      <!-- 排序等级 -->
      <div class="block">排序等级</div>
      <div style="margin-bottom: 15px">
        <el-select v-model="form.order" placeholder="分类等级">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </div>

      <!-- 按钮 -->
      <el-button type="primary" plain @click="addProjectHandle">主要按钮</el-button>
    </el-form>
  </div>
</template>

<script>
import { addProject } from "@/api/projects.js";
import Upload from "@/components/Upload.vue";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  // created() {
  //   this.fetchData();
  // },
  methods: {
    // fetchData() {
    //   addProject().then((res) => {
    //     console.log(res);
    //   });
    // },
    addProjectHandle() {
      // console.log(this.form);
      let obj = {...this.form};
      obj.description = obj.description.split(",");
      obj.order = parseInt(obj.order);
      addProject(obj).then(()=> {
        this.$router.push('/project/projectList');
        this.$message.success('添加项目成功');
      })
    },
  },
};
</script>

<style scoped lang="scss">
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
