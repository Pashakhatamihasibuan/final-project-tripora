import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Section({ title, description, href, children }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
          <p className="mt-1 text-slate-500">{description}</p>
        </div>
        {href && (
          <Button asChild variant="outline">
            <Link href={href}>
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      {children}
    </section>
  );
}
