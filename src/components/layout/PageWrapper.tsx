import React, { Component } from "react";
import { ReactNode } from "react";
import { connect } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";


type Props = {
  state?: string;
  children: ReactNode;
  dispatch: Function; // Add dispatch prop
};

class PageWrapper extends Component<Props> {
  componentDidMount() {
    this.updateAppState();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.state !== prevProps.state) {
      this.updateAppState();
    }
  }

  updateAppState() {
    const { state, dispatch } = this.props;
    if (state) {
      dispatch(setAppState(state));
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}

// Connect the component to the Redux store
export default connect()(PageWrapper);
