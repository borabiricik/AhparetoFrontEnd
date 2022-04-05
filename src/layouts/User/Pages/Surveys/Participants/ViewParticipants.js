import Loading from "components/Common/Loading";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactTable from "react-table-6";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { getSurveyParticipants } from "stores/Participants/participantsStore";
import { getSurveyItems } from "stores/Survyes/surveySlice";

const ViewParticipants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.participants.participants);
  useEffect(() => {
    dispatch(getSurveyParticipants(params.id));
  }, []);

  if (participants) {
    return (
      <div className="content">
        <Formik>
          {() => {
            return (
              <Card>
                <CardHeader tag="h2">Items</CardHeader>
                <CardBody>
                  <ReactTable
                    data={participants}
                    minRows={0}
                    columns={[
                      {
                        Header: "Phone Number",
                        accessor: "PhoneNumber",
                        headerStyle: {
                          textAlign: "left",
                        },
                      },
                      {
                        Header: "Status",
                        accessor: "Status",
                        headerStyle: {
                          textAlign: "left",
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
  } else {
    return <Loading />;
  }
};

export default ViewParticipants;
