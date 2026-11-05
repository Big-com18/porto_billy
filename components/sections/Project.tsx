"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/content";

type Item = (typeof projects)[number] & {
  github?: string;
  tags?: string[];
  featured?: boolean;
};

type Device = "desktop" | "tablet" | "mobile";

const DEVICES: Record<Device, { w: number; h: number; label: string; maxH: number }> = {
  desktop: { w: 1280, h: 800, label: "Desktop", maxH: 2000 },
  tablet: { w: 820, h: 1100, label: "Tablet", maxH: 620 },
  mobile: { w: 390, h: 780, label: "Mobile", maxH: 600 },
};

/** Tentukan URL yang bisa di-embed. null = situs memblokir iframe -> pakai gambar. */
function getEmbedSrc(link?: string): string | null {
  if (!link) return null;
  try {
    const u = new URL(link);
    const host = u.hostname;
    if (host.endsWith("streamlit.app")) {
      return link + (link.includes("?") ? "&" : "?") + "embed=true";
    }
    if (host.endsWith("figma.com")) {
      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(link)}`;
    }
    if (host.endsWith("itch.io") || host.endsWith("github.com")) return null;
    return link;
  } catch {
    return null;
  }
}

function prettyUrl(p: Item) {
  const raw = p.link || p.github || "";
  try {
    const u = new URL(raw);
    return u.hostname + (u.pathname !== "/" ? u.pathname : "");
  } catch {
    return p.title.toLowerCase().replace(/\s+/g, "-") + ".app";
  }
}

export default function Project() {
  const all = useMemo(() => {
    const list = projects as Item[];
    // featured dulu
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, []);

  const [activeId, setActiveId] = useState(all[0]?.id);
  const [device, setDevice] = useState<Device>("desktop");
  const [running, setRunning] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [reloadKey, setReloadKey] = useState(0);

  const active = all.find((p) => p.id === activeId) ?? all[0];
  const embedSrc = getEmbedSrc(active?.link);
  const isRunning = !!running[active.id];
  const isLoaded = !!loaded[active.id];

  /* ukur lebar area preview supaya situs di-scale pas */
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(800);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setStageW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dev = DEVICES[device];
  const scale = Math.min(stageW / dev.w, dev.maxH / dev.h, 1);
  const viewW = dev.w * scale;
  const viewH = dev.h * scale;

  const idx = all.findIndex((p) => p.id === active.id);
  const go = (d: number) =>
    setActiveId(all[(idx + d + all.length) % all.length].id);

  return (
    <section
      id="project"
      className="border-b border-rule px-5 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          // project.tsx
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-bold text-paper sm:text-4xl">
            Project
          </h2>
          <p className="font-mono text-xs text-muted">
            klik project → tekan ▶ untuk lihat websitenya langsung
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[230px_1fr]">
          {/* ===== Explorer (daftar project) ===== */}
          <aside className="overflow-hidden rounded-sm border border-rule bg-panel lg:self-start">
            <div className="hidden border-b border-rule bg-panelLight px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted lg:block">
              explorer / projects
            </div>
            <ul className="flex gap-1 overflow-x-auto p-2 lg:max-h-[640px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
              {all.map((p, i) => {
                const on = p.id === active.id;
                return (
                  <li key={p.id} className="shrink-0 lg:shrink">
                    <button
                      onClick={() => setActiveId(p.id)}
                      className={`flex w-full items-center gap-2 rounded-sm border px-2.5 py-2 text-left font-mono text-xs transition ${
                        on
                          ? "border-amber/60 bg-amber/10 text-amber"
                          : "border-transparent text-paper/65 hover:bg-panelLight hover:text-paper"
                      }`}
                    >
                      <span className="text-[10px] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="whitespace-nowrap lg:truncate">
                        {p.title}
                      </span>
                      {p.featured && <span className="text-amber">★</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* ===== Browser preview ===== */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-sm border border-rule bg-panel shadow-[0_0_60px_-20px] shadow-teal/30">
              {/* toolbar */}
              <div className="flex flex-wrap items-center gap-2 border-b border-rule bg-panelLight px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-teal/70" />
                </div>

                <div className="flex gap-1 font-mono text-xs text-muted">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Project sebelumnya"
                    className="rounded-sm px-2 py-1 transition hover:bg-ink/50 hover:text-amber"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Project berikutnya"
                    className="rounded-sm px-2 py-1 transition hover:bg-ink/50 hover:text-amber"
                  >
                    →
                  </button>
                  <button
                    onClick={() => setReloadKey((k) => k + 1)}
                    aria-label="Muat ulang"
                    className="rounded-sm px-2 py-1 transition hover:bg-ink/50 hover:text-amber"
                  >
                    ⟳
                  </button>
                </div>

                <div className="flex min-w-[140px] flex-1 items-center gap-2 truncate rounded-sm border border-rule bg-ink/50 px-3 py-1 font-mono text-[11px] text-paper/70">
                  <span className="text-teal">🔒</span>
                  <span className="truncate">{prettyUrl(active)}</span>
                </div>

                <div className="flex gap-1 font-mono text-[11px]">
                  {(Object.keys(DEVICES) as Device[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDevice(d)}
                      className={`rounded-sm border px-2 py-1 transition ${
                        device === d
                          ? "border-teal text-teal"
                          : "border-rule text-muted hover:text-paper"
                      }`}
                    >
                      {DEVICES[d].label}
                    </button>
                  ))}
                </div>

                {(active.link || active.github) && (
                  <a
                    href={active.link || active.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm bg-amber px-2.5 py-1 font-mono text-[11px] font-semibold text-ink transition hover:bg-amber-dim"
                  >
                    buka ↗
                  </a>
                )}
              </div>

              {/* stage */}
              <div
                ref={stageRef}
                className="relative flex w-full justify-center bg-ink/60 p-0"
                style={{ minHeight: viewH }}
              >
                <div
                  className={`relative overflow-hidden bg-panelLight transition-all duration-500 ${
                    device === "desktop"
                      ? ""
                      : "my-4 rounded-[1.6rem] border-4 border-rule"
                  }`}
                  style={{ width: viewW, height: viewH }}
                >
                  {/* gambar (selalu ada sebagai poster / fallback) */}
                  {(!embedSrc || !isRunning) && (
                    <Image
                      key={active.id}
                      src={active.image}
                      alt={active.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover object-top"
                    />
                  )}

                  {/* tombol play */}
                  {embedSrc && !isRunning && (
                    <button
                      onClick={() =>
                        setRunning((r) => ({ ...r, [active.id]: true }))
                      }
                      className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/65 backdrop-blur-[2px] transition hover:bg-ink/50"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber bg-ink/70 text-2xl text-amber transition group-hover:scale-110">
                        ▶
                      </span>
                      <span className="font-mono text-xs text-paper/80">
                        jalankan_preview()
                      </span>
                    </button>
                  )}

                  {/* tidak bisa di-embed */}
                  {!embedSrc && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent p-4 pt-12">
                      <p className="font-mono text-[11px] text-paper/75">
                        // situs ini tidak mengizinkan ditampilkan di sini —
                        klik <span className="text-amber">buka ↗</span> untuk
                        melihat langsung
                      </p>
                    </div>
                  )}

                  {/* iframe live */}
                  {embedSrc && isRunning && (
                    <>
                      <iframe
                        key={`${active.id}-${reloadKey}`}
                        src={embedSrc}
                        title={active.title}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() =>
                          setLoaded((l) => ({ ...l, [active.id]: true }))
                        }
                        className="absolute left-0 top-0 border-0 bg-white"
                        style={{
                          width: dev.w,
                          height: dev.h,
                          transform: `scale(${scale})`,
                          transformOrigin: "top left",
                        }}
                      />
                      {!isLoaded && (
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/80">
                          <span className="h-8 w-8 animate-spin rounded-full border-2 border-rule border-t-amber" />
                          <span className="font-mono text-xs text-muted">
                            memuat website…
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {embedSrc && isRunning && (
                <div className="border-t border-rule bg-panelLight px-3 py-1.5 font-mono text-[10px] text-muted">
                  // kosong atau error? situs mungkin memblokir embed atau
                  sedang tertidur (Streamlit) — klik “buka ↗”
                </div>
              )}
            </div>

            {/* info project */}
            <div
              key={active.id}
              className="mt-5 grid gap-5 rounded-sm border border-rule bg-panel p-5 sm:grid-cols-[1fr_auto] sm:p-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  {active.featured && (
                    <span className="rounded-sm bg-amber/15 px-2 py-0.5 text-amber">
                      ★ featured
                    </span>
                  )}
                  <span className="rounded-sm border border-rule px-2 py-0.5 text-amber">
                    {active.role}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-paper sm:text-2xl">
                  {active.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper/70">
                  {active.desc}
                </p>
                {active.tags && active.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-rule bg-ink/40 px-2 py-0.5 font-mono text-[10px] text-teal"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-3 font-mono text-xs sm:flex-col sm:items-stretch">
                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm bg-amber px-4 py-2 text-center font-semibold text-ink transition hover:bg-amber-dim"
                  >
                    live_demo() ↗
                  </a>
                )}
                {active.github && (
                  <a
                    href={active.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm border border-rule px-4 py-2 text-center text-paper/80 transition hover:border-teal hover:text-teal"
                  >
                    source_code ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}