"use client";
import { Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Rina Wulandari",
    location: "Traveler dari Jakarta",
    quote:
      "Pengalaman booking di TravelKuy sangat mulus! Saya menemukan hidden gem di Bali yang tidak ada di platform lain. Customer servicenya juga responsif. Sangat direkomendasikan!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Budi Santoso",
    location: "Backpacker dari Surabaya",
    quote:
      "Sebagai backpacker, saya mencari promo terbaik. TravelKuy memberikan diskon yang luar biasa untuk aktivitas arung jeram. Prosesnya cepat dan mudah, saya pasti akan pakai lagi!",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Ahmad & Siti",
    location: "Pasangan Honeymoon",
    quote:
      "Kami merencanakan bulan madu ke Lombok melalui TravelKuy. Semua aktivitas, dari snorkeling hingga makan malam romantis, terorganisir dengan sempurna. Terima kasih TravelKuy!",
    avatar:
      "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=2081&auto=format&fit=crop",
  },
  {
    name: "Citra Amelia",
    location: "Solo Traveler",
    quote:
      "Awalnya ragu untuk solo traveling ke Raja Ampat, tapi TravelKuy menyediakan paket yang aman dan terpercaya. Saya bertemu teman-teman baru dan mendapat pengalaman tak terlupakan.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Mereka Tentang TravelKuy?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dengarkan cerita inspiratif dari ribuan traveler yang telah
            mempercayai TravelKuy untuk petualangan mereka
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden py-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-2xl border border-gray-100">
                    {/* Stars */}
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Profile */}
                    <div className="flex items-center justify-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-blue-100"
                      />
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-500">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-blue-50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-blue-50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
