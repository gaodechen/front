import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import home from './home'           // 登陆态/异步状态
import form from './form'           // 表单加载

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: []
}

const homePersistConfig = {
    key: 'home',
    storage: storage,
    whitelist: ['isLoggedIn']
}

const Reducer = combineReducers({
    home: persistReducer(homePersistConfig, home),
    form: form
})


const rootReducer = persistReducer(rootPersistConfig, Reducer)

export default rootReducer