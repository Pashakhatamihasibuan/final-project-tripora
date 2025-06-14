import Link from "next/link";
import { getPromos } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketPercent } from "lucide-react";

export default async function PromosPage() {
  const promosData = await getPromos();
  const promos = promosData?.data || [];

  return (
    <>
      <PageHeader
        title="Semua Promo"
        description="Jangan lewatkan penawaran terbatas untuk liburan yang lebih hemat."
      />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <Card
              key={promo.id}
              className="flex flex-col overflow-hidden group"
            >
              <div className="overflow-hidden">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="truncate">{promo.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-slate-600 line-clamp-3">
                  {promo.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="secondary">
                  <Link href={`/promos/${promo.id}`}>
                    <TicketPercent className="mr-2 h-4 w-4" /> Lihat Detail
                    Promo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
