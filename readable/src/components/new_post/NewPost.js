import "./newPost.css"
import React, { Component } from "react";
import { Form, Input, Button, Select, Layout, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as actions from "../../actions/index"
import {
    UserOutlined,
    SendOutlined
} from '@ant-design/icons';
const { Option } = Select;
// const layout = {
//     labelCol: {
//         span: 8,
//     },
//     wrapperCol: {
//         span: 16,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 16,
//     },
// };

class NewPost extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                timestamp: "",
                title: "",
                body: "",
                author: "",
                category: null
            },
            loading: false,
            done: false
        }
    }
    formRef = React.createRef();
    onCategoryChange = (value) => {
        this.setState({ category: value })
    };

    onFinish = async (values) => {
        // console.log(values);
        await this.setState({ data: values, loading: true, done: false })
        let data = this.state.data
        let dt = new Date()
        data.timestamp = dt.getTime()
        await this.setState({ data: data })
        await this.props.addNewPost(this.state.data).then(async () => {
            await this.onReset()
            await this.setState({ loading: false, done: true })
            await message.success("You added a new Post!")
        })
    };
    onReset = () => {
        this.formRef.current.resetFields();
    };

    render() {
        return (
            <Layout style={{ padding: "20px", backgroundColor: "white" }}>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} layout="vertical" style={{ width: "40%" }}>
                    <Form.Item
                        name="title"
                        label="Post Title"
                        onChange={this.handleChange}
                        rules={[
                            { required: true },
                        ]}

                    >
                        <Input className="formItem" />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="Username"
                        onChange={this.handleChange}
                        rules={[
                            { required: true },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} className="formItem" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[
                            { required: true },
                        ]}
                    >
                        <Select
                            placeholder="Select a category"
                            onChange={this.onCategoryChange}
                            allowClear
                            className="formItem"
                        >
                            {(this.props.categories) && this.props.categories.categories.map((c) => {
                                return <Option value={c.name} key={c.path}>{c.name.toUpperCase()}</Option>
                            })}

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="body"
                        label="Post Message"
                        onChange={this.handleChange}
                        rules={[

                            { required: true },

                        ]}
                    >
                        <Input.TextArea className="formItem" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>
                            <span style={{ display: "flex", alignItems: "center" }}><SendOutlined rotate={300} /> Submit</span>
                        </Button>
                    </Form.Item>
                </Form>
            </Layout>
        );
    }

    componentDidMount() {
        this.props.getCategories()
    }
}
const mapStateToProps = (state) => {
    // console.log("STATE", state)
    return {
        categories: state.data.categories,
    }
}
export default connect(mapStateToProps, actions)(withRouter(NewPost))