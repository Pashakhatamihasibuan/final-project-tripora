import { notFound } from "next/navigation";
import { getPromoDetails } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import CopyButton from "@/features/promos/components/CopyButton"; // Import komponen baru

export default async function PromoDetailPage({ params }) {
  const promoData = await getPromoDetails(params.id);

  if (!promoData || !promoData.data) {
    notFound();
  }

  const promo = promoData.data;

  return (
    <>
      <PageHeader title={promo.title} description={promo.description} />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Syarat dan Ketentuan</h2>
              <div
                dangerouslySetInnerHTML={{ __html: promo.terms_condition }}
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-24 p-6 border rounded-xl shadow-lg bg-white">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="w-full aspect-video object-cover rounded-lg mb-4"
              />
              <p className="text-sm text-slate-500 mb-2">
                Gunakan kode promo ini untuk mendapatkan diskon!
              </p>
              <div className="flex items-center justify-between p-3 border-2 border-dashed rounded-lg bg-slate-50">
                <span className="text-lg font-bold text-sky-600 tracking-widest">
                  {promo.promo_code}
                </span>
                <CopyButton promoCode={promo.promo_code} />
              </div>
              <div className="mt-4 text-sm space-y-1 text-slate-600">
                <p>
                  <strong>Diskon:</strong> Rp{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    promo.promo_discount_price
                  )}
                </p>
                <p>
                  <strong>Klaim Minimum:</strong> Rp{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    promo.minimum_claim_price
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
