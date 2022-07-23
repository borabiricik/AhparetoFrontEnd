import DynamicFormInput from "components/Common/DynamicFormInput";
import { FieldArray, Formik } from "formik";
import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, CustomInput, Input, Row } from "reactstrap";
import { addCriterias } from "stores/Survyes/surveySlice";
import { addItems } from "stores/Survyes/surveySlice";
import Swal from "sweetalert2";

const AddCriterias = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const history = useHistory();
	return (
		<div className='content'>
			<Formik
				initialValues={{
					criterias: [],
				}}
				onSubmit={(values) => {
					Swal.fire({
						title: "Are you sure?",
						text: "You won't be able to revert this!",
						icon: "warning",
						showCancelButton: true,
						confirmButtonColor: "#3085d6",
					}).then((res) => {
						if (res.isConfirmed) {
							dispatch(addCriterias({ ...values, id: params.id, history }));
						}
					});
				}}>
				{({ values, handleSubmit, handleChange, setFieldValue }) => {
					return (
						<Card>
							<CardHeader tag={"h2"}>Add Criterias</CardHeader>
							<CardBody>
								<FieldArray
									name='criterias'
									render={(arrayHelpers) => {
										return (
											<div>
												{values.criterias.map((item, index) => {
													return (
														<Row className='align-items-center mx-2'>
															<Col>
																<FieldArray
																	render={(arrayHelpers) => {
																		return (
																			<Input
																				name={`criterias.${index}.Name`}
																				onChange={handleChange}
																				placeholder='Type Item Name...'
																			/>
																		);
																	}}
																/>
															</Col>
															<div className='px-2'>
																<CustomInput
																	type='switch'
																	name={`criterias.${index}.isLower`}
																	label={"Is Lower Better ?"}
																	onChange={handleChange}
																	id={`${index}`}
																	checked={values.criterias[index].isLower}
																/>
															</div>
															<Button
																onClick={() => arrayHelpers.remove(index)}
																className='btn-icon btn-danger btn-round'>
																<BiTrashAlt />
															</Button>
														</Row>
													);
												})}
												<Row className='justify-content-center'>
													<Button onClick={() => arrayHelpers.push({ Name: "", isLower: false })}>Add Criteria</Button>
												</Row>
											</div>
										);
									}}
								/>
							</CardBody>
							<CardFooter className='row justify-content-center'>
								<Button className='btn-success' onClick={handleSubmit}>
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

export default AddCriterias;
