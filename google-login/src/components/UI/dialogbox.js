import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Label from "./label";

const useStyles = makeStyles({
  root: {},
});

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paper: {
        // width: props.width ? props.width : "300px",
        width: "fit-content",
        borderColor: "#1f1f1f",
        borderStyle: "solid",
        borderWidth: "0.2px",
        borderRadius: "7px",
        backgroundColor: "#101010",
        color: "#fff",
      },
    },
  },
});

const DialogBox = (props) => {
  const dialogboxStyle = useStyles(props);

  const handleClose = () => {
    props.closeDialog();
  };

  const submit = () => {
    console.log("[form submitted]");
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog
        open={props.open}
        onClose={handleClose}
        className={dialogboxStyle.root}
        disableBackdropClick
      >
        <DialogTitle id="responsive-dialog-title">
          <Label color="white">{props.title}</Label>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        {props.saveCancelDialog && (
          <DialogActions style={{ padding: "4.3%" }}>
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={props.submit} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </MuiThemeProvider>
  );
};

export default DialogBox;
