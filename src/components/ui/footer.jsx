import Link from "next/link";
import {
  Plane,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Plane className="h-6 w-6 text-blue-300" />
              </div>
              <span className="text-2xl font-bold text-white">TravelKuy</span>
            </Link>
            <p className="text-blue-100 max-w-sm mb-6 leading-relaxed">
              Jelajahi destinasi menakjubkan dengan penawaran terbaik dari kami.
              Petualangan Anda dimulai di sini. Buat setiap perjalanan menjadi
              kenangan tak terlupakan.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-100">
                <MapPin className="h-4 w-4 text-blue-300" />
                <span className="text-sm">
                  Jl. Wisata No. 123, Jakarta, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Phone className="h-4 w-4 text-blue-300" />
                <span className="text-sm">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Mail className="h-4 w-4 text-blue-300" />
                <span className="text-sm">info@travelkuy.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Jelajahi</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/destinations"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full group-hover:bg-white transition-colors"></span>
                  Destinasi Populer
                </Link>
              </li>
              <li>
                <Link
                  href="/activities"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full group-hover:bg-white transition-colors"></span>
                  Aktivitas & Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/promos"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full group-hover:bg-white transition-colors"></span>
                  Promo Special
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full group-hover:bg-white transition-colors"></span>
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Support */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Layanan</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/booking-guide"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full group-hover:bg-white transition-colors"></span>
                  Panduan Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-service"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full group-hover:bg-white transition-colors"></span>
                  Customer Service
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full group-hover:bg-white transition-colors"></span>
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-300 rounded-full group-hover:bg-white transition-colors"></span>
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-12 pt-8 border-t border-blue-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <span className="text-blue-100 text-sm">Ikuti Kami:</span>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 group"
                >
                  <Facebook className="h-4 w-4 text-blue-300 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 group"
                >
                  <Instagram className="h-4 w-4 text-blue-300 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 group"
                >
                  <Twitter className="h-4 w-4 text-blue-300 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 group"
                >
                  <Youtube className="h-4 w-4 text-blue-300 group-hover:text-white" />
                </Link>
              </div>
            </div>

            <div className="text-center">
              <p className="text-blue-100 text-sm mb-2">
                🌟 Dapatkan penawaran terbaik langsung di inbox Anda
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="px-4 py-2 rounded-lg bg-white/10 border border-blue-600/30 text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15"
                />
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-white text-sm font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-blue-700/50 text-center">
          <p className="text-blue-200 text-sm">
            &copy; {new Date().getFullYear()} TravelKuy. All rights reserved.
            <span className="mx-2">•</span>
            Dibuat dengan ❤️ untuk para petualang Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
