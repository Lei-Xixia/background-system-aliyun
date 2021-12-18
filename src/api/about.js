import request from "@/utils/request";

// 分页获取评论
export function getAbout() {
  // return {
  //   data: "http://www.baidu.com"
  // }
  return request({
    url: "/api/about",
    method: "GET",
  });
}

// 设置关于我

export function editAbout(url) {
  return request({
    url: "/api/about",
    method: "POST",
    data:url 
  });
}