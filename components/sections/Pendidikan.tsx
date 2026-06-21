import { education } from "@/lib/content";

export default function Pendidikan() {
  return (
    <section
      id="pendidikan"
      className="border-b border-rule px-5 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          // pendidikan.tsx
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
          Pendidikan
        </h2>

        <div className="codeframe mt-10 space-y-7 text-paper/85">
          {education.map((e) => (
            <article
              key={e.school}
              className="grid gap-1 border-l border-rule pl-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4"
            >
              <h3 className="font-display text-lg font-bold text-paper sm:text-xl">
                {e.school}
              </h3>
              <span className="font-mono text-xs text-teal sm:text-right">
                {e.period}
              </span>
              <p className="font-mono text-sm text-amber sm:col-span-2">
                {e.degree}
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-paper/65 sm:col-span-2">
                {e.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
