import { takeLatest, put } from "redux-saga/effects";
import {
    ItemAction,
    AddItem,
    DeleteItem,
    UpdateItem,
    PaginationItem,
    SearchPaginationItem,
    UploadExcel,
    FilterData,

} from "../actions";
import { actionTypes } from "../container";
import { itemApi } from "../api";
import { LIMIT } from "../container/actionType/ItemType";

function* handleFetchListItems({ payload }) {
    try {
        const res = yield itemApi.fetchList();
        yield put(
            ItemAction.fetchListSuccess({
                list: res.listItem,
            })
        );
    } catch (error) {
        yield put(
            ItemAction.fetchListFailure({
                message: error.message,
            })
        );
    }
}
function* handleFetchAddItems({ payload }) {
    try {
        const res = yield itemApi.addItem(null, null, payload);
        yield put(AddItem.addItemSuccess(res));
        yield put(ItemAction.fetchListRequest());
    } catch (error) {
        yield put(
            AddItem.addItemFailure({
                message: error.message,
            })
        );
    }
}
function* handleFetchDeleteItems({ payload }) {
    try {
        const res = yield itemApi.deleteItem(payload, null, null);
        yield put(DeleteItem.deleteItemSuccess(res));
        yield put(ItemAction.fetchListRequest());
    } catch (error) {
        yield put(
            DeleteItem.deleteItemFailure({
                message: error.message,
            })
        );
    }
}
function* handleFetchUpdateItems({ payload }) {
    try {
        const res = yield itemApi.updateItem({ id: payload.id }, null, {
            name: payload.name,
        });
        yield put(UpdateItem.updateItemSuccess(res));
        yield put(ItemAction.fetchListRequest());
    } catch (error) {
        yield put(
            UpdateItem.updateItemFailure({
                message: error.message,
            })
        );
    }
}
function* handleFetchPaginationItems({ payload }) {
    try {
        const res = yield itemApi.paginationItem(
            null,
            { _page: `${payload}&_limit=${LIMIT}` },
            null
        );
        yield put(
            PaginationItem.paginationItemSuccess({
                list: res.listItem,
                totalPage: res.totalPage,
                activePage: payload,
                allData: res.allData
            })
        );
    } catch (error) {
        yield put(
            PaginationItem.paginationItemFailure({
                message: error.message,
            })
        );
    }
}
function* handleFetchSearchPaginationItems({ payload }) {
    try {
        const res = yield itemApi.searchPaginationItem(
            null,
            { _page: `${payload.activePage}&_limit=${LIMIT}&q=${payload.name}` },
            null
        );
        yield put(
            PaginationItem.paginationItemSuccess({
                list: res.listItem,
                totalPage: res.totalPage,
                activePage: payload.activePage,
                textSearch: payload.name,
            })
        );
    } catch (error) {
        yield put(
            SearchPaginationItem.searchPaginationItemFailure({
                message: error.message,
            })
        );
    }
}
function* handleFetchUploadExcel({ payload }) {
    try {
        const res = yield itemApi.uploadExcel(null, null, payload.form)
        yield put(UploadExcel.uploadExcelSuccess(res));
        yield put(ItemAction.fetchListRequest());
    } catch (error) {
        yield put(
            UploadExcel.uploadExcelFailure({
                message: error.message,
            })
        );
    }
}
function* handleFetchFilterData({ payload }) {
    try {
        console.log(payload);
        const res = yield itemApi.filterData(null, { start: `${payload.startValue}&end=${payload.endValue}` }, null);
        console.log(res, "res in saga ");
        yield put(FilterData.filterDataSuccess({ list: res }))
    } catch (error) {
        yield put(
            FilterData.filterDataFailure({
                message: error.message,
            })
        );
    }
}
const itemSaga = [
    takeLatest(actionTypes.ItemTypes.FETCH_ITEMS_REQUEST, handleFetchListItems),
    takeLatest(actionTypes.ItemTypes.CREATE_ITEM_REQUEST, handleFetchAddItems),
    takeLatest(actionTypes.ItemTypes.DELETE_ITEM_REQUEST, handleFetchDeleteItems),
    takeLatest(actionTypes.ItemTypes.UPDATE_ITEM_REQUEST, handleFetchUpdateItems),
    takeLatest(
        actionTypes.ItemTypes.PAGINATION_ITEM_REQUEST,
        handleFetchPaginationItems
    ),
    takeLatest(
        actionTypes.ItemTypes.SEARCH_PAGINATION_ITEM_REQUEST,
        handleFetchSearchPaginationItems
    ),
    takeLatest(actionTypes.ItemTypes.UPLOAD_EXCEL_REQUEST, handleFetchUploadExcel),
    takeLatest(actionTypes.ItemTypes.FILTER_DATA_REQUEST, handleFetchFilterData),
];

export default itemSaga;
