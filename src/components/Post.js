import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import ReadableApi from "../utils/ReadableApi";
import Comments from "./Comments";

class Post extends Component {

    componentDidMount() {
        let postId = this.props.match.params.id;
        if (postId) {
            this.props.dispatch(ReadableApi.getPost(postId));
            this.props.dispatch(ReadableApi.getComments(postId));
        }
    }

    deletePost() {
        this.props.dispatch(ReadableApi.deletePost(this.props.post.id, (post) => this.onPostDeleted(post)));
    }

    onPostDeleted(post) {
        this.props.history.push(`/category/${post.category}`);
    }

    voteForPost(isUpVote) {
        this.props.dispatch(ReadableApi.voteForPost(this.props.post.id, isUpVote));
    }

    render() {
        let post = this.props.post;
        return (
            <div className="row">
                {post && (
                    <div>
                        <div className="col-md-12">
                            <h2>
                                <Link to={`/category/${post.category}`}>
                                    {post.category}
                                </Link>
                                <span>/{post.title}(<b>{post.voteScore}</b>) (</span>
                                <Link to={`/editpost/${post.category}/${post.id}`}>
                                    <span className="glyphicon glyphicon-edit"/>
                                </Link>
                                <span>&nbsp;</span>
                                <a onClick={this.deletePost.bind(this)}><span className="glyphicon glyphicon-trash"/></a>
                                <span>&nbsp;</span>
                                <a onClick={event => this.voteForPost(true)}><span className="glyphicon glyphicon-thumbs-up"/></a>
                                <span>&nbsp;</span>
                                <a onClick={event => this.voteForPost(false)}><span className="glyphicon glyphicon-thumbs-down"/></a>
                                <span>)</span>
                            </h2>
                        </div>
                        <div className="col-md-12">
                            Author: {post.author}. Created: {`${new Date(post.timestamp).toLocaleDateString("en-US")}/${new Date(post.timestamp).toLocaleTimeString("en-US")}`}
                        </div>
                        <div className="col-md-12">
                            {post.body}
                        </div>
                        <div className="col-md-12">
                            <hr/>
                            <h4>Comments</h4>
                        </div>
                        <Comments postId={post.id} />
                    </div>
                )}
            </div>)

    }
}

function mapStateToProps({post}, ownProps) {
    return {
        post: post.posts && ownProps.match.params.id
            ? post.posts.find(item => item.id === ownProps.match.params.id)
            : null
    }
}

export default connect(mapStateToProps)(Post);