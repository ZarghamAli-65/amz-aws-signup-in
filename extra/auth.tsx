// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function CallbackPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const code = searchParams.get("code");
//   const error = searchParams.get("error");
//   const errorDescription = searchParams.get("error_description");

//   useEffect(() => {
//     if (error) {
//       console.error("OAuth Error:", errorDescription || error);
//       router.push(
//         `/signin?error=${encodeURIComponent(errorDescription || error)}`
//       );
//       return;
//     }

//     if (!code) return;

//     const exchangeCodeForToken = async () => {
//       try {
//         const res = await fetch(
//           "https://zargham-domain.auth.us-east-1.amazoncognito.com/oauth2/token",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//               grant_type: "authorization_code",
//               client_id: "2mh12kgapdv9kodpkrner1oppi",
//               code,
//               redirect_uri: "http://localhost:3000/auth/callback",
//             }),
//           }
//         );

//         const data = await res.json();
//         console.log("Token response:", data);

//         if (res.ok && data.id_token) {
//           localStorage.setItem("id_token", data.id_token);
//           router.push("/");
//         } else {
//           console.error("Token exchange failed:", data);
//         }
//       } catch (error) {
//         console.error("Token exchange error:", error);
//       }
//     };

//     exchangeCodeForToken();
//   }, [code, error, errorDescription, router]);

//   return <p className="p-4 text-center">Logging in ...</p>;
// }
