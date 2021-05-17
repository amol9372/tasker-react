import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Card from "../UI/card";
import CardBox from "../UI/cardbox";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import AddLabelDialog from "../dialog/addLabelDialog";
import { trackPromise } from "react-promise-tracker";
import LabelService from "../../services/labelService";
import LoadingIndicator from "../UI/loader";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "hsla(0,0%,100%,.97)",
    paddingLeft: "26px",
    gap: "10px",
    paddingRight: "20px",
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#282828",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    minWidth: "30px",
  },
  labelText: {
    "& .MuiTypography-body1": {
      fontSize: "15px",
    },
  },
}));

const labelAttribute = {
  id: NaN,
  name: "",
  color: "",
  current: false,
  default: false,
  shared: [],
};

const SideBar = (props) => {
  const [labels, setLabels] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const sideBarStyle = useStyles(props);
  const [tokenExpired, setTokenExpired] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const response = trackPromise(
      LabelService.getLabels(
        { access_token: localStorage.getItem("access_token") },
        "/resource/label"
      ),
      "sidebar"
    );
    response.then((res) => {
      console.log(res);

      if (res.status === 401) {
        localStorage.clear();
        setTokenExpired(true);
      } else {
        const labels = res.data;
        setLabels(labels);

        if (labels.length > 0) {
          if (localStorage.getItem("currentLabel")) {
            props.setCurrentLabel(
              JSON.parse(localStorage.getItem("currentLabel"))
            );
          } else {
            localStorage.setItem("currentLabel", JSON.stringify(labels[0]));
            props.setCurrentLabel(labels[0]);
          }
        }
      }
    });
  }, []);

  const updateLabels = (labelNew) => {
    const labelsClone = labels.map((label) => {
      const labelClone = { ...label };
      return labelClone;
    });

    labelsClone.push(labelNew);
    setLabels(labelsClone);
    setDialogOpen(false);
  };

  return (
    <CardBox align="flex-start">
      {tokenExpired && <Redirect to="/login" />}
      <Card width="300px">
        {labels && (
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={sideBarStyle.root}
          >
            <ListItem
              button
              onClick={handleClick}
              className={sideBarStyle.header}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
              <ListItemText primary="Labels" />
              <ListItemSecondaryAction>
                <IconButton style={{ color: "hsla(0,0%,90%,.97)" }}>
                  <Add onClick={() => setDialogOpen(true)} />

                  <AddLabelDialog
                    open={dialogOpen}
                    closeDialog={closeDialog}
                    existingLabels={labels.map((label) => label.name)}
                    updateLabelsOnSuccess={updateLabels}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {labels.map((label) => {
                  return (
                    <ListItem
                      key={label.id}
                      button
                      className={sideBarStyle.nested}
                      selected={label.current}
                      onClick={() => props.showSections(label)}
                    >
                      <ListItemIcon className={sideBarStyle.icon}>
                        <FiberManualRecordIcon
                          style={{ color: label.color, fontSize: 15 }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={label.name}
                        className={sideBarStyle.labelText}
                        style={{
                          color: "hsla(0,0%,100%,.87)",
                        }}
                      />
                      {label.sections > 0 && (
                        <span style={{ color: "hsla(0,0%,70%,.67)" }}>
                          {label.sections.length}
                        </span>
                      )}
                    </ListItem>
                  );
                })}
                <LoadingIndicator area="sidebar" />
              </List>
            </Collapse>
          </List>
        )}
      </Card>
    </CardBox>
  );
};

export default SideBar;
