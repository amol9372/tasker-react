import Card from "../UI/card";
import Label from "../UI/label";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Editor } from "../UI/editorbox";
import IconBar from "./iconbar";

const useStyles = makeStyles((theme) => ({
  sectionName: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
}));

const SectionName = (props) => {
  const sectionNameStyle = useStyles();

  const cancelEdit = () => {
    props.onCancel();
  };

  const changeSectionName = () => {
    props.changeSectionName();
  };

  const sectionNameHandler = (event) => {
    props.sectionNameHandler(event.target.value);
  };

  const submitNameChange = (event) => {
    event.preventDefault();
    props.nameFormSubmit();
  };

  if (props.editMode) {
    return (
      <Card width="70%">
        <Editor
          property={props.section}
          taskId={props.section.id}
          onCancelEdit={cancelEdit}
          submit={submitNameChange}
          propertyHandler={sectionNameHandler}
        />
      </Card>
    );
  }

  return (
    <div className={sectionNameStyle.sectionName}>
      <Label color="white" font="20px">
        <span>{props.section.name}</span>
      </Label>
      <IconBar onSectionChange={changeSectionName} />
    </div>
  );
};

export default SectionName;
