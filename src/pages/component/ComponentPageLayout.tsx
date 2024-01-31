import React, { Component } from "react";
import { Outlet } from "react-router-dom";

interface ComponentPageLayoutProps {}

class ComponentPageLayout extends Component<ComponentPageLayoutProps> {
  render() {
    return (
      <>
        <Outlet />
      </>
    );
  }
}

export default ComponentPageLayout;
