import { useDispatch, useSelector } from "react-redux"
import { ItemAction, AddItem, DeleteItem, UpdateItem, PaginationItem, SearchPaginationItem } from '../actions'

export const useItem = () => {
    const dispatch = useDispatch()
    const list = useSelector(state => state.itemCollection.list)
    const totalPage = useSelector(state => state.itemCollection.totalPage)
    const activePage = useSelector(state => state.itemCollection.activePage)

    const isFetching = useSelector(state => state.itemCollection.isFetching)
    const isError = useSelector(state => state.itemCollection.isError)
    const message = useSelector(state => state.itemCollection.message)

    const handleFetchList = () => dispatch(ItemAction.fetchListRequest())
    const handleAddItem = (data) => dispatch(AddItem.addItemRequest(data))
    const handleDeleteItem = (data) => dispatch(DeleteItem.deleteItemRequest(data))
    const handleUpdateItem = (data) => dispatch(UpdateItem.updateItemRequest(data))
    const handlePaginationItem = (data) => dispatch(PaginationItem.paginationItemRequest(data))
    const handleSearchPaginationItem = (data) => dispatch(SearchPaginationItem.searchPaginationItemRequest(data))

    return {
        list,
        totalPage,
        activePage,
        isFetching,
        isError,
        message,
        handleFetchList,
        handleAddItem,
        handleDeleteItem,
        handleUpdateItem,
        handlePaginationItem,
        handleSearchPaginationItem
    }
}