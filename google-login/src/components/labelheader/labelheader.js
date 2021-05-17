import React, { useState, useRef, useEffect } from "react";
import Card from "../UI/card";
import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../UI/button";
import { Editor } from "../UI/editorbox";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import { IconButton } from "@material-ui/core";
import InviteUserDialog from "../dialog/inviteUserDialog";

const useStyles = makeStyles({
  header: {
    marginRight: "10px",
    gap: "20px",
  },
  share: {
    marginRight: "25px",

    paddingBottom: "5px",
  },
});

const LabelHeader = (props) => {
  const [label, setLabel] = useState(props.label);
  const prevLabel = useRef(props.label);
  const labelHeaderStyle = useStyles();
  const [editLabelMode, setEditLabelMode] = useState(false);
  const [inviteUserDialog, setInviteUserDialog] = useState(false);

  const labelNameHandler = (event) => {
    setLabel((label) => ({
      ...label,
      name: event.target.value,
    }));
  };

  const submitNameChange = (event) => {
    event.preventDefault();
    props.labelNameFormSubmit(label);
  };

  const cancelEdit = (id) => {
    setLabel(prevLabel.current);
    setEditLabelMode(false);
  };

  useEffect(() => {
    setEditLabelMode(false);
    setLabel(props.label);
    prevLabel.current = props.label;
  }, [props.showLabel]);

  if (editLabelMode) {
    return (
      <Card width="70%" marginBottom="35px">
        <Editor
          property={label}
          taskId={label.id}
          onCancelEdit={cancelEdit}
          propertyHandler={labelNameHandler}
          submit={submitNameChange}
        />
      </Card>
    );
  }

  return (
    <Card flexDirection="row" padding="1%" width="100%" bgcolor="#1f1f1f">
      <div className={labelHeaderStyle.header}>
        <MyButton
          type="button"
          varient="text"
          backgroundColor="#1f1f1f"
          text={label.name}
          textSize="26px"
          onClick={() => {
            setEditLabelMode(true);
          }}
        />
        <IconButton onClick={() => setInviteUserDialog(true)}>
          <GroupOutlinedIcon
            style={{ color: "hsla(0,0%,60%,.57)", fontSize: 25 }}
          />
          <span style={{ color: "hsla(0,0%,60%,.57)", font: "caption" }}>
            {/* {label.shared.users.length} */} 0
          </span>
          <InviteUserDialog
            open={inviteUserDialog}
            closeDialog={() => setInviteUserDialog(false)}
            existingUsers={["amolsingh", "vikaskumar"]}
          />
        </IconButton>
      </div>
    </Card>
  );
};

export default LabelHeader;
