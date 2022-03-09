import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { readExcel } from "utils/readExcel";

const EditParticipants = () => {
  const [isExcel, setisExcel] = useState(false);
  return (
    <div className="content">
      <Card>
        <CardHeader tag={"h2"}>Edit Participants</CardHeader>
        <CardBody className="px-5">
          <FormGroup check>
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
          </FormGroup>

          <Input
            type="file"
            onChange={async (e) => {
              const file = e.target.files[0];
              console.log(await readExcel(file))
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default EditParticipants;
