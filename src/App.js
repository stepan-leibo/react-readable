import React, { Component } from 'react';
import Categories from "./components/Categories";
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer} from 'react-toastify';
import {Route} from 'react-router-dom';
import Category from "./components/Category";
import EditPost from "./components/EditPost";
import Post from "./components/Post";

class App extends Component {

    render() {
        return (
            <div className="container">
                <Route exact path="/" component={Categories} />
                <Route exact path="/category/:name" component={Category} />
                <Route exact path="/editpost/:categoryName?/:id?" component={EditPost}/>
                <Route exact path="/post/:id" component={Post}/>
                <ToastContainer
                    position="bottom-right"
                    type="default"
                    autoClose={15000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
            </div>
        );
    }
}

export default App;
