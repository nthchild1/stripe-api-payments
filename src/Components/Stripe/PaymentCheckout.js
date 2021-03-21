import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { stripey } from "./request";

// Sjukdom test pkey
const STRIPE_PKEY =
  "pk_test_51IVPQ3BvKwkJH8TUzDiSg8f3McjrMK1Ds9oLQejM0KmthJXnlXmjkjisTKnfOOratHz9tB2odCvUGikciRSau9lg00HlDQSKvi";

const stripeClient = loadStripe(STRIPE_PKEY);

export default function PaymentCheckout() {
  const [cards, setCards] = useState([]);

  const onToken = (token) => {
    try {
      console.log("This is the token");
      console.log(token);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("Fetching user's cards...");
    (async () => {
      try {
        const result = await stripey.get("/api/payment/customer/cards");
        if (result?.data?.success) {
          console.log("Found some cards (:");
          setCards(result?.data?.data);
          console.log("Cards");
          console.log(cards);
        }
      } catch (e) {
        console.error("Couldn't fetch the curstomer's cards");
        console.error(e.message);
      }
    })();
  }, []);

  return (
    <Elements stripe={stripeClient}>
      <div> Checkout </div>
      {cards.length ? (
        <>
          <p> Select a card to pay with </p>
          {cards.map((card) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "stretch"
              }}
            >
              <label key={card.id}> {card.id} </label>
              <button>Pay</button>
            </div>
          ))}
        </>
      ) : (
        <StripeCheckout
          stripeKey={STRIPE_PKEY}
          amount={999}
          currency="MXN"
          token={onToken}
        ></StripeCheckout>
      )}
    </Elements>
  );
}
