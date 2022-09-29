import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import StripeContainer from "../stripe/stripContainer";
import { Alert } from "react-bootstrap";

function Checkout({ cart, bill }) {
  const [alert, setAlert] = useState({
    msg: "",
    show: false,
    variant: "",
  });

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [alert.show]);

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("Bill: ", bill);
  }, [bill]);

  return (
    <section className="">
      <div className="container px-3 my-5 clearfix">
        <h2>CheckOut</h2>
        <div className="row">
          <div className="col-md-8">
            <div className="">
              <table className="table table-responsive table-bordered m-0">
                <thead>
                  <tr>
                    <th className="text-center">Product Name</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    cart.map((c, i) => (
                      <tr key={i}>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          {c.productTitle}
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          ${c.productPrice}
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          {c.qty}
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          ${c.productPrice * c.qty}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-end m-4">
              <div className="text-large">
                Total price :<strong> ${bill.amount}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-4 card">
            <div className="card-body">
              <h2 className="card-title text-center">Receipt</h2>
            </div>
            <div className="card-body">
              <div className="mb-1">
                <label className="fw-bold">Bill to: </label>
                {" " + bill.name}
              </div>
              <div className="mb-1">
                <label className="fw-bold">Email: </label>
                {" " + bill.email}
              </div>
              <div className="mb-1">
                <label className="fw-bold">Ship to: </label>
                {" " + bill.address.line1}
              </div>
              <div className="mb-2">
                <label className="fw-bold">Total payable: </label>
                {" $" + bill.amount}
              </div>
              <StripeContainer bill={bill} cart={cart} />
            </div>
          </div>
        </div>
      </div>
      <Alert show={alert.show} variant={alert.variant} transition={false}>
        {alert.msg}
      </Alert>
    </section>
  );
}

export default Checkout;
