import React from "react";
import { Button } from "@material-ui/core";
import "./Header.css";
//import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="header">
      <img src="" alt="logo" className="logoRotate" />
      <span style={{ float: "right" }}>
        <Button
          variant="contained"
          color="default"
          style={{ marginLeft: "10px" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="default"
          style={{ marginLeft: "10px" }}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          Book Show
        </Button>
      </span>
    </div>
  );
};

export default Header;
