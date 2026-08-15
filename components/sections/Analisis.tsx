import { analisis } from "@/lib/content";

export default function Analisis() {
  return (
    <section
      id="analisis"
      className="border-b border-rule px-5 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          // analisis.tsx
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
          Analisis &amp; Studi Kasus
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/65">
          Beberapa pekerjaan analisis data / tugas kuliah yang tidak
          dipublikasikan di GitHub (repo private, tugas kelompok, atau
          laporan internal), tapi tetap relevan untuk ditunjukkan.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {analisis.map((a, i) => (
            <article
              key={a.id}
              className="flex flex-col rounded-sm border border-rule bg-panel p-5 transition hover:border-teal"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-1.5 rounded-sm border border-rose/40 px-2 py-0.5 text-rose">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                  private / tidak di-publish
                </span>
              </div>

              <h3 className="mt-3 font-display text-lg font-bold text-paper">
                {a.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/65">
                {a.desc}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-rule px-2 py-0.5 font-mono text-[11px] text-teal"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-teal transition hover:text-amber"
                >
                  lihat_laporan() ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}