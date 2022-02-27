import React from "react";
import { Card } from "reactstrap";

const SettingsCard = ({ children,...rest }) => {
  return <Card {...rest} className="card-settings">{children}</Card>;
};

export default SettingsCard;
