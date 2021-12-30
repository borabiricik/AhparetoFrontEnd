import { Formik } from "formik";
import { getLayoutName } from "Functions/Router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
} from "reactstrap";
import { updatePollsterGroup } from "stores/PollsterGroups/pollsterGroupSlice";
import Swal from "sweetalert2";

const EditPollsterGroup = ({
  match: {
    params: { id },
  },
}) => {
  const data = useSelector((state) => state.pollsterGroups.pollsterGroupsData);
  const success = useSelector((state) => state.pollsterGroups.success);
  const dispatch = useDispatch();
  const history = useHistory();

  if (data) {
    const editData = data.find((d) => d.id == parseInt(id));
    if(editData)
    {
      return (
        <div className="content">
          <Formik
            initialValues={{
              id: editData.id,
              name: editData.name,
              userId: editData.userId,
            }}
            onSubmit={async (values) => {
             dispatch(updatePollsterGroup({...values,history}));
              
            }}
          >
            {({ values, handleSubmit, handleChange }) => {
              return (
                <Card>
                  <CardHeader tag={"h2"}>Edit Pollster Group</CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm="4">
                        <Input
                          name="name"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          placeholder="İsim Giriniz..."
                        />
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Button color="success" onClick={handleSubmit}>
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              );
            }}
          </Formik>
        </div>
      );
    }
    else {
      return <Redirect to={getLayoutName(history) + "/pollstergroups"} />
    }
  } else {
    return <Redirect to={getLayoutName(history) + "/pollstergroups"} />
  }
};

export default EditPollsterGroup;
