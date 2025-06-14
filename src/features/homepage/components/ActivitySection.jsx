"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Calendar, Users, Plane } from "lucide-react";

export default function ActivitySection({ activities = [] }) {
  if (!activities.length) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Plane className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
            Aktivitas Terpopuler
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nikmati pengalaman tak terlupakan dengan aktivitas wisata pilihan
            terbaik dari seluruh Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.slice(0, 4).map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <div className="relative overflow-hidden">
                <img
                  src={activity.imageUrls[0]}
                  alt={activity.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop&crop=center";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  {activity.rating}
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-4 text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Tersedia</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Grup</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 bg-gradient-to-br from-white to-blue-50/50">
                <h3 className="font-bold text-xl mb-2 text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {activity.title}
                </h3>

                <div className="flex items-center gap-2 mb-4 text-slate-600">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">
                    {activity.city}, {activity.province}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Mulai dari</p>
                    <p className="font-bold text-xl text-blue-600">
                      Rp {new Intl.NumberFormat("id-ID").format(activity.price)}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href={`/activities/${activity.id}`}>Jelajahi</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
