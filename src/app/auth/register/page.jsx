import Link from "next/link";
import RegisterForm from "@/features/authentication/components/RegisterForm";
import { Plane } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      {/* Kolom Kiri: Gambar */}
      <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop"
          alt="Wanita melihat peta di kota bergaya Eropa"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Container untuk konten di atas gambar (Logo & Teks) */}
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-2 self-start">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">TravelKuy</span>
          </Link>
          <div className="text-center">
            <h2 className="text-3xl font-bold">Petualangan Baru Menanti</h2>
            <p className="mt-2">
              Ribuan destinasi menakjubkan siap untuk Anda jelajahi.
            </p>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Link
              href="/"
              className="flex items-center justify-center lg:hidden gap-2 mb-6"
            >
              <Plane className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">TravelKuy</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Buat Akun Baru
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-sky-600 hover:underline"
              >
                Login di sini
              </Link>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
