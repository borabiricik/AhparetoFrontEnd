import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import ReactTable from "components/ReactTable/ReactTable";

const CustomTable = ({ tableData, tableColumns, title }) => {
  console.log(tableData);
  return (
    <Row className="mt-5">
      <Col xs={12} md={12}>
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{title && title}</CardTitle>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={tableData && tableData}
              filterable
              resizable={true}
              columns={[
                {
                  Header: "Deneme",
                  accessor: "asdasd",
                  sortable: true,
                  filterable: true,
                },
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CustomTable;
