import request from '@/utils/request'

export function getProductsList (params) {
  return request({
    url: '/api/product_lib/products',
    method: 'get',
    params
  })
}

export function createProducts (data) {
  return request({
    url: '/api/product_lib/products',
    method: 'post',
    data
  })
}

export function updateProducts (data) {
  return request({
    url: `/api/product_lib/products/${data.productId}`,
    method: 'put',
    data
  })
}

export function getProductsById (productId) {
  return request({
    url: `/api/product_lib/products/${productId}`,
    method: 'get'
  })
}

export function updateProductsForbidden (productId) {
  return request({
    url: `/api/product_lib/products/${productId}/forbidden`,
    method: 'put'
  })
}

export function deleteProductsUnforbidden (productId) {
  return request({
    url: `/api/product_lib/products/${productId}/unforbidden`,
    method: 'delete'
  })
}
