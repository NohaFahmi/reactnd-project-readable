import { Navbar, Tab, Row, Col, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import {
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
const TopHeader = () => {
    return (
        <Navbar bg="white" className="d-flex justify-content-between" style={{ border: "1px solid lightgrey", height: "50px", boxShadow: "2px 2px 2px lightgrey" }}>
            <Navbar.Brand href="/">
                <img src={window.location.origin + "/Readable-logos_transparent.png"} alt="logo"
                    width="150"
                    className="d-inline-block align-top" />
            </Navbar.Brand>
            <Link to={{
                pathname: "/addPost"
            }} className="btn btn-dark"><PlusOutlined /> Add New Post</Link>
        </Navbar>
    )
}

export default TopHeader;