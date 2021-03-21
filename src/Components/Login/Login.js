import { useState } from "react";
import { auth } from "./auth";
import { Link } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

export default function Login() {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useLocalStorage("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      return;
    }

    try {
      const response = await auth.signInWithEmailAndPassword(email, password);

      const auth_token = await response.user.getIdToken();

      setToken(auth_token);

      document.getElementById("token").value = token;

      setLogged(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <label htmlFor="email"> Email </label>
        <input id="email" type="text" defaultValue="tyler@gmail.com" />
        <label htmlFor="password"> Password </label>
        <input id="password" type="text" defaultValue="tylerdurden" />
        <button type="submit">Login</button>
        <label htmlFor="token" style={{ marginTop: "50px" }}>
          {" "}
          Token{" "}
        </label>
        <input id="token" />
      </form>

      {logged ? (
        <>
          <Link to="/payment/add">
            <button> Add Payment </button>
          </Link>
          <Link to="/payment/checkout">
            <button> Checkout </button>
          </Link>
        </>
      ) : null}
    </div>
  );
}
