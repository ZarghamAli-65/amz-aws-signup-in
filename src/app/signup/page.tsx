"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { userPool } from "../../lib/cognitoConfig";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const signUpUser = (
    username: string,
    password: string,
    email: string
    // fullName: string
  ) => {
    const attributeList = [];

    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    // const nameAttribute = new CognitoUserAttribute({
    //   Name: "name",
    //   Value: fullName,
    // });

    attributeList.push(emailAttribute);
    // attributeList.push(nameAttribute);

    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        console.error(err.message || JSON.stringify(err));
        setMessage(`Signup failed: ${err.message || "Unknown error"}`);
        return;
      }

      console.log("User successfully signed up:", result);
      setMessage("Signup successful! Redirecting to Verification...");
      router.push(`/verify`);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    signUpUser(username, password, email);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm font-semibold mt-2 text-gray-500">
          Create a new account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full p-2 border rounded"
        />
        {/* <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
        /> */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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
        <div className="text-sm text-gray-600 mt-2">
          <p className="font-semibold mb-1">Password must:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Be at least 8 characters long</li>
            <li>Contain both letters and numbers</li>
            <li>Include both lowercase and uppercase letters</li>
            <li>Contain at least one special character (e.g. @, #, !)</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
        {message && <p className="mt-2 text-sm font-bold">{message}</p>}
      </form>
    </div>
  );
}
