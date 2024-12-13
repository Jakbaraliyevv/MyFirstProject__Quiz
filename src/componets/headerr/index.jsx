import React from "react";
import "./header.scss";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header className="header">
      <div className="container">
        <div className="navLogo">
          <Link to="/" className="logo">
            <h1>
              Quiz <span>Test</span>
            </h1>
          </Link>

          <div className="user">
            <Button
              className="button1"
              icon={<UserOutlined className="userIcon" />}
            >
              User
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
