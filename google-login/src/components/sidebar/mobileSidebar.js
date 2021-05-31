import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Card from "../UI/card";
import CardBox from "../UI/cardbox";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MenuIcon from "@material-ui/icons/Menu";

import {
  Button,
  Drawer,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
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
  drawerPaper: {
    width: "30%",
    background: "#282828",
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

const MobileSidebar = (props) => {
  const [labels, setLabels] = useState([]);
  const [open, setOpen] = React.useState(true);
  const sideBarStyle = useStyles(props);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [drawer, setDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ ...drawer, [side]: open });
  };

  const handleClick = () => {
    setOpen(!open);
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

  //   const updateLabels = (labelNew) => {
  //     const labelsClone = labels.map((label) => {
  //       const labelClone = { ...label };
  //       return labelClone;
  //     });

  //     labelsClone.push(labelNew);
  //     setLabels(labelsClone);
  //     setDialogOpen(false);
  //   };

  const showSections = (label) => {
    // toggleDrawer("left", false);
    setDrawer({ ...drawer, ["left"]: false });
    props.showSections(label);
  };

  return (
    <CardBox align="flex-start">
      {tokenExpired && <Redirect to="/login" />}
      <Card width="fit-content">
        {labels && (
          <div>
            <IconButton
              size="small"
              // className={addSectionStyle.addIconStyle}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon style={{ color: "whitesmoke" }} />
            </IconButton>
            <Drawer
              BackdropProps={{ invisible: false }}
              open={drawer.left}
              onClose={toggleDrawer("left", false)}
              classes={{
                paper: sideBarStyle.drawerPaper,
              }}
            >
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
                  <ListItemText primary="Labels" />
                </ListItem>

                <List component="div" disablePadding>
                  {labels.map((label) => {
                    return (
                      <ListItem
                        key={label.id}
                        button
                        className={sideBarStyle.nested}
                        selected={label.current}
                        onClick={() => {
                          showSections(label);
                        }}
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
              </List>
            </Drawer>
          </div>
        )}
      </Card>
    </CardBox>
  );
};

export default MobileSidebar;
