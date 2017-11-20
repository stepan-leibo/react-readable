import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ReadableApi from "../utils/ReadableApi";
import update from 'react-addons-update'
import {connect} from "react-redux";

class EditableComment extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired,
        comment: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            comment: props.comment
                ? props.comment
                : {
                    author: '',
                    body: ''
                }
        };
    }

    componentWillReceiveProps(props) {
        this.setCommentFromProps(props)
    }

    setCommentFromProps(props) {
        if (props.comment) {
            this.setState({
                comment: props.comment
            });
        }
    }

    saveComment() {
        this.props.dispatch(ReadableApi.saveComment(this.state.comment, this.props.postId, (comment) => this.onCommentSaved(comment)));
    }

    onCommentSaved(comment) {
        this.setState({
            isEdit:false,
            comment: comment
        });
    }

    deleteComment() {
        this.props.dispatch(ReadableApi.deleteComment(this.state.comment.id));
    }

    voteForComment(isUpVote) {
        this.props.dispatch(ReadableApi.voteForComment(this.props.comment.id, isUpVote));
    }

    render() {
        let comment = this.state.comment;
        if (this.state.isEdit) {
            return (
                <div className="col-sm-12">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="commentAuthorId" className="col-sm-2 control-label">Author</label>
                            <div className="col-sm-10">
                                <input
                                    id="commentAuthorId"
                                    className="form-control"
                                    value={comment.author}
                                    onChange={event => this.setState(update(this.state, {comment: {author: {$set: event.target.value}}}))}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="commentBodyId" className="col-sm-2 control-label">Body</label>
                            <div className="col-sm-10">
                                <input
                                    id="commentBodyId"
                                    className="form-control"
                                    value={comment.body}
                                    onChange={event => this.setState(update(this.state, {comment: {body: {$set: event.target.value}}}))}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary pull-right" onClick={this.saveComment.bind(this)}>Save
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="col-md-12">
                    <span>Author: {comment.author}(<b>{comment.voteScore}</b>) (</span>
                    <a onClick={event => this.setState({isEdit: true})}><span className="glyphicon glyphicon-edit"/></a>
                    <span>&nbsp;</span>
                    <a onClick={this.deleteComment.bind(this)}><span className="glyphicon glyphicon-trash"/></a>
                    <span>&nbsp;</span>
                    <a onClick={event => this.voteForComment(true)}><span className="glyphicon glyphicon-thumbs-up"/></a>
                    <span>&nbsp;</span>
                    <a onClick={event => this.voteForComment(false)}><span className="glyphicon glyphicon-thumbs-down"/></a>
                    <span>)</span>
                </div>
                <div className="col-md-12">
                    {comment.body}
                </div>
            </div>
        )
    }
}

export default connect()(EditableComment)