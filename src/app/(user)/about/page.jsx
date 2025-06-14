import { Target, Eye, Users, Handshake, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Komponen untuk kartu nilai-nilai perusahaan dengan animasi elegant
const ValueCard = ({ icon, title, children, delay = 0 }) => (
  <div
    className="group relative text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Gradient overlay yang muncul saat hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Icon container dengan animasi pulse */}
    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full animate-pulse opacity-75" />
      <div className="relative z-10">{icon}</div>
    </div>

    <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-sky-700 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
      {children}
    </p>
  </div>
);

// Komponen untuk kartu anggota tim dengan efek hover yang menawan
const TeamMemberCard = ({ name, role, imageUrl, delay = 0 }) => (
  <Card
    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white border-0"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Container gambar dengan overlay gradient */}
    <div className="relative aspect-square overflow-hidden">
      <img
        src={imageUrl}
        alt={`Foto ${name}`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      {/* Gradient overlay yang muncul saat hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Star icon yang muncul saat hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
        <Star className="w-6 h-6 text-yellow-400 fill-current" />
      </div>
    </div>

    <CardHeader className="p-6 text-center">
      <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-sky-700 transition-colors duration-300">
        {name}
      </CardTitle>
      <p className="text-sky-600 font-medium text-sm tracking-wide uppercase group-hover:text-sky-700 transition-colors duration-300">
        {role}
      </p>
    </CardHeader>
  </Card>
);

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Andi Pratama",
      role: "CEO & Founder",
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Bunga Citra",
      role: "Head of Operations",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Pasha Khatami Hasibuan",
      role: "Lead Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop",
    },
    {
      name: "Diana Sari",
      role: "Marketing Specialist",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    },
  ];

  return (
    <>
      {/* Hero Section dengan parallax effect */}
      <section
        className="relative h-[70vh] bg-cover bg-center bg-fixed overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516546454278-5e8e87834948?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Gradient overlay dengan animasi */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-blue-900/60 to-purple-900/70" />

        {/* Floating elements untuk efek visual */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-32 right-16 w-24 h-24 bg-sky-400/20 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-400/20 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            <div className="mb-6">
              <MapPin className="w-12 h-12 mx-auto text-sky-400 animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-sky-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Tentang TravelKuy
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-sky-100">
              Menghubungkan Anda dengan pengalaman tak terlupakan di seluruh
              dunia melalui teknologi dan pelayanan terdepan.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 py-20 space-y-24">
          {/* Kisah Kami Section */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
                <h2 className="text-4xl font-bold text-slate-800">
                  Kisah Kami
                </h2>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed">
                TravelKuy lahir dari kecintaan kami pada petualangan dan
                keyakinan bahwa setiap orang berhak mendapatkan pengalaman
                liburan yang{" "}
                <span className="font-semibold text-sky-700">
                  mudah, aman, dan berkesan
                </span>
                . Kami memulai perjalanan ini untuk menghilangkan kerumitan
                dalam merencanakan liburan, sehingga Anda bisa fokus untuk
                menciptakan kenangan indah.
              </p>

              <p className="text-lg text-slate-600 leading-relaxed">
                Dari puncak gunung hingga birunya lautan, kami berkomitmen untuk
                menyediakan platform yang{" "}
                <span className="font-semibold text-sky-700">
                  andal dan inspiratif
                </span>{" "}
                bagi para petualang di seluruh Indonesia.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full border-2 border-white" />
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full border-2 border-white" />
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full border-2 border-white" />
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  Dipercaya oleh 10,000+ travelers
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-200 to-blue-200 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <img
                src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?q=80&w=1974&auto=format&fit=crop"
                alt="Tim sedang berdiskusi"
                className="relative rounded-2xl shadow-2xl w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </section>

          {/* Nilai-nilai Kami Section */}
          <section className="py-16">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
                <h2 className="text-4xl font-bold text-slate-800">
                  Nilai-nilai Kami
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              </div>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Prinsip yang menjadi pemandu setiap langkah dan keputusan kami
                dalam memberikan pengalaman terbaik.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ValueCard
                icon={<Target className="w-10 h-10" />}
                title="Misi Kami"
                delay={0}
              >
                Menyederhanakan proses booking perjalanan dan aktivitas,
                membuatnya dapat diakses oleh semua orang dengan teknologi
                terdepan.
              </ValueCard>

              <ValueCard
                icon={<Eye className="w-10 h-10" />}
                title="Visi Kami"
                delay={100}
              >
                Menjadi platform travel paling tepercaya dan dicintai di Asia
                Tenggara dengan inovasi berkelanjutan.
              </ValueCard>

              <ValueCard
                icon={<Users className="w-10 h-10" />}
                title="Fokus Pelanggan"
                delay={200}
              >
                Kepuasan dan keamanan Anda adalah prioritas utama kami dalam
                setiap inovasi dan layanan yang kami berikan.
              </ValueCard>

              <ValueCard
                icon={<Handshake className="w-10 h-10" />}
                title="Integritas"
                delay={300}
              >
                Berbisnis dengan jujur dan transparan dalam setiap interaksi
                dengan pelanggan dan mitra strategis kami.
              </ValueCard>
            </div>
          </section>

          {/* Tim Kami Section */}
          <section className="py-16">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" />
                <h2 className="text-4xl font-bold text-slate-800">
                  Temui Tim Kami
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full" />
              </div>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Orang-orang penuh semangat dan berpengalaman di balik layar yang
                mewujudkan petualangan impian Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.name}
                  {...member}
                  delay={index * 100}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
