import Loading from "components/Common/Loading";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardHeader, Input, Row } from "reactstrap";
import { fillPaymentProfile } from "stores/Payments/paymentsStore";
import { getPaymentProfile } from "stores/Payments/paymentsStore";

const FillProfile = () => {
	const dispatch = useDispatch();
	const { paymentProfile } = useSelector((state) => state.payments);
	console.log(paymentProfile);
	useEffect(() => {
		dispatch(getPaymentProfile());
	}, []);

	if (paymentProfile) {
		return (
			<div className='content'>
				<Card>
					<CardHeader tag={"h2"}>Fill Profile</CardHeader>
					<CardBody>
						<Formik
							initialValues={{
								FirstName: paymentProfile.FirstName,
								LastName: paymentProfile.LastName,
								IdentityNumber: paymentProfile.IdentityNumber,
								City: paymentProfile.City,
								RegistrationAddress: paymentProfile.RegistrationAddress,
								Email: paymentProfile.Email,
							}}
							onSubmit={(values) => {
								dispatch(fillPaymentProfile(values));
							}}>
							{({ handleChange, getFieldProps, handleSubmit }) => {
								return (
									<>
										<Row>
											<div className='col-6'>
												<label>First Name</label>
												<Input type='text' onChange={handleChange} name='FirstName' {...getFieldProps("FirstName")} />
											</div>
											<div className='col-6'>
												<label>Last Name</label>
												<Input type='text' onChange={handleChange} name='LastName' {...getFieldProps("LastName")} />
											</div>
											<div className='col-6'>
												<label>ID</label>
												<Input
													type='number'
													onChange={handleChange}
													name='IdentityNumber'
													{...getFieldProps("IdentityNumber")}
												/>
											</div>
											<div className='col-6'>
												<label>City</label>
												<Input type='text' onChange={handleChange} name='City' {...getFieldProps("City")} />
											</div>
											<div className='col-6'>
												<label>Country</label>
												<Input type='text' onChange={handleChange} name='Country' {...getFieldProps("Country")} />
											</div>
											<div className='col-6'>
												<label>Registration Address</label>
												<Input
													type='text'
													onChange={handleChange}
													name='RegistrationAddress'
													{...getFieldProps("RegistrationAddress")}
												/>
											</div>
											<div className='col-6'>
												<label>Email</label>
												<Input type='text' onChange={handleChange} name='Email' {...getFieldProps("Email")} />
											</div>
										</Row>
										<Button onClick={handleSubmit} color='success' className='mt-4'>
											Save
										</Button>
									</>
								);
							}}
						</Formik>
					</CardBody>
				</Card>
			</div>
		);
	}
	return <Loading />;
};

export default FillProfile;
