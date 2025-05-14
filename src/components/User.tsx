"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);

  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const idToken = localStorage.getItem("id_token");
    const providerFromStorage = localStorage.getItem("provider");

    if (!idToken) {
      router.push("/signin");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(idToken.split(".")[1]));

      setEmail(decodedToken.email || "Unknown User");
      setName(decodedToken.name || decodedToken.given_name || "User");
      setProvider(providerFromStorage || "Cognito");

      setLoading(false);
    } catch (error) {
      console.error("Token decoding failed", error);
      localStorage.removeItem("id_token");
      router.push("/signin");
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("id_token");
    router.push("/signin");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Welcome {name} ({provider} Account)!
      </h1>
      <p className="text-xl font-bold p-2">Email: {email}</p>
      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}
