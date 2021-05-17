import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Label from "../UI/label";
import { IconButton } from "@material-ui/core";
import AddLogo from "../UI/add.svg";
import { Editor } from "../UI/editorbox";
import Card from "../UI/card";

const useStyles = makeStyles({
  addIconStyle: {
    display: "flex",
    gap: "4px",
    borderRadius: "4px",
    margin: "3%",
    color: "grey",
    fontSize: "18px",
    "&:hover": {
      border: ".5px solid grey",
      backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
  },
  noSections: {
    margin: "auto",
    alignContent: "center",
  },
});

const AddSection = (props) => {
  const addSectionStyle = useStyles();
  const [createSection, setCreateSection] = useState(false);
  const [sectionName, setSectionName] = useState("");

  const addSection = () => {
    setCreateSection(true);
  };

  const cancelEdit = () => {
    setSectionName("");
    setCreateSection(false);
  };

  const addSectionSubmit = (event) => {
    event.preventDefault();
    props.submitCreateSection(sectionName);
    setCreateSection(false);
  };

  const sectionHandler = (event) => {
    setSectionName(event.target.value);
  };

  if (createSection) {
    return (
      <Card width="70%">
        <Editor
          property={{}}
          // taskId={props.section.id}
          onCancelEdit={cancelEdit}
          submit={addSectionSubmit}
          propertyHandler={sectionHandler}
        />
      </Card>
    );
  }

  return (
    <IconButton
      size="small"
      className={addSectionStyle.addIconStyle}
      onClick={addSection}
    >
      <img
        src={AddLogo}
        alt="react logo"
        height="25px"
        width="30px"
        style={{ marginRight: "4px" }}
      />
      <Label color="hsla(0,0%,80%,.47)">Add Section</Label>
    </IconButton>
  );
};

export default AddSection;
