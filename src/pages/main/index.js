import React, { Component } from "react";
import { connect } from "react-redux";
import HotelBooking from "component/HotelBooking";
import { getHotels } from "actions";
import { Grid, Container } from "@material-ui/core";
import Header from "component/header";
class MainPage extends Component {
  componentDidMount() {
    const { getHotels } = this.props;
    getHotels();
  }

  render() {
    const { hotels, searchText } = this.props;
    return (
      <>
        <Header title={"Hotel Booking"} />
        <Container>
          {!!searchText && !!hotels ? (
            <Grid container spacing={2}>
              {hotels.map(
                (hotel) =>
                  hotel.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) && (
                    <Grid item key={hotel._id}>
                      <HotelBooking key={hotel._id} hotel={hotel} />
                    </Grid>
                  )
              )}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {!!hotels ? (
                hotels.map((hotel) => (
                  <Grid item key={hotel._id}>
                    <HotelBooking key={hotel._id} hotel={hotel} />
                  </Grid>
                ))
              ) : (
                <>No hotel available now!</>
              )}
            </Grid>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
  user: state.user.email,
  hotels: state.hotel.all,
  searchText: state.hotel.searchText,
});

const mapDispatchToProps = (dispatch) => ({
  getHotels: () => dispatch(getHotels()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
