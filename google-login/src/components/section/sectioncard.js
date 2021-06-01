import { useRef, useState } from "react";
import Card from "../UI/card";
import TaskFieldBox from "../task/taskfieldbox";
import React from "react";
import SectionTitle from "./sectiontitle";
import { isMobile } from "react-device-detect";

// const taskAttribute = {
//   id: NaN,
//   name: "",
//   priority: "",
//   completed: false,
// };

const SectionCard = (props) => {
  const [section, setSection] = useState(props.section);
  const prevSectionName = useRef(props.section.name);

  const nameChangeHandler = (name) => {
    setSection((section) => ({
      ...section,
      name: name,
    }));
  };

  const setPrevSection = () => {
    setSection((section) => ({
      ...section,
      name: prevSectionName.current,
    }));
  };

  const toggleTaskStatus = (tasks, sectionId) => {
    props.toggleTaskStatus(tasks, sectionId);
  };

  const getCardWidth = () => {
    if (isMobile) {
      return "100%";
    }
    return "300px";
  };

  return (
    <Card
      width={getCardWidth()}
      flexGap="4px"
      marginBottom="25px"
      display="inline-block"
      marginRight={() => {
        if (isMobile) {
          return "3px";
        }
        return "20px";
      }}
    >
      <SectionTitle
        section={section}
        sectionNameChangeHandler={nameChangeHandler}
        nameFormSubmit={() => props.nameFormSubmit(section)}
        showPrevSection={setPrevSection}
      />
      <TaskFieldBox
        addTask={() => props.addTask()}
        tasks={props.tasks}
        toggleTaskStatus={toggleTaskStatus}
        section={section}
        updateTasks={(task) => props.updateTasks(task, section.id)}
      />
    </Card>
  );
};

export default SectionCard;
