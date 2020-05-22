import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./dashboard";
import LoginPage from "./login";
class PreDashboardPage extends Component {
  render() {
    const { isLoginAdmin } = this.props;
    if (!isLoginAdmin) {
      return <LoginPage />;
    }
    return <Dashboard />;
  }
}

const mapStateToProps = (state) => ({
  isLoginAdmin: state.admin.isLogin,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PreDashboardPage);
