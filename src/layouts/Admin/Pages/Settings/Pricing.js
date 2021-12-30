import CommonTable from "components/Common/Tables/CommonTable";
import { getLayoutName } from "Functions/Router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardTitle, Row } from "reactstrap";
import { getPrice } from "stores/Settings/priceSlice";

const Pricing = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.price.priceData);
  const loading = useSelector((state) => state.price.loading);
  const history = useHistory();
  const getData = async () => {
    await dispatch(getPrice());
  };
  useEffect(() => {
    getData();
  }, []);
  if (!loading && tableData) {
    return (
      <div className="content">
        <Card className="p-3">
          <CardHeader>
          <Row className="justify-content-between align-items-center">
            <CardTitle className="m-0 p-0" tag={"h2"}>
              Payment - Pricing Settings
            </CardTitle>

            <Button
              color="info"
              onClick={() =>
                history.push(getLayoutName(history) + "/create/price")
              }
            >
              Paket Oluştur
            </Button>
          </Row>
          </CardHeader>
          <CardBody>
            <CommonTable
              actionPageNames={{
                edit: getLayoutName(history) + "/edit/price/",
              }}
              tableData={tableData}
              columns={[
                { title: "Title" },
                { detail: "Detila" },
                { month: "Month" },
                { tax: "Tax-KDV" },
                { priceValue: "Price" },
                { row: "Row" },
              ]}
              idKey="id"
              title="Paket Listesi"
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

export default Pricing;
