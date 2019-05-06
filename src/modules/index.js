import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

// import all sub reducers
import home from './home'                       // user status
import friends from './friends'                 // friend
import recorder from './recorder'               // recorder
import recommend from './recommend'             // recommend
import articles from './articles'               // article
import music from './music'                     // music
import uploader from './uploader'               // uploader
import styleTransfer from './styleTransfer'     // music transfer
import fileSelector from './fileSelector'       // file selector

// reducer with persist config
const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: []
}

// user status persist config
const homePersistConfig = {
    key: 'home',
    storage: storage,
    whitelist: ['isLoggedIn']
}

// combine all sub reducers
const Reducer = combineReducers({
    home: persistReducer(homePersistConfig, home),
    friends,
    recorder,
    recommend,
    articles,
    music,
    uploader,
    styleTransfer,
    fileSelector,
})


// persist root reducer
const rootReducer = persistReducer(rootPersistConfig, Reducer)

export default rootReducer