// Root Reducer with persist config
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import home from './home'           // 登陆态/异步状态
import friends from './friends'     // 用户社交状态

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
    friends
})


const rootReducer = persistReducer(rootPersistConfig, Reducer)

export default rootReducer