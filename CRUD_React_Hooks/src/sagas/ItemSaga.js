import { takeLatest, put } from "redux-saga/effects";
import {
    ItemAction,
    AddItem,
    DeleteItem,
    UpdateItem,
    PaginationItem,
    SearchPaginationItem,
} from "../actions";
import { actionTypes } from "../container";
import { itemApi } from "../api";
import { LIMIT } from "../container/actionType/ItemType";

function* handleFetchListItems({ payload }) {
    try {
        const res = yield itemApi.fetchList();
        yield put(
            ItemAction.fetchListSuccess({
                list: res,
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
        const res = yield itemApi.fetchList(
            null,
            { _page: `${payload}&_limit=${LIMIT}` },
            null
        );
        const TotalItem = yield itemApi.fetchList();
        const TotalPage = Math.ceil(TotalItem.length / LIMIT);
        yield put(
            PaginationItem.paginationItemSuccess({
                list: res,
                totalPage: TotalPage,
                activePage: payload,
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
        const res = yield itemApi.fetchList(
            null,
            { _page: `${payload.activePage}&_limit=${LIMIT}&q=${payload.name}` },
            null
        );
        const textSearch = payload.name;
        const TotalItem = yield itemApi.fetchList({
            name: { $regex: textSearch, $options: "i" },
        });
        const TotalPage = Math.ceil(TotalItem.length / LIMIT);
        yield put(
            PaginationItem.paginationItemSuccess({
                list: res,
                totalPage: TotalPage,
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
];

export default itemSaga;
