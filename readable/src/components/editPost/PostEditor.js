import "./postEditor.css"
import React, { Component } from 'react';
import { Comment, Avatar, Form, Input, Tooltip, message, Button, Layout } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import *as actions from "../../actions/index"
import {
    SaveOutlined,
    LoadingOutlined
} from '@ant-design/icons';
class PostEditor extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            loading: false
        }
    }
    formRef = React.createRef();

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
    onFill = async (info) => {
        if (info) {
            await this.setState({ fillingLoad: true })
            await this.formRef.current.setFieldsValue({
                title: info.title,
                body: info.body,
            })
            await this.setState({ fillingLoad: false })
        }
    };
    onFinish = async (values) => {
        // console.log(values);
        let id = this.props.info.id
        await this.setState({ saveLoading: true })
        await this.props.editPost(id, values).then(async () => {
            await message.success("Post is Saved!")
            await this.setState({ saveLoading: false })
        })

    };

    render() {
        if (this.props.info) {
            const { info } = this.props
            return (
                <Layout style={{ padding: "20px", backgroundColor: "white" }}>
                    <Comment
                        actions={[
                            <span key="comment-basic-reply-to" style={{ color: "#C0B9C3", fontSize: "14px", fontWeight: "bold" }}>{info.commentCount} Comments</span>
                        ]}
                        author={<p>{info.author}</p>}
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt={info.author}
                            />
                        }
                        content={
                            <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} layout="vertical" style={{ width: "40%" }}>
                                <Form.Item>
                                    <Button type="dark" htmlType="submit">{(this.state.saveLoading) ? <LoadingOutlined spin /> : <SaveOutlined />}</Button>
                                </Form.Item>
                                <Form.Item
                                    name="title"
                                    label="Post Title"
                                    // onChange={this.handleChange}
                                    rules={[
                                        { required: true },
                                    ]}
                                >
                                    <Input className="formItem" />
                                </Form.Item>
                                <Form.Item
                                    name="body"
                                    label="Post Message"
                                    // onChange={this.handleChange}
                                    rules={[
                                        { required: true },
                                    ]}
                                >
                                    <Input.TextArea className="formItem" />
                                </Form.Item>

                            </Form>
                        }
                        datetime={
                            <Tooltip
                                title={moment(this.convertToDate(info.timestamp)).format('YYYY-MM-DD HH:mm:ss')}
                            >
                                <span>{moment(this.convertToDate(info.timestamp)).fromNow()}</span>
                            </Tooltip>
                        }
                        style={{ textAlign: "left", }}
                    />
                </Layout>
            )

        } else {
            return "Loading ..."
        }

    }
    componentDidMount() {
        let id = this.props.location.state.id
        this.props.getPostById(id)
        this.onFill(this.props.info)
    }

}
const mapStateToProps = (state) => {
    // console.log("POST", state.data)
    return {
        info: state.data.post,
        editPost: state.data.editPost
    }
}
export default connect(mapStateToProps, actions)(withRouter(PostEditor));