export default function PageHeader({ title, description }) {
  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
        {description && (
          <p className="mt-2 text-lg text-slate-500 max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
