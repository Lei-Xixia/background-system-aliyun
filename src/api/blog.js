import request from "@/utils/request";

// 分页获取文章
// page=1,表示的是页码数
// limit=10 表示的是每页显示的数量
export function findBlog(page = 1, limit = 10) {
  // return {
  //   code: 0,
  //   msg: "",
  //   data: {
  //     total: 28,
  //     rows: [
  //       {
  //         id: "608cc9903cddc5584a708c46",
  //         title: "vue响应式原理", // 文章标题
  //         description:
  //           "vue通过Object.defineProperty，将对象的属性变成getter和setter，当运行getter时记录依赖，当运行setter时派发更新", // 文章简介
  //         createDate: 1619941606475, // 发布日期 时间戳
  //         scanNumber: 10, // 浏览次数
  //         commentNumber: 10, // 评论量
  //         category: {
  //           // 分类信息
  //           id: "60852e6c3587f282fd5c5e80",
  //           name: "vue",
  //         },
  //         thumb: "/static/upload/2021-12-1-20-59-12-209-eb70a.jpeg", // 缩略图
  //       },
  //     ],
  //   },
  //   params: {
  //     page,
  //     limit,
  //   },
  // };

  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

// 删除文章
export function delOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "delete",
  });
}

// 添加文章
export function addBlog(data) {
  return request({
    url: "/api/blog",
    method: "post",
    data,
  });
}

// 编辑文章
// 到时候调用这个接口时，需要传递一个对象
// {
//   id:要修改的文章的id
//   data: 要修改的文章的所有的内容
// }
export function editBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: "put",
    data: blogInfo.data,
  });
}

// 根据id 查找某一篇文章
export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "get",
  });
}