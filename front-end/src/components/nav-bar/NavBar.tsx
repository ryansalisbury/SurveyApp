import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBar: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="default"
      style={{ backgroundColor: "#333" }}
    >
      <Toolbar>
        <Typography variant="h6" color={"#fff"}>
          Survey App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
