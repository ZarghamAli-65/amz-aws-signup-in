"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    const exchangeCodeForToken = async () => {
      const res = await fetch(
        "https://my-applogin.auth.us-east-1.amazoncognito.com/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: "k3896ujiu6r8lglufs1d2fht6",
            code,
            redirect_uri: "http://localhost:3000/auth/callback",
          }),
        }
      );

      const data = await res.json();
      if (data.id_token) {
        console.log("Google login successful:", data);
        localStorage.setItem("id_token", data.id_token); // Or use cookie/session
        router.push("/");
      } else {
        console.error("Login failed", data);
      }
    };

    exchangeCodeForToken();
  }, [code, router]);

  return <p className="p-4 text-center">Logging in with Google...</p>;
}
