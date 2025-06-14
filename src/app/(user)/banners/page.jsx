import { getBanners } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

export default async function BannersPage() {
  const bannersData = await getBanners();
  const banners = bannersData?.data || [];

  return (
    <>
      <PageHeader
        title="Banners"
        description="Lihat semua penawaran spesial yang sedang berlangsung."
      />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={banner.imageUrl}
                alt={banner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                <h2 className="text-2xl font-bold text-white drop-shadow-md">
                  {banner.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
