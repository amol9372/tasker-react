import React, { useState } from "react";
import Card from "./../UI/card";
import CustomIconDropdown from "./../dropdown/icondropdown";
import { Editor } from "./../UI/editorbox";

const priorityMasterData = [
  { name: "Priority 1", color: "#ff726f" },
  { name: "Priority 2", color: "#8baae4" },
  { name: "Priority 3", color: "#83e292" },
  { name: "Priority 4", color: "#dfdedd" },
];

// const taskAttribute = {
//   name: "",
//   priority: "Priority 4",
//   // validation: "",
//   // error: false,
//   color: "#dfdedd",
//   default: false,
// };

const TaskFieldEditBox = (props) => {
  const [task, setTask] = useState(props.task);

  const taskFieldEditorHandler = (event) => {
    // props.onchange(event.target.value);
    setTask((prevTask) => ({
      ...prevTask,
      name: event.target.value,
    }));
  };

  const cancelEdit = (id) => {
    setTask(props.task);
    props.onCancelEdit(id);
  };

  const taskPriorityChangeHandler = (taskColor) => {
    setTask((prevTask) => ({
      ...prevTask,
      color: taskColor.color,
      priority: taskColor.name,
    }));
  };

  const onTaskSubmit = (event) => {
    event.preventDefault();
    props.submit(task);
  };

  return (
    <Card width="97%" flexGap="6px" border="1px solid grey">
      <Editor
        property={task}
        taskId={props.id}
        onCancelEdit={cancelEdit}
        masterData={priorityMasterData}
        submit={onTaskSubmit}
        propertyHandler={taskFieldEditorHandler}
      >
        <CustomIconDropdown
          name={task.priority}
          color={task.color}
          dropdownIcon="priority"
          masterData={priorityMasterData}
          onChange={taskPriorityChangeHandler}
        />
      </Editor>
    </Card>
  );
};

export default TaskFieldEditBox;
