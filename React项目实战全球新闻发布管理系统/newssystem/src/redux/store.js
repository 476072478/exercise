import { legacy_createStore as createStore, combineReducers } from 'redux'
//持久化
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//引入reducer
import { sandboxReducer } from './reducers/sandboxReducer'
import { utilReducer } from './reducers/utilReducer'
//持久化
const persistConfig = {
    key: 'xiaotang',
    storage,
    whitelist: ['sandboxReducer']
}
//合并所有reducer
const reducer = combineReducers({
    sandboxReducer,
    utilReducer
})
//导入到store中,持久化
const persistedReducer = persistReducer(persistConfig, reducer)
let store = createStore(persistedReducer)
let persistor = persistStore(store)
export { store, persistor }
// store.dispatch() store.subsribe()