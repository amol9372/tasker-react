import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TaskItem from "./taskfield";
import { AddButton } from "./../section/iconbar";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TaskService from "../../services/taskService";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },
  completedTasks: {
    color: "hsla(0,0%,100%,.57)",
    marginRight: "auto",
  },
}));

const TaskFieldBox = (props) => {
  const classes = useStyles();

  const [addTaskMode, setAddTaskMode] = useState(false);
  const [tasks, setTasks] = useState(props.tasks);
  const [tokenExpired, setTokenExpired] = useState(false);

  const onTaskItemClick = (id) => {
    console.log("[Edit clicked]", id);

    const newTasks = tasks.map((item) => {
      const itemClone = { ...item };
      itemClone.edit = false;
      if (item.id === id) {
        itemClone.edit = true;
      }
      return itemClone;
    });

    setTasks(newTasks);
  };

  const toggleTaskStatus = (toggledTask) => {
    console.log("[toggled task]", toggledTask);

    const newTasks = tasks.map((task) => {
      const taskClone = { ...task };
      // taskClone.edit = false;
      if (task.id === toggledTask.id) {
        taskClone.status = !taskClone.status;
      }
      return taskClone;
    });

    setTasks(newTasks);
    props.toggleTaskStatus(newTasks, props.section.id);
    // updated items in parent
  };

  const onCancelTaskEditor = (id) => {
    console.log("[Cancel clicked]", id);

    const newTasks = tasks.map((task) => {
      const taskClone = { ...task };
      taskClone.edit = false;
      if (task.id === id) {
        taskClone.edit = false;
      }
      return taskClone;
    });

    setTasks(newTasks);
  };

  const isCompletedTasks = () => {
    if (tasks) {
      return tasks.filter((task) => task.status).length > 0;
    }

    return false;
  };

  const submitTask = (task) => {
    console.log("[Create Task]", task);

    const requestBody = {
      task: { ...task, section_id: props.section.id },
      access_token: localStorage.getItem("access_token"),
    };
    const upsertTaskResponse = trackPromise(
      TaskService.upsertTask(requestBody, "/resource/task")
    );

    upsertTaskResponse.then((res) => {
      console.log("[Upsert Task response]", res);

      if (res.status === 401) {
        localStorage.clear();
        setTokenExpired(true);
      } else {
        const taskId = res.task.id;
        task.id = taskId;

        const tasksUpdated = tasks.map((task) => {
          const taskClone = { ...task };
          return taskClone;
        });

        tasksUpdated.push(task);
        setTasks(tasksUpdated);
        setAddTaskMode(false);
        // set tasks in parent section
        props.updateTasks(tasksUpdated);
      }
    });
  };

  return (
    <React.Fragment>
      {tokenExpired && <Redirect to="/login" />}
      {tasks && (
        <List dense className={classes.root}>
          {tasks
            .filter((task) => task.status === false)
            .map((task) => {
              return (
                <TaskItem
                  id={task.id}
                  key={task.id}
                  value={task.name}
                  task={task}
                  editMode={task.edit}
                  onEditToggle={onTaskItemClick}
                  onCancel={onCancelTaskEditor}
                  toggleTaskCompletion={toggleTaskStatus}
                  completed={false}
                />
              );
            })}
        </List>
      )}
      <AddButton
        displayTaskEditor={() => setAddTaskMode(true)}
        addTaskMode={addTaskMode}
        onCancelEdit={() => setAddTaskMode(false)}
        submit={submitTask}
      />

      {isCompletedTasks() && (
        <div>
          {/* <Divider style={{ color: "green" }} /> */}
          <Accordion style={{ background: "#282828", border: "0" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.completedTasks}>
                {tasks.filter((task) => task.status === true).length}
                {"  "}
                Completed Tasks
              </Typography>
            </AccordionSummary>

            <List dense className={classes.root}>
              {tasks
                .filter((task) => task.status === true)
                .map((task) => {
                  return (
                    <TaskItem
                      id={task.id}
                      key={task.id}
                      value={task.value}
                      task={task}
                      editMode={task.edit}
                      onEditToggle={onTaskItemClick}
                      onCancel={onCancelTaskEditor}
                      completed={true}
                      border="0"
                      toggleTaskCompletion={toggleTaskStatus}
                      submit={submitTask}
                    />
                  );
                })}
            </List>
          </Accordion>
        </div>
      )}
    </React.Fragment>
  );
};

export default TaskFieldBox;
