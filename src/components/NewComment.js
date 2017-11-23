import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ReadableApi from "../utils/ReadableApi";
import update from 'react-addons-update'
import {connect} from "react-redux";

class NewComment extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            comment: {
                author: '',
                body: ''
            }
        };
    }

    saveComment() {
        this.props.dispatch(ReadableApi.saveComment(this.state.comment, this.props.postId,

            (comment) => this.onCommentSaved(comment)));
    }

    onCommentSaved(comment) {
        this.setState({
            comment: {
                author: '',
                body: ''
            }
        });
    }

    render() {
        let comment = this.state.comment;
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
}

export default connect()(NewComment)