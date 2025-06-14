import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  // Logika untuk mengambil data cart akan ditambahkan nanti
  const cartItems = []; // Placeholder

  return (
    <>
      <PageHeader title="Keranjang Belanja" />
      <div className="container mx-auto px-4 md:px-6 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-sm">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-300" />
            <h2 className="mt-4 text-2xl font-bold text-gray-700">
              Keranjang Anda Kosong
            </h2>
            <p className="mt-2 text-gray-500">
              Sepertinya Anda belum menambahkan aktivitas apapun.
            </p>
            <Button asChild className="mt-6">
              <Link href="/activities">Cari Aktivitas Sekarang</Link>
            </Button>
          </div>
        ) : (
          <div>{/* Tampilan item cart akan dibuat di sini */}</div>
        )}
      </div>
    </>
  );
}
