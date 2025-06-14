import { notFound } from "next/navigation";
import { getBannerDetails } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

export default async function BannerDetailPage({ params }) {
  const bannerData = await getBannerDetails(params.id);

  if (!bannerData || !bannerData.data) {
    notFound();
  }

  const banner = bannerData.data;

  return (
    <>
      <PageHeader title={banner.name} />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="w-full aspect-video md:aspect-[2.4/1] overflow-hidden rounded-lg shadow-lg">
          <img
            src={banner.imageUrl}
            alt={banner.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
