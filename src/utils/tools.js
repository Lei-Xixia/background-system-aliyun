// 工具函数库

export function formatDate(timestamp) {
  const date = new Date(parseInt(timestamp));

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const week = weekArr[date.getDay()]; // 拿到具体的星期几

  let str = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${week}`;
  return str;
}
