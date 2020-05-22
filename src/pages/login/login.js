import React, { Component } from "react";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { connect } from "react-redux";
import { firebaseAppAuth, provider } from "utils/firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import { loginUser } from "actions";
import BackgroundImg from "asset/background.jpeg";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  handleLogin = () => {
    const { loginUser } = this.props;
    const { email, password } = this.state;
    loginUser({ email, password });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    return (
      <Grid
        container
        style={{
          background: `url('${BackgroundImg}')`,
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        justify="center"
        alignItems="center"
      >
        <Grid item style={{ backgroundColor: "#fff", padding: "1rem" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChangePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
            // className={classes.submit}
          >
            Sign Up/Sign In
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
  user: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
});

export default withFirebaseAuth({
  provider,
  firebaseAppAuth,
})(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
