import request from '@/utils/request'

// 获取首页标语
export function getBanner(){
  // return {
  //   "code": 0,
  //   "msg": '',
  //   "data": [
  //     {
  //       "midImg": "/static/upload/2021-12-1-20-59-12-209-eb70a.jpeg",
  //       "bigImg": "/static/upload/2021-12-1-20-59-12-209-eb70a.jpeg",
  //       "title": "凛冬将至",
  //       "description": "人唯有恐惧的时候方能勇敢",
  //       "id": "6090af0a9dcd41a467fb4cae"
  //     },
  //     {
  //       "midImg": "/static/upload/2021-12-1-21-1-15-470-12ff5.jpeg",
  //       "bigImg": "/static/upload/2021-12-1-21-1-15-470-12ff5.jpeg",
  //       "title": "血火同源",
  //       "description": "如果我回头，一切都完了",
  //       "id": "6090af0a9dcd41a467fb4caf"
  //     },
  //     {
  //       "midImg": "/static/upload/2021-12-1-21-2-2-763-15857.jpeg",
  //       "bigImg": "/static/upload/2021-12-1-21-2-2-763-15857.jpeg",
  //       "title": "听我怒吼",
  //       "description": "兰尼斯特有债必偿",
  //       "id": "6090af0a9dcd41a467fb4cb0"
  //     }
  //   ]
  // }
  // 由于请求的api拿到的数据中data是一个空数组，此处用的是自己上面设置的数据,后面自己修改并上传数据，就可以拿到数据了
  return request({
    url: '/api/banner',
    method: 'get',
  })
}

export function setBanner(data){
  return request({
    url: '/api/banner',
    method: 'post',
    data
  })
}