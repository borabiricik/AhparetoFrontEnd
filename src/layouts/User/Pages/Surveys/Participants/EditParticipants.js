import { Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ReactTable from 'react-table-6';
import { Button, Card, CardBody, CardFooter, CardHeader, FormGroup, Input, Label, Row } from 'reactstrap';
import { addParticipants } from 'stores/Participants/participantsStore';
import Swal from 'sweetalert2';
import { readExcel } from 'utils/readExcel';

const EditParticipants = () => {
  const [isExcel, setisExcel] = useState(false);
  const [participants, setparticipants] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  return (
    <div className="content">
      <Formik
        initialValues={{
          Participants: participants,
        }}
        onSubmit={(values) => {
          console.log(values);
          Swal.fire({
            title: "Sure ?",
            text: "This data will overwrite the existing data!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then(({ isConfirmed }) => {
            if (isConfirmed) {
              console.log(values.Participants);
              dispatch(
                addParticipants({
                  SurveyId: params.id,
                  Participants: participants,
                  history,
                })
              );
            }
          });
        }}
      >
        {({ values, handleSubmit }) => {
          return (
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <h2>Edit Participants</h2>
                </Row>
              </CardHeader>
              <CardBody className="px-5">
                <FormGroup check>
                  <Row className="justify-content-between align-items-center">
                    <Label check>
                      <Input
                        checked={isExcel}
                        onChange={() => setisExcel(!isExcel)}
                        type="checkbox"
                      />{" "}
                      Import From Excel
                      <span className="form-check-sign">
                        <span className="check"></span>
                      </span>
                    </Label>
                    <Button
                      color="success"
                      className="btn btn-link "
                      href="Example.xlsx"
                      download="Example.xlsx"
                      target={"_blank"}
                    >
                      Example Participtant Excel Data
                    </Button>
                  </Row>
                </FormGroup>

                {isExcel && (
                  <>
                    <Input
                      type="file"

                      onChange={async (e) => {
                        const file = e.target.files[0];
                        const excel = await readExcel(file);
                        excel.map((e, index) => {
                          console.log(e);
                          if (index > 0) {
                            setparticipants((par)=>[...par,{
                              Name: e[0] ? e[0] : null,
                              SurName: e[1] ? e[1] : null,
                              PhoneNumber: e[2] ? e[2] : null,
                              Email: e[3] ? e[3] : null,
                              SurveyId: parseInt(params.id),
                            }])
                          }
                        });
                      }}
                    />
                    <ReactTable
                      data={participants}
                      minRows={0}
                      columns={[
                        {
                          accessor: "Name",
                          Header: "Name",
                          Cell: (row) => {
                            console.log(row);
                            return row.original.Name ? row.original.Name : "-";
                          },
                        },
                        {
                          accessor: "SurName",
                          Header: "SurName",
                          Cell: (row) => {
                            console.log(row);
                            return row.original.SurName ? row.original.SurName : "-";
                          },
                        },
                        {
                          accessor: "PhoneNumber",
                          Header: "PhoneNumber",
                          Cell: (row) => {
                            console.log(row);
                            return row.original.PhoneNumber ? row.original.PhoneNumber : "-";
                          },
                        },
                        {
                          accessor: "Email",
                          Header: "Email",
                          Cell: (row) => {
                            console.log(row);
                            return row.original.Email ? row.original.Email : "-";
                          },
                        },
                      ]}
                    />
                  </>
                )}
              </CardBody>
              <CardFooter className="row justify-content-center">
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

export default EditParticipants;
