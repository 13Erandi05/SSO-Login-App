import React, { useEffect } from "react";
import googleOneTap from "google-one-tap";

const GoogleLogin = ({ setLoginData }) => {
  useEffect(() => {
    // Configuration options for Google One Tap
    const options = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // required
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
      context: "signin", // optional
    };

    // Initialize Google One Tap
    googleOneTap(options, async (response) => {
      console.log(response);
      // Send token to the server for verification
      const res = await fetch("/api/google-login", {
        method: "POST",
        body: JSON.stringify({
          token: response.credential,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // Update loginData state with the response from the server
      setLoginData(data);
      // Store loginData in localStorage
      localStorage.setItem("loginData", JSON.stringify(data));
    });
  }, [setLoginData]);

  return null;
};

export default GoogleLogin;
