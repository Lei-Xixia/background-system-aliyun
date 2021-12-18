import request from "@/utils/request";

// 新增项目
export function getSetting() {
  return request({
    url: "/api/setting",
    method: "get",
  });
}

// 新增项目
export function setSetting(data) {
  return request({
    url: "/api/setting",
    method: "put",
    data,
  });
}