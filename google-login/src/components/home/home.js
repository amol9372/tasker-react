import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import SideBar from "../sidebar/sidebar";
import CardBox from "../UI/cardbox";
import HomeDiv from "./homepageflex";
import { makeStyles } from "@material-ui/core/styles";
import LabelHeader from "../labelheader/labelheader";
import Sections from "../section/sections";
import Logout from "../logout/logout";
import MobileSidebar from "../sidebar/mobileSidebar";
import { isMobile, isBrowser } from "react-device-detect";

const useStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "row",
    gap: "2%",
  },
  baseDiv: {
    display: "flex",
    flexDirection: () => {
      if (isMobile) {
        return "column";
      }
      return "row";
    },

    gap: "4%",
  },
  outerDiv: {
    display: "flex",
    flexDirection: "row",
    // padding: "30px",
    // marginRight: "2px",
    //width: "600px",

    // paddingRight: "10px",
  },
  horizontalBar: {
    display: "flex",
    flexDirection: "row",
  },
  logout: {
    marginLeft: "auto",
    marginRight: "10px",
    marginTop: "3%",
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

  const logoutUser = () => {
    localStorage.clear();
    setAuthRequired(true);
  };

  const getSideBar = () => {
    if (isMobile) {
      return (
        <div className={baseStyle.horizontalBar}>
          <MobileSidebar
            addLabel={addLabel}
            showSections={changeCurrentLabel}
            setCurrentLabel={(label) => setCurrentLabel(label)}
            authRequired={authRequired}
          />
          <div className={baseStyle.logout}>
            <Logout onLogout={logoutUser} />
          </div>
        </div>
      );
    }
    return (
      <SideBar
        addLabel={addLabel}
        showSections={changeCurrentLabel}
        setCurrentLabel={(label) => setCurrentLabel(label)}
        authRequired={authRequired}
      />
    );
  };

  const browserLogout = () => {
    return renderHome && isBrowser;
  };

  return (
    <div className={baseStyle.outerDiv}>
      {authRequired && <Redirect to="/login" />}

      {renderHome && (
        <div className={baseStyle.base}>
          <div className={baseStyle.baseDiv}>
            {getSideBar()}

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
        </div>
      )}
      {browserLogout() && (
        <div className={baseStyle.logout}>
          <Logout onLogout={logoutUser} />
        </div>
      )}
    </div>
  );
};

export default Home;
