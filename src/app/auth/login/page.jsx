import Link from "next/link";
import LoginForm from "@/features/authentication/components/LoginForm";
import { Plane, CheckCircle } from "lucide-react";

export default function LoginPage({ searchParams }) {
  const status = searchParams?.status;

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      {/* Kolom Kiri: Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Link
              href="/"
              className="flex items-center justify-center lg:justify-start gap-2 mb-6"
            >
              <Plane className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">TravelKuy</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Selamat Datang Kembali
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-sky-600 hover:underline"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
          {status === "success_register" && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              <CheckCircle className="h-5 w-5" />
              <p>Registrasi berhasil! Silakan login untuk melanjutkan.</p>
            </div>
          )}
          <LoginForm />
        </div>
      </div>

      {/* Kolom Kanan: Gambar */}
      <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop"
          alt="Pria dengan backpack melihat pemandangan gunung dan danau"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white">
          <div className="text-left">
            <h2 className="text-3xl font-bold">Lanjutkan Petualanganmu</h2>
            <p className="mt-2 max-w-sm">
              Login untuk melihat riwayat perjalanan, promo eksklusif, dan
              kemudahan booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
