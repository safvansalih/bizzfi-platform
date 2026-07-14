import { heroData } from "./hero-data";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-6">

      <div className="mx-auto max-w-5xl text-center">

        <span className="rounded-full border px-4 py-2 text-sm">
          {heroData.badge}
        </span>

        <h1 className="mt-8 text-5xl font-bold leading-tight lg:text-7xl">
          {heroData.title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          {heroData.description}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <button className="rounded-xl bg-blue-600 px-8 py-4 text-white">
            {heroData.primaryButton}
          </button>

          <button className="rounded-xl border px-8 py-4">
            {heroData.secondaryButton}
          </button>

        </div>

        <div className="mt-16 flex justify-center gap-16">

          {heroData.stats.map((item) => (

            <div key={item.label}>

              <h2 className="text-3xl font-bold">
                {item.value}
              </h2>

              <p className="text-muted-foreground">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}