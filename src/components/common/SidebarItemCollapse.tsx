import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import { RootState } from "../../redux/store";
import { RouteType } from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";

type Props = {
  appState: string[]; 
  item: RouteType;
};

type State = {
  open: boolean;
};

class SidebarItemCollapse extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { appState, item } = this.props;
    if (appState.includes(item.state)) {
      this.setState({ open: true });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { appState, item } = this.props;
    if (prevProps.appState !== appState || prevProps.item !== item) {
      if (appState.includes(item.state)) {
        this.setState({ open: true });
      }
    }
  }

  handleClick = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  render() {
    const { item } = this.props;
    const { open } = this.state;

    return (
      item.sidebarProps ? (
        <>
          <ListItemButton
            onClick={this.handleClick}
            sx={{
              "&:hover": {
                backgroundColor: colorConfigs.sidebar.hoverBg
              },
              paddingY: "12px",
              paddingX: "24px"
            }}
          >
            <ListItemIcon sx={{
              color: colorConfigs.sidebar.color
            }}>
              {item.sidebarProps.icon && item.sidebarProps.icon}
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography>
                  {item.sidebarProps.displayText}
                </Typography>
              }
            />
            {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
          </ListItemButton>
          <Collapse in={open} timeout="auto">
            <List>
              {item.child?.map((route, index) => (
                route.sidebarProps ? (
                  route.child ? (
                    <SidebarItemCollapse item={route} key={index} appState={[]} />
                  ) : (
                    <SidebarItem item={route} key={index} />
                  )
                ) : null
              ))}
            </List>
          </Collapse>
        </>
      ) : null
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  appState: state.appState.appState as unknown as string[], 
});

export default connect(mapStateToProps)(SidebarItemCollapse);
