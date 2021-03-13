import { Component, React } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Comment, Tooltip, Avatar, Dropdown, Menu, message } from 'antd';
import * as actions from "../../actions/index.js"
import moment from 'moment';
import "../home/home.css"
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
    EllipsisOutlined,
    LoadingOutlined
} from '@ant-design/icons';

class Post extends Component {
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

    handleMenuClick = e => {
        if (e.key === '3') {
            this.setState({ visible: false });
        }
    };

    handleVisibleChange = flag => {
        this.setState({ visible: flag })
        // console.log(flag)
    };
    handleShowSettings = (e) => {
        // console.log(e)
    }
    like = () => {
        if (((this.state.action === "disliked") || (this.state.action === null))) {
            this.setState({ likes: this.state.likes + 1, dislikes: 0, action: "liked" });
        } else {
            this.setState({ likes: this.props.info.voteScore, dislikes: 0, action: null });
        }
    }

    dislike = () => {
        if ((this.state.action === "liked") || (this.state.action === null)) {
            this.setState({ likes: this.state.likes - 1, dislikes: 1, action: "disliked" });
        } else {
            this.setState({ likes: this.props.info.voteScore, dislikes: 0, action: null });
        }
    };
    handleDeletePost = async (id) => {
        await this.props.deletePost(id).then(async () => {
            await message.info("Post deleted!");
        })
    }
    handleEditPost = (id) => {
        // console.log("edit", id)
        this.props.history.push({
            pathname: "/edit",
            state: { id: id }
        })
    }
    convertToDate = (stamp) => {
        var timestamp = stamp
        var date = new Date(timestamp);
        let formattedDate = date.getFullYear() +
            "-" + (date.getMonth() + 1) +
            "-" + date.getDate() +
            " " + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()
        return formattedDate
    }
    componentDidMount() {
        // console.log("PROPS", this.props.info)
        this.setState({ likes: this.props.info.voteScore })
    }
    render() {
        const { info } = this.props
        let date = this.convertToDate(info.timestamp)
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" onClick={() => this.handleEditPost(info.id)}>EDIT</Menu.Item>
                <Menu.Item key="2" onClick={() => this.handleDeletePost(info.id)}>Delete</Menu.Item>
            </Menu>
        );
        return (
            <>
                <Dropdown
                    overlay={menu}
                    onVisibleChange={this.handleVisibleChange}
                    visible={this.state.visible}
                >
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href=" ">
                        <EllipsisOutlined style={{ fontSize: '24px' }} />
                    </a>
                </Dropdown>
                {/* </span> */}
                <Comment
                    actions={[<Tooltip key="comment-basic-like" title="Like">
                        <span onClick={this.like} style={{ display: "flex", alignItems: "center" }}>
                            {(this.state.action === 'liked') ? <LikeFilled style={{ fontSize: "20px", color: "green" }} /> : <LikeOutlined style={{ fontSize: "20px", color: "green" }} />}
                        </span>
                    </Tooltip>,
                    <p className="comment-action" style={{ border: "1px solid lightgrey", borderRadius: "10px", padding: "5px 10px", margin: "0 10px", fontSize: "14px", color: "#161214", fontWeight: "bold", textAlign: "center" }}>
                        <span style={(this.state.likes > 0) ? { color: "green", fontSize: "16px" } : { color: "red", fontSize: "16px" }}>{this.state.likes}</span>
                        <br />
                        <span style={{ borderTop: "1px solid lightgrey" }}>Votes</span>
                    </p>,
                    <Tooltip key="comment-basic-dislike" title="Dislike">
                        <span onClick={this.dislike} style={{ display: "flex", alignItems: "center" }}>
                            {(this.state.action === 'disliked') ? <DislikeFilled style={{ fontSize: "20px", color: "red" }} /> : <DislikeOutlined style={{ fontSize: "20px", color: "red" }} />}
                            {/* <span className="comment-action">{this.state.dislikes}</span> */}
                        </span>
                    </Tooltip>,
                    <span key="comment-basic-reply-to" style={{ color: "#C0B9C3", fontSize: "14px", fontWeight: "bold", marginLeft: "20px" }}>{info.commentCount} Comments</span>]}
                    author={<a>{info.author}</a>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={info.author}
                        />
                    }
                    content={
                        <a className="h4 card-link" href={`/post/${info.id}`}>{info.title}</a>
                        // <p>
                        //     We supply a series of design principles, practical patterns and high quality design
                        //     resources (Sketch and Axure), to help people create their product prototypes beautifully
                        //                             and efficiently.</p>
                    }
                    datetime={
                        <Tooltip title={moment(date).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(date).fromNow()}</span>
                        </Tooltip>
                    }
                    style={{ textAlign: "left" }}
                />
            </>
        )

    }

}

export default connect(null, actions)(withRouter(Post));