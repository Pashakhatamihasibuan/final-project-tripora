"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

export default function SearchModal({ activities = [] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredActivities = query
    ? activities.filter(
        (activity) =>
          activity.title.toLowerCase().includes(query.toLowerCase()) ||
          activity.city.toLowerCase().includes(query.toLowerCase()) ||
          activity.province.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Shortcut untuk membuka/menutup modal (Cmd+K / Ctrl+K)
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5 text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Cari Aktivitas</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Ketik nama aktivitas atau kota..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-4 max-h-[400px] overflow-y-auto">
          {query && filteredActivities.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-4">
              Aktivitas tidak ditemukan.
            </p>
          )}
          <ul className="space-y-2">
            {filteredActivities.map((activity) => (
              <li key={activity.id}>
                <Link
                  href={`/activities/${activity.id}`}
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <img
                    src={activity.imageUrls[0]}
                    alt={activity.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{activity.title}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {activity.city}, {activity.province}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
