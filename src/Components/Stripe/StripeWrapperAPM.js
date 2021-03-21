import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AddPaymentMethod from "./AddPaymentMethod";

const STRIPE_PKEY = "pk_test_51IVPQ3BvKwkJH8TUzDiSg8f3McjrMK1Ds9oLQejM0KmthJXnlXmjkjisTKnfOOratHz9tB2odCvUGikciRSau9lg00HlDQSKvi";

const stripeClient = loadStripe(STRIPE_PKEY);

export default function StripeWrapperAPM() {
  return (
    <Elements stripe={stripeClient}>
      <AddPaymentMethod />
    </Elements>
  );
}
