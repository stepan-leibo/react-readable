import {createActions} from 'redux-actions';

export const categoryActionCreators = createActions({
    CATEGORY: {
        ADD_MULTIPLE: categories => categories
    }
});

export const postsActionCreators = createActions({
    POST: {
        ADD_MULTIPLE: posts => posts,
        ADD_ONE: post => post,
        DELETE: post => post
    }
});

export const commentsActionCreators = createActions({
    COMMENT: {
        ADD_MULTIPLE: comments => comments,
        ADD_ONE: comment => comment,
        DELETE: comment => comment
    }
});
