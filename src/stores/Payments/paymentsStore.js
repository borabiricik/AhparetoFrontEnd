import { nodeAPI } from "Constants/api";
import jwtDecode from "jwt-decode";
import { FireSwal } from "utils/FireSwal";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getPaymentCallBackResult = createAsyncThunk("getPaymentCallBackResult", async (state) => {
	const response = await nodeAPI.get(
		"/payment/getPaymentCallbackResult/" + jwtDecode(localStorage.getItem("token")).Id
	);
	return response;
});

export const getPrices = createAsyncThunk("getPrices", async (state) => {
	const response = await nodeAPI.get("/price/getall");
	return response;
});

export const getPriceById = createAsyncThunk("getPriceById", async (state) => {
	const response = await nodeAPI.get("/price/getById/" + state);
	return response;
});

export const startPayment = createAsyncThunk("startPayment", async (state) => {
	const response = await nodeAPI.post("/payment/pay", state);
	return response;
});

export const getPaymentProfile = createAsyncThunk("getPaymentProfile", async (userId) => {
	const response = await nodeAPI.get("/payment/getPaymentProfile/" + jwtDecode(localStorage.getItem("token")).Id);
	return response;
});

export const fillPaymentProfile = createAsyncThunk("fillPaymentProfile", async (values) => {
	const response = await nodeAPI.post("/payment/fillProfile/" + jwtDecode(localStorage.getItem("token")).Id, values);
	return response;
});

const paymentStore = createSlice({
	name: "payments",
	initialState: {
		payment: null,
		prices: null,
		price: null,
		paymentProfile: null,
	},
	extraReducers: ({ addCase }) => {
		addCase(getPaymentCallBackResult.fulfilled, (state, action) => {
			state.payment = action.payload.data;
		});

		addCase(getPrices.fulfilled, (state, action) => {
			state.prices = action.payload.data;
		});

		addCase(getPriceById.pending, (state, action) => {
			state.price = null;
		});

		addCase(getPriceById.fulfilled, (state, action) => {
			console.log(action.payload.data);
			state.price = action.payload.data;
		});

		addCase(startPayment.fulfilled, (state, action) => {
			if (action.payload.data.status === "success") {
				window.location.replace(action.payload.data.paymentPageUrl);
			}
		});
		addCase(getPaymentProfile.fulfilled, (state, action) => {
			state.paymentProfile = action.payload.data;
		});
		addCase(fillPaymentProfile.fulfilled, (state, action) => {
			FireSwal({ message: "Updated Successfully" });
		});
	},
});
export default paymentStore.reducer;
