import Card from "../UI/card";
import { makeStyles } from "@material-ui/core/styles";
import SectionName from "./sectionname";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  sectionCard: {
    marginLeft: "5px",
    marginRight: "5px",
    paddinBottom: "10px",
  },
}));

const SectionTitle = (props) => {
  const sectionTitleStyle = useStyles();
  const [sectionEdit, setSectionEdit] = useState(false);

  const cancelSectionNameChange = () => {
    props.showPrevSection();
    setSectionEdit(false);
  };

  const sectionNameChangeHandler = (name) => {
    props.sectionNameChangeHandler(name);
  };

  return (
    <Card
      flexDirection="row"
      width="95%"
      className={sectionTitleStyle.sectionCard}
      marginBottom="30px"
    >
      <SectionName
        editMode={sectionEdit}
        onCancel={cancelSectionNameChange}
        changeSectionName={() => setSectionEdit(true)}
        sectionNameHandler={sectionNameChangeHandler}
        nameFormSubmit={() => props.nameFormSubmit()}
        section={props.section}
      />
    </Card>
  );
};

export default SectionTitle;
