import { actionTypes } from '../../container'

const { ItemTypes } = actionTypes
const INITIAL_STATE = {
    list: [],
    allData: [],
    isFetching: false,
    isError: false,
    message: '',
    totalPage: 0,
    activePage: 1,
    textSearch: ''
}

export default function itemCollectionReducer(state = INITIAL_STATE, { type, payload }) {
    console.log('type', type)
    // console.log('payload', payload)
    switch (type) {
        case ItemTypes.FETCH_ITEMS_REQUEST:
        case ItemTypes.PAGINATION_ITEM_REQUEST:
        case ItemTypes.SEARCH_PAGINATION_ITEM_REQUEST:
        case ItemTypes.FILTER_DATA_REQUEST:
            return {
                ...state,
                isFetching: true,
                isError: false,
                message: ''
            }
        case ItemTypes.FETCH_ITEMS_FAILURE:
        case ItemTypes.PAGINATION_ITEM_FAILURE:
        case ItemTypes.SEARCH_PAGINATION_ITEM_FAILURE:
        case ItemTypes.FILTER_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                isError: true,
                message: payload.message
            }
        case ItemTypes.FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: payload.list,
                isError: false
            }
        case ItemTypes.PAGINATION_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: payload.list,
                isError: false,
                totalPage: payload.totalPage,
                activePage: payload.activePage,
                allData: payload.allData
            }
        case ItemTypes.SEARCH_PAGINATION_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: payload.list,
                isError: false,
                totalPage: payload.totalPage,
                activePage: payload.activePage,
                textSearch: payload.textSearch
            }
        case ItemTypes.FILTER_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: payload.list,
                isError: false
            }
        default:
            return state
    }
}