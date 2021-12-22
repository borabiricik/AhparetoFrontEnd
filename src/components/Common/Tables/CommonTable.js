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
import { useSelector } from "react-redux";

const CommonTable = ({ columns }) => {
  const tableData = useSelector((state) => state.demografik.demografikData);
  const dataColumns = columns.map((column, key) => {
    return {
      Header: Object.values(columns[key]).toString(),
      accessor: Object.keys(columns[key]).toString(),
      sortable: true,
      filterable: true,
    };
  });

  dataColumns[dataColumns.length] = {
    Header: "İşlemler",
    accessor: "actions",
    Cell: ({ cell }) => (
      <Row className="justify-content-end w-100">
          <Button
        color="info"
        size="sm"
        className={classNames("btn-icon btn-link like")}
        onClick={()=>alert("asdasd")}
      >
        <i className="tim-icons icon-heart-2" />
      </Button>
      </Row>
    ),
  };

  console.log(dataColumns);
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
                data={tableData}
                filterable
                resizable={true}
                columns={dataColumns}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CommonTable;
