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
import DemografikTable from "components/Common/Tables/DemografikTable";

const Demografik = () => {
  const dispatch = useDispatch();
  const demografikData = useSelector((state) => state.demografik.demografikData);
  const loading = useSelector(state=> state.demografik.loading)
  const getData = async () => {
    await dispatch(getDemografik());  
  };
  useEffect(() => {
    getData();
  }, []);
  if(loading == false){
    return (
      <div className="content">
        <Card className="p-3">
          <CardHeader>
            <Row className="justify-content-between align-items-center">
              <CardTitle className="m-0 p-0" tag={"h2"}>
                Demografik Bilgi Listesi
              </CardTitle>
              <Button color="info">Demografik Bilgi oluştur</Button>
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
  
            {/* <DemografikTable / > */}
            {/*{"API field ismi": "Tabloda gözükmesini istediğimiz isim"} */}
            <CommonTable columns={[{"description":"Açıklama"}]} />
          </CardBody>
        </Card>
      </div>
    );
  }
  else{
    console.log("yükleniyor")
    return(
      <div className="content">
        <h1>Yükleniyor...</h1>
      </div>
    )
  }
};

export default Demografik;
