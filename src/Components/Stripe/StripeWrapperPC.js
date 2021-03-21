import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckout from "./PaymentCheckout";

const STRIPE_PKEY = "pk_test_iuxRerK1oyN0wBtqnOUeCE9200QspvopXx";

const stripeClient = loadStripe(STRIPE_PKEY);

export default function StripeWrapperPC() {
  return (
    <Elements stripe={stripeClient}>
      <PaymentCheckout />
    </Elements>
  );
}
