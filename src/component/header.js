import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { logoutUser } from "actions";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { setSearchText } from "actions";

const useStyles = (theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
});

class Header extends React.Component {
  state = {
    search: "",
  };

  onChangeSearch = (e) => {
    const { setSearchText } = this.props;
    setSearchText(e.target.value);
  };

  render() {
    const { title, user, searchText, classes } = this.props;
    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
          <TextField
            variant={"outlined"}
            value={searchText}
            placeholder="Search"
            onChange={this.onChangeSearch}
          />
          {user ? (
            <Button variant={"outlined"} onClick={this.props.logout}>
              Logout
            </Button>
          ) : (
            <Button
              variant={"outlined"}
              onClick={() => this.props.history.push("/login")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  searchText: state.hotel.searchText,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser()),
  setSearchText: (text) => dispatch(setSearchText(text)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Header))
);
