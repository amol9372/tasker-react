import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "1px",
    flexDirection: (props) =>
      props.flexDirection ? props.flexDirection : "row",
    width: "100%",
    marginTop: "6%",
  },
});

const HomeDiv = (props) => {
  const homeDivStyle = useStyles(props);

  return <div className={homeDivStyle.root}>{props.children}</div>;
};

export default HomeDiv;
