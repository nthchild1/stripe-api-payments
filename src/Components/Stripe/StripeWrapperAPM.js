import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import AddPaymentMethod from "./AddPaymentMethod"

const STRIPE_PKEY = "pk_test_iuxRerK1oyN0wBtqnOUeCE9200QspvopXx"

const stripeClient = loadStripe(STRIPE_PKEY)

export default function StripeWrapperAPM() {
    return (
        <Elements stripe={stripeClient}>
            <AddPaymentMethod />
        </Elements>
    )
}
