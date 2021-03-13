import { Layout, Menu, List, Empty, Button } from 'antd';
import {
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Component, React } from 'react';
import "./home.css"
import TopHeader from './header';
import Post from "../post/Post"
import { connect } from 'react-redux'
import * as actions from "../../actions/index"
import { withRouter, Link } from "react-router-dom"
const { Sider, Content } = Layout;

class Home extends Component {
    constructor() {
        super();
        this.state = {
            likes: 0,
            dislikes: 0,
            action: null,
            replays: 0,
            visible: false
        }
    }
    componentDidMount() {
        this.props.getCategories()
        let category = this.props.history.location.pathname.split("/")[1]
        if (category !== "home") {
            this.props.gatCategoryPosts(category)
        } else {
            this.props.getAllPosts()

        }
    }
    handleSelectItem = async (e) => {
        await this.props.gatCategoryPosts(e.key)
        this.props.history.push(`/${e.key}`)
    }
    renderLinks = ({ categories }) => {
        if (categories) {
            return categories.categories.map((item) => {
                return <Menu.Item key={item.path}>{item.name.toUpperCase()}</Menu.Item>
            })
        }
    }

    renderPosts = ({ posts }) => {
        if (posts) {
            if (posts.length > 0) {
                return posts.map((post) => {
                    return (
                        <li className="listItem" key={post.id} >
                            <Post info={post} />
                        </li>
                    )
                })
            } else {
                return <Empty

                    description={
                        <span>
                            No Posts Yet
                        </span>
                    }
                >
                    <Link to={{
                        pathname: "/addPost"
                    }} className="btn btn-dark"><PlusOutlined /> Add New Post</Link>
                </Empty>
            }
        }
    }

    render() {

        return (
            <Layout>
                <Sider width={200} className="site-layout-background" style={{ height: "100vh" }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[this.props.history.location.pathname.split("/")[1]]}
                        style={{ height: '100%', borderRight: 0 }}
                        onSelect={this.handleSelectItem}
                    >
                        {this.renderLinks(this.props)}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            backgroundColor: "white"
                        }}
                    >
                        <List>
                            {this.renderPosts(this.props)}
                        </List>

                    </Content>
                </Layout>
            </Layout>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.data.categories,
        posts: state.data.posts
    }
}
export default connect(mapStateToProps, actions)(withRouter(Home));