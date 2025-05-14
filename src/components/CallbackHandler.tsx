"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  useEffect(() => {
    if (error) {
      router.push(
        `/signin?error=${encodeURIComponent(errorDescription || error)}`
      );
      return;
    }

    if (!code) return;

    const exchangeCodeForToken = async () => {
      try {
        const res = await fetch("https://your-cognito-domain/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
            code,
            redirect_uri: "http://localhost:3000/auth/callback",
          }),
        });

        const data = await res.json();

        if (res.ok && data.id_token) {
          localStorage.setItem("id_token", data.id_token);
          router.push("/");
        } else {
          console.error("Token exchange failed:", data);
        }
      } catch (err) {
        console.error("Token exchange error:", err);
      }
    };

    exchangeCodeForToken();
  }, [code, error, errorDescription, router]);

  return <p className="text-center p-4">Logging in...</p>;
}
