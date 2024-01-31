import React, { Component } from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
import { RootState } from "../../redux/store";
import { RouteType } from "../../routes/config";
import { connect } from "react-redux";

type Props = {
  item: RouteType;
  appState: string[]; // Adjust the type as needed
};

class SidebarItem extends Component<Props> {
  render() {
    const { item, appState } = this.props;

    return (
      item.sidebarProps && item.path ? (
        <ListItemButton
          component={Link}
          to={item.path}
          sx={{
            "&:hover": {
              backgroundColor: colorConfigs.sidebar.hoverBg
            },
            backgroundColor: appState.includes(item.state) ? colorConfigs.sidebar.activeBg : "unset",
            paddingY: "12px",
            paddingX: "24px"
          }}
        >
          <ListItemIcon sx={{
            color: colorConfigs.sidebar.color
          }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          {item.sidebarProps.displayText}
        </ListItemButton>
      ) : null
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  appState: state.appState.appState as unknown as string[], // Adjust the type as needed
});

export default connect(mapStateToProps)(SidebarItem);
