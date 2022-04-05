import { FaRegUserCircle } from '@react-icons/all-files/fa/FaRegUserCircle';
import classNames from 'classnames';
import Loading from 'components/Common/Loading';
import { getLayoutName } from 'Functions/Router';
import React, { useEffect } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import { getSurveys, releaseSurvey } from 'stores/Survyes/surveySlice';
import Swal from 'sweetalert2';

const Surveys = () => {
  const history = useHistory();
  const surveys = useSelector((state) => state.surveys.surveysData);
  const loading = useSelector((state) => state.surveys.loading);
  const dispatch = useDispatch();
  const getData = async () => {
    await dispatch(await getSurveys());
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading === false) {
    return (
      <div className="content">
        <Card className="p-3">
          <CardHeader>
            <Row className="justify-content-between align-items-center">
              <CardTitle className="m-0 p-0" tag={"h2"}>
                Surveys
              </CardTitle>
              <Button
                color="info"
                onClick={() =>
                  history.push(getLayoutName(history) + "/create/survey")
                }
              >
                Create Survey
              </Button>
            </Row>
          </CardHeader>
          <CardBody className="p-0 my-5">
            <Col md="12" lg="4" className="p-0">
              <Card color="default">
                <Row className="m-4 justify-content-between align-items-center">
                  <div>
                    <CardText tag={"h2"} className="m-0">
                      {surveys.length}
                    </CardText>
                    <p>Surveys</p>
                  </div>

                  <div className="bg-primary rounded-circle p-3">
                    <FaRegUserCircle
                      style={{ fontSize: "3rem", color: "white" }}
                    />
                  </div>
                </Row>
              </Card>
            </Col>

            <ReactTable
              data={surveys}
              filterable
              resizable={false}
              minRows={0}
              columns={[
                {
                  Header: "Name",
                  accessor: "Name",
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                  sortable: false,
                  filterable: false,
                  Cell: (row) => {
                    return (
                      <Row className="w-100 justify-content-end">
                        {!row.original.Draft && (
                          <Button
                            color="danger"
                            size="sm"
                            id="deleteSurveyBtn"
                            className={classNames("btn-icon btn-round")}
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                              }).then(
                                ({ isConfirmed }) =>
                                  isConfirmed &&
                                  dispatch(
                                    releaseSurvey({ id: row.original.Id,history })
                                  )
                              );
                            }}
                          >
                            <BsBoxArrowUpRight />
                          </Button>
                        )}
                        <Button
                          color="warning"
                          size="sm"
                          id="editSurveyBtn"
                          className={classNames("btn-icon btn-round")}
                          onClick={() => {
                            history.push(
                              getLayoutName(history) +
                                "/edit/survey/" +
                                row.original.Id
                            );
                          }}
                        >
                          <i className="fa fa-edit"></i>
                        </Button>

                        <Button
                          color="info"
                          id="answerSettingsBtn"
                          size="sm"
                          className={classNames("btn-icon btn-round")}
                          onClick={() => {
                            history.push(
                              getLayoutName(history) +
                                "/settings/survey/" +
                                row.original.Id
                            );
                          }}
                        >
                          <IoMdSettings />
                        </Button>
                      </Row>
                    );
                  },
                },
              ]}
              defaultPageSize={10}
              showPaginationBottom
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Surveys;
