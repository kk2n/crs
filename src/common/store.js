import { createStore } from 'ymcore/createModel'
import API from '../utils/axios'
import page from '../pages'
let data = {}
page.forEach(({ model = [] }) => model.length && model.forEach(({ reduce = {} }) => (data = { ...data, ...reduce })))
const { store, combineReducersData } = createStore(data, API)
export default store
module.hot && module.hot.accept(combineReducersData, () => store.replaceReducer(combineReducersData))
