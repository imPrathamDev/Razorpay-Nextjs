import Head from "next/head";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import { useRef } from "react";

export default function Home() {
  const inititePayment = async () => {
    const orderRes = await fetch(
      "http://localhost:3000/api/payments/razorpay",
      {
        method: "POST",
        body: JSON.stringify({
          amount: "5",
          currency: "INR",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const orderDetails = await orderRes.json();
    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: orderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Company Name",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderDetails.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:3000/api/payments/postTranscation",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Rajasthan, India",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var paymentObject = new Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Razorpay NextJS</title>
        <meta
          name="description"
          content="Correct way to use Razorpay in NextJS."
        />
        <meta name="author" content="Pratham Sharma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <main className={styles.main}>
        <button className={styles.card} onClick={inititePayment}>
          Pay ₹5 Now
        </button>
      </main>
    </div>
  );
}
