import React, { useMemo, useState } from "react";
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
  const { getRootProps, getInputProps, isDragActive,isDragAccept,isFocused,isDragReject} = useDropzone({
    accept: ".xlsx",
    maxFiles: 1,
    
  });
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "80px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#344675",
    color: "#black",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

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

          {isExcel && (
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-dark">
                    Drop the excel file here ...
                </p>
              ) : (
                <p>Drag & drop Excel file here, or click to select files</p>
              )}
            </div>
          )}

        </CardBody>
      </Card>
    </div>
  );
};

export default EditParticipants;
