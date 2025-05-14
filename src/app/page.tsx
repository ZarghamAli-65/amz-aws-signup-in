import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import User from "@/components/User";

export default function HomePage() {
  return (
    <div className="p-8">
      <Navbar />
      <User />
      <Footer />
    </div>
  );
}
