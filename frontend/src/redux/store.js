import {applyMiddleware, combineReducers, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer, userReducer } from './reducer';
import { composeWithDevTools } from '@redux-devtools/extension';

export const reducer = combineReducers({
  auth: authReducer,
  userInfo:userReducer
});

const middleware = [thunk]

const  store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;