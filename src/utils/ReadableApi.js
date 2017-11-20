import {categoryActionCreators, postsActionCreators, commentsActionCreators} from "../actions/index";
import { toast } from 'react-toastify';
import { uuidv4 } from './Utils';

export default class ReadableApi {
    static getCategories() {
        return (dispatch) => {
            fetch("http://localhost:3001/categories", { headers: ReadableApi.getHeaders() })
                .then(resp => resp.json())
                .then(categories => dispatch(categoryActionCreators.category.addMultiple(categories)))
                .catch(err => toast(err.message))
        }
    }

    static getPosts() {
        return (dispatch) =>
            fetch("http://localhost:3001/posts", { headers: ReadableApi.getHeaders() })
                .then(resp => resp.json())
                .then(posts => dispatch(postsActionCreators.post.addMultiple(posts)))
                .catch(err => toast.error(err.message))
    }

    static getCategoryPosts(categoryName) {
        return (dispatch) =>
            fetch(`http://localhost:3001/${categoryName}/posts`, { headers: ReadableApi.getHeaders() })
                .then(resp => resp.json())
                .then(posts => postsActionCreators.post.addMultiple(posts))
                .catch(err => toast.error(err.message))
    }

    static getPost(postId) {
        return (dispatch) =>
            fetch(`http://localhost:3001/posts/${postId}`, {headers: ReadableApi.getHeaders()})
                .then(resp => resp.json())
                .then(post => dispatch(postsActionCreators.post.addOne(post)))
                .catch(err => toast.error(err.message))
    }

    // QUESTION: how to avoid callbacks?
    static savePost(post, callback) {
        if (!post.id) {
            post.id = uuidv4();
            post.timestamp = Date.now();
        }

        let headers = ReadableApi.getHeaders();
        headers.append('Content-type', 'application/json');
        return (dispatch) =>
            fetch("http://localhost:3001/posts", {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify(post)
                })
                .then(resp => resp.json())
                .then(post => {
                    dispatch(postsActionCreators.post.addOne(post));
                    if (callback) {
                        callback(post)
                    }
                })
                .catch(err => toast.error(err.message))
    }

    // QUESTION: how to avoid callbacks?
    static deletePost(postId, callback) {
        return (dispatch) =>
            fetch(`http://localhost:3001/posts/${postId}`,
                {
                    headers: ReadableApi.getHeaders(),
                    method: 'DELETE'
                })
                .then(resp => resp.json())
                .then(post => {
                    dispatch(postsActionCreators.post.delete(post));
                    if (callback) {
                        callback(post);
                    }
                })
                .catch(err => toast.error(err.message))
    }

    static voteForPost(postId, isUpVote) {
        let json = JSON.stringify({
            option: isUpVote ? 'upVote' : 'downVote'
        });
        let headers = ReadableApi.getHeaders();
        headers.append('Content-type', 'application/json');
        return (dispatch) =>
            fetch(`http://localhost:3001/posts/${postId}`,
                {
                    headers: headers,
                    method: 'POST',
                    body: json
                })
                .then(resp => resp.json())
                .then(post => dispatch(postsActionCreators.post.addOne(post)))
                .catch(err => toast.error(err.message))
    }

    static getComments(postId) {
        return (dispatch) => {
            fetch(`http://localhost:3001/posts/${postId}/comments`, { headers: ReadableApi.getHeaders() })
                .then(resp => resp.json())
                .then(comments => dispatch(commentsActionCreators.comment.addMultiple(comments)))
                .catch(err => toast(err.message))
        }
    }

    // QUESTION: how to avoid callbacks?
    static saveComment(comment, postId, callback) {
        comment.parentId = postId;
        if (!comment.id) {
            comment.id = uuidv4();
            comment.timestamp = Date.now();
        }

        let headers = ReadableApi.getHeaders();
        headers.append('Content-type', 'application/json');
        return (dispatch) =>
            fetch("http://localhost:3001/comments", {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify(comment)
                })
                .then(resp => resp.json())
                .then(post => {
                    dispatch(commentsActionCreators.comment.addOne(post));
                    if (callback) {
                        callback(post);
                    }
                })
                .catch(err => toast.error(err.message))
    }

    // QUESTION: how to avoid callbacks?
    static deleteComment(commentId, callback) {
        return (dispatch) =>
            fetch(`http://localhost:3001/comments/${commentId}`,
                {
                    headers: ReadableApi.getHeaders(),
                    method: 'DELETE'
                })
                .then(resp => resp.json())
                .then(comment => {
                    dispatch(commentsActionCreators.comment.delete(comment));
                    if (callback) {
                        callback(comment);
                    }
                })
                .catch(err => toast.error(err.message))
    }

    static voteForComment(commentId, isUpVote) {
        let json = JSON.stringify({
            option: isUpVote ? 'upVote' : 'downVote'
        });
        let headers = ReadableApi.getHeaders();
        headers.append('Content-type', 'application/json');
        return (dispatch) =>
            fetch(`http://localhost:3001/comments/${commentId}`,
                {
                    headers: headers,
                    method: 'POST',
                    body: json
                })
                .then(resp => resp.json())
                .then(post => dispatch(commentsActionCreators.comment.addOne(post)))
                .catch(err => toast.error(err.message))
    }

    static fetchUrl(url) {
        return fetch(url, {headers: ReadableApi.getHeaders()})
    }

    static getHeaders() {
        let headers = new Headers();
        headers.append('Authorization', 'abcd');
        return headers;
    }
}