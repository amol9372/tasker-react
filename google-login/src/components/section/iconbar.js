import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Label from "../UI/label";
import Button from "@material-ui/core/Button";
import TaskFieldEditBox from "../task/taskfieldEditbox";

const useStyles = makeStyles((theme) => ({
  iconBar: {
    display: "flex",
    border: "0.5px solid grey",
    borderRadius: "7px",
    margin: "auto",
    marginRight: "inherit",
  },
  iconStyle: {
    color: "grey",
    padding: "auto",
    fontSize: "18px",
  },
  addIconStyle: {
    addIconFlex: {
      display: "flex",
      marginTop: "0px",
    },

    marginRight: "0px",
    color: "grey",
    padding: "auto",
    fontSize: "18px",
    "&:hover, &.Mui-focusVisible": { color: "lightblue" },
  },
}));

const IconBar = (props) => {
  const iconBarStyle = useStyles();

  const changeSectionName = () => {
    props.onSectionChange();
  };

  const deleteSection = () => {
    console.log("[Delete Section clicked]");
  };

  return (
    <div className={iconBarStyle.iconBar}>
      <IconButton size="small" onClick={changeSectionName}>
        <EditIcon className={iconBarStyle.iconStyle} />
      </IconButton>
      <IconButton size="small" onClick={deleteSection}>
        <DeleteOutlineIcon className={iconBarStyle.iconStyle} />
      </IconButton>
    </div>
  );
};

export default IconBar;

export const AddButton = (props) => {
  const iconStyle = useStyles();
  const [newtask, setNewTask] = useState({
    id: NaN,
    name: "",
    priority: "Priority 4",
    color: "#dfdedd",
    status: false,
  });

  const cancelEdit = () => {
    props.onCancelEdit();
    setNewTask({
      id: NaN,
      name: "",
      priority: "Priority 4",
      color: "#dfdedd",
    });
  };

  const submitNameChange = (task) => {
    // event.preventDefault();
    // api call
    // console.log(task);
    props.submit(task);
  };

  const taskFieldEditorHandler = () => {};

  if (props.addTaskMode) {
    return (
      <TaskFieldEditBox
        id={props.id}
        // onchange={taskFieldEditorHandler}
        onCancelEdit={cancelEdit}
        submit={submitNameChange}
        task={newtask}
      />
    );
  }

  const addTask = () => {
    props.displayTaskEditor();
  };

  return (
    <div className={iconStyle.addIconStyle.addIconFlex}>
      <Button
        variant="text"
        onClick={addTask}
        startIcon={
          <AddIcon
            className={iconStyle.addIconStyle}
            style={{ color: "#ff4d4d" }}
          />
        }
      >
        <Label color="hsla(0,0%,80%,.47)">Add Task</Label>
      </Button>
    </div>
  );
};
