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
import { useDispatch } from "react-redux";
import { getPollsters } from "stores/Pollsters/pollsterSlice";
import { useSelector } from "react-redux";
import { getLayoutName } from "Functions/Router";
import { useHistory } from "react-router-dom";
import { deletePollsterGroup } from "stores/PollsterGroups/pollsterGroupSlice";
import { deletePollster } from "stores/Pollsters/pollsterSlice";
import Loading from "components/Common/Loading";

const Pollsters = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pollstersData = useSelector((state) => state.pollsters.pollstersData);

  const loading = useSelector((state) => state.pollsters.loading);
  const getData = () => {
    dispatch(getPollsters());
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading === false && pollstersData) {
    // const editData = pollstersData.find(d=> d.PollsterId == id)
    // console.log(editData)
    return (
      <div className="content">
        <Card className="p-3">
          <CardHeader>
            <Row className="justify-content-between align-items-center">
              <CardTitle className="m-0 p-0" tag={"h2"}>
                Pollster List
              </CardTitle>
              <Button
                color="info"
                onClick={() =>
                  history.push(getLayoutName(history) + "/create/pollster")
                }
              >
                Create Pollster
              </Button>
            </Row>
          </CardHeader>
          <CardBody className="p-0 my-5">
            <Col md="12" lg="4" className="p-0">
              <Card color="default">
                <Row className="m-4 justify-content-between align-items-center">
                  <div>
                    <CardText tag={"h2"} className="m-0">
                      {pollstersData && pollstersData.length}
                    </CardText>
                    <p>Pollsters</p>
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
              tableData={pollstersData}
              columns={[
                { Name: "Name" },
                { SurName: "Soyad" },
                { Email: "E-mail" },
                { Phone: "Phone Number" },
                { IdentityNumber: "Identity Number" },
                { PollsterGroup: "Group Name", isArray: true },
              ]}
              // actionPageNames={{
              //   edit: getLayoutName(history) + "/edit/pollster/",
              // }}
              deleteAction={deletePollster}
              idKey={"pollsterId"}
            />
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Pollsters;
