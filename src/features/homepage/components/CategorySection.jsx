"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function CategorySection({ categories = [] }) {
  if (!categories.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {/* Hanya menampilkan maksimal 12 kategori untuk 2 baris */}
      {categories.slice(0, 12).map((category) => (
        <Link
          href={`/categories/${category.id}`}
          key={category.id}
          className="group"
        >
          <Card className="overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
            <div className="aspect-square w-full overflow-hidden relative">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4 text-center bg-gradient-to-r from-blue-50 to-teal-50">
              <h3 className="font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
