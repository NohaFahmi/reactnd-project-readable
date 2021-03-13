import "./comment.css";
import React, { Component } from 'react';
import {
    Avatar,
    Comment,
    Tooltip,
    message,
    Menu,
    Dropdown,
    Layout,
    Form,
    Button,
    Input
} from 'antd';
import moment from 'moment';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../../actions/index"
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
    EllipsisOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined
} from '@ant-design/icons';
class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            dislikes: 0,
            action: null,
            replays: 0,
            visible: false,
            submitting: false,
            editMode: false,
            comments: []
        }
    }
    formRef = React.createRef();

    handleMenuClick = e => {
        if (e.key === '3') {
            this.setState({ visible: false });
        }
    };

    handleVisibleChange = flag => {
        this.setState({ visible: flag })
        // console.log(flag)
    };

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

    likeComment = async (id, i) => {
        if (this.props.post) {

            let comments = this.state.comments
            await this.props.voteForComment("upVote", id).then(async () => {
                comments[i].upVote = 1
                comments[i].downVote = 0
                await this.setState({ comments: comments })
                await this.props.getPostComments(this.props.post.id)
            })
        }
    }
    dislikeComment = async (id, i) => {
        if (this.props.post) {
            let comments = this.state.comments
            await this.props.voteForComment("downVote", id)
                .then(async () => {
                    comments[i].downVote = 1
                    comments[i].upVote = 0
                    await this.setState({ comments: comments })
                    await this.props.getPostComments(this.props.post.id)
                })
        }

    }
    handleDeletePost = async (id) => {
        if (this.props.post) {
            await this.props.deleteComment(id).then(async () => {
                await this.props.getPostComments(this.props.post.id)
                await message.info("Post deleted!");
            })
        }
    }
    handleEditPost = async (id, body, i) => {
        let comments = this.state.comments
        comments[i].edit = true
        await this.setState({ editMode: true, comments: comments })
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

    onReset = () => {
        this.formRef.current.resetFields();
    };
    onFinish = async (values) => {
        this.setState({ submitting: true })
        if (this.props.post) {
            let data = {
                timestamp: new Date().getTime(),
                body: values.body,
                author: this.props.post.author,
                parentId: this.props.post.id
            }

            await this.props.addComment(data).then(async () => {
                await this.props.getPostComments(this.props.post.id)
                await this.setState({ submitting: false })
                await this.onReset()
            }).catch((e) => {
                message.error("Your Comment is not added!")
            })
        } else {
            await this.setState({ submitting: false })
            await message.error("Your Comment is not added!")
        }

    }
    onSaveEdit = async (values, id, i) => {
        console.log(values)
        let comments = this.state.comments
        this.setState({ saving: true })
        if (this.props.post) {
            let data = {
                timestamp: new Date().getTime(),
                body: values.body,
            }

            await this.props.editComment(data, id).then(async () => {
                await this.props.getPostComments(this.props.post.id)
                comments[i].edit = false
                await this.setState({ saving: false, editMode: false, comments: comments })
                await message.success("Your Comment is saved!")

            }).catch((e) => {
                message.error("Your Comment is not Saved!")
            })
        } else {
            await this.setState({ saving: false })
            await message.error("Your Comment is not saved!")
        }
    }
    renderComments = ({ comments }) => {
        if (comments && (this.state.comments.length > 0)) {
            return this.props.comments.map((comment, i) => {
                return (
                    <div key={comment.id}>
                        <div className="text-right">
                            {(this.state.comments[i].edit) ?
                                "" :
                                <EditOutlined style={{ color: "#161214", fontSize: "20px", margin: "0 10px", cursor: "pointer" }} onClick={() => this.handleEditPost(comment.id, comment.body, i)} id={comment.id} />
                            }
                            <DeleteOutlined style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => this.handleDeletePost(comment.id)} />
                        </div>
                        <Comment
                            actions={[<Tooltip key="comment-basic-like" title="Like">
                                <span onClick={() => this.likeComment(comment.id, i)} style={{ display: "flex", alignItems: "center" }}>
                                    {(this.state.comments[i].upVote === 1) ? <LikeFilled style={{ fontSize: "20px", color: "green" }} /> : <LikeOutlined style={{ fontSize: "20px", color: "green" }} />}
                                </span>
                            </Tooltip>,
                            <p className="comment-action" style={{ border: "1px solid lightgrey", borderRadius: "10px", padding: "5px 10px", margin: "0 10px", fontSize: "14px", color: "#161214", fontWeight: "bold", textAlign: "center" }}>
                                <span style={(comment.voteScore > 0) ? { color: "green", fontSize: "16px" } : { color: "red", fontSize: "16px" }}>{comment.voteScore}</span>
                                <br />
                                <span style={{ borderTop: "1px solid lightgrey" }}>Votes</span>
                            </p>,
                            <Tooltip key="comment-basic-dislike" title="Dislike">
                                <span onClick={() => this.dislikeComment(comment.id, i)} style={{ display: "flex", alignItems: "center" }}>
                                    {(this.state.comments[i].downVote === 1) ? <DislikeFilled style={{ fontSize: "20px", color: "red" }} /> : <DislikeOutlined style={{ fontSize: "20px", color: "red" }} />}
                                    {/* <span className="comment-action">{this.state.dislikes}</span> */}
                                </span>
                            </Tooltip>,
                            ]}
                            author={<a>{comment.author}</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt={comment.author}
                                />
                            }

                            content={
                                (this.state.comments[i].edit) ?
                                    <Form ref={this.formRef} name="control-ref" onFinish={(vals) => this.onSaveEdit(vals, comment.id, i)} layout="vertical">
                                        <Form.Item
                                            name="body"
                                            initialValue={comment.body}
                                            rules={[
                                                { required: true }
                                            ]}
                                        >

                                            <Input.TextArea cols={12} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button htmlType="submit" type="primary" loading={this.state.saving}>
                                                Save Comment
                    </Button>
                                        </Form.Item>
                                    </Form>
                                    :
                                    <p>
                                        {comment.body}
                                    </p>


                            }
                            datetime={
                                <Tooltip title={moment(this.convertToDate(comment.timestamp)).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(this.convertToDate(comment.timestamp)).fromNow()}</span>
                                </Tooltip>
                            }
                        />
                    </div>
                )
            })
        }
    }

    renderCommentEditor = () => {
        return (
            <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} layout="vertical">
                <Form.Item
                    name="body"
                    rules={[
                        { required: true }
                    ]}
                >

                    <Input.TextArea cols={12} placeholder="Write Your comment here..." />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" loading={this.state.submitting}>
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    render() {
        if (this.props.post) {
            const { post } = this.props
            let date = this.convertToDate(post.timestamp)
            const menu = (
                <Menu onClick={this.handleMenuClick}>
                    <Menu.Item key="1" onClick={() => this.handleEditPost(post.id)}>EDIT</Menu.Item>
                    <Menu.Item key="2" onClick={() => this.handleDeletePost(post.id)}>Delete</Menu.Item>
                </Menu>
            );
            return (
                <Layout>
                    <div style={{
                        border: "1px solid lightgray",
                        boxShadow: "2px 2px 2px lightgray",
                        borderRadius: "10px",
                        padding: "10px",
                        // textAlign: "right",
                        margin: "15px auto",
                        backgroundColor: "white",
                        width: "60%"
                    }}>
                        <div className="text-right">
                            <Dropdown
                                overlay={menu}
                                onVisibleChange={this.handleVisibleChange}
                                visible={this.state.visible}
                            >
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href=" ">
                                    <EllipsisOutlined style={{ fontSize: '30px' }} />
                                </a>
                            </Dropdown>
                        </div>

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
                            <span key="comment-basic-reply-to" style={{ color: "#C0B9C3", fontSize: "14px", fontWeight: "bold", marginLeft: "20px" }}>{post.commentCount}Comments</span>]}
                            author={<a>{post.author}</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt={post.author}
                                />
                            }

                            content={
                                <>
                                    <h4>{post.title}</h4>
                                    <p>
                                        {post.body}
                                    </p>
                                </>
                            }
                            datetime={
                                <Tooltip title={moment(date).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(date).fromNow()}</span>
                                </Tooltip>
                            }
                        >
                            {this.renderComments(this.props)}
                            {this.renderCommentEditor()}
                        </Comment>
                    </div>
                </Layout>
            )
        } else {
            return "Loading..."
        }

    }

    componentDidMount() {
        let postId = this.props.match.params.id
        // console.log(postId)
        this.props.getPostComments(postId).then(async () => {
            let comments = []
            await this.props.comments.map((c) => {
                comments.push({ comment: c, edit: false, upVote: 0, downVote: 0 })

            })
            await this.setState({ comments: comments })
        })
        this.props.getPostById(postId).then(() => {
            this.setState({ likes: this.props.post.voteScore })
        })
    }
}
const mapStateToProps = (state) => {
    console.log("COMMENT", state)
    return {
        comments: state.data.postComments,
        post: state.data.post
    }
}
export default connect(mapStateToProps, actions)(withRouter(CommentItem));