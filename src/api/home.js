import { http } from '@/utils/axios'

// 获取文章列表
export function queryArticleList() {
  return http.request({
    url: '/article/selectAll',
    method: 'get'
  })
}