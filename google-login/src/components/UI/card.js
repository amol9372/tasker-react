import React from "react";
import classes from "../../components/UI/card.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: (props) => (props.display ? props.display : "flex"),
    background: (props) => (props.bgcolor ? props.bgcolor : "#282828"),
    width: (props) => (props.width ? props.width : "30%"),
    gap: (props) => (props.flexGap ? props.flexGap : "16px"),
    border: (props) => (props.border ? props.border : "0px solid"),
    flexDirection: (props) =>
      props.flexDirection ? props.flexDirection : "column",
    padding: (props) => (props.padding ? props.padding : "1.5%"),
    marginBottom: (props) => props.marginBottom,
    paddingBottom: (props) => props.paddingBottom,
    marginRight: (props) => props.marginRight,
    height: (props) => props.height,
  },

  size: {},
});

const Card = (props) => {
  const cardStyle = useStyles(props);

  return (
    <div className={`${classes.card} ${cardStyle.root}`}>{props.children}</div>
  );
};

export default Card;
