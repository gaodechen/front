import store from './configureStore'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

export { store, persistor }