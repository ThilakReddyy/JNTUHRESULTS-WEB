import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { homeToolGroups, type HomeTool } from "@/constants/homeLinks";

const ToolCard = ({ tool }: { tool: HomeTool }) => {
  const { icon: Icon, title, description, badge, external, link } = tool;

  const content = (
    <div className="flex h-full flex-col border border-border bg-card p-5 shadow-[3px_3px_0_hsl(var(--shadow))] transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-foreground group-hover:bg-secondary group-hover:shadow-[5px_5px_0_hsl(var(--shadow))] group-focus-visible:border-foreground">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background">
          <Icon size={17} aria-hidden="true" />
        </span>
        {badge ? (
          <span className="border border-border bg-secondary px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-secondary-foreground">
            {badge}
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 flex items-center gap-1.5 text-base font-extrabold tracking-tight">
        {title}
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );

  const className =
    "group block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (external) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={link} className={className}>
      {content}
    </Link>
  );
};

const ToolGrid = () => {
  return (
    <section
      aria-labelledby="tool-grid-title"
      className="home-container px-4 py-10 sm:px-6 md:py-14"
    >
      <h2 id="tool-grid-title" className="sr-only">
        JNTUH Connect student tools
      </h2>

      <div className="space-y-10">
        {homeToolGroups.map((group) => (
          <div key={group.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-3">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em]">
                {group.label}
              </h3>
              <p className="text-xs text-muted-foreground">{group.caption}</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.tools.map((tool) => (
                <ToolCard key={tool.link} tool={tool} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolGrid;
