import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import SideBar from "../sidebar/sidebar";
import CardBox from "../UI/cardbox";
import HomeDiv from "./homepageflex";
import { makeStyles } from "@material-ui/core/styles";
import LabelHeader from "../labelheader/labelheader";
import Sections from "../section/sections";
import Label from "../UI/label";

const useStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "row",
    gap: "2%",
  },
  baseDiv: {
    display: "flex",
    flexDirection: "row",
    gap: "4%",
  },
});

const labelAttribute = {
  id: NaN,
  name: "",
  sections: [],
  color: "",
  current: false,
};

const Home = () => {
  const [authRequired, setAuthRequired] = useState(false);
  const [renderHome, setRenderHome] = useState(false);
  const baseStyle = useStyles();
  // ==============================

  const [currentLabel, setCurrentLabel] = useState(labelAttribute);
  const [labelChanged, setLabelChanged] = useState(false);
  // ========================

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setRenderHome(true);
    } else {
      setAuthRequired(true);
      console.log("[Redirecting to login page]");
    }
  }, []);

  const addLabel = (label) => {
    // add label
  };

  const labelNameChangeFormSubmit = (label) => {
    // change label name
    console.log("[Label changed]", label);
  };

  const changeCurrentLabel = (label) => {
    localStorage.setItem("currentLabel", JSON.stringify(label));
    setCurrentLabel(label);
    setLabelChanged(!labelChanged);
  };

  return (
    <div className={baseStyle.base}>
      {authRequired && <Redirect to="/login" />}

      {renderHome && (
        <div className={baseStyle.baseDiv}>
          <SideBar
            addLabel={addLabel}
            showSections={changeCurrentLabel}
            setCurrentLabel={(label) => setCurrentLabel(label)}
            authRequired={authRequired}
          />
          {currentLabel.name && (
            <HomeDiv flexDirection="column">
              <LabelHeader
                label={currentLabel}
                prevLabelName={(prevLabelName) =>
                  setCurrentLabel((prevLabel) => ({
                    ...prevLabel,
                    name: prevLabelName,
                  }))
                }
                showLabel={changeCurrentLabel}
                labelNameFormSubmit={labelNameChangeFormSubmit}
              />

              <CardBox
                align="flex-start"
                marginTop="0%"
                flexDirection="column"
                marginLeft="auto"
                padding=".5%"
              >
                <Sections
                  currentLabel={currentLabel}
                  labelChangeFromSideBar={labelChanged}
                />
              </CardBox>
            </HomeDiv>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
