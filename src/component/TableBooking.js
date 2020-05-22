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
import {} from "@material-ui/icons";
import { connect } from "react-redux";
import { getBookings } from "actions";

class TableBooking extends Component {
  state = {};

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings() {
    const { getBookings } = this.props;
    getBookings();
  }

  render() {
    const { bookings } = this.props;
    console.log(bookings);
    return (
      <React.Fragment>
        <Grid container justify={"space-between"}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Bookings
          </Typography>
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Hotel</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>User</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!bookings ? (
              bookings.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>
                    <img
                      style={{ height: "5rem" }}
                      src={row.hotel.avatar}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{row.hotel.name}</TableCell>
                  <TableCell>{row.hotel.phoneNumber}</TableCell>
                  <TableCell>{row.user.email}</TableCell>

                  {/* <TableCell align="right">
                    <Button
                      variant={"outlined"}
                      // startIcon={<Edit />}
                      // onClick={() => this.handleOpenEdit(row)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant={"outlined"}
                      // startIcon={<Delete />}
                      // onClick={() => this.handleDeleteHotel(row)}
                    >
                      Decline
                    </Button>
                  </TableCell> */}
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
  bookings: state.admin.bookings,
});

const mapDispatchToProps = (dispatch) => ({
  getBookings: () => dispatch(getBookings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableBooking);
