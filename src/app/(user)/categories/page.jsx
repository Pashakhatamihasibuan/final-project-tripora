import Link from "next/link";
import { getCategories } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/card";

export default async function CategoriesPage() {
  const categoriesData = await getCategories();
  const categories = categoriesData?.data || [];

  return (
    <>
      <PageHeader
        title="Semua Kategori"
        description="Jelajahi berbagai jenis aktivitas yang kami tawarkan."
      />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="group"
            >
              <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-slate-700 truncate">
                    {category.name}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
