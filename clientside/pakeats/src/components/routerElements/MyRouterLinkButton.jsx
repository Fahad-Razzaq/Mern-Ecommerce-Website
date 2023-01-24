import React from "react";
import { LinkButton } from "../../styles/globalStyles";
import MyButton from "../muiElements/MyButton";

const MyRouterLinkButton = ({to,variant,color,text}) => {
  return (
    <LinkButton to={to} end>
      <MyButton
        variant={variant}
        color={color}
        text={text}
      />
    </LinkButton>
  );
};

export default MyRouterLinkButton;
