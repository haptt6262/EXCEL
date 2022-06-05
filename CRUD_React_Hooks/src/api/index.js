import { Helpers } from '../utils'
import ApiScheme from './scheme'

export const authApi = {
    login: Helpers.createApi(ApiScheme.AUTHEN.LOGIN),
    logout: Helpers.createApi(ApiScheme.AUTHEN.LOGOUT),
    validateToken: Helpers.createApi(ApiScheme.AUTHEN.VALIDATE_TOKEN)
}

export const itemApi = {
    fetchList: Helpers.createApi(ApiScheme.ITEMS.FETCH_LIST),
    addItem: Helpers.createApi(ApiScheme.ITEMS.CREATE),
    deleteItem: Helpers.createApi(ApiScheme.ITEMS.DELETE),
    updateItem: Helpers.createApi(ApiScheme.ITEMS.UPDATE),
    paginationItem: Helpers.createApi(ApiScheme.ITEMS.PAGINATION),
    searchPaginationItem: Helpers.createApi(ApiScheme.ITEMS.SEARCH_PAGINATION),
    uploadExcel: Helpers.createApi(ApiScheme.ITEMS.UPLOAD_EXCEL),
    filterData: Helpers.createApi(ApiScheme.ITEMS.FILTER_DATA)
}
