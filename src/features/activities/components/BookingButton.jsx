"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookingButton({ activityId }) {
  // Tombol ini hanya mengarahkan ke URL booking.
  // Middleware yang akan menangani proteksi rute.
  return (
    <Button asChild size="lg" className="w-full">
      <Link href={`/activities/${activityId}/book`}>Booking Sekarang</Link>
    </Button>
  );
}
