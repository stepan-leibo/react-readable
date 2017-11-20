import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Posts from "./Posts";
import ReadableApi from '../utils/ReadableApi';

class Categories extends Component {

    componentDidMount() {
        this.props.dispatch(ReadableApi.getCategories());
        this.props.dispatch(ReadableApi.getPosts());
    }

    state = {
        sortings: new Map()
    };

    sortPostsBy(category, value) {
        let sortings = this.state.sortings;
        sortings.set(category, value);
        this.setState({
            sortings: sortings
        });
    }

    render() {
        return (
            <div>
                {this.props.categories && this.props.categories.map((category) => (
                    <div className="row" key={category.name}>
                        <div className="col-md-12">
                            <h2><Link to={`/category/${category.path}`}>{category.name}</Link></h2>
                            <span>&nbsp;</span>
                            <select onChange={event => this.sortPostsBy(category.name, event.target.value)}>
                                <option>Sort by</option>
                                <option value="-timestamp">Time</option>
                                <option value="-voteScore">Votes</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <Posts posts={this.props.posts} categoryName={category.name} sortingValue={this.state.sortings.get(category.name)}/>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.category.categories,
        posts: state.post.posts
    };
}

export default connect(mapStateToProps)(Categories);
