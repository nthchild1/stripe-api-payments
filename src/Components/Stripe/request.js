import axios from "axios";

const token = window.localStorage.getItem("token");

export const stripey = axios.create({
  baseURL: "https://us-central1-fsstripe.cloudfunctions.net/billingAPI",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
});
