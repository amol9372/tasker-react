import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TaskFieldEditBox from "./taskfieldEditbox";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

const useStyles = makeStyles((theme) => ({
  listItem: {
    border: (props) => (props.border ? props.border : "solid 1px black"),
    borderRadius: "8px",
    height: (props) => (props.height ? props.height : "43px"),
    gap: "10px",
  },
}));

const TaskItem = (props) => {
  const classes = useStyles(props);
  const [taskEditValue, setTaskEdit] = useState(props.value);

  const taskFieldEditorHandler = (value) => {
    setTaskEdit(value);
  };

  if (props.editMode) {
    return (
      <TaskFieldEditBox
        id={props.id}
        value={taskEditValue}
        onchange={taskFieldEditorHandler}
        onCancelEdit={(id) => props.onCancel(id)}
        submit={(task) => props.submit(task)}
        task={props.task}
      />
    );
  } else {
    return (
      <ListItem
        key={props.id}
        button
        onClick={(id) => props.onEditToggle(id)}
        className={classes.listItem}
      >
        <LabelOutlinedIcon fontSize="small" style={{ color: "grey" }} />
        <ListItemText
          primary={props.task.name}
          style={{
            color: "white",
            textDecoration: props.task.status === true ? "line-through" : "",
          }}
        />
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={() => props.toggleTaskCompletion(props.task)}
            style={{ color: "grey" }}
            defaultChecked={props.task.status}
            inputProps={{ "aria-labelledby": props.task.name }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
};

export default TaskItem;
