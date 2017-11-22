import {handleActions} from 'redux-actions';

export default handleActions({
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