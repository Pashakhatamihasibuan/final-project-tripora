"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function HeroSection({ banners: initialBanners = [] }) {
  const [banners, setBanners] = useState(initialBanners);
  const [loading, setLoading] = useState(!initialBanners.length);
  const [error, setError] = useState(null);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  // Debug: Log props yang diterima
  useEffect(() => {
    console.log("HeroSection received banners:", initialBanners);
    if (initialBanners.length > 0) {
      setBanners(initialBanners);
      setLoading(false);
    }
  }, [initialBanners]);

  // Fallback: fetch data jika tidak ada initial data
  useEffect(() => {
    if (!initialBanners.length) {
      console.log("No initial banners, fetching from API...");
      fetchBanners();
    }
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/banners"); // Menggunakan API route
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched banners:", data);
        setBanners(data.data || []);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[60vh] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Memuat banner...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[60vh] bg-red-100 flex items-center justify-center">
        <div className="text-center text-red-700">
          <p className="text-lg mb-4">Gagal memuat banner</p>
          <p className="text-sm text-red-500">{error}</p>
          <Button onClick={fetchBanners} variant="outline" className="mt-4">
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  if (!banners.length) {
    return (
      <div className="w-full h-[60vh] bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
            Travel Adventure
          </h1>
          <p className="text-lg max-w-2xl mx-auto drop-shadow-md mb-8">
            Banner sedang tidak tersedia, namun petualangan menunggumu!
          </p>
          <Button asChild size="lg">
            <Link href="/activities">Jelajahi Sekarang</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative" ref={emblaRef}>
      <div className="flex">
        {banners.map((banner, index) => (
          <div
            className="flex-grow-0 flex-shrink-0 w-full h-[60vh] relative"
            key={banner.id || index}
          >
            <img
              src={banner.imageUrl}
              alt={banner.name || `Banner ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Failed to load image: ${banner.imageUrl}`);
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
              }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                  {banner.name || "Travel Adventure"}
                </h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
                  Temukan petualangan impianmu dengan penawaran terbaik.
                </p>
                <Button asChild className="mt-8" size="lg">
                  <Link href="/activities">Jelajahi Sekarang</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
