import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import store from "./store/store"
import { Provider } from 'react-redux';
import Home from './components/home/home';
import TopHeader from './components/home/header';
import { Layout } from "antd"
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import NewPost from './components/new_post/NewPost';
import PostEditor from './components/editPost/PostEditor';
import CommentItem from './components/comment/Comment';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Layout>
            <TopHeader />
            <Switch>
              <Route exact path="/post/:id">
                <CommentItem />
              </Route>
              <Route exact path="/edit">
                <PostEditor />
              </Route>
              <Route exact path="/addPost">
                <NewPost />
              </Route>
              <Route path="/home">
                <Home />
              </Route>

              <Route path="/:category">
                <Home />
              </Route>

              <Redirect from="/" to="/home" />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
