import Loading from "components/Common/Loading";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactTable from "react-table-6";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { getSurveyItems } from "stores/Survyes/surveySlice";

const ViewItems = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.surveys.items);
  const itemsLoading = useSelector((state) => state.surveys.itemsLoading);
  useEffect(() => {
    dispatch(getSurveyItems(params.id));

    return () => {};
  }, []);

  if (!itemsLoading && items) {
    return (
      <div className="content">
        <Formik>
          {() => {
            return (
              <Card>
                <CardHeader tag="h2">Items</CardHeader>
                <CardBody>
                  {/* <Row>
                    {items.map((item) => {
                      return (
                        <Col sm={4}>
                          <Input value={item.Name} />
                        </Col>
                      );
                    })}
                  </Row> */}
                  <ReactTable data={items} minRows={0}  columns={[{
                    Header: "Name",
                    accessor: "Name",
                   headerStyle:{
                        textAlign:"left"
                   }
                  }]} />
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

export default ViewItems;
