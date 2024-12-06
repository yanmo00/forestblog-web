import { http } from '@/utils/axios'

// 获取文章列表
export function queryArticleList() {
  return http.request({
    url: '/article/selectAll',
    method: 'get'
  })
}

// 根据标签查询文章
export function queryArticleByTag() {
  return http.request({
    url: '/article/selectByTag',
    method: 'get'
  })
}