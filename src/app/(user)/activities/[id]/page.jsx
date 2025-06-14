import { notFound } from "next/navigation";
import { getActivityDetails } from "@/lib/data";
import { Clock, Star, Users, Wifi } from "lucide-react";
import BookingButton from "@/features/activities/components/BookingButton";

export default async function ActivityDetailPage({ params }) {
  const activityData = await getActivityDetails(params.id);

  if (!activityData || !activityData.data) {
    notFound();
  }

  const activity = activityData.data;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            {activity.title}
          </h1>
          <div className="mt-2 flex items-center gap-4 text-slate-500">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-700">
                {activity.rating}
              </span>
              ({activity.total_reviews} reviews)
            </div>
            <div className="h-4 border-l"></div>
            <span>
              {activity.city}, {activity.province}
            </span>
          </div>
        </div>

        {/* Galeri Gambar */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-12">
          <div className="col-span-4 md:col-span-2 row-span-2 rounded-lg overflow-hidden">
            <img
              src={activity.imageUrls[0]}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={activity.imageUrls[1] || activity.imageUrls[0]}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={activity.imageUrls[2] || activity.imageUrls[0]}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block col-span-2 row-span-1 rounded-lg overflow-hidden">
            <img
              src={activity.imageUrls[3] || activity.imageUrls[0]}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Konten Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Deskripsi
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {activity.description}
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">
              Fasilitas
            </h2>
            <div
              className="text-slate-600"
              dangerouslySetInnerHTML={{ __html: activity.facilities }}
            />
          </div>

          {/* Kolom Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 border rounded-xl shadow-lg bg-white">
              <p className="text-2xl font-bold text-slate-800">
                Rp{" "}
                {new Intl.NumberFormat("id-ID").format(activity.price_discount)}
                <span className="ml-2 text-base font-normal text-slate-500 line-through">
                  Rp {new Intl.NumberFormat("id-ID").format(activity.price)}
                </span>
              </p>
              <div className="mt-6">
                <BookingButton activityId={activity.id} />
              </div>
              <p className="mt-4 text-xs text-center text-slate-500">
                Harga dapat berubah. Pesan sekarang untuk mengamankan tempat
                Anda!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
