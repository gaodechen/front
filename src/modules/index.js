// Root Reducer with persist config
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import home from './home'               // user status
import friends from './friends'         // friend
import recorder from './recorder'       // recorder
import recommend from './recommend'     // recommend
import articles from './articles'       // article
import music from './music'             // music
import uploader from './uploader'       // uploader

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
    friends,
    recorder,
    recommend,
    articles,
    music,
    uploader,
})


const rootReducer = persistReducer(rootPersistConfig, Reducer)

export default rootReducer