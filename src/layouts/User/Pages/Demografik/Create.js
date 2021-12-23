import React, { Component, createElement, useEffect } from "react";
import renderForms from "Functions/Forms/index";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

const Create = ({ forms, options, data }) => {
  return (
    <>
      <CardHeader tag={"h1"}>Add Demographic Info</CardHeader>
      <CardBody>
        <Row>
          {renderForms(forms, options, data)}
        </Row>
      </CardBody>
    </>
  );
};

export default Create;

// import { renderForms } from "Functions/Forms";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import Select from "react-select";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   Col,
//   Form,
//   Input,
//   Row,
// } from "reactstrap";
// import { setDemografikData } from "stores/Demografik/demografikSlice";
// const CreateDemografik = () => {
//   const [data, setdata] = useState({
//     typeId: 10,
//     userId: parseInt(localStorage.getItem("userId")),
//   });
//   const [fieldTypeId, setfieldTypeId] = useState(null);

//   const [demografikDetails, setdemografikDetails] = useState([
//     { description: "Erkek" },
//     { description: "Kadın" },
//     { description: "Diğer" },
//   ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(demografikDetails);
//   };

//   const dispatch = useDispatch();
//   return (
//     <div className="content">
//       <Card>
//         <CardHeader tag={"h2"}>Create Demographic Info</CardHeader>
//         <CardBody>
//           <Form onSubmit={handleSubmit}>
//             <Row >
//               <Col sm="4">
//                 <label>Açıklama</label>
//                 <Input
//                   type="text"
//                   onChange={(e) =>
//                     setdata({ ...data, description: e.target.value })
//                   }
//                 />
//               </Col>

//               <Col sm="4">
//                 <label>Tipi</label>
//                 <Select
//                   className="react-select info"
//                   classNamePrefix="react-select"
//                   name="singleSelect"
//                   value={fieldTypeId}
//                   onChange={(selected) => {
//                     setfieldTypeId(selected);
//                     setdata({
//                       ...data,
//                       fieldTypeId: parseInt(selected.value),
//                     });
//                   }}
//                   options={[
//                     {
//                       value: "",
//                       label: "Lütfen Seçiniz",
//                       isDisabled: true,
//                     },
//                     { value: "1", label: "Sayı" },
//                     { value: "2", label: "Metin" },
//                     { value: "3", label: "Tarih" },
//                   ]}
//                   placeholder="Lütfen Seçiniz"
//                 />
//               </Col>
//               <Col sm="4">
//                 {demografikDetails &&
//                   demografikDetails.map((detail, key) => {
//                     return (
//                       <div key={key}>
//                         <label >{`Seçenek ${key+1}`}</label>
//                         <Input  className="form-control" type="text" placeholder="Seçenek Giriniz..." onChange={(e)=>{
//                           let newArr = [...demografikDetails]
//                           newArr[key].description = e.target.value
//                           dispatch(setDemografikData({newArr}))
//                         }} />
//                       </div>
//                     );
//                   })}
//                 <Button
//                   color="info"
//                   onClick={() => {
//                     setdemografikDetails([
//                       ...demografikDetails,
//                       { description: null },
//                     ]);
//                   }}
//                 >
//                   + Detay Ekle
//                 </Button>

//                 {
//                   demografikDetails.map(d=>{
//                     return(
//                       <h1>
//                         {JSON.stringify(d)}
//                       </h1>
//                     )
//                   })
//                 }
//               </Col>
//             </Row>
//           </Form>
//         </CardBody>
//         <CardFooter>
//           <Button color="success">Kaydet</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default CreateDemografik;
