import { http } from '@/utils/http'

/**
 * 分类列表-小程序
 */
export const getCategoryTopAPI = () => {
  return http({
    method: 'GET',
    url: '/category/top',
  })
}
