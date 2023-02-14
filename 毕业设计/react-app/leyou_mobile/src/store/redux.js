import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import homereducer from './reducers/home'
import myreducer from './reducers/my'
import reduxThunk from 'redux-thunk'
import detailsreducer from './reducers/details'
import traverreducer from './reducers/traverrouter'
import navbarreducer from './reducers/navbar'
import listreducer from './reducers/list'
import tablereducer from './reducers/tabel'
import appreducer from './reducers/app'
import footreducer from './reducers/myfoot'
import changeheader from './reducers/changeheader'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({ changeheader, homereducer, myreducer, detailsreducer, traverreducer, navbarreducer, listreducer, tablereducer, appreducer, footreducer })
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)))
export default store