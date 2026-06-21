import { skills } from "@/lib/content";

export default function Keahlian() {
  const entries = Object.entries(skills);

  return (
    <section
      id="keahlian"
      className="border-b border-rule bg-panel/40 px-5 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          // keahlian.json
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
          Keahlian
        </h2>

        <div className="mt-10 overflow-hidden rounded-sm border border-rule">
          <div className="flex items-center gap-1.5 border-b border-rule bg-panelLight px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-rose/70" />
            <span className="h-2 w-2 rounded-full bg-amber/70" />
            <span className="h-2 w-2 rounded-full bg-teal/70" />
            <span className="ml-2 font-mono text-[11px] text-muted">
              keahlian.json
            </span>
          </div>
          <div className="grid gap-0 bg-panel sm:grid-cols-3">
            {entries.map(([category, list], i) => (
              <div
                key={category}
                className={`p-6 ${
                  i !== entries.length - 1
                    ? "border-b border-rule sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <p className="font-mono text-xs text-rose">
                  &quot;{category}&quot;:
                </p>
                <ul className="mt-3 space-y-2">
                  {list.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2 font-mono text-sm text-paper/80"
                    >
                      <span className="text-teal">-</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
