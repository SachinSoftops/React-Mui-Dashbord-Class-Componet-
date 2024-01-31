import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

class Topbar extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          ml: sizeConfigs.sidebar.width,
          boxShadow: "unset",
          backgroundColor: colorConfigs.topbar.bg,
          color: colorConfigs.topbar.color
        }}
      >
        <Toolbar>
          <Typography variant="h6">
            React sidebar with dropdown Using Class Component
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Topbar;
