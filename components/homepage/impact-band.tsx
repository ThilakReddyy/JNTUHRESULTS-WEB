import { homeStats } from "@/constants/homestats";

const ImpactBand = () => {
  return (
    <section
      aria-labelledby="impact-band-title"
      className="border-b border-border bg-background"
    >
      <div className="home-container px-4 py-8 sm:px-6 md:py-10">
        <h2
          id="impact-band-title"
          className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-muted-foreground"
        >
          Where JNTUH Connect stands today
        </h2>

        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {homeStats.map(({ value, label, detail, icon: Icon }) => (
            <li key={label} className="border border-border bg-card p-4">
              <Icon
                size={16}
                aria-hidden="true"
                className="text-muted-foreground"
              />
              <p className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ImpactBand;
