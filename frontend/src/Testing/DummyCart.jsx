import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const DummyCart = () => {
  const body = {
    items: [
      {
        itemName: "Dummy Product 1",
        imgdata: "dummy-image-url",
        price: 10.5,
        quantity: 1,
      },
      {
        itemName: "Dummy Product 2",
        imgdata: "dummy-image-url",
        price: 20.5,
        quantity: 2,
      },
    ],
  };

  // Payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OTAJ6JdT2d2FGFUrkqKR0reQ3Ctgx4FKVq3ZSlqltbT4S2xnFi3AzE9r71rsZA5Aw0aNLPJYS0J28ZcjWjhyWiu00Wp3AS9HT"
    );

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:5000/api/payments/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <>
      <div>
        <button onClick={makePayment}>CHECKOUT</button>
      </div>
    </>
  );
};

export default DummyCart;
