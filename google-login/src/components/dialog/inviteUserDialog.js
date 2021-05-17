import React, { useState } from "react";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";
import Card from "../UI/card";
import MyButton from "../UI/button";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, List, ListItemAvatar } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "hsla(0,0%,100%,.97)",
    paddingLeft: "26px",
    gap: "10px",
    paddingRight: "20px",
  },
  root: {
    width: "100%",
    backgroundColor: "#282828",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  inviteUser: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
  },
}));

const InviteUserDialog = (props) => {
  const inviteUserStyle = useStyles(props);
  const emailAttribute = {
    name: "",
    validation: "",
    error: false,
  };

  const [email, setEmail] = useState(emailAttribute);

  const handleClose = () => {
    setEmail(emailAttribute);
    props.closeDialog();
  };

  const emailChangeHandler = (event) => {
    const inputLabel = event.target.value;

    if (props.existingUsers.includes(inputLabel.trim())) {
      setEmail((prevEmail) => ({
        ...prevEmail,
        error: true,
        validation: "Label name already exists",
        name: inputLabel,
      }));
      return;
    }

    setEmail((prevEmail) => ({
      ...prevEmail,
      name: inputLabel,
      error: false,
      validation: "",
    }));
  };

  return (
    <div>
      <DialogBox
        width="400px"
        open={props.open}
        closeDialog={handleClose}
        title="Invite User"
        saveCancelDialog={false}
      >
        <Card
          width="90%"
          padding="6.5%"
          flexDirection="column"
          padding="4%"
          bgcolor="#262626"
        >
          <div className={inviteUserStyle.inviteUser}>
            <InputField
              label="Enter Email"
              type="text"
              value={email.name}
              onchange={emailChangeHandler}
              error={email.error}
              validationText={email.validation}
              required={true}
            />
            <MyButton
              size="medium"
              backgroundColor="hsl(12, 80%, 55%)"
              text="Invite"
            />
          </div>
          <List dense className={inviteUserStyle.root}>
            {props.existingUsers.map((item) => {
              return (
                <ListItem key={item}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item} secondary="Secondary text" />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </DialogBox>
    </div>
  );
};

export default InviteUserDialog;
