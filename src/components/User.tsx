"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userPool } from "../lib/cognitoConfig";
import { signOutUser } from "../lib/authHelpers";
import { CognitoUserSession } from "amazon-cognito-identity-js";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("id_token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log(payload);
        setUsername(payload.name || payload.email || "Google User");
        setEmail(payload.email || "Google Email");
        return;
      } catch (error) {
        console.error("Failed to parse token:", error);
      }
    }

    const user = userPool.getCurrentUser();
    if (!user) {
      router.push("/signin");
      return;
    }

    const uname = user.getUsername();
    setUsername(uname);

    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session?.isValid()) {
        console.error("Session invalid", err);
        router.push("/signin");
        return;
      }

      user.getUserAttributes((err, attributes) => {
        if (err) {
          console.error("Failed to load user attributes", err);
          return;
        }

        if (attributes) {
          const attrMap = Object.fromEntries(
            attributes.map((attr) => [attr.getName(), attr.getValue()])
          );
          setEmail(attrMap.email || "");
        }
      });
    });
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("id_token"); // clear Google token
    signOutUser(); // clear Cognito session
    router.push("/signin");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome To AWS LOG-IN!</h1>
      <p className="text-xl font-bold p-2">Username: {username}</p>
      <p className="p-2">Email: {email}</p>
      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}
