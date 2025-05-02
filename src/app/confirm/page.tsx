"use client";

import { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../../lib/cognitoConfig";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleConfirmPassword = (e: React.FormEvent) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    user.confirmPassword(code, newPassword, {
      onSuccess: (result) => {
        console.log("Password reset successful:", result);
        setMessage("Password reset successful! You can now Sign In.");
        router.push("/signin");
      },
      onFailure: (err) => {
        console.error(
          "Error confirming new password:",
          err.message || JSON.stringify(err)
        );
        setMessage(`Reset failed: ${err.message || "Unknown error"}`);
      },
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleConfirmPassword} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or Email"
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Reset Password
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
