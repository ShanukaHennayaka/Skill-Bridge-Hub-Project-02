import React from "react";
import CryptoJS from "crypto-js"
import { Button } from "@mui/material";

const PaymentModal = ({ paymentDetails, handlePayment }) => {
  const merchant_id = "1227660";
  const order_id = paymentDetails.orderId;
  const amount = paymentDetails.amount;
  const currency = "LKR";
  const merchant_secret =
    "MjYxNjc5MDE0OTE0ODI4ODY2MTIxNzE1ODI3MTQ1MjgyNzI3OTQ1Mw==";

  const formattedAmount = amount.toFixed(2);
  const innerHash = CryptoJS.MD5(merchant_secret).toString().toUpperCase();
  const concatenatedString =
    merchant_id + order_id + formattedAmount + currency + innerHash;

  const finalHash = CryptoJS.MD5(concatenatedString).toString().toUpperCase();

  var payment = {
    sandbox: true,
    merchant_id: "1227660",
    return_url: "http://localhost:5173/profile",
    cancel_url: "http://localhost:5173/profile",
    notify_url: "http://localhost:8080/api/v1/job/payment",
    order_id: order_id,
    items: paymentDetails.name,
    amount: amount,
    currency: "LKR",
    hash: finalHash,
    first_name: paymentDetails.first_name,
    last_name: paymentDetails.last_name,
    email: paymentDetails.email,
    phone: "0768714744",
    address: "No.1, Dematagoda",
    city: paymentDetails.city,
    country: "Sri Lanka",
    delivery_address: "No. 1, Dematagoda",
    delivery_city: "Colombo 05",
    delivery_country: "Sri Lanka",
    custom_1: "",
    custom_2: "",
  };

  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
  };

  window.payhere.onDismissed = function onDismissed() {
    console.log("Payment dismissed");
  };

  window.payhere.onError = function onError(error) {
    console.log("Error:" + error);
  };

  function pay() {
    window.payhere.startPayment(payment);
    handlePayment()
  }

  return (
    <Button variant="contained" onClick={pay}>
      Pay now
    </Button>
  );
};

export default PaymentModal;
