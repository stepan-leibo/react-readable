import {combineReducers} from 'redux';
import commentReducer from './commentReducer'
import postReducer from './postReducer'
import categoryReducer from './categoryReducer'


export default combineReducers({
    comment: commentReducer,
    category: categoryReducer,
    post: postReducer
});