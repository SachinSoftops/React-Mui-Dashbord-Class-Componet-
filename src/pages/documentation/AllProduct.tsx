import React, { Component } from 'react'
import { Outlet } from 'react-router-dom';


export default class AllProduct extends Component {
  render() {
    return (
      <div>
        {/* This is A Computer Icon Component  */}
        <Outlet  />
      </div>
    )
  }
}
