import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
  Slide,
} from "@material-ui/core";
import Slick from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { makeBooking, getHotels } from "actions";
import { withRouter } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class HotelBooking extends Component {
  state = {
    openBookingDialog: false,
  };

  toggleDialog = () => {
    this.setState((prevState) => ({
      openBookingDialog: !prevState.openBookingDialog,
    }));
  };

  handleBooking = async () => {
    const { makeBooking, hotel, isLogin, user, getHotels } = this.props;
    if (!isLogin) {
      this.props.history.push("/login");
    } else {
      await makeBooking({ hotelId: hotel._id, user: user });
      await getHotels();
    }
  };

  render() {
    const { hotel, classes } = this.props;
    const { openBookingDialog } = this.state;
    return (
      <>
        <Card className={classes.root} onClick={this.toggleDialog}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={hotel.name}
              height="140"
              image={hotel.avatar}
              title={hotel.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {hotel.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {hotel.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          open={openBookingDialog}
          TransitionComponent={Transition}
          onClose={this.handleCloseCreate}
        >
          <DialogTitle id="alert-dialog-slide-title">{hotel.name}</DialogTitle>
          <DialogContent>
            <Grid container>
              {Object.keys(hotel.photos).length > 0 && (
                <Grid item md={6}>
                  <Slick
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={1500}
                    infinite
                    arrows={false}
                  >
                    {hotel.photos.map((photo, index) => (
                      <img key={index} src={photo} alt="" />
                    ))}
                  </Slick>
                </Grid>
              )}
              <Grid item md={Object.keys(hotel.photos).length > 0 ? 6 : 12}>
                <Typography>Phone number: {hotel.phoneNumber}</Typography>
                <Typography>{hotel.description}</Typography>
                <Typography>
                  Room Available:{" "}
                  <span style={{ color: "red" }}>{hotel.roomAvailable}</span>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleDialog} color="primary">
              Back
            </Button>
            <Button
              disabled={hotel.roomAvailable === 0}
              onClick={this.handleBooking}
              color="primary"
            >
              Booking
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
  user: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  makeBooking: (data) => dispatch(makeBooking(data)),
  getHotels: () => dispatch(getHotels()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(HotelBooking))
);
