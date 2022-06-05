import { createAction } from "@reduxjs/toolkit"
import { actionTypes } from "../container"

export const ItemAction = {
    fetchListRequest: createAction(actionTypes.ItemTypes.FETCH_ITEMS_REQUEST),
    fetchListSuccess: createAction(actionTypes.ItemTypes.FETCH_ITEMS_SUCCESS),
    fetchListFailure: createAction(actionTypes.ItemTypes.FETCH_ITEMS_FAILURE)
}
export const AddItem = {
    addItemRequest: createAction(actionTypes.ItemTypes.CREATE_ITEM_REQUEST),
    addItemSuccess: createAction(actionTypes.ItemTypes.CREATE_ITEM_SUCCESS),
    addItemFailure: createAction(actionTypes.ItemTypes.CREATE_ITEM_FAILURE)
}
export const DeleteItem = {
    deleteItemRequest: createAction(actionTypes.ItemTypes.DELETE_ITEM_REQUEST),
    deleteItemSuccess: createAction(actionTypes.ItemTypes.DELETE_ITEM_SUCCESS),
    deleteItemFailure: createAction(actionTypes.ItemTypes.DELETE_ITEM_FAILURE)
}
export const UpdateItem = {
    updateItemRequest: createAction(actionTypes.ItemTypes.UPDATE_ITEM_REQUEST),
    updateItemSuccess: createAction(actionTypes.ItemTypes.UPDATE_ITEM_SUCCESS),
    updateItemFailure: createAction(actionTypes.ItemTypes.UPDATE_ITEM_FAILURE)
}
export const PaginationItem = {
    paginationItemRequest: createAction(actionTypes.ItemTypes.PAGINATION_ITEM_REQUEST),
    paginationItemSuccess: createAction(actionTypes.ItemTypes.PAGINATION_ITEM_SUCCESS),
    paginationItemFailure: createAction(actionTypes.ItemTypes.PAGINATION_ITEM_FAILURE)
}
export const SearchPaginationItem = {
    searchPaginationItemRequest: createAction(actionTypes.ItemTypes.SEARCH_PAGINATION_ITEM_REQUEST),
    searchPaginationItemSuccess: createAction(actionTypes.ItemTypes.SEARCH_PAGINATION_ITEM_SUCCESS),
    searchPaginationItemFailure: createAction(actionTypes.ItemTypes.SEARCH_PAGINATION_ITEM_FAILURE)
}
export const UploadExcel = {
    uploadExcelRequest: createAction(actionTypes.ItemTypes.UPLOAD_EXCEL_REQUEST),
    uploadExcelSuccess: createAction(actionTypes.ItemTypes.UPLOAD_EXCEL_SUCCESS),
    uploadExcelFailure: createAction(actionTypes.ItemTypes.UPLOAD_EXCEL_FAILURE)
}

export const FilterData = {
    filterDataRequest: createAction(actionTypes.ItemTypes.FILTER_DATA_REQUEST),
    filterDataSuccess: createAction(actionTypes.ItemTypes.FILTER_DATA_SUCCESS),
    filterDataFailure: createAction(actionTypes.ItemTypes.FILTER_DATA_FAILURE)
}