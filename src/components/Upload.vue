<template>
  <div>
    <!-- 上传组件标题 -->
    <div class="block">
      {{ uploadTitle }}
    </div>
    <!-- 上传控件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
// import { server_URL } from "@/urlConfig.js";

export default {
  
  props: ["uploadTitle", "value"],
  computed: {
    // imageUrl() {
      // if (this.value) {
      //   // debugger;
      //   return server_URL + this.value ;
      // }
    // },
    // 设置上传的请求头部
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"), // 从本地获取token,添加到header里面
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      // console.log('上传成功之后的回调',res);
      if(!res.code && res.data) {
        // 说明上传成功，服务器给我们返回图片上传成功后的服务器地址
        this.$emit('input',res.data);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.block {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
