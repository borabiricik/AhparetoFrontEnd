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
import { useDispatch, useSelector } from "react-redux";
import { getDemografik } from "stores/Demografik/demografikSlice";
import CommonTable from "components/Common/Tables/CommonTable";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLayoutName } from "Functions/Router";
import { Link } from "react-router-dom";
import { deleteDemografik } from "stores/Demografik/demografikSlice";
import Loading from "components/Common/Loading";

const Demografik = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const demografikData = useSelector(
    (state) => state.demografik.demografikData
  );
  const loading = useSelector((state) => state.demografik.loading);

  const getData = async () => {
    await dispatch(getDemografik());
  };
  useEffect(() => {
    getData();
  }, []);
  if (loading == false) {
    return (
      <div className="content">
        <Card className="p-3">
          <CardHeader>
            <Row className="justify-content-between align-items-center">
              <CardTitle className="m-0 p-0" tag={"h2"}>
                Demografik Bilgi Listesi
              </CardTitle>

              <Button color="info" onClick={()=>history.push(getLayoutName(history)+"/create/demografik")}>Create Demographic Info</Button>
            </Row>
          </CardHeader>
          <CardBody className="p-0 my-5">
            <Col md="12" lg="4" className="p-0">
              <Card color="default">
                <Row className="m-4 justify-content-between align-items-center">
                  <div>
                    <CardText tag={"h2"} className="m-0">
                      {demografikData && demografikData.length}
                    </CardText>
                    <p>Demografik Bilgi Sayısı</p>
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
              deleteAction={deleteDemografik}
              actionPageNames={{
                edit: getLayoutName(history) + "/edit/demografik/",
              }}
              tableData={demografikData}
              columns={[{ description: "Description" }]}
              idKey="id"
            />
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return (
      <Loading />
    );
  }
};

export default Demografik;
