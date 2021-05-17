import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Label from "../UI/label";

const useStyles = makeStyles({
  noSections: {
    margin: "auto",
    alignContent: "center",
  },
});

const NoSections = (props) => {
  const addSectionStyle = useStyles();
  return (
    <div className={addSectionStyle.noSections}>
      <Label font="18px" color="white">
        No Sections
      </Label>{" "}
    </div>
  );
};

export default NoSections;
