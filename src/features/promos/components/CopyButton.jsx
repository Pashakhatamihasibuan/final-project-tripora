"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CopyButton({ promoCode }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    toast.success(`Kode promo "${promoCode}" berhasil disalin!`);
  };

  return <Button onClick={handleCopy}>Salin Kode</Button>;
}
