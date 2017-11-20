import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';


class Posts extends Component {
    static propTypes = {
        posts: PropTypes.array,
        categoryName: PropTypes.string,
        sortingValue: PropTypes.string
    };

    render() {
        return (
            <div>
                {this.props.categoryName && this.props.posts && this.props.posts
                    .filter(post => post.category === this.props.categoryName)
                    .sort(sortBy(this.props.sortingValue ? this.props.sortingValue : "-voteScore"))
                    .map(post => (
                        <Link key={post.id} to={`/post/${post.id}`}><h4 key={post.title}>{post.title}(<b>{post.voteScore}</b>)</h4></Link>
                    ))}
            </div>
        )
    }
}

export default Posts