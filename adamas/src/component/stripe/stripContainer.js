import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./paymentForm";

const PUBLIC_KEY =
  "pk_test_51Ljds7KRDmgrkfTQd8GiAbyAu7qrR6XGSRuingmwyVCO7W9xtBC6MhSBglbhy7tBRhGmmLGkB4iNN8qjJdGv9jdY00YNHSQ1Qt";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer({ bill, cart }) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm bill={bill} cart={cart} />
    </Elements>
  );
}
