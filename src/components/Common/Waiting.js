import React from "react";
import { CgSandClock } from "react-icons/cg";
import { Row } from "reactstrap";

const Waiting = () => {
  return (
    <Row className="align-items-center">
      <p className="m-0">Waiting for done</p>
      <CgSandClock color="#F9F871" size={18} style={{ margin: "5px" }} />
    </Row>
  );
};

export default Waiting;
