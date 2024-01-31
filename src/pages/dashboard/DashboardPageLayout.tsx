import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

class DashboardPageLayout extends Component {
  render() {
    return (
      <>
        <Outlet />
      </>
    );
  }
}

export default DashboardPageLayout;
