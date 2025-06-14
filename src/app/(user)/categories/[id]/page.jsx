import Link from "next/link";
import { getActivitiesByCategoryId, getCategoryDetails } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ActivitiesByCategoryPage({ params }) {
  const [activitiesData, categoryData] = await Promise.all([
    getActivitiesByCategoryId(params.id),
    getCategoryDetails(params.id),
  ]);

  if (!categoryData || !categoryData.data) {
    notFound();
  }

  const activities = activitiesData?.data || [];
  const categoryName = categoryData.data.name;

  return (
    <>
      <PageHeader
        title={`Kategori: ${categoryName}`}
        description={`Menampilkan semua aktivitas dalam kategori "${categoryName}".`}
      />
      <div className="container mx-auto px-4 md:px-6 py-8">
        {activities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden group">
                <div className="relative">
                  <img
                    src={activity.imageUrls[0]}
                    alt={activity.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-slate-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    {activity.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg truncate text-slate-800">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {activity.city}, {activity.province}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-500">Mulai dari</p>
                      <p className="font-bold text-sky-600">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(activity.price)}
                      </p>
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/activities/${activity.id}`}>
                        Lihat Detail
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-sm">
            <h2 className="mt-4 text-2xl font-bold text-gray-700">
              Belum Ada Aktivitas
            </h2>
            <p className="mt-2 text-gray-500">
              Tidak ada aktivitas yang ditemukan untuk kategori ini saat ini.
            </p>
            <Button asChild className="mt-6">
              <Link href="/activities">Lihat Semua Aktivitas Lainnya</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
