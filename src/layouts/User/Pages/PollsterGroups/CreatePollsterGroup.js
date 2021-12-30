import { Formik } from "formik";
import { getLayoutName } from "Functions/Router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
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
import { createPollsterGroup } from "stores/PollsterGroups/pollsterGroupSlice";
import Swal from "sweetalert2";

const CreatePollsterGroup = () => {
  const success= useSelector(state=>state.demografik.success)

  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className="content">
      <Formik
        initialValues={{
          name: "",
          userId: parseInt(localStorage.getItem("userId")),
        }}
        onSubmit={async (values) => {
          await dispatch(createPollsterGroup({...values,history}));
          
          if (await success) {
            console.log(await success)
            Swal.fire({
              title: "Success",
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
              
            }).then((res) => {
              history.push(getLayoutName(history) + "/pollstergroups");
            });
          }
        }}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <Card>
              <CardHeader tag={"h2"}>Create Pollster Group</CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="4">
                      <label>Grup İsmi</label>
                      <Input name="name" type="text" onChange={handleChange} />
                    </Col>
                  </Row>
                </Form>
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
};

export default withRouter(CreatePollsterGroup);
