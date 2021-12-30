import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import CommonTable from "components/Common/Tables/CommonTable";
import { getPollsterGroups } from "stores/PollsterGroups/pollsterGroupSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLayoutName } from "Functions/Router";
import { deletePollsterGroup } from "stores/PollsterGroups/pollsterGroupSlice";

const PollsterGroups = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pollsterGroupsData = useSelector(
    (state) => state.pollsterGroups.pollsterGroupsData
  );
  const loading = useSelector((state) => state.pollsterGroups.loading);

  const getData = async () => {
    await dispatch(getPollsterGroups());
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading === false) {
    return (
      <div className="content">
        <Card className="p-3">
          <CardHeader>
            <Row className="justify-content-between align-items-center">
              <CardTitle className="m-0 p-0" tag={"h2"}>
                Pollster Groups
              </CardTitle>
              <Button
                color="info"
                onClick={() =>
                  history.push(getLayoutName(history) + "/create/pollstergroup")
                }
              >
                Create Pollster Groups
              </Button>
            </Row>
          </CardHeader>
          <CardBody className="p-0 my-5">
            <Col md="12" lg="4" className="p-0">
              <Card color="default">
                <Row className="m-4 justify-content-between align-items-center">
                  <div>
                    <CardText tag={"h2"} className="m-0">
                      {pollsterGroupsData.length}
                    </CardText>
                    <p>Pollster Groups</p>
                  </div>

                  <div className="bg-primary rounded-circle p-3">
                    <FaRegUserCircle
                      style={{ fontSize: "3rem", color: "white" }}
                    />
                  </div>
                </Row>
              </Card>
            </Col>
            <CommonTable
              idKey={"id"}
              tableData={pollsterGroupsData}
              actionPageNames={{
                edit: getLayoutName(history) + "/edit/pollstergroup/",
              }}
              columns={[{ name: "Group Name" }]}
              deleteAction={deletePollsterGroup}
            />
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="content">
        <h2>Yükleniyor...</h2>
      </div>
    );
  }
};

export default PollsterGroups;
