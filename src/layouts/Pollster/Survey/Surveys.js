import classNames from "classnames";
import Loading from "components/Common/Loading";
import { getLayoutName } from "Functions/Router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoMdSettings } from "react-icons/io";

import ReactTable from "react-table-6";
import { Button, Card, CardBody, CardHeader, Row } from "reactstrap";
import { getPollsterSurveys } from "stores/Pollsters/pollsterSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Surveys = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const surveys = useSelector((state) => state.pollsters.surveys);
  useEffect(() => {
    dispatch(getPollsterSurveys());
  }, []);

  if (surveys) {
    console.log(surveys);
    return (
      <div className="content">
        <Card>
          <CardHeader tag={"h2"}>Surveys</CardHeader>
          <CardBody>
            <ReactTable
              data={surveys}
              minRows={0}
              columns={[
                {
                  Header: "Id",
                  accessor: "Id",
                },
                {
                  Header: "Title",
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
                        {/* {!row.original.Draft && (
                        )} */}
                        <Button
                          color="warning"
                          size="sm"
                          id="editSurveyBtn"
                          className={classNames("btn-icon btn-round")}
                          onClick={() => {
                            history.push(
                              getLayoutName(history) +
                                "/survey/introduction/" +
                                row.original.Id
                            );
                          }}
                        >
                          <i className="fa fa-edit"></i>
                        </Button>
                      </Row>
                    );
                  },
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
  return <Loading />;
};

export default Surveys;
