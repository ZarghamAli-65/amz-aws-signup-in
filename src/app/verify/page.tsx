"use client";

import { useState } from "react";
// import { useSearchParams } from "next/navigation";
import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../../lib/cognitoConfig";
import { useRouter } from "next/navigation";

export default function ConfirmPage() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  //   const searchParams = useSearchParams();

  //   // ✅ Pre-fill username if passed in query param
  //   useEffect(() => {
  //     const prefillUsername = searchParams.get("username");
  //     if (prefillUsername) {
  //       setUsername(prefillUsername);
  //     }
  //   }, [searchParams]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error(err.message || JSON.stringify(err));
        setMessage(`Confirmation failed: ${err.message || "Unknown error"}`);
        return;
      }

      console.log("User confirmed successfully:", result);
      setMessage("Account confirmed successfully! Redirecting to Sign In.");
      router.push(`/signin`);
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Confirm Account</h1>
      <form onSubmit={handleConfirm} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Verification Code"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Confirm
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
