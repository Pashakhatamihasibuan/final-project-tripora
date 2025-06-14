import Link from "next/link";
import { cookies } from "next/headers";
import { Plane, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/authentication/actions";
import SearchModal from "@/features/search/components/SearchModal";
import { getAllActivities } from "@/lib/data";
import NavigationLinks from "@/components/ui/NavigationLinks";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const token = cookies().get("token")?.value;
  const userName = cookies().get("userName")?.value;
  const isLoggedIn = !!token;

  const activitiesData = await getAllActivities();
  const activities = activitiesData?.data || [];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/banners", label: "Banners" },
    { href: "/categories", label: "Categories" },
    { href: "/activities", label: "Activities" },
    { href: "/promos", label: "Promos" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          {/* Tombol Menu Mobile */}
          <MobileMenu navLinks={navLinks} />

          <Link href="/" className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">TravelKuy</span>
          </Link>
        </div>

        {/* Navigasi Desktop */}
        <div className="hidden md:flex">
          <NavigationLinks navLinks={navLinks} />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <SearchModal activities={activities} />
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <div className="hidden md:block h-6 border-l"></div>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                Halo, {userName || "Pengguna"}
              </span>
              <form action={logout}>
                <Button variant="outline" size="sm">
                  Logout
                </Button>
              </form>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
