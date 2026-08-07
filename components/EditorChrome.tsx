"use client";

import { useEffect, useState } from "react";

type FileEntry = {
  id: string;
  name: string;
  ext: "tsx" | "json" | "md";
  href?: string;
  external?: boolean;
};

const FILES: FileEntry[] = [
  { id: "home", name: "Home", ext: "tsx" },
  { id: "pendidikan", name: "Pendidikan", ext: "tsx" },
  { id: "keahlian", name: "Keahlian", ext: "json" },
  { id: "project", name: "Project", ext: "tsx" },
  { id: "sertifikat", name: "Sertifikat", ext: "tsx" },
  {
    id: "postingan",
    name: "Postingan",
    ext: "md",
    href: "https://big-com18.github.io/Cv_Billy/CV-Home/postingan/post.html",
    external: true,
  },
  { id: "contact", name: "Contact", ext: "tsx" },
];

const extColor: Record<FileEntry["ext"], string> = {
  tsx: "text-teal",
  json: "text-amber",
  md: "text-rose",
};

function Clock() {
  const [time, setTime] = useState<string>("--:--");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(t);
  }, []);
  return <span>{time}</span>;
}

export default function EditorChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const ids = FILES.filter((f) => !f.external).map((f) => f.id);
    // Garis acuan navbar: sticky header (~49px) + tab bar (~41px)
    const OFFSET = 100;

    const updateActive = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        // Section dianggap aktif kalau bagian atasnya sudah lewat garis offset
        if (top - OFFSET <= 0) {
          current = id;
        }
      }
      setActive(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false);
  };

  const activeFile = FILES.find((f) => f.id === active) ?? FILES[0];

  return (
    <div className="flex min-h-screen flex-col">
      {/* top title bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-rule bg-panel/95 px-3 py-2 backdrop-blur sm:px-5">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.jpeg"
            alt="Logo"
            className="h-6 w-6 rounded-full object-cover"
          />
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Buka navigasi"
            aria-expanded={sidebarOpen}
            className="mr-1 grid h-7 w-7 place-items-center text-paper/80 sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal/70" />
          <span className="ml-3 hidden font-mono text-xs text-muted sm:inline">
            Billy Andreas — Visual Studio Code
          </span>
        </div>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            goTo("contact");
          }}
          className="rounded-sm border border-amber/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-amber transition hover:bg-amber hover:text-ink"
        >
          run --hubungi
        </a>
      </header>

      <div className="flex flex-1">
        {/* sidebar: file explorer */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 shrink-0 transform overflow-y-auto border-r border-rule bg-panel pt-[49px] transition-transform duration-200 sm:sticky sm:top-[49px] sm:h-[calc(100vh-49px)] sm:translate-x-0 sm:pt-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between px-4 pt-4 sm:hidden">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Explorer
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Tutup navigasi"
              className="grid h-7 w-7 place-items-center text-paper/80"
            >
              ✕
            </button>
          </div>
          <div className="px-4 py-5">
            <p className="mb-3 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:block">
              Explorer
            </p>
            <p className="mb-2 flex items-center gap-1.5 font-mono text-xs text-paper/90">
              <span className="text-amber">▾</span> CV_BILLY
            </p>
            <ul className="ml-3 border-l border-rule pl-3">
              {FILES.map((f) => {
                const isActive = !f.external && f.id === active;
                const content = (
                  <span
                    className={`flex items-center gap-2 rounded-sm px-2 py-1.5 font-mono text-[13px] transition ${
                      isActive
                        ? "bg-amber/15 text-paper"
                        : "text-paper/70 hover:bg-panelLight hover:text-paper"
                    }`}
                  >
                    <span className={extColor[f.ext]}>●</span>
                    {f.name}
                    <span className="text-muted">.{f.ext}</span>
                    {f.external && (
                      <svg
                        className="ml-auto h-3 w-3 text-muted"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M3 9 9 3M4 3h5v5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    )}
                  </span>
                );
                return (
                  <li key={f.id}>
                    {f.external ? (
                      <a href={f.href} target="_blank" rel="noopener noreferrer">
                        {content}
                      </a>
                    ) : (
                      <button
                        onClick={() => goTo(f.id)}
                        className="block w-full text-left"
                      >
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {sidebarOpen && (
          <button
            aria-label="Tutup navigasi"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/50 sm:hidden"
          />
        )}

        {/* main editor pane */}
        <div className="flex min-h-screen flex-1 flex-col sm:pl-0">
          {/* tab bar */}
          <nav className="sticky top-[49px] z-20 flex overflow-x-auto border-b border-rule bg-ink/95 backdrop-blur">
            {FILES.filter((f) => !f.external).map((f) => {
              const isActive = f.id === active;
              return (
                <button
                  key={f.id}
                  onClick={() => goTo(f.id)}
                  className={`flex items-center gap-2 whitespace-nowrap border-r border-rule px-4 py-2.5 font-mono text-xs transition ${
                    isActive
                      ? "border-t-2 border-t-amber bg-panel text-paper"
                      : "border-t-2 border-t-transparent text-muted hover:text-paper/80"
                  }`}
                >
                  <span className={extColor[f.ext]}>●</span>
                  {f.name}.{f.ext}
                </button>
              );
            })}
          </nav>

          <main className="flex-1">{children}</main>

          {/* status bar */}
          <footer className="sticky bottom-0 z-20 flex items-center justify-between border-t border-rule bg-amber px-3 py-1 font-mono text-[11px] text-ink sm:px-5">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M5.5 1v9M2 4l3.5-3 3.5 3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                main
              </span>
              <span className="hidden sm:inline">UTF-8</span>
              <span className="hidden sm:inline">LF</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">
                {activeFile.name}.{activeFile.ext}
              </span>
              <span>Jakarta, ID</span>
              <Clock />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}