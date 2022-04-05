import Loading from "components/Common/Loading";
import { getLayoutName } from "Functions/Router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { getPrices } from "stores/Payments/paymentsStore";

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const prices = useSelector((state) => state.payments.prices);
  useEffect(() => {
    dispatch(getPrices());
  }, []);

  if (prices) {
    return (
      <div className="content">
        <Row className="justify-content-center">
          {prices.map((price, index) => {
            return (
              <Col lg="3" md="6" key={index}>
                <Card className="card-pricing card-primary">
                  <CardBody>
                    <ListGroup>
                      {price.PriceItems.map((item, index) => {
                        return <ListGroupItem>{item.Text}</ListGroupItem>;
                      })}
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        {parseInt(price.PriceValue)}
                        <span>₺</span>
                      </h3>
                      <h5 className="text-on-back">{price.Title}</h5>
                      <p className="plan">{price.Title} Plan</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button
                      className="btn-round btn-just-icon"
                      color="primary"
                      onClick={() =>
                        history.push(
                          getLayoutName(history) + "/payment/buy/" + price.Id
                        )
                      }
                    >
                      Buy Plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
  return <Loading />;
};

export default Payment;
