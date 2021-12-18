import request from "@/utils/request";

// 查看文章文类接口
export function getBlogType() {
//   return {
//     "code": 0,
//     "msg": "",
//     "data": [
//         {
//             "name": "vue", // 分类名称 
//             "articleCount": 13, // 该分类下的文章数量
//             "order": 0, // 该分类的排序
//             "id": "60852d50049e92829e2dc9f8"
//         },
//         {
//             "name": "react", // 分类名称 
//             "articleCount": 8, // 该分类下的文章数量
//             "order": 1, // 该分类的排序
//             "id": "60852d50049e92829e2dc9f8"
//         },
//     ]
// }
  return request.get('/api/blogtype');
}

// 添加文章文类接口
export function addBlogType(data) {
  return request({
    url: '/api/blogtype',
    method: "post",
    data
  });
}

// 删除文章分类接口
export function delBlogType(id) {
  return request.delete(`/api/blogtype/${id}`);
}


// 查找某一个文章文类
export function findOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: "get",
  });
}

// 更新某一个文章分类
export function updateOneBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: "put",
    data: editInfo.data
  });
}