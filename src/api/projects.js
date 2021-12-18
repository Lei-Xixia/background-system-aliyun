import request from "@/utils/request";

// 新增项目
export function addProject(data) {
  return request({
    url: "/api/project",
    method: "post",
    data,
  });
}

// 获取项目
export function getProject() {
  // return {
  //   code: 0,
  //   msg: "",
  //   data: [
  //     {
  //       description: ["知识点: transition、transform、计时器", "其他描述"], // 项目描述段落
  //       name: "无缝轮播图", // 项目名称
  //       url: "http://www.demo.com/wufenglunbotu", // 项目效果请求地址
  //       github: "https://github.com/DuYi-Edu/DuYi-Vue2", // 项目github地址
  //       thumb: "/static/upload/2021-12-1-20-59-12-209-eb70a.jpeg", // 缩略图，项目截图
  //       order: 1, // 排序
  //       id: "608e44c7061eda77d299dbbe",
  //     },
  //   ],
  // };
  return request.get('/api/project');
}

export function getProject1() {
  // return {
  //   code: 0,
  //   msg: "",
  //   data: [
  //     {
  //       description: ["知识点: transition、transform、计时器", "其他描述"], // 项目描述段落
  //       name: "无缝轮播图", // 项目名称
  //       url: "http://www.demo.com/wufenglunbotu", // 项目效果请求地址
  //       github: "https://github.com/DuYi-Edu/DuYi-Vue2", // 项目github地址
  //       thumb: "/static/upload/2021-12-1-20-59-12-209-eb70a.jpeg", // 缩略图，项目截图
  //       order: 1, // 排序
  //       id: "608e44c7061eda77d299dbbe",
  //     },
  //   ],
  // };
  return request.get('/api/project');
}
// 修改项目
export function setProject(id, data) {
  return request({
    url: `/api/project/${id}`,
    method: "put",
    data,
  });
}

// 删除项目
export function delProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: "DELETE",
  });
}
