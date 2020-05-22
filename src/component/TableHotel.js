import React, { Component } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Input,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Add, Cancel, Edit, Delete } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  getHotels,
  createHotel,
  setNewHotelAvatar,
  setNewHotelPhotos,
  removeNewHotelPhoto,
  removeSelectedHotelPhoto,
  setSelectedHotelAvatar,
  setSelectedHotelPhotos,
  addSelectedHotelPhotos,
  editHotel,
  deleteHotel,
} from "actions";
import toastr from "component/Toastr";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "10rem",
};
const photoStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
const useStyles = (theme) => ({
  logoButton: {
    marginTop: 5,
    border: "1px solid #555d66",
    borderRadius: 5,
    color: "#555d66",
    borderStyle: "dashed",
    fontSize: 13,
    height: 40,
    width: "100%",
    "&:hover": {
      backgroundColor: "white",
    },
    fontFamily: "Roboto, sans-serif",
  },
});

class TableHotel extends Component {
  state = {
    openCreateDialog: false,
    openEditDialog: false,
    selectedHotel: {
      _id: "",
      avatar: null,
      name: "",
      phone: "",
      description: "",
      photos: null,
      roomAvailable: 0,
    },
    newHotel: {
      name: "",
      phone: "",
      description: "",
    },
  };

  componentDidMount() {
    this.fetchHotels();
  }

  fetchHotels() {
    const { getHotels } = this.props;
    getHotels();
  }

  handleCloseCreate = () => {
    this.setState({
      openCreateDialog: false,
    });
  };

  handleOpenCreate = () => {
    this.setState({
      openCreateDialog: true,
    });
  };

  handleCreate = async () => {
    const { createHotel } = this.props;
    const { newHotel } = this.state;
    await createHotel({
      name: newHotel.name,
      description: newHotel.description,
      phoneNumber: newHotel.phone,
    });
    this.fetchHotels();
    this.handleCloseCreate();
  };

  handleCloseEdit = () => {
    this.setState({
      openEditDialog: false,
    });
  };

  handleOpenEdit = (hotel) => {
    const { setSelectedHotelPhotos, setSelectedHotelAvatar } = this.props;
    setSelectedHotelPhotos(hotel.photos);
    setSelectedHotelAvatar(hotel.avatar);
    this.setState({
      openEditDialog: true,
      selectedHotel: {
        _id: hotel._id,
        name: hotel.name,
        phone: hotel.phoneNumber,
        description: hotel.description,
        avatar: hotel.avatar,
        photos: hotel.photos,
        roomAvailable: hotel.roomAvailable,
      },
    });
  };

  handleChangeRoomAvailable = (e) => {
    const room = e.target.value;
    this.setState((prevState) => ({
      selectedHotel: {
        ...prevState.selectedHotel,
        roomAvailable: room,
      },
    }));
  };

  handleDeleteHotel = async (hotel) => {
    const { deleteHotel } = this.props;
    await deleteHotel({
      _id: hotel._id,
      name: hotel.name,
    });
    this.fetchHotels();
  };

  handleEdit = async () => {
    const { editHotel, selectedHotelAvatar, selectedHotelPhotos } = this.props;
    const { selectedHotel } = this.state;
    await editHotel({
      hotel: {
        _id: selectedHotel._id,
        name: selectedHotel.name,
        photos: selectedHotel.photos,
        description: selectedHotel.description,
        avatar: selectedHotel.avatar,
        phoneNumber: selectedHotel.phone,
        roomAvailable: selectedHotel.roomAvailable,
      },
      photos: selectedHotelPhotos,
      avatar: selectedHotelAvatar,
    });
    this.fetchHotels();
    this.handleCloseEdit();
  };

  handleBrowsePhotos = (e) => {
    const { newHotelPhotos } = this.props;
    if (!newHotelPhotos || newHotelPhotos.length < 5) {
      e.preventDefault();
      let file = e.target.files[0];
      //validating the file
      //check if the file is exists
      if (!file) {
        toastr.error("No image is selected!", "Error");
        return;
      }
      //check if the image size is larger than 1MB
      if (file.size > 4194304) {
        toastr.error("Image size must be less than 4MB!", "Error");
        return;
      }
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        this.setState({
          selectedFile: file,
          selectedFilePath: URL.createObjectURL(file),
        });
        this.props.setNewHotelPhotos(file);
      } else {
        toastr.error(
          "Please provide a valid image. (JPG, JPEG or PNG)",
          "Error"
        );
      }
    } else {
      toastr.error("Reach maximum photos.", "Error");
    }
  };

  handleBrowseEditPhotos = (e) => {
    const { selectedHotelPhotos } = this.props;
    if (!selectedHotelPhotos || selectedHotelPhotos.length < 5) {
      e.preventDefault();
      let file = e.target.files[0];
      //validating the file
      //check if the file is exists
      if (!file) {
        toastr.error("No image is selected!", "Error");
        return;
      }
      //check if the image size is larger than 1MB
      if (file.size > 4194304) {
        toastr.error("Image size must be less than 4MB!", "Error");
        return;
      }
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        this.setState({
          selectedFile: file,
          selectedFilePath: URL.createObjectURL(file),
        });
        this.props.addSelectedHotelPhotos(file);
      } else {
        toastr.error(
          "Please provide a valid image. (JPG, JPEG or PNG)",
          "Error"
        );
      }
    } else {
      toastr.error("Reach maximum photos.", "Error");
    }
  };

  handleBrowseEditLogo = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (!file) {
      toastr.error("No image is selected!", "Error");
      return;
    }
    //check if the image size is larger than 1MB
    if (file.size > 4194304) {
      toastr.error("Image size must be less than 4MB!", "Error");
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      let output = document.getElementById("previewEdit");
      output.src = URL.createObjectURL(file);
      this.setState({
        selectedHotelAvatar: file.name,
      });
      this.props.setSelectedHotelAvatar(file);
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleBrowseLogo = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (!file) {
      toastr.error("No image is selected!", "Error");
      return;
    }
    //check if the image size is larger than 1MB
    if (file.size > 4194304) {
      toastr.error("Image size must be less than 4MB!", "Error");
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      let output = document.getElementById("preview");
      output.src = URL.createObjectURL(file);
      this.setState({
        newHotelAvatar: file.name,
      });
      this.props.setNewHotelAvatar(file);
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleChangeNewName = (e) => {
    const name = e.target.value;
    this.setState((prevState) => ({
      newHotel: {
        ...prevState.newHotel,
        name,
      },
    }));
  };

  handleChangeNewPhone = (e) => {
    const phone = e.target.value;
    this.setState((prevState) => ({
      newHotel: {
        ...prevState.newHotel,
        phone,
      },
    }));
  };

  handleChangeNewDescription = (e) => {
    const description = e.target.value;
    this.setState((prevState) => ({
      newHotel: {
        ...prevState.newHotel,
        description,
      },
    }));
  };

  handleChangeSelectedName = (e) => {
    const name = e.target.value;
    this.setState((prevState) => ({
      selectedHotel: {
        ...prevState.selectedHotel,
        name,
      },
    }));
  };

  handleChangeSelectedPhone = (e) => {
    const phone = e.target.value;
    this.setState((prevState) => ({
      selectedHotel: {
        ...prevState.selectedHotel,
        phone,
      },
    }));
  };

  handleChangeSelectedDescription = (e) => {
    const description = e.target.value;
    this.setState((prevState) => ({
      selectedHotel: {
        ...prevState.selectedHotel,
        description,
      },
    }));
  };

  renderNewHotelPhotos = () => {
    const { newHotelPhotos, removeNewHotelPhoto } = this.props;
    return newHotelPhotos.map((item, index) => {
      if (item && typeof item === "object" && item.size > 0) {
        return (
          <Grid
            container
            key={index}
            item
            xs={10}
            style={{
              ...photoStyles,
              backgroundImage: `url(${URL.createObjectURL(item)})`,
            }}
            justify="center"
          >
            <IconButton onClick={() => removeNewHotelPhoto(item)}>
              <Cancel color={"error"} />
            </IconButton>
          </Grid>
        );
      } else {
        return (
          <Grid
            item
            key={index}
            md={4}
            sm={6}
            xs={6}
            style={{ ...photoStyles, backgroundImage: `url(${item})` }}
          >
            <IconButton
              style={{ width: "100%", borderRadius: "0" }}
              onClick={() => removeNewHotelPhoto(item)}
            >
              <Cancel color={"error"} />
            </IconButton>
          </Grid>
        );
      }
    });
  };

  renderSelectedHotelPhotos = () => {
    const { selectedHotelPhotos, removeSelectedHotelPhoto } = this.props;
    return (
      !!selectedHotelPhotos &&
      selectedHotelPhotos.map((item, index) => {
        if (item && typeof item === "object" && item.size > 0) {
          return (
            <Grid
              container
              key={index}
              item
              xs={10}
              style={{
                ...photoStyles,
                backgroundImage: `url(${URL.createObjectURL(item)})`,
              }}
              justify="center"
            >
              <IconButton onClick={() => removeSelectedHotelPhoto(item)}>
                <Cancel color={"error"} />
              </IconButton>
            </Grid>
          );
        } else {
          return (
            <Grid
              item
              key={index}
              md={4}
              sm={6}
              xs={6}
              style={{ ...photoStyles, backgroundImage: `url(${item})` }}
            >
              <IconButton
                style={{ width: "100%", borderRadius: "0" }}
                onClick={() => removeSelectedHotelPhoto(item)}
              >
                <Cancel color={"error"} />
              </IconButton>
            </Grid>
          );
        }
      })
    );
  };

  render() {
    const { hotels, classes } = this.props;
    const {
      openCreateDialog,
      openEditDialog,
      selectedHotel,
      newHotel,
    } = this.state;
    return (
      <React.Fragment>
        <Grid container justify={"space-between"}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Hotels
          </Typography>
          <Button startIcon={<Add />} onClick={this.handleOpenCreate}>
            Create New
          </Button>
          <Dialog
            open={openCreateDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseCreate}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            maxWidth="lg"
          >
            <DialogTitle id="alert-dialog-slide-title">
              Create New Hotel
            </DialogTitle>
            <DialogContent>
              <Grid container direction="column">
                <TextField
                  variant={"outlined"}
                  label="Name"
                  value={newHotel.name}
                  onChange={(e) => this.handleChangeNewName(e)}
                />
                <TextField
                  variant={"outlined"}
                  label="Phone Number"
                  value={newHotel.phone}
                  onChange={(e) => this.handleChangeNewPhone(e)}
                />
                <TextField
                  variant={"outlined"}
                  label="Description"
                  value={newHotel.description}
                  onChange={(e) => this.handleChangeNewDescription(e)}
                  multiline
                  rows={3}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseCreate} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleCreate} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!hotels ? (
              hotels.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>
                    <img style={{ height: "5rem" }} src={row.avatar} alt="" />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant={"outlined"}
                      startIcon={<Edit />}
                      onClick={() => this.handleOpenEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant={"outlined"}
                      startIcon={<Delete />}
                      onClick={() => this.handleDeleteHotel(row)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
            <Dialog
              open={openEditDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleCloseEdit}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              maxWidth="lg"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {selectedHotel.name}
              </DialogTitle>
              <DialogContent>
                <Grid container direction="column">
                  <Grid
                    item
                    style={{
                      border: this.state.selectedHotelAvatar
                        ? "none"
                        : "1px dashed",
                    }}
                  >
                    <Input
                      type="file"
                      id="selectedHotelAvatar"
                      onChange={(e) => this.handleBrowseEditLogo(e)}
                      style={{ display: "none" }}
                    />
                    <img
                      style={{ ...imgStyles }}
                      alt=""
                      id={"previewEdit"}
                      src={selectedHotel.avatar}
                    />
                  </Grid>
                  <Grid container justify={"center"}>
                    <button
                      className={classes.logoButton}
                      color={"default"}
                      onClick={() =>
                        document.getElementById("selectedHotelAvatar").click()
                      }
                    >
                      Browse
                    </button>
                  </Grid>
                  <TextField
                    variant={"outlined"}
                    label="Name"
                    value={selectedHotel.name}
                    onChange={(e) => this.handleChangeSelectedName(e)}
                  />
                  <TextField
                    variant={"outlined"}
                    label="Phone Number"
                    value={selectedHotel.phone}
                    onChange={(e) => this.handleChangeSelectedPhone(e)}
                  />
                  <TextField
                    variant={"outlined"}
                    label="Description"
                    value={selectedHotel.description}
                    multiline
                    rows={3}
                    onChange={(e) => this.handleChangeSelectedDescription(e)}
                  />
                  <TextField
                    variant={"outlined"}
                    label="Room Available"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectedHotel.roomAvailable}
                    inputProps={{ min: "0", max: "100", step: "1" }}
                    onChange={this.handleChangeRoomAvailable}
                  />
                  <Grid>
                    <Typography className={classes.title}>Photos</Typography>
                    <Grid container className={classes.sideBarBox}>
                      {this.renderSelectedHotelPhotos()}
                      <Grid
                        item
                        container
                        justify={"center"}
                        alignItems="center"
                        md={12}
                        sm={12}
                        xs={12}
                        style={{
                          ...photoStyles,
                          backgroundColor: "#F3ECEC",
                          border: "1px dashed #555d66",
                          cursor: "pointer",
                          color: "#555d66",
                          minHeight: 50, //maintain height when removing all images
                        }}
                        onClick={() =>
                          document.getElementById("selectedHotelPhotos").click()
                        }
                      >
                        <Input
                          type="file"
                          id="selectedHotelPhotos"
                          onChange={(e) => this.handleBrowseEditPhotos(e)}
                          style={{ display: "none" }}
                        />
                        <Add fontSize="small" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseEdit} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleEdit} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  hotels: state.hotel.all,
  newHotelAvatar: state.avatar.newHotelAvatar,
  newHotelPhotos: state.avatar.newHotelPhotos,
  selectedHotelAvatar: state.avatar.selectedHotelAvatar,
  selectedHotelPhotos: state.avatar.selectedHotelPhotos,
});

const mapDispatchToProps = (dispatch) => ({
  getHotels: () => dispatch(getHotels()),
  createHotel: (data) => dispatch(createHotel(data)),
  setNewHotelAvatar: (avatar) => dispatch(setNewHotelAvatar(avatar)),
  setNewHotelPhotos: (photo) => dispatch(setNewHotelPhotos(photo)),
  removeNewHotelPhoto: (photo) => dispatch(removeNewHotelPhoto(photo)),
  setSelectedHotelAvatar: (avatar) => dispatch(setSelectedHotelAvatar(avatar)),
  addSelectedHotelPhotos: (photo) => dispatch(addSelectedHotelPhotos(photo)),
  setSelectedHotelPhotos: (photos) => dispatch(setSelectedHotelPhotos(photos)),
  removeSelectedHotelPhoto: (photo) =>
    dispatch(removeSelectedHotelPhoto(photo)),
  editHotel: (data) => dispatch(editHotel(data)),
  deleteHotel: ({ _id, name }) => dispatch(deleteHotel({ _id, name })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableHotel));
