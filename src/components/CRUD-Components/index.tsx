import React, { Component } from 'react'
import CrudComponents from './CrudComponents';
 import UsingModelComponents from './UsingModelComponents';
//  import ModelWithFunctionality from './ModelWithFunctionality';

 class MainComponents extends Component {
  render() {
    return (
      <div>
        {/* < CrudComponents /> */}
        < UsingModelComponents />
      </div>
    )
  }
}


export default  MainComponents;