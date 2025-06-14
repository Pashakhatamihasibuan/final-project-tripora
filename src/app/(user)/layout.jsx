import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default async function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
