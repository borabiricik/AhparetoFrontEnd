import Loading from "components/Common/Loading";
import { getLayoutName } from "Functions/Router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPaymentCallBackResult } from "stores/Payments/paymentsStore";

const CallBack = () => {
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payments.payment);
  const history = useHistory();
  useEffect(() => {
    dispatch(getPaymentCallBackResult());
  }, []);

  if (payment) {
    setTimeout(() => {
      history.push(getLayoutName(history) + "/dashboard");
    }, 3000);
    return (
      <div className="content">
        {payment.paymentStatus === "SUCCESS" ? (
          <div>
            <h1>Payment Success</h1>
            <h3>Redirecting...</h3>
          </div>
        ) : (
          <div>
            <h1>Payment Failed</h1>
            <h3>Redirecting...</h3>
          </div>
        )}
      </div>
    );
  }
  return <Loading />;
};

export default CallBack;
