import { Formik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import { updateMailConfig } from "stores/Settings/mailSlice";
import { getMailConfig } from "stores/Settings/mailSlice";

const MailSettings = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.mail.mailData)
    const loading = useSelector(state=> state.mail.loading)
    const history = useHistory()
    
    const getData = async () => {
      await dispatch(getMailConfig())
    }
    useEffect(() => {
        getData()
    }, [])

    if(loading === false && data)
    {
        return (
            <div className="content">
              <Formik
                initialValues={{
                  email: data.email,
                  emailTittle:data.emailTittle,
                  subject: data.subject,
                  host: data.host,
                  port: data.port,
                  password: data.password,
                }}
                onSubmit={(values)=>{
                    dispatch(updateMailConfig({...values, history}))
                }}
              >
                {({ values, handleChange, handleSubmit }) => {
                  return (
                    <Card className="p-3">
                      <CardHeader tag={"h2"}>Mail Ayarları</CardHeader>
                      <CardBody>
                        <Row >
                          <Col sm="4" className="my-2">
                            <label>Mail Title</label>
                            <Input
                              name="emailTittle"
                              value={values.emailTittle}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col sm="4" className="my-2">
                            <label>Mail Address</label>
                            <Input
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col sm="4" className="my-2">
                            <label>Password</label>
                            <Input
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col sm="4" className="my-2">
                            <label>Subject</label>
                            <Input
                              name="subject"
                              value={values.subject}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col sm="4" className="my-2">
                            <label>Host</label>
                            <Input
                              name="host"
                              value={values.host}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col sm="4" className="my-2">
                            <label>Port</label>
                            <Input
                              name="port "
                              value={values.port}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <Button color="success" onClick={handleSubmit}>Save</Button>
                      </CardFooter>
                    </Card>
                  );
                }}
              </Formik>
            </div>
          );
    }
    else{
        return (
            <div className="content">
                <h2>Yükleniyor...</h2>
            </div>
        )
    }
 
};

export default MailSettings;
