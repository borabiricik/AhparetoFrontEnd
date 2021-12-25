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

const Pollsters = () => {
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

  if (loading === false) {
    return (
      <div className="content">
        <Card className="p-3">
          <CardHeader>
            <Row className="justify-content-between align-items-center">
              <CardTitle className="m-0 p-0" tag={"h2"}>
                Anketör Listesi
              </CardTitle>
              <Button color="info">Anketör Oluştur</Button>
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
                    <p>Anketör Sayısı</p>
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
              // actionPageNames={{
              //   edit: getLayoutName(history) + "/edit/pollstergroup/",
              // }}
              columns={[{ nameSurName: "Grup İsmi" },{email:"E-mail"},{phone:"Tel.No."},{identityNumber:"Kimlik No"},{pollsterGroup:"Grup Adı",isArray:true}]}
              // deleteAction={deletePollsterGroup}
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

export default Pollsters;
