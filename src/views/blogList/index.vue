<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <!-- 拿到每一行的序号 -->
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>

      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="140"
            trigger="hover"
          >
            <el-image
              style="width: 100px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="description" label="文章描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column
        prop="scanNumber"
        label="浏览数"
        width="80"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <el-table-column
        prop="commentNumber"
        label="评论量"
        width="80"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <el-table-column
        prop="category"
        label="所属分类"
        width="80"
        align="center"
      >
        <template slot-scope="scope">{{
          scope.row.category === null ? "未分类" : scope.row.category.name
        }}</template>
      </el-table-column>

      <el-table-column
        prop="createDate"
        label="创建日期"
        width="230"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <!-- 文字提示 -->
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
              @click="editBlogHandle(scope.row)"
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
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[2, 5, 10, 20]"
      layout="prev, pager, next, total, ->,sizes, jumper"
      :total="count"
      :current-page.sync="pagerCurrentPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="preClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findBlog, delOneBlog } from "@/api/blog.js";
import { formatDate } from "@/utils/tools.js";
// import { server_URL } from "@/urlConfig.js";
import { frontEnd_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [], // 存储数据详情
      srcList: [], // 预览图链接数组
      eachPage: 2, // 每页显示的条数
      currentPage: 1, //当前的页码数，默认是1
      totalPage: 0, // 总页码数
      count: 0, //数据的总条数
      pagerCurrentPage: 1, // 分页栏的当前页码
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        // console.log(data);
        this.data = data.rows;
        // for (const i of this.data) {
        //   i.createDate = formatDate(i.createDate);
        //   i.thumb = server_URL + i.thumb;
        //   this.srcList.push(i.thumb);
        // }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        // 在删除文章的时候可能会触发
        // 删除之后总页码数会减1，当前页码数就会大于总页码数，所以要做处理
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });

      // var res = findBlog(this.currentPage, this.eachPage);
      // console.log(res);
      // this.data = res.data.rows;

      // for (const i of this.data) {
      //   i.createDate = formatDate(i.createDate);
      //   i.thumb = server_URL + i.thumb;
      //   this.srcList.push(i.thumb);
      // }

      // this.count = res.data.total;
      // // 总页码数
      // this.totalPage = Math.ceil(this.count / this.eachPage);
      // // 在删除文章的时候可能会触发
      // // 删除之后总页码数会减1，当前页码数就会大于总页码数，所以要做处理
      // if (this.currentPage > this.totalPage) {
      //   this.currentPage = this.totalPage;
      //   this.fetchData();
      // }
    },
    // 跳转到具体的文章
    goToTitleHandle(blogInfo) {
      // console.log(blogInfo, 'blogInfo');
      // window.open(`${frontEnd_URL}/article/${blogInfo.id}`);
      window.open(`/article/${blogInfo.id}`);
    },
    // 删除文章
    deleteBlog(blogInfo) {
      this.$confirm(
        "删除该文章会将该文章下面的评论一并删除, 是否继续?",
        "是否删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delOneBlog(blogInfo.id).then(() => {
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
    // 编辑文章
    editBlogHandle(blogInfo) {
      this.$router.push(`/blog/editBlog/${blogInfo.id}`);
    },
    // 分页相关事件
    // 改变每页显示的条数
    sizeChangeHandle(pagerNum) {
      this.eachPage = parseInt(pagerNum);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.fetchData();
    },
    // 点击当前页的时候
    currentChangeHandle(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    // 点击上一页
    preClickHandle() {
      this.currentPage -= 1;
    },
    // 点击下一页
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
};
</script>

<style scoped lang="scss">
.el-popover {
  padding: 24px !important;
}
</style>
