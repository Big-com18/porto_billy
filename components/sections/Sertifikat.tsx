import Image from "next/image";
import { certificates } from "@/lib/content";

export default function Sertifikat() {
  return (
    <section
      id="sertifikat"
      className="border-b border-rule bg-panel/40 px-5 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          // sertifikat.tsx
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
          Sertifikat
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((c) => {
            const inner = (
              <>
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-rule bg-panelLight">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-sm font-bold leading-snug text-paper">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-paper/60">
                    {c.issuer}
                  </p>
                  {c.period && (
                    <p className="mt-1 font-mono text-[11px] text-teal">
                      {c.period}
                    </p>
                  )}
                  {c.extra && (
                    <p className="mt-1 font-mono text-[11px] text-amber">
                      {c.extra}
                    </p>
                  )}
                  {c.link && (
                    <span className="mt-3 font-mono text-[11px] text-muted transition group-hover:text-amber">
                      lihat_sertifikat() ↗
                    </span>
                  )}
                </div>
              </>
            );
            const cardClass =
              "group flex flex-col overflow-hidden rounded-sm border border-rule bg-panel transition hover:border-amber";
            return c.link ? (
              <a
                key={c.title}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {inner}
              </a>
            ) : (
              <div key={c.title} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
