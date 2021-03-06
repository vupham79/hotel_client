import React, { Component } from "react";
import { Fade, Grid, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";

class Spinner extends Component {
  render() {
    const { loading } = this.props;
    return (
      <Fade
        in={loading}
        style={{
          zIndex: 99999999,
          top: 0,
          bottom: 0,
          position: "fixed",
          backgroundColor: "rgba(268, 268, 268, 0.3)",
        }}
        unmountOnExit
      >
        <Grid container alignItems="center" justify="center">
          <CircularProgress
            style={{ color: "#337ab7", width: "80px", height: "80px" }}
          />
        </Grid>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.spinner.isLoading,
});

export default connect(mapStateToProps, null)(Spinner);
