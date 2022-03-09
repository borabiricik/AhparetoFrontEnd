import Loading from "components/Common/Loading";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactTable from "react-table-6";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { getDemografik } from "stores/Survyes/surveySlice";
import { getSurveyItems } from "stores/Survyes/surveySlice";

const ViewDemografik = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const mydemografik = useSelector((state) => state.surveys.mydemografik);
  const isDemografikLoading = useSelector((state) => state.surveys.isDemografikLoading);

  const getData = async () => {
    dispatch(getDemografik(id));
  }


  useEffect(() => {
   getData()
  }, []);

  if (!isDemografikLoading && mydemografik) {
    {
      return (
        <div className="content">
          <Formik>
            {() => {
              return (
                <Card>
                  <CardHeader tag="h2">Demographic Info</CardHeader>
                  <CardBody>
                    <ReactTable
                      data={mydemografik}
                      minRows={0}
                      columns={[
                        {
                          Header: "Name",
                          accessor: "Name",
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
    }
  } else {
    return <Loading />;
  }
};

export default ViewDemografik;
