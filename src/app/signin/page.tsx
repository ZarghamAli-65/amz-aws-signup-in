"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { userPool } from "../../lib/cognitoConfig";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Access token:", result.getAccessToken().getJwtToken());
        setMessage("Login successful!");
        router.push("/");
      },
      onFailure: (err) => {
        setMessage(`Login failed: ${err.message || "Unknown error"}`);
      },
    });
  };

  // Redirect to Cognito's hosted UI for Google login
  const handleGoogleLogin = () => {
    const clientId = "2mh12kgapdv9kodpkrner1oppi";
    const cognitoDomain = "zargham-domain.auth.us-east-1.amazoncognito.com";
    const redirectUri = "http://localhost:3000/auth/callback";
    const googleUrl = `https://${cognitoDomain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid+profile+email&identity_provider=Google&prompt=login`;
    router.push(googleUrl);
  };
  const handleMicrosoftLogin = () => {
    const clientId = "2mh12kgapdv9kodpkrner1oppi";
    const cognitoDomain = "zargham-domain.auth.us-east-1.amazoncognito.com";
    const redirectUri = "http://localhost:3000/auth/callback";
    const microsoftUrl = `https://${cognitoDomain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid+profile+email&identity_provider=Microsoft&prompt=login`;

    router.push(microsoftUrl);
  };

  return (
    <div className="flex flex-col justify-center text-center p-8 mt-8 max-w-md mx-auto border">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleLogin} className="space-y-4">
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
            className="w-full p-2 border rounded pr-20"
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
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Login
        </button>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
      <div className="mt-6">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Login with Google
        </button>
      </div>
      <button
        onClick={handleMicrosoftLogin}
        className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800 cursor-pointer mt-2"
      >
        Login with Microsoft
      </button>

      <div className="mt-4 text-sm text-center">
        <p>
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Sign up
          </a>
        </p>
        <p>
          <Link href="/forgot-password" className="text-blue-500 underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}
