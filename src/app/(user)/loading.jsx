import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Compass className="h-16 w-16 animate-spin text-blue-600" />
        <p className="text-lg font-semibold text-slate-700">
          Memuat Halaman...
        </p>
      </div>
    </div>
  );
}
