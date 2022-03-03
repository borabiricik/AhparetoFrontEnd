import Loading from "components/Common/Loading";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactTable from "react-table-6";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { getSurveyCriterias } from "stores/Survyes/surveySlice";
import { getSurveyItems } from "stores/Survyes/surveySlice";

const ViewCriterias = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.surveys.criterias);
  const itemsLoading = useSelector((state) => state.surveys.itemsLoading);
  useEffect(() => {
    dispatch(getSurveyCriterias(params.id));

    return () => {};
  }, []);

  if (itemsLoading) {
    return <Loading />
  } else {
    return (
      <div className="content">
        <Formik>
          {() => {
            return (
              <Card>
                <CardHeader tag="h2">Criterias</CardHeader>
                <CardBody>
                  <ReactTable
                    data={items}
                    minRows={0}
                    columns={[
                      {
                        Header: "Criteria",
                        accessor: "Name",
                        headerStyle: {
                          textAlign: "left",
                        },
                      },
                      {
                        Header: "Is Lower Better ?",
                        accessor: "isLower",
                        headerStyle: {
                          textAlign: "left",
                        },
                        Cell: (props) => {
                          return props.value ? "Yes" : "No";
                        },
                      },
                    ]}
                  />
                </CardBody>
              </Card>
            );
          }}
        </Formik>
      </div>
    );
  }
};

export default ViewCriterias;
