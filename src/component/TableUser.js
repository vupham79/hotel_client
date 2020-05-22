import React, { Component } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getUsers } from "actions";

class TableUser extends Component {
  state = {};

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    const { getUsers } = this.props;
    getUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <React.Fragment>
        <Grid container justify={"space-between"}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Users
          </Typography>
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!users ? (
              users.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.all,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
