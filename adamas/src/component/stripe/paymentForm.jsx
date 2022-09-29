import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ bill, cart }) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  // console.log("B,", user);
  // const name = user.firstName + " " + user.lastName;
  // const [billingDetails, setBillingDetails] = useState({
  //   // name: name,
  //   amount: total,
  //   email: user.email,
  //   address: user.address,
  // });

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: bill.name,
        email: bill.email,
        address: bill.address,
      },
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log(paymentMethod);
        const response = await axios.post("http://localhost:8000/api/payment", {
          bill,
          id,
          cart,
        });

        if (response.data.success) {
          console.log("Successful payment: ", response);
          navigate("/");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement />
          </div>
        </fieldset>
        <button className="btn btn-success float-end mt-3">Pay</button>
      </form>
    </>
  );
}
