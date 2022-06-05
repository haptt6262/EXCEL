import { REST_API_METHOD as METHOD, BASE_URL } from '../container'

const API_SCHEME = {
    // update when apply real authen api
    AUTHEN: {
        VALIDATE_TOKEN: {
            url: `${BASE_URL}/auth`,
            method: METHOD.GET
        },
        LOGIN: {
            url: `${BASE_URL}/auth`,
            method: METHOD.GET
        },
        LOGOUT: {
            url: `${BASE_URL}/logout`,
            method: METHOD.POST
        }
    },
    // business api
    ITEMS: {
        FETCH_LIST: {
            url: `${BASE_URL}/items`,
            method: METHOD.GET
        },
        FETCH_DETAIL: {
            url: `${BASE_URL}/items/:id`,
            method: METHOD.GET
        },
        CREATE: {
            url: `${BASE_URL}/items`,
            method: METHOD.POST
        },
        UPDATE: {
            url: `${BASE_URL}/items/:id`,
            method: METHOD.PUT
        },
        DELETE: {
            url: `${BASE_URL}/items/:id`,
            method: METHOD.DELETE
        },
        PAGINATION: {
            url: `${BASE_URL}/pagination`,
            method: METHOD.GET
        },
        SEARCH_PAGINATION: {
            url: `${BASE_URL}/search-pagination`,
            method: METHOD.GET
        },
        UPLOAD_EXCEL: {
            url: `${BASE_URL}/excel`,
            method: METHOD.POST
        },
        FILTER_DATA: {
            url: `${BASE_URL}/filter`,
            method: METHOD.GET
        }
    }
}

export default API_SCHEME