import {
  getBanners,
  getCategories,
  getPromos,
  getAllActivities,
} from "@/lib/data";
import HeroSection from "@/features/homepage/components/HeroSection";
import CategorySection from "@/features/homepage/components/CategorySection";
import PromoSection from "@/features/homepage/components/PromoSection";
import ActivitySection from "@/features/homepage/components/ActivitySection";
import TestimonialSection from "@/features/homepage/components/TestimonialSection";
import Section from "@/components/ui/Section";

export default async function HomePage() {
  const [bannersData, categoriesData, promosData, activitiesData] =
    await Promise.all([
      getBanners(),
      getCategories(),
      getPromos(),
      getAllActivities(),
    ]);

  return (
    <>
      <HeroSection banners={bannersData?.data || []} />
      <div className="container mx-auto px-4 md:px-6 py-8 space-y-16">
        {/* Menggunakan Section wrapper untuk Kategori */}
        <Section
          title="Kategori Populer"
          description="Temukan aktivitas yang sesuai dengan minatmu."
          href="/categories"
        >
          <CategorySection categories={categoriesData?.data || []} />
        </Section>

        <Section>
          <ActivitySection activities={activitiesData?.data || []} />
        </Section>

        <Section>
          <PromoSection promos={promosData?.data || []} />
        </Section>

        <Section>
          <TestimonialSection />
        </Section>
      </div>
    </>
  );
}
