import React, {Component} from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import EditableComment from "./EditableComment";
import NewComment from "./NewComment";
import sortBy from 'sort-by';

class Comments extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <hr/>
                    <h4>Comments<b>({this.props.comments.length})</b></h4>
                </div>
                <div className="col-md-12">
                    <NewComment postId={this.props.postId}/>
                    {this.props.comments.sort(sortBy("-voteScore")).map(comment => (
                        <EditableComment key={comment.id} comment={comment} postId={this.props.postId}/>
                    ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps({comment}, ownProps) {
    return {
        comments: comment.comments && ownProps.postId
            ? comment.comments.filter(item => item.parentId === ownProps.postId)
            : []
    }
}

export default connect(mapStateToProps)(Comments)