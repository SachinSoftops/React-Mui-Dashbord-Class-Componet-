import React, { Component } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@mui/material";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

class UsingModelComponents extends React.Component<DialogTitleProps> {
  render() {
    const { children, classes, onClose, ...other } = this.props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  }
}

const StyledDialogTitle = withStyles(styles)(UsingModelComponents);

interface CustomizedDialogsState {
  open: boolean;
}

class CustomizedDialogs extends Component<{}, CustomizedDialogsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add User
        </Button>
        
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          
        >
          <StyledDialogTitle 
            id="customized-dialog-title"
            onClose={this.handleClose}
          >
            Add User Details
          </StyledDialogTitle>
          <MuiDialogContent style={{maxWidth:"520px"}}  dividers>
            <TextField
              placeholder=" Enter A Name"
              id="margin-normal"
              name="Name"
              sx={{ "& input": { height: "10px" } }}
              fullWidth
              autoComplete="Name"
              margin="normal"
            />
            <TextField
              placeholder="Enter A Email"
              id="margin-normal"
              name="email"
              sx={{ "& input": { height: "10px" } }}
              fullWidth
              autoComplete="email"
              margin="normal"
            />
            <TextField
              placeholder="Enter A Age"
              id="margin-normal"
              name="age"
              sx={{ "& input": { height: "10px" } }}
              fullWidth
              autoComplete="age"
              margin="normal"
            />
            <Button variant="contained" 
            
            style={{
              marginTop:"15px",
              color: '#fff',
              backgroundColor: '#198754',
              borderColor: '#198754',
            }}
              >
              ADD
            </Button>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Save changes
            </Button>
          </MuiDialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UsingModelComponents;
