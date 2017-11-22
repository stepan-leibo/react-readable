import {handleActions} from 'redux-actions';

export default handleActions({
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