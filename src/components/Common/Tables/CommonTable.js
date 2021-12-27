import React, { useEffect } from "react";
import classNames from "classnames";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import { BiTrashAlt, BiEditAlt } from "react-icons/bi";

import ReactTable from "components/ReactTable/ReactTable.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const CommonTable = ({
  columns,
  tableData,
  actionPageNames,
  deleteAction,
  idKey,
  title,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  if (tableData) {
    const dataColumns = columns.map((column, key) => {
      if (column.date) {
        return {
          Header: Object.values(column)[0].toString(),
          accessor: (row) => {
            return new Date(row[Object.keys(column)[0].toString()])
              .toLocaleDateString()
              .replaceAll(".", " / ");
          },
          sortable: true,
          filterable: true,
        };
      }
      if (column.isArray) {
        return {
          Header: Object.values(column)[0].toString(),
          accessor: (row) => {
            return row[Object.keys(column)[0].toString()][0].name;
          },
          sortable: true,
          filterable: true,
        };
      } else {
        return {
          Header: Object.values(column).toString(),
          accessor: Object.keys(column).toString(),
          sortable: true,
          filterable: true,
        };
      }
    });

    dataColumns[dataColumns.length] = {
      Header: "İşlemler",
      accessor: "actions",
      Cell: (props) => {
        return (
          <Row className="justify-content-end w-100">
            <Button
              color="info"
              size="sm"
              className={classNames("btn-icon btn-round btn-warning")}
              onClick={() => {
                console.log(props.row.original);
                if (actionPageNames) {
                  history.push(
                    actionPageNames["edit"] + props.row.original[idKey]
                  );
                } else {
                  alert("Button Clicked!");
                }
              }}
            >
              <BiEditAlt size={20} color="white" />
            </Button>
            {deleteAction && (
              <Button
                color="danger"
                size="sm"
                className={classNames("btn-icon btn-round")}
                onClick={() => {
                  if (deleteAction) {
                    Swal.fire({
                      title: "Silmek istediğinize emin misiniz ?",
                      confirmButtonText: "Evet",
                      cancelButtonText: "Hayıt",
                      showCancelButton: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        const success = dispatch(
                          deleteAction(parseInt(props.row.original[idKey]))
                        );
                        if (success) {
                          history.go(history.location.pathname);
                        }
                      }
                    });
                  } else {
                    alert("Button Clicked");
                  }
                }}
              >
                <BiTrashAlt size={20} color="white" />
              </Button>
            )}
          </Row>
        );
      },
    };
    return (
      <>
        <Row className="mt-5">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  {title ? title : "Başlık Belirtilmedi"}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={tableData && tableData}
                  filterable
                  resizable={true}
                  columns={dataColumns}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  } else {
    <h2>Data yok ...</h2>;
  }
};

export default CommonTable;
