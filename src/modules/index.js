import { combineReducers } from 'redux'

// 用户/异步状态
import home from './home'
// Form
import form from './form'

const Reducer = combineReducers({ home, form })

export default Reducer