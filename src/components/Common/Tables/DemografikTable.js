import React, { useEffect } from "react";
import classNames from "classnames";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

import ReactTable from "components/ReactTable/ReactTable.js";
import { useDispatch, useSelector } from "react-redux";
import { getDemografik } from "stores/Demografik/demografikSlice";

const dataTable = [["Deneme Anket"], ["Deneme Anket2"]];

const DemografikTable = () => {
  const [data, setData] = React.useState(
    dataTable.map((prop, key) => {
      console.log("demografik:"+ prop)
      return {
        // id: key,
        // description: prop[0],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
              }}
              color="info"
              size="sm"
              className={classNames("btn-icon btn-link like", {
                "btn-neutral": key < 5,
              })}
            >
              <i className="tim-icons icon-heart-2" />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
              }}
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link like", {
                "btn-neutral": key < 5,
              })}
            >
              <i className="tim-icons icon-pencil" />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              onClick={() => {
                var newdata = data;
                newdata.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    data.splice(i, 1);
                    console.log(data);
                    return true;
                  }
                  return false;
                });
                setData(newdata);
              }}
              color="danger"
              size="sm"
              className={classNames("btn-icon btn-link like", {
                "btn-neutral": key < 5,
              })}
            >
              <i className="tim-icons icon-simple-remove" />
            </Button>{" "}
          </div>
        ),
      };
    })
  );
  return (
    <>
      <Row className="mt-5">
        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Demografik Bilgi Listesi</CardTitle>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={data}
                filterable
                resizable={true}
                columns={[
                  {
                    Header: "Açıklama",
                    accessor: "description",
                  },
                  {
                    Header: "İşlemler",
                    accessor: "actions",
                    sortable: false,
                    filterable: false,
                  },
                ]}
                defaultPageSize={10}
                //   showPaginationTop={false}
                //   showPaginationBottom={true}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DemografikTable;
