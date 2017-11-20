import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

const commentReducer = handleActions({
    COMMENT: {
        ADD_MULTIPLE: (state, action) => {
            let comments = state.comments ? state.comments : [];
            return {
                ...state,
                comments: [comments, ...action.payload].unique("id")
            }
        },
        ADD_ONE: (state, action) => {
            let comments = state.comments ? state.comments : [];
            return {
                ...state,
                comments: [...comments, action.payload].unique("id")
            };
        },
        DELETE: (state, action) => {
            return {
                ...state,
                comments: state.comments.filter(item => item.id !== action.payload.id)
            }
        }
    }
}, {});

const categoryReducer = handleActions({
    CATEGORY: {
        ADD_MULTIPLE: (state, action) => {
            let categories = state.categories ? state.categories : [];
            return {
                ...state,
                categories: [...categories, ...action.payload.categories].unique("name")
            }
        },
    }
}, {});

const postReducer = handleActions({
    POST: {
        ADD_MULTIPLE: (state, action) => {
            let posts = state.posts ? state.posts : [];
            return {
                ...state,
                posts: [posts, ...action.payload].unique("id")
            }
        },
        ADD_ONE: (state, action) => {
            let posts = state.posts ? state.posts : [];
            return {
                ...state,
                posts: [...posts, action.payload].unique("id")
            };
        },
        DELETE: (state, action) => {
            return {
                ...state,
                posts: state.posts.filter(item => item.id !== action.payload.id)
            }
        }
    }
}, {});

Array.prototype.unique = function(field) {
    let a = this.concat();
    for(let i=0; i<a.length; ++i) {
        for(let j=i+1; j<a.length; ++j) {
            if((field && a[i][field] === a[j][field]) || (!field && a[i] === a[j])) {
                a[i] = a[j];
                a.splice(j--, 1);
            }
        }
    }

    return a;
};

export default combineReducers({
    comment: commentReducer,
    category: categoryReducer,
    post: postReducer
});