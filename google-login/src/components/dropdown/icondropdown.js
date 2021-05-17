import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import FlagIcon from "@material-ui/icons/Flag";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Label from "../UI/label";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CustomIcon from "../UI/icon";

const getPriorityIcon = (props) => {
  let iconTag = "";
  switch (props.dropdownIcon) {
    case "priority":
      iconTag = <FlagIcon fontSize="small" />;
      break;
    case "labelColor":
      iconTag = <FiberManualRecordIcon fontSize="small" />;
      break;
    default:
      iconTag = <FiberManualRecordIcon fontSize="small" />;
  }
  return iconTag;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    height: "30px",
    maxHeight: "50px",
    margin: "0px",
  },
  iconButton: {
    padding: "2px",
  },
}));

const CustomIconDropdown = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const menuStyle = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseItem = (item) => {
    console.log("[Item]", item.name, item.color);
    props.onChange(item);
    setAnchorEl(null);
  };

  // set icon
  const icon = getPriorityIcon(props);

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
        style={{ textTransform: "none" }}
        className={menuStyle.iconButton}
        startIcon={<CustomIcon color={props.color}>{icon}</CustomIcon>}
      >
        <Label color="hsla(0,0%,80%,.87)">{props.name}</Label>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {props.masterData.map((item) => {
          return (
            <MenuItem
              key={item.name}
              onClick={() => handleCloseItem(item)}
              className={menuStyle.root}
            >
              <CustomIcon color={item.color}>{icon}</CustomIcon>

              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default CustomIconDropdown;
