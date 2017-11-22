import {handleActions} from 'redux-actions';

export default handleActions({
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