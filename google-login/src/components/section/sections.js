import React, { useEffect, useState } from "react";
import SectionCard from "./sectioncard";
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";
import SectionService from "../../services/sectionService";
import { Redirect } from "react-router";
import LoadingIndicator from "../UI/loader";
import AddSection from "./addSection";
import NoSections from "./noSections";
import { isBrowser, isMobile } from "react-device-detect";

const sectionAttribute = {
  id: NaN,
  name: "",
  tasks: [
    {
      id: NaN,
      name: "",
      priority: "",
      assigned: "",
      completed: false,
    },
  ],
};

const browserColumns = 3;
const mobileColumns = 1;

const useStyles = makeStyles({
  sections: {
    columnCount: () => {
      if (isMobile) {
        return mobileColumns;
      } else {
        return browserColumns;
      }
    },
    columnGap: "10px",
    padding: "10px",
    display: "inline-block",
    columnGap: "normal",
    textAlign: "left",
  },

  root: {
    width: "400px",
  },
});

const Sections = (props) => {
  const sectionCardsStyle = useStyles();
  const [sections, setSections] = useState([sectionAttribute]);
  // const [createSection, setCreateSection] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const nameFormSubmit = (section) => {
    console.log("[Submit Section Name change]", section);
  };

  const onAddTask = () => {
    // backend api to add task
  };

  useEffect(() => {
    if (props.currentLabel) {
      const sectionsResponse = trackPromise(getSections(props.currentLabel.id));

      sectionsResponse.then((res) => {
        console.log(res);

        if (res.status === 401) {
          localStorage.clear();
          setTokenExpired(true);
        } else {
          const sections = res.sections;
          setSections(sections);
        }
      });
    }
    return () => setSections([]);
  }, [props.labelChangeFromSideBar]);

  useEffect(() => {
    if (props.currentLabel) {
      const sectionsResponse = trackPromise(getSections(props.currentLabel.id));

      sectionsResponse.then((res) => {
        console.log(res);

        if (res.status === 401) {
          localStorage.clear();
          setTokenExpired(true);
        } else {
          const sections = res.sections;
          setSections(sections);
        }
      });
    } else {
    }
    return () => setSections([]);
  }, []);

  const getSections = (label_id) => {
    const response = trackPromise(
      SectionService.getSections(
        {
          access_token: localStorage.getItem("access_token"),
          label_id: label_id,
        },
        "/resource/section"
      ),
      "sections"
    );

    return response;
  };

  const toggleTaskStatus = (tasks, id) => {
    console.log(tasks, id);

    const sectionsUpdated = sections.map((section) => {
      const sectionNew = { ...section };
      if (section.id === id) {
        sectionNew.tasks = tasks;
      }

      return sectionNew;
    });

    setSections(sectionsUpdated);

    // backend Api to change task status
  };

  const addSection = (sectionName) => {
    const requestBody = {
      section: { label_id: props.currentLabel.id, name: sectionName },
      access_token: localStorage.getItem("access_token"),
    };
    const createSectionResponse = trackPromise(
      SectionService.createSection(requestBody, "/resource/section")
    );

    createSectionResponse.then((res) => {
      console.log("[Create Section response]", res);

      if (res.status === 401) {
        localStorage.clear();
        setTokenExpired(true);
      } else {
        const sectionId = res.sections.id;
        setSections((sections) => [
          ...sections,
          { id: sectionId, name: sectionName, tasks: [] },
        ]);
      }
    });
  };

  const closeTaskEditors = () => {
    // new feature
  };

  const updateTasks = (tasks, sectionId) => {
    console.log(tasks, sectionId);

    const sectionsUpdated = sections.map((section) => {
      const sectionNew = { ...section };
      if (section.id === sectionId) {
        sectionNew.tasks = tasks;
      }

      return sectionNew;
    });

    setSections(sectionsUpdated);
  };

  return (
    <div className={sectionCardsStyle.root}>
      <AddSection
        addSection={addSection}
        // createSection={createSection}
        submitCreateSection={addSection}
      />
      <div className={sectionCardsStyle.sections}>
        <LoadingIndicator area="sections" />
        {sections.length === 0 && <NoSections />}
        {tokenExpired && <Redirect to="/login" />}
        {sections.map((section) => {
          if (section.name) {
            return (
              <SectionCard
                key={section.id}
                section={section}
                nameFormSubmit={nameFormSubmit}
                addTask={onAddTask}
                tasks={section.tasks}
                toggleTaskStatus={toggleTaskStatus}
                closeTaskEditors={closeTaskEditors}
                updateTasks={updateTasks}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Sections;
