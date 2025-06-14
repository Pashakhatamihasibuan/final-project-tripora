"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Plane } from "lucide-react";
import NavigationLinks from "./NavigationLinks";

export default function MobileMenu({ navLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle asChild>
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <Plane className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">
                  TravelKuy
                </span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8">
            <NavigationLinks
              navLinks={navLinks}
              isMobile={true}
              onLinkClick={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
