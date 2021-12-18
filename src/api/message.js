import request from "@/utils/request";

// 分页获取评论
export function getMessage(page = 1, limit = 10) {
  return request({
    url: "/api/message",
    method: "GET",
    params: {
      page,
      limit
    }
  });
}

// 删除评论
export function delMessage(id) {
  return request.delete(`/api/message/${id}`)
}