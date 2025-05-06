"use client";

import { useEffect, useState } from "react";

interface DecodedToken {
  name?: string;
  email?: string;
  //   [key: string]: any; // allow additional fields
}

export default function DisplayUser() {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (!token) return;

    try {
      const payload = token.split(".")[1];
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      const decoded: DecodedToken = JSON.parse(decodedPayload);
      setUser(decoded);
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  }, []);

  if (!user) return <p>Please log in.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome {user.name || user.email}
      </h1>
      <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
