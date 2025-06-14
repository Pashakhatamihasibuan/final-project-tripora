import PageHeader from "@/components/ui/PageHeader";

export default function BookingPage({ params }) {
  // Halaman ini hanya akan bisa diakses jika pengguna sudah login.
  // Logika untuk membuat transaksi akan ditambahkan di sini nanti.
  return (
    <>
      <PageHeader
        title="Konfirmasi Booking"
        description={`Anda selangkah lagi untuk memesan aktivitas #${params.id}`}
      />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold">
            Halaman Booking untuk Aktivitas {params.id}
          </h2>
          <p className="mt-2 text-slate-600">
            Konten form booking akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </>
  );
}
