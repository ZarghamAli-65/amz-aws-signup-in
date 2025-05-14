// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const [loading, setLoading] = useState(true);
//   const [email, setEmail] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const idToken = localStorage.getItem("id_token");

//     if (!idToken) {
//       router.push("/signin"); // If no token, redirect to sign-in page
//       return;
//     }

//     // You can also decode the id_token to get user details if needed
//     const decodedToken = JSON.parse(atob(idToken.split(".")[1])); // Decode the JWT
//     setEmail(decodedToken.email || "Unknown User"); // Set email from decoded token
//     setLoading(false); // Stop loading once token is verified
//   }, [router]);

//   const handleSignOut = () => {
//     localStorage.removeItem("id_token"); // Clear the token
//     router.push("/signin"); // Redirect to sign-in page
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading while verifying token
//   }

//   return (
//     <div className="p-8 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Welcome To AWS LOG-IN!</h1>
//       <p className="text-xl font-bold p-2">Email: {email}</p>
//       <button
//         onClick={handleSignOut}
//         className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 cursor-pointer"
//       >
//         Sign Out
//       </button>
//     </div>
//   );
// }
