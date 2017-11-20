import React, {Component} from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Posts from "./Posts";
import ReadableApi from "../utils/ReadableApi";

class Category extends Component {

    componentDidMount() {
        this.props.dispatch(ReadableApi.getCategories());
        // get category posts doesn't work
        // this.props.dispatch(ReadableApi.getCategoryPosts(this.props.match.params.name));
        this.props.dispatch(ReadableApi.getPosts());
    }

    state = {
        sortingValue: ''
    };

    sortPostsBy(value) {
        this.setState({
            sortingValue: value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <Link to="/">categories</Link>
                        <span>/{this.props.category.name}(</span>
                        <Link to={`/editpost/${this.props.category.name}`}>
                            <span className="glyphicon glyphicon-plus"/>
                        </Link>
                        <span>)</span>
                    </h2>
                    <span>&nbsp;</span>
                    <select onChange={event => this.sortPostsBy(event.target.value)}>
                        <option value="">Sort by</option>
                        <option value="-timestamp">Time</option>
                        <option value="-voteScore">Votes</option>
                    </select>
                </div>
                <div className="col-md-12">
                    <Posts posts={this.props.posts} categoryName={this.props.category.name} sortingValue={this.state.sortingValue}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        category: state.category.categories
            ? state.category.categories.find(item => item.name === ownProps.match.params.name)
            : {},
        posts: state.post.posts
            ? state.post.posts.filter(item => item.category === ownProps.match.params.name)
            : []
    }
}

export default connect(mapStateToProps)(Category);