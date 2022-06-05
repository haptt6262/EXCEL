import { combineReducers } from 'redux'
import itemCollectionReducer from './itemReducer/item.collection.reducer'
import itemInstanceReducer from './itemReducer/item.instance.reducer'

export default combineReducers({
    itemCollection: itemCollectionReducer,
    itemInstance: itemInstanceReducer
})