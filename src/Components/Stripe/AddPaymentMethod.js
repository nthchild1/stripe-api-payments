import { useState } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { CARD_OPTIONS } from "./constants"
import { stripey } from "./request"
import axios from "axios"

export default function AddPaymentMethod() {
    const [success, setSuccess] = useState()
    const stripe = useStripe()
    const elements = useElements()
    const token = window.localStorage.getItem("token")

    const handleSubmit = async (e) => {
        console.log("Submit form...")
        console.log("Token")
        console.log(token)

        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            // billing_details: {
            //   name: "Tyler Durden",
            //   address: {
            //     city: "CDMX",
            //     country: "MX",
            //     postal_code: 14400
            //   }
            // }
        })

        if ("ReactNativeWebView" in window && "postMessage" in window.ReactNativeWebView)
            window?.ReactNativeWebView?.postMessage(
                JSON.stringify({
                    card_token: paymentMethod.id,
                    card_last4: paymentMethod.card.last4,
                })
            )

        if (!error) {
            console.log("No error")
            console.log(paymentMethod)
            console.log(paymentMethod?.id)
            console.log(paymentMethod)

            try {
                const response = await stripey.post("/api/payment", {
                    card_token: paymentMethod.id,
                    card_last4: paymentMethod.card.last4,
                })

                if (response?.data?.success) {
                    if ("ReactNativeWebView" in window && "postMessage" in window.ReactNativeWebView)
                        window?.ReactNativeWebView?.postMessage(response?.data?.data)
                    console.info(response.data.data)
                    setSuccess(true)
                } else {
                    console.info(response.data.error)
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            setSuccess(false)
            console.log(error)
        }
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                }}
            >
                <h2 style={{ marginLeft: "15px" }}>Información de pagos</h2>
                <h5 style={{ marginLeft: "20px", textAlign: "left" }}>
                    Ingresa la informacion de tu tarjeta de credito o debito. Casdajsd
                </h5>
            </div>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                <div style={{ backgroundColor: "#EFF5FB", padding: "20px 10px", marginBottom: "20px" }}>
                    <CardElement
                        options={CARD_OPTIONS}
                        fonts={[{ cssSrc: "https://fonts.googleapis.com/css2?family=Comfortaa" }]}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#45BDFF",
                        color: "#FFF",
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        height: 50,
                    }}
                >
                    Continuar
                </button>
            </form>
            {success ? <p> The card was registered! </p> : null}
        </div>
    )
}
