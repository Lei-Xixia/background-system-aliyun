import request from "@/utils/request";


export function getInfo() {
  return request({
    url: "/api/admin",
    method: "put",
  });
}

export function setUser(data) {
  return request({
    url: "/api/admin",
    method: "put",
    data
  });
}