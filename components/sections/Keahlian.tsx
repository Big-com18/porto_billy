"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/content";

function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Keahlian() {
  const entries = Object.entries(skills);
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

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

          <div ref={ref} className="bg-panel px-6 py-8 sm:px-10 sm:py-10">
            {entries.map(([category, list], colIndex) => (
              <div
                key={category}
                className={`${colIndex !== 0 ? "mt-9" : ""}`}
              >
                <p className="font-mono text-sm text-rose">
                  &quot;{category}&quot;:{" "}
                  <span className="text-paper/40">
                    [ <span className="text-muted">// {list.length} items</span>
                  </span>
                </p>

                <div className="mt-4 flex flex-wrap gap-3 pl-1 sm:pl-4">
                  {list.map((item, i) => (
                    <div
                      key={item.name}
                      style={{
                        transitionDelay: inView
                          ? `${colIndex * 100 + i * 55}ms`
                          : "0ms",
                      }}
                      className={`group flex w-[92px] flex-col items-center gap-2 rounded-md border border-rule bg-panelLight/60 px-2 py-3 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber/60 hover:bg-panelLight hover:shadow-[0_10px_28px_-10px_rgba(245,166,35,0.45)] motion-reduce:transition-none ${
                        inView
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
                      }`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-ink/50 ring-1 ring-rule transition-transform duration-300 group-hover:scale-110">
                        {item.icon ? (
                          <img
                            src={`https://skillicons.dev/icons?i=${item.icon}`}
                            alt={item.name}
                            width={28}
                            height={28}
                            loading="lazy"
                            className="h-7 w-7 object-contain"
                          />
                        ) : item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            width={28}
                            height={28}
                            loading="lazy"
                            className="h-7 w-7 object-contain"
                          />
                        ) : (
                          <span className="text-xs font-bold text-rose">
                            {item.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </span>

                      <span className="text-center font-mono text-[10.5px] leading-tight text-paper/70 transition-colors duration-300 group-hover:text-paper">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 font-mono text-sm text-paper/40 pl-1 sm:pl-4">
                  ],
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}