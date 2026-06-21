import Image from "next/image";
import { projects } from "@/lib/content";

export default function Project() {
  return (
    <section
      id="project"
      className="border-b border-rule px-5 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          // project.tsx
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
          Project
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-sm border border-rule bg-panel transition hover:border-teal"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-rule bg-panelLight">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-sm border border-rule px-2 py-0.5 text-amber">
                    {p.role}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-paper">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/65">
                  {p.desc}
                </p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-teal transition hover:text-amber"
                >
                  view_project() ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
