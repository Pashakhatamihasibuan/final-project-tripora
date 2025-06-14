"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Percent, Gift, Sparkles } from "lucide-react";

export default function PromoSection({ promos = [] }) {
  if (!promos.length) return null;

  return (
    <div className="container mx-auto px-4">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Promo Spesial Untuk Anda
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Jangan lewatkan kesempatan emas! Dapatkan diskon fantastis untuk
          destinasi impian Anda
        </p>
      </div>
      {/* Promo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promos.slice(0, 3).map((promo, index) => (
          <Card
            key={promo.id}
            className="flex flex-col overflow-hidden group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white relative"
          >
            {/* Promo Badge */}
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Sparkles className="h-3 w-3" />
              PROMO
            </div>

            <div className="overflow-hidden relative">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=600&h=400&fit=crop&crop=center";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {promo.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow p-6 bg-gradient-to-br from-white to-orange-50/30">
              <p className="text-slate-600 line-clamp-3 leading-relaxed">
                {promo.description}
              </p>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/promos/${promo.id}`}>
                  <Gift className="mr-2 h-5 w-5" />
                  Klaim Promo Sekarang
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
