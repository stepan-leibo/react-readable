import React, {Component} from 'react'
import {Link} from "react-router-dom";
import categoryReducer from "../reducers/categoryReducer";
import {connect} from "react-redux";
import ReadableApi from "../utils/ReadableApi";

class Menu extends Component {

    componentDidMount() {
        if (this.props.categories.length === 0) {
            this.props.dispatch(ReadableApi.getCategories());
        }
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {this.props.categories.map(category => (
                            <li>
                                <Link to={`/category/${category.path}`}>{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({category}) {
    return {
        categories: category.categories ? category.categories : []
    };
}

export default connect(mapStateToProps)(Menu);