import React from "react";
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

const dataTable = [
  ["Deneme Anket", "17/04/2000", "18/04/2000", "33%"],
  ["Deneme Anket2", "17/04/2000", "18/04/2000", "26%"],
];

const SurveysTable = () => {
  const [data, setData] = React.useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        surveyName: prop[0],
        startTime: prop[1],
        endTime: prop[2],
        participation: prop[3],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.surveyName +
                    ", \nposition: " +
                    obj.startTime +
                    ", \noffice: " +
                    obj.endTime +
                    ", \nage: " +
                    obj.participation +
                    "\n}."
                );
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
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                    obj.surveyName +
                    ", \nposition: " +
                    obj.startTime +
                    ", \noffice: " +
                    obj.endTime +
                    ", \nage: " +
                    obj.participation +
                    "\n}."
                );
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
                <CardTitle tag="h4">Anket Listesi</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable                
                  data={data}
                  filterable
                  resizable={true}
                  columns={[
                    {
                      Header: "Anket Adı",
                      accessor: "surveyName",
                    },
                    {
                      Header: "Başlangıç Tarihi",
                      accessor: "startTime",
                    },
                    {
                      Header: "Bitiş Tarihi",
                      accessor: "endTime",
                    },
                    {
                      Header: "Katılım",
                      accessor: "participation",
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

export default SurveysTable;
