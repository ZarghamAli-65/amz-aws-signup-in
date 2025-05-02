"use client";

import { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../../lib/cognitoConfig";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    user.forgotPassword({
      onSuccess: (result) => {
        console.log("Password reset initiated:", result);
        setMessage("Password reset code sent. Check your email.");
        router.push("/confirm");
      },
      onFailure: (err) => {
        console.error(
          "Error initiating password reset:",
          err.message || JSON.stringify(err)
        );
        setMessage(`Reset failed: ${err.message || "Unknown error"}`);
      },
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or Email"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700"
        >
          Send Reset Code
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
