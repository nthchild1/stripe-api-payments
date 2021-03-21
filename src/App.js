import "./styles.css";
import StripeWrapperAPM from "./Components/Stripe/StripeWrapperAPM";
import StripeWrapperPC from "./Components/Stripe/StripeWrapperPC";
import {useLocation} from "react-router-dom";


export default function App() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const resource = urlParams.get('resource')

        if (resource === 'AddPaymentMethod'){
            return <StripeWrapperAPM/>

        } else if (resource === 'PaymentIntent') {
            return <StripeWrapperPC/>
        } else return <div><h1>Unknown resource</h1></div>


}
