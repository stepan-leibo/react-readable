import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import ReadableApi from "../utils/ReadableApi";
import update from 'react-addons-update';

class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: props.post
                ? props.post
                : {
                    category: props.match.params.categoryName,
                    author: '',
                    title: '',
                    body: ''
                }
        };
    }

    componentDidMount() {
        let postId = this.props.match.params.id;
        this.props.dispatch(ReadableApi.getCategories());
        if (postId) {
            this.props.dispatch(ReadableApi.getPost(postId, (post) => this.setState(post)));
        }
    }

    componentWillReceiveProps(props) {
        this.setPostFromProps(props)
    }

    setPostFromProps(props) {
        if (props.post) {
            this.setState({
                post: props.post
            });
        } else if (props.match.params.categoryName) {
            this.setState(update(this.state, {
                category: {$set: props.match.params.categoryName}
            }))
        }
    }

    savePost() {
        if (EditPost.isPostValid(this.state.post)) {
            this.props.dispatch(ReadableApi.savePost(this.state.post, (post) => this.onPostSaved(post)));
        } else {
            toast.error("Post is not valid");
        }
    }

    onPostSaved(post) {
        this.props.history.push(`/post/${post.id}`);
    }

    static isPostValid(post) {
        return post.category && post.author && post.title && post.body;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Add new post</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="newPostCategoryId" className="col-sm-2 control-label">Category</label>
                                <div className="col-sm-3">
                                    <select
                                        id="newPostCategoryId"
                                        className="form-control"
                                        value={this.state.post.category}
                                        onChange={event => this.setState(update(this.state, {post: { category: {$set: event.target.value} }}))}
                                    >
                                        <option value="" disabled>Select category</option>
                                        {this.props.categories.map(category => (
                                            <option key={category.name} value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPostTitleId" className="col-sm-2 control-label">Title</label>
                                <div className="col-sm-10">
                                    <input
                                        id="newPostTitleId"
                                        className="form-control"
                                        value={this.state.post.title}
                                        onChange={event => this.setState(update(this.state, {post: { title: {$set: event.target.value} }}))}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPostAuthorId" className="col-sm-2 control-label">Author</label>
                                <div className="col-sm-10">
                                    <input
                                        id="newPostAuthorId"
                                        className="form-control"
                                        value={this.state.post.author}
                                        onChange={event => this.setState(update(this.state, {post: { author: {$set: event.target.value} }}))}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPostBodyId" className="col-sm-2 control-label">Body</label>
                                <div className="col-sm-10">
                                    <textarea
                                        id="newPostBodyId"
                                        className="form-control"
                                        value={this.state.post.body}
                                        onChange={event => this.setState(update(this.state, {post: { body: {$set: event.target.value} }}))}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary pull-right" onClick={this.savePost.bind(this)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.category.categories
            ? state.category.categories
            : [],
        post: state.post.posts && ownProps.match.params.id
            ? state.post.posts.find(item => item.id === ownProps.match.params.id)
            : null
    }
}

export default connect(mapStateToProps)(EditPost);