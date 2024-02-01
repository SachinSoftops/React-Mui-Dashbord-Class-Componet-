import React, { Component, MouseEvent } from "react";
import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
// Define your custom styles using styled
const Avatar = styled("img")({
  width: 40, 
  height: 40, 
  marginRight: 1, 
});

interface TopbarState {
  isLogoutVisible: boolean;
}

class Topbar extends Component<{}, TopbarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLogoutVisible: false,
    };
  }

  handleToggleLogout = () => {
    this.setState((prevState) => ({
      isLogoutVisible: !prevState.isLogoutVisible,
    }));
  };

  render() {
    const { isLogoutVisible } = this.state;

    return (
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          ml: sizeConfigs.sidebar.width,
          boxShadow: "unset",
          backgroundColor: colorConfigs.topbar.bg,
          color: colorConfigs.topbar.color,
        }}
      >
        <Toolbar>
          <Typography variant="h6">
            React Class with dropdown UI
          </Typography>
          <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <div style={{display: 'flex'}} onClick={this.handleToggleLogout}>
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Avatar"
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 1,
                }}
              >
                <Typography variant="body1">Jack S </Typography>
                <Typography variant="caption">
                  Frontend Developer
                </Typography>
              </Box>
            </div>
          </Box>
          <Box ml={2}>
              <Link to="/"  >
                {" "}
               <LogoutIcon/>
              </Link>
              </Box>
        </Toolbar>
        
      </AppBar>
    );
  }
}

export default Topbar;
